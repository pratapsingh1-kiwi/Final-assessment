const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const borrower = new Schema(
  {
    email: String,
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    bookId: { type: Schema.Types.ObjectId, ref: "book", required: true },
    assignedDate: {
      type: Date,
      default: Date.now,
    },
    returnDate: {
      type: Date,
      default: +new Date() + 7 * 24 * 60 * 60 * 1000,
    }
  }
);

module.exports = mongoose.model("Borrower", borrower);
