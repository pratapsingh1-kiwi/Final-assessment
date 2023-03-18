const user = require("../model/user.model")

module.exports = {
  isAdmin: async (req, res, next) => {
    const email = req.body.email;
    if (!email) {
      res.locals.message = "Please login to continue.";
      return res.send("Please login to continue.");
    }
    const result = await user.findOne({email});
    if (result.isadmin || result.isSubadmin ) {
      next();
    }
    return ("You dont have permission to perform this action.");
  },
};
