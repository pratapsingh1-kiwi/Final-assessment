const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const book = new Schema(
  {
    book_name: { type: String, required: true },
    book_count: { type: Number, required: true },
    author_name: { type: String, required: true },
    issued: { type: Number, default: 0 },
    available: { type: Number },
  },
);

module.exports = mongoose.model("book", book);
