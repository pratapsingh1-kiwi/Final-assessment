//require("dotenv").config(); // load env file
var express = require("express");
var bodyParser = require("body-parser");
var indexRouter = require("./routes/index");
const mongoose = require("mongoose");
const app = express();
const connection = require("./db/connection");
connection.con();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use("/", indexRouter);
app.listen(3000);
module.exports = app;
