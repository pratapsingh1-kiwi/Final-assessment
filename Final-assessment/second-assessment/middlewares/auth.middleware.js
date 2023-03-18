const helper = require("../helper");
module.exports = {
  authentication: async (req, res, next) => {
    const jwt = require("jsonwebtoken");

    const t = req.headers.authorization;
    if (t != undefined) {
      const token = req.headers.authorization.split(" ")[1];
      const user = await jwt.verify(token, "Protected");
      req.body.email = user.email;
      next();
      }
    }
  }
