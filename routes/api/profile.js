const express = require("express");
const router = express();
const passport = require("passport");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

router.get("/test", (req, res) => {
  res.json({ msg: "profile works" });
});

// @route : /api/profile
// @desc  : 'gives the profile information'
// @access : private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {};
    console.log(req.user);
    Profile.findOne({ user: req.user.id })
      .populate("users", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noProfile = "profile not found";
          return res.status(404).json(errors);
        }
        res.status(200).json({ profile });
      });
  }
);

// @route : /api/profile
// @desc  : create user profile
// @access : private
router.post(
  "/",
  [
    passport.authenticate("jwt", { session: false }),
    [
      check("status", "status is required")
        .not()
        .isEmpty(),
      check("skills", "skills are required")
        .not()
        .isEmpty(),
      check("handle", "should be lenght of 5 or more").isLength({ min: 6 })
    ]
  ],

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const profileFields = {};

    profileFields.user = req.user.id;

    if (req.body.company) profileFields.company = req.body.company;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    // skills
    if (req.body.skills !== undefined) {
      profileFields.skills = req.body.skills.split(",");
    }

    // social profile
    profileFields.social = {};

    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      // Create new profile
      if (!profile) {
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "handle already exists";
            return res.status(400).json(errors);
          } else {
            new Profile(profileFields).save().then(profile => {
              res.status(200).json({ profile });
            });
          }
        });
      }
      // Update the profile
      else {
        // Check if handle exists for other user
        Profile.findOne({ handle: profileFields.handle }).then(p => {
          if (profile.handle !== p.handle) {
            errors.handle = "handle already exists";
            res.status(400).json(errors);
          }
        });
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.status(200).json(profile));
      }
    });
  }
);

// @route : /api/profile/handle/:handle
// @desc  : 'Get profile by handle'
// @access : public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  if (!req.params.handle) {
    errors.param = "please provide handle parameter";
    return res.status(400).json(errors);
  }
  Profile.findOne({ handle: req.params.handle })
    .populate("users", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "profile not found";
        return res.status(404).json({ errors });
      }
      res.json(profile);
    });
});

// @route : /api/profile/user/:user_id
// @desc  : 'Get profile by id'
// @access : public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("users", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "profile not found";
        return res.status(400).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.json({ profile: "Profile not found" }));
});

// @route : /api/profile/all
// @desc  : 'get all profiles'
// @access : public
router.get("/all", (req, res) => {
  let errors = {};
  Profile.find()
    .populate("users", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.profiles = "profiles doesn't exist";
        res.status(400).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.json({ profiles: "profiles not found" }));
});

// @route : post /api/profile/experience
// @desc  : 'post experience of user'
// @access : private
router.post(
  "/experience",
  [
    passport.authenticate("jwt", { session: false }),
    [
      check("title")
        .not()
        .isEmpty(),
      check("company")
        .not()
        .isEmpty(),
      check("from")
        .not()
        .isEmpty()
    ]
  ],
  (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current
      };

      profile.experience.unshift(newExp);

      profile.save().then(profile => {
        res.json(profile);
      });
    });
  }
);

// @route : post /api/profile/education
// @desc  : 'post education to the user profile'
// @access : private
router.post(
  "/education",
  [
    passport.authenticate("jwt", { session: false }),
    [
      check("school", "scholl is required")
        .not()
        .isEmpty(),
      check("degree", "degree is required")
        .not()
        .isEmpty(),
      check("from", "from is required")
        .not()
        .isEmpty()
    ]
  ],
  (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current
      };

      profile.education.unshift(newEdu);

      profile.save().then(profile => {
        res.json(profile);
      });
    });
  }
);

// @route : /api/profile/experience/:exp_id
// @desc  : delelte a experience
// @access: private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: true }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // : taking out the index to remove
        const removeIndex = profile.experience
          .map(exp => exp.id)
          .indexOf(req.params.exp_id);
        // : splice the array with given the index
        profile.experience.splice(removeIndex, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.json(err));
  }
);

// @route : /api/profile/education/:edu_id
// @desc  : delelte a education
// @access: private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: true }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // : taking out the index to remove
        const removeIndex = profiled.education
          .map(exp => exp.id)
          .indexOf(req.params.edu_id);
        // : splice the array with given the index
        profile.education.splice(removeIndex, 1);

        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.json(err));
  }
);

// @route : DELETE /api/profile
// @desc  : Delete a user and profile
// @access: private
router.delete(
  "/api/profile",
  passport.authenticate("jwt", { session: true }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(profile => {
      User.findOneAndRemove({ _id: req.user.id }).then(data => {
        res.json({ success: true });
      });
    });
  }
);
module.exports = router;
