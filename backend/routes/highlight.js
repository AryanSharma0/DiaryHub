const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const fetchUser = require("../middleware/fetchuser");
const Highlight = require("../models/Highlight");
const DatauriParser = require("datauri/parser");
const cloudinary_image = require("./upload");
// Multer configuration

// For saving data in current directory
// const storage = multer.diskStorage({
// destination: function (req, file, cb) {
//   cb(null, "highlight/");
// },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }   
};

var upload = multer({
  storage: storage,   
  fileFilter: fileFilter,
});
router.get("/", fetchUser, async (req, res) => {
  try {
    const highlights = await Highlight.find({ user: req.user.id });
    res.json(highlights);
  } catch (error) {
    console.error("Error getting highlights:", error);
    res.status(500).json({ error: "Error getting highlights" });
  }
});

// Create a highlight
// router.post(
//   "/add",
//   fetchUser,
//   upload.array("image", 50),
//   async (req, res) => {
//     try {
//       const { tag, about } = new Highlight(req.body);
//       const file = req.file;

//       // Read the file buffer
//       const fileBuffer = fs.readFileSync(file.path);

//       // Convert the file buffer to a Data URI
//       const parser = new DatauriParser();
//       const dataUri = parser.format(file.originalname, fileBuffer);
//       const image = dataUri.content;

//       // Getting image path using cloudinary storage
//       const imagePath = await cloudinary_image(image);
//       const highlight = new Highlight({
//         tag,
//         about,
//         image: imagePath,
//         user: req.user.id,
//       });
//       await highlight.save();
//       console.log(highlight);
//       res.json({ message: "Highlight was posted successfully" });
//     } catch (error) {
//       console.error("Error creating highlight:", error);
//       res.status(500).json({ error: "Error creating highlight" });
//     }
//   }
// );
router.post(
  "/add",
  fetchUser,
  upload.array("image", 50), // Updated to use 'array' instead of 'single'
  async (req, res) => { 
    try {
      const { name } = req.body;
      const files = req.files; // Use 'files' instead of 'file' since it's an array

      // Process each uploaded image
      const imagePaths = [];
      for (const file of files) {
        // Read the file buffer
        const fileBuffer = fs.readFileSync(file.path);

        // Convert the file buffer to a Data URI
        const parser = new DatauriParser();
        const dataUri = parser.format(file.originalname, fileBuffer);
        const image = dataUri.content;

        // Getting image path using cloudinary storage
        const imagePath = await cloudinary_image(image);
        imagePaths.push(imagePath);
      }

      const highlight = new Highlight({
        name,
        images: imagePaths, // Store image paths as an array
        user: req.user.id,
      });
      await highlight.save();
      console.log(highlight);
      res.json({ message: "Highlight was posted successfully" });
    } catch (error) {
      console.error("Error creating highlight:", error);
      res.status(500).json({ error: "Error creating highlight" });
    }
  }
);      

// Delete a highlight
router.delete("/remove/:id", fetchUser, async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user;
    let highlight = await Highlight.findById(req.params.id);
    if (!highlight) {
      return res.status(404).send("Not Found");
    }

    // User Athentication
    let userId = await req.user.id;
    if (highlight.user.toString() !== userId) {
      return res.status(401).send("Not Allowed");
    }
    highlight = await Highlight.findOneAndDelete({ _id: id, user: user.id });

    res.json({ message: "Highlight deleted successfully" });
  } catch (error) {
    console.error("Error deleting highlight:", error);
    res.status(500).json({ error: "Error deleting highlight" });
  }
});

// Update a highlight
router.put(
  "/update/:id",
  fetchUser,
  upload.array("image", 50),
  async (req, res) => {
    try {
      const id = req.params.id;
      const { name } = req.body;
      const file = req.file;
      if (file !== undefined) {
        // Convert the file buffer to a Data URI
        const parser = new DatauriParser();
        const fileBuffer = fs.readFileSync(file?.path);
        const dataUri = parser.format(file?.originalname, fileBuffer);
        const image = dataUri.content;

        // Getting image path using cloudinary storage
        const imagePath = await cloudinary_image(image);

        console.log(imagePath);
        const highlight = await Highlight.findOneAndUpdate(
          { _id: id, user: req.user.id },
          { name, image: imagePath, user: req.user.id },
          { new: true }
        );
        if (!highlight) {
          return res.status(404).json({ error: "Highlight not found" });
        }

        res.json(highlight);
      } else {
        const highlight = await Highlight.findOneAndUpdate(
          { _id: id, user: req.user.id },
          { name, user: req.user.id },
          { new: true }
        );
        if (!highlight) {
          return res.status(404).json({ error: "Highlight not found" });
        }
        res.json(highlight);
      }
    } catch (error) {
      console.error("Error updating highlight:", error);
      res.status(500).json({ error: "Error updating highlight" });
    }
  }
);

module.exports = router;
