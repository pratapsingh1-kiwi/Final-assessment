const { bookService, borrowerService, returnService, } = require("../services");
module.exports = {
  displayBooks: async (req, res) => {
    const books = await bookService.getAllBooks( );
    res.send({ books });
  },
  mostIssuedbook: async (req, res) => {
    const books = await bookService.mostIssuedbook( );
    res.send(books)
  },

  addBook: async (req, res) => {
    try {
      const result = await bookService.addBook(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },

  borrowBook: async (req, res) => {
    try {
      const result = await borrowerService.borrowBook(req, res);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  dayslefttosubmit: async (req, res) => {
    try {
      const result = await borrowerService.dayslefttosubmit(req, res);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  updateBook: async (req, res) => {
    try {
      const result = await borrowerService.borrowerService(req, res);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  returnBook: async (req, res) => {
    try {
      const result = await returnService.returnBook(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  singleBook: async (req, res) => {
    try {
      const result = await borrowerService.singleBook(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  allBooks: async (req, res) => {
    try {
      const result = await borrowerService.allBooks(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  blacklistedUsers: async (req, res) => {
    try {
      const result = await borrowerService.blacklistedUsers(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },


};
