const express = require("express");
const gravatar = require("gravatar");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const keys = require("../../config/keys");
const { check, validationResult } = require("express-validator");
const validateRegisterInput = require("../../validation/register");
const validateLoginIput = require("../../validation/login");

// @route  : '/api/users/test
// @desc   :  'for testing route'
// @access :  'public'
router.get("/test", (req, res) => {
  res.json({ msg: "users works" });
});

// @route  : '/api/users/register'
// @desc   :  'Register User'
// @access :  'public'
router.post(
  "/register",
  [
    check("name")
      .not()
      .isEmpty()
      .withMessage("name is required"),
    check("email")
      .isEmail()
      .withMessage("please enter valid email"),
    check("password", "password must be 6 or more characters").isLength({
      min: 6
    }),
    check("password2", "passwords must match").custom(
      (value, { req }) => value === req.body.password
    )
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //  const { errors, isValid } = validateRegisterInput(req.body);
    //  if (!isValid) {
    //    return res.status(400).json(errors);
    //  }
    User.findOne({ email: req.body.email }).then(user => {
      console.log(" user find one ");
      if (user) {
        console.log("user already exists");
        return res
          .status(400)
          .json({ errors: [{ msg: "User already Exists" }] });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          d: "mm",
          r: "pg"
        });
        const newuser = new User({
          email: req.body.email,
          name: req.body.name,
          password: req.body.password,
          avatar
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newuser.password, salt, (err, hash) => {
            newuser.password = hash;
            newuser
              .save()
              .then(savedData => res.status(201).json({ user: savedData }))
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
);

// @route  : '/api/users/login'
// @desc   :  'Login user'
// @access :  'public'
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginIput(req.body);

  if (!isValid) {
    return res.status(400).json({ errors });
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.status(200).json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        res.status(400).json({ password: "password is incorrect" });
      }
    });
  });
});

// @route  : '/api/users/current'
// @desc   :  'for authentication purpose'
// @access :  'private'
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).json(req.user);
  }
);

module.exports = router;
