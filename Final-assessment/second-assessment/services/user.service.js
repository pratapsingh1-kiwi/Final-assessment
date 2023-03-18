const student = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcrypt");

module.exports = {
  getProfile: async (req, res, next) => {
    const userId = req.userId;
    const allPurchasedBooks = await borrowerService.findAllPurchasedBooks(
      userId,
      next
    );
    res.send({ books: allPurchasedBooks });
  },
  loginuser: async function (req, res) {
    const { email, password } = req.body;
    const user = await student.findOne({ email });
    if (!user) {
      res.locals.message = "User does not exist with this email.";
      return res.send("User does not exist with this email.");
    }
    if (!bcryptjs.compare(password, user.password)) {
      res.locals.message = "Incorrect password.";
      return res.send("Incorrect password");
    }
    const token = jwt.sign({ email: req.body.email }, "Protected");
    return token;
  },
  signupuser: async function (req) {
    const salt = await bcryptjs.genSalt(10);
    const securePassword = await bcryptjs.hash(req.body.password, salt);
    const doc = new student({
      name: req.body.name,
      email: req.body.email,
      password: securePassword,
      batch: req.body.batch,
      enrollment_no: req.body.enrollment_no,
      token: req.body.token,
      isadmin: req.body.isadmin,
      isSubadmin: req.body.isSubadmin,
    });
    const obj = await doc.save();
    return obj;
  },
  updateuser: async function (req, res) {
    const object = await student.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: securePassword,
          batch: req.body.batch,
          enrollment_no: req.body.enrollment_no,
          token: req.body.token,
          isadmin: req.body.isadmin,
          isSubadmin: req.body.isSubadmin,
        },
      }
    );
    if (object == null) {
      return process.env.USER_NOT_EXITS;
    } else {
      return process.env.USER_UPDATED;
    }
  },
  deleteuser: async function (req, res) {
    const email = req.body;
    const studentObject = await student.deleteOne({ email });
    if (studentObject.deletedCount === 0) {
      return process.env.USER_NOT_EXITS;
    }
    return process.env.DELETE_SUCCESSFULLY;
  },
};
