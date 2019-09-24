const express = require("express");
const router = express.Router();
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const Post = require("../../models/Posts");
const Profile = require("../../models/Profile");

router.get("/test", (req, res) => {
  res.json({ msg: "Posts works" });
});

// @router : Get '/api/posts'
// @desc   : get all posts
// @access : public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json({ posts }))
    .catch(err => res.status(404).json({ msg: "record not found" }));
});

// @router : Get '/api/posts/:id'
// @desc   : get post by id
// @access : public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ msg: "record not found" }));
});

// @route : POST '/api/posts'
// @desc  : to add a post
// @access: private
router.post(
  "/",
  [
    passport.authenticate("jwt", { session: false }),
    [
      check("text", "Text value should required")
        .not()
        .isEmpty(),
      check("text", "text length should between 10 to 200 chars").isLength({
        min: 10,
        max: 200
      })
    ]
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route :  DELETE '/api/posts/:id'
// @desc  :  deleting the post by id
// @access: private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ unauthorized: "un authorized" });
          }

          post.remove().then(post => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ notfound: "notfound" }));
    });
  }
);

// @route : POST '/api/posts/like/:id'
// @desc  : adding like to the post
// @access: private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res.status(400).json({ alreadyLiked: "user alredy liked" });
        }

        post.likes.unshift({ user: req.user.id });

        post.save().then(post => res.json(post));
      });
    });
  }
);

// @route : POST '/api/posts/unlike/:id'
// @desc  : adding like to the post
// @access: private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id).then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: "you didn't liked this post" });
        }

        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        // splice the array
        post.likes.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      });
    });
  }
);

// @route : POST '/api/posts/comment/:id'
// @desc  : adding comments
// @access : private
router.post(
  "/comment/:id",
  [
    passport.authenticate("jwt", { session: false }),
    [
      check("text")
        .not()
        .isEmpty(),
      check("text").isLength({ min: 10, max: 300 })
    ]
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        post.comments.unshift(newComment);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(400).json({ postnotfound: "postnotfound" }));
  }
);

// @route : DELETE api/posts/comment/:id/:comment_id
// @desc  : deleting a comment
// @acess : private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then(post => {
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res.status(404).json({ commentnotfound: "comment not found" });
      }

      const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      post.comments.splice(removeIndex, 1);

      post.save().then(post => res.json(post));
    });
  }
);
module.exports = router;
