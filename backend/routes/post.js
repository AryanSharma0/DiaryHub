const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const fetchUser = require("../middleware/fetchuser");
const Post = require("../models/Post");
const DatauriParser = require("datauri/parser");
const cloudinary_image = require("./upload");


// Multer configuration
// For saving data  in local disk
const storage = multer.diskStorage({

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// const storage = multer.memoryStorage();  
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

var upload = multer({
  dest: "post/",
  storage: storage,
  fileFilter: fileFilter,         
});
router.get("/", fetchUser, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    res.json(posts);
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(500).json({ error: "Error getting posts" });
  }
});
// Create a post
router.post("/add", fetchUser, upload.single("image"), async (req, res) => {
  try {
    const { tag, about } = new Post(req.body);
    const file = req.file;

    // Read the file buffer
    const fileBuffer = fs.readFileSync(file.path);

    // Convert the file buffer to a Data URI
    const parser = new DatauriParser();
    const dataUri = parser.format(file.originalname, fileBuffer);
    const image = dataUri.content;

    // Getting image path using cloudinary storage
    const imagePath = await cloudinary_image(image);
    const post = new Post({ tag, about, image: imagePath, user: req.user.id });
    await post.save();
    console.log(post);
    res.json(post);
  } catch (error) { 
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
});

// Delete a post
router.delete("/remove/:id", fetchUser, async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user;
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send("Not Found");
    }

    // User Athentication
    let userId = await req.user.id;
    if (post.user.toString() !== userId) {
      return res.status(401).send("Not Allowed");
    }
    post = await Post.findOneAndDelete({ _id: id, user: user.id });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Error deleting post" });
  }
});

// Update a post
router.put(
  "/update/:id",
  fetchUser,
  upload.single("image"),
  async (req, res) => {
    try {
      const id = req.params.id;
      const { about, tag } = req.body;
      const file = req.file;
      console.log(about, " ", tag, " ", file);
      if (file !== undefined) {
        // Convert the file buffer to a Data URI
        const parser = new DatauriParser();
        const fileBuffer = fs.readFileSync(file?.path);
        const dataUri = parser.format(file?.originalname, fileBuffer);
        const image = dataUri.content;

        // Getting image path using cloudinary storage
        const imagePath = await cloudinary_image(image);

        console.log(imagePath);
        const post = await Post.findOneAndUpdate(
          { _id: id, user: req.user.id },
          { about, tag, image: imagePath, user: req.user.id },
          { new: true }
        );
        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }

        res.json(post);
      } else {
        const post = await Post.findOneAndUpdate(
          { _id: id, user: req.user.id },
          { about, tag, user: req.user.id },
          { new: true }
        );
        if (!post) {
          return res.status(404).json({ error: "Post not found" });
        }

        res.json(post);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Error updating post" });
    }
  }
);

module.exports = router;
