const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  about: { type: String },
  tag: { type: String, default: "General" },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
  },
});   
 
PostSchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.photo;
  return result;
};
module.exports = mongoose.model("post", PostSchema);
           