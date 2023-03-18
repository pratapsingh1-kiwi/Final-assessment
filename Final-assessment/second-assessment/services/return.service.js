const book = require("../model/book");
const { borrowerModel } = require("../model/borrower.model");
module.exports = {
  returnBook: async (req, res) => {
    const bookId = req.body.bookId;
    try {
      const [docA, docB] = await Promise.all([
     book.updateOne(
        { _id: bookId },
          { $inc: { issued: -1 } },
        { new: true }
      ),
      book.updateOne(
        { _id: bookId },
          { $inc: { available: 1 } },
        { new: true }
      )
    ]);
      return ({ docA, docB });
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};
