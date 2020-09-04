const express = require("express");
const Joi = require("joi");
const db = require("../db/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const schema = Joi.object({
  username: Joi.string()
    .regex(/[a-zA-z0-9_]+$/)
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .trim()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .required(),
});

const users = db.get("users");
users.createIndex("username", { unique: true });

router.get("/", (req, res) => {
  res.json({
    message: "Auth route🔐",
  });
});

const errorStatus422 = (res, next, errorMessage) => {
  res.status(422);
  const error = new Error(errorMessage);
  next(error);
};

const userToken = (payload, res, next) => {
  jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1d",
    },
    (err, token) => {
      if (err) {
        errorStatus422(res, next, "Invalid token");
      } else {
        res.json({
          token,
        });
      }
    }
  );
};

/******USER SIGNUP*****/
router.post("/signup", (req, res, next) => {
  const result = schema.validate(req.body);
  console.log("result: ", result);
  if (result) {
    //checks if user exists in the db
    users
      .findOne({
        username: req.body.username,
      })
      .then((user) => {
        if (user) {
          //respond with a error
          const err = new Error("User already Exists");
          res.status(409);
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
              userToken(user, res, next);
            });
          });
        }
      });
  } else {
    res.status(422);
    next(result.error);
  }
});

/*****Sign In  */

router.post("/signin", (req, res, next) => {
  const result = schema.validate(req.body);

  if (result) {
    users
      .findOne({
        username: req.body.username,
      })
      .then((user) => {
        if (user) {
          //user is signed up
          bcrypt.compare(req.body.password, user.password).then((result) => {
            if (result) {
              const payload = {
                id: user._id,
                username: user.username,
              };

              userToken(payload, res, next);
            }
          });
        } else {
          errorStatus422(res, next, "User does not exist");
        }
      });
  } else {
    errorStatus422(
      res,
      next,
      "Unable to Login, check your username and password"
    );
  }
});

module.exports = router;
