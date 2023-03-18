const express = require("express");
var imageRouter = express.Router();
const post = require("../model/profile.model");
const authentication = require("../middlewares/auth.middleware");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const uploadfile = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "uploadedFiles/");
    },
    filename: (req, file, callback) => {
      callback(null, file.originalname);
    },
  }),
});

imageRouter.post(
  "/newPost",
  authentication,
  uploadfile.single("user_file"),
  async (req, res) => {
    console.log(req.file);

    if (req.file != undefined) {
      const p = new post({
        user_Id: req.body.user_id,
        image: {
          data: fs.readFileSync(
            path.join(__dirname, "../uploadedFiles/", req.file.filename)
          ),
          contentType: "text/image",
        },
        title: req.body.title,
        description: req.body.description,
      });

      const obj = await p.save();
      console.log(obj);
      res.send(obj);
    } else {
      const p = new post({
        user_Id: req.body.user_id,
        title: req.body.title,
        description: req.body.description,
      });

      const obj = await p.save();
      console.log(obj);
      res.send(obj);
    }
  }
);

module.exports = imageRouter;
