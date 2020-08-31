const express = require("express");
const Joi = require("joi");
const db = require("../db/connection");
const bcrypt = require("bcryptjs");

const router = express.Router();
const schema = Joi.object({
  username: Joi.string()
    .regex(/[a-zA-z0-9_]+$/)
    .min(3)
    .max(30)
    .required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const users = db.get("users");
users.createIndex("username", { unique: true });

router.get("/", (req, res) => {
  res.json({
    message: "Auth route🔐",
  });
});

router.post("/signup", (req, res, next) => {
  console.log("body", req.body);
  const result = schema.validate(req.body);

  if (result.error !== null) {
    //checks if user exists in the db
    users
      .findOne({
        username: req.body.username,
      })
      .then((user) => {
        if (user) {
          //respond with a error
          const err = new Error("User already Exists");
          next(err);
        } else {
          //hash password

          bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
            const newUser = {
              username: req.body.username,
              password: hashedPassword,
            };

            //insert user into db
            users.insert(newUser).then((user) => {
              res.json({
                user,
              });
            });
          });
        }
      });
  } else {
    next(result.error);
  }
});

module.exports = router;
