const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const Diary = require("../models/Diary");
const { body, validationResult } = require("express-validator");

//Route 1: Get All the Diary using : GET "/api/diary/fetchdiary". Login required
router.get("/fetchdiary", fetchUser, async (req, res) => {
  try {
    const diary = await Diary.find({ user: req.user.id });
    res.json(diary);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});  

//Route 2: Add a new Diary using : POST "/api/diary/addDiary". Login required

router.post(
  "/addDiary", 
  fetchUser,
  [
    body("title", "Enter a valid Title ").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag, mood } = req.body;

      // If there are errors retrurn bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const diary = new Diary({
        title,
        description,
        tag,
        user: req.user.id,
        mood,
      });
      const savedDiary = await diary.save();

      res.json(savedDiary);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
 
//Route 3: Updating a existing Diary using : PUT "/api/diary/updatediary". Login required

router.put(
  "/updatediary/:id",
  fetchUser,
  [
    body("title", "Enter a valid Title ").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag, mood } = req.body;
      //  Create a newdiary object

      const newDiary = {};
      if (title) {
        newDiary.title = title;
      }
      if (description) {
        newDiary.description = description;
      }
      if (tag) {
        newDiary.tag = tag;
      }
      if (mood) {
        newDiary.mood = mood;
      }
      // Find a node to be updated and update it

      let diary = await Diary.findById(req.params.id);
      if (!diary) {
        return res.status(404).send("Not Found");
      }
      let userId = await req.user.id;
      if (diary.user.toString() !== userId) {
        return res.status(401).send("Not Allowed");
      }

      diary = await Diary.findByIdAndUpdate(
        req.params.id,
        { $set: newDiary },
        { new: true }
      );
      res.send({ diary });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 4: Deleting a existing Diary using : DELETE "/api/diary/deletediary". Login required

router.delete(
  "/deletediary/:id",
  fetchUser,

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Find a node to be deleting and delete it

      let diary = await Diary.findById(req.params.id);
      if (!diary) {
        return res.status(404).send("Not Found");
      }

      // User Athentication
      let userId = await req.user.id;
      if (diary.user.toString() !== userId) {
        return res.status(401).send("Not Allowed");
      }

      diary = await Diary.findByIdAndDelete(req.params.id);
      res.send({ Success: "Node has been successfully deleted", diary });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
