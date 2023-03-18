const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profile = new Schema(
  {
    user_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    title: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("profile", profile);
