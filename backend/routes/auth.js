const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


require("dotenv").config();

const JWT_SECRET = process.env.REACT_APP_JWS_SECRET_KEY;
const fetchUser = require("../middleware/fetchuser");
// For more detail of JWT  go to jwt.io

//Route 1: Create a uset using: POST "/api/auth/createuser"

router.post(
  "/createuser",
  [
    // body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be atleast 5 character").isLength({
      min: 8,
    }),
    body("email").isEmail(),
  ],
  async (req, res) => {
    // If there are errors retrurn bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with this email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exist" }] });
      }
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        // name: req.body.name,
        password: hashpassword,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ authToken });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Some error occured ");
    }
  }
);

// Route 2: Authenticate  a user using: POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "Password must be atleast 5 character").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to connect with correct credentials." });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to connect with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json(authToken);
    } catch (err) {
      res.status(500).json({ error: "Internal server Error" });
    }
  }
);

// Route 3: Get user details using: POST "/api/auth/getuser". Login required
router.post(
  "/getuser",
  fetchUser,
  [
    body("email").isEmail(),
    body("password", "Password must be atleast 5 character").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);
module.exports = router;
