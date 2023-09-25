const connectToMongo = require("./db");
const express = require("express");
const bodyParaser=require("body-parser")
const cloudinary = require("cloudinary");

require("dotenv").config();
connectToMongo();
 cloudinary.v2.config({
   cloud_name: "douu6g11u",
   api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
   api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
 });
const app = express();
const port = process.env.REACT_APP_PRODUCTION_PORT;
var cors = require("cors");
app.use(cors()); 
app.use(express.json());
app.use(bodyParaser.urlencoded({extended:false}))
app.use('/post',express.static('post')) 
// Available Routes
// app.use(upload.single("image"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes")); 
app.use("/api/diary", require("./routes/diary"));   
app.use("/api/post" , require("./routes/post"));
app.use("/api/highlight",  require("./routes/highlight"));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
