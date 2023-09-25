const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchuser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1: Get All the Notes using : GET "/api/notes/fetchnotes". Login required
router.get("/fetchnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
}); 

//Route 2: Add a new Note using : POST "/api/notes/addnotes". Login required

router.post( 
  "/addnote",   
  fetchUser,
  [
    body("title", "Enter a valid Title ").isLength({ min: 3 }),
    body("description", "Description must be atleast 3 character").isLength({
      min: 3,
    }),
    body("subject", "Description must be atleast 3 character").isLength({
      min: 3,
    }),
    body("title", "Description must be atleast 3 character").isLength({
      min: 3,
    }),
  ],     
  async (req, res) => {
    try {
      const { title, description, subject, topic } = req.body;

      // If there are errors retrurn bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        subject,
        user: req.user.id,
        topic,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 3: Updating a existing Note using : PUT "/api/notes/updatenotes". Login required

router.put(
  "/updatenote/:id",
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
      const { title, description, subject, topic } = req.body;
      //  Create a newnote object

      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (topic) { 
        newNote.topic = topic;
      }
      if (subject) {
        newNote.subject = subject;
      }  
      // Find a node to be updated and update it

      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
      let userId = await req.user.id;
      if (note.user.toString() !== userId) {
        return res.status(401).send("Not Allowed");
      }

      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.send({ note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 4: Deleting a existing Note using : DELETE "/api/notes/deletenotes". Login required

router.delete(
  "/deletenote/:id",
  fetchUser,

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Find a node to be deleting and delete it

      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }

      // User Athentication
      let userId = await req.user.id;
      if (note.user.toString() !== userId) {
        return res.status(401).send("Not Allowed");
      }

      note = await Note.findByIdAndDelete(req.params.id);
      res.send({ Success: "Node has been successfully deleted", note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
