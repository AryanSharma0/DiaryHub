const mongoose = require("mongoose");

const HighlightSchema = new mongoose.Schema({
  name: { type: String, default: "General" },
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

HighlightSchema.methods.toJSON = function () {
  const result = this.toObject();
  delete result.photo;
  return result;
};
module.exports = mongoose.model("highlight", HighlightSchema);
