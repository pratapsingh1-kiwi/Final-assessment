const jwt = require("jsonwebtoken");

module.exports = {
  sign: async (body, next) => {
    return await jwt.sign(body, process.env.TOKEN_SECRET, { expiresIn: "1h" });
  },
  decode: async (token, next) => {
    return await jwt.compare(token, process.env.TOKEN_SECRET);
  },
};
