const { signupuser, loginuser, updateuser, deleteuser } = require("../services/user.service");
const { tokenHelper } = require("../helper/token.helper");
const student = require("../model/user.model");
const borrowerService = require("../services/borrow.service");

module.exports = {
  getProfile: async (req, res, next) => {
    const userId = req.userId;
    const allPurchasedBooks = await borrowerService.findAllPurchasedBooks(next);
    res.send({ allPurchasedBooks });
  },
  signup: async (req, res) => {
    try {
      const result = await signupuser(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  login: async (req, res) => {
    try {
      const result = await loginuser(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  update: async (req, res) => {
    try {
      const result = await updateuser(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
  delete: async (req, res) => {
    try {
      const result = await deleteuser(req);
      console.log(result);
      res.send(result);
    } catch (err) {
      res.send(err);
    }
  },
};
