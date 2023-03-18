const Book = require("../model/book");

module.exports = {
  getAllBooks: async () => {
    try {
      const books = await Book.find();
      for (let i = 0; i <books.length; i++) {
        for (let j = 0; j < (books.length - i - 1); j++) {
        if (books[j].book_name >books[j + 1].book_name) {
          const temp =books[j];
        books[j] =books[j + 1];
          books[j + 1] = temp;
        }
      }
    }
      return books;
    } catch (e) {
      return e;
    }
  },
  mostIssuedbook: async ( ) => {
    const books = await Book.find();
    let maxIssued = 0;

    books.forEach(book => {
      const issued = book.issued;
      if (issued > maxIssued) {
        maxIssued = issued;
      }
    });
    
        books.forEach(book => {
      const issued = book.issued;
      if (issued == maxIssued) {
        return (book);
      }
    });},
  addBook: async function (req) {
    const doc = new Book({
      book_name: req.body.book_name,
      book_count: req.body.book_count,
      author_name: req.body.author_name,
      available: req.body.book_count,
    });
    const obj = await doc.save();
    return obj;
  },
  findBookById: async function (req) {
    try {
      const book = await Book.findOne({ _id: req.body._id });
      return book;
    } catch (e) {
      return e;
    }
  },
  updateBook: async function (req) {
    try {
      const object = await Book.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: {
            book_name: req.body.book_name,
            book_count: req.body.book_count,
            author_name: req.body.author_name,
            available: req.body.book_count,
          },
        }
      );
    } catch (e) {
      return e;
    }
  },
  deleteBook: async function (req) {
    try {
      const bookId = req.body;
      const studentObject = await Book.deleteOne({ bookId });
    } catch (e) {
      return e;
    }
  },
  findByDate: async function (req) {
    try {
      const purchaseDate = req.body.purchaseDate;
      const details = await borrowerModel.findOne({ purchaseDate });
      return details;
    } catch (e) {
      return e;
    }
  },
};
