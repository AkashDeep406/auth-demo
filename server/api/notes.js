const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const Joi = require("joi");

const schema = Joi.object().keys({
  title: Joi.string().trim().max(100).required(),
  note: Joi.string().trim().required(),
});

const notes = db.get("notes");
router.get("/", (req, res) => {
  res.json([]);
});

router.post("/", (req, res, next) => {
  const result = schema.validate(req.body);
  if (result) {
    console.log("result: ", req);
    const note = {
      ...req.body,
      user_id: req.user.id,
    };
    notes.insert(note).then((note) => {
      res.json(note);
    });
  } else {
    const error = new Error(result.error);
    res.status(422);
    next(error);
  }
});

module.exports = router;
