const express = require("express");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

//models import
const Users = require("./users-model");
const Posts = require("../posts/posts-model");

// middlewares import
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.get("/:id", validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.foundUser);
});

router.post("/", validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid

  Users.insert(req.userName)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.userName)
    .then((updatedUser) => {
      res.status(201).json(updatedUser);
    })
    .catch(next);
});

router.delete("/:id", validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then(() => {
      res.json(req.foundUser);
    })
    .catch(next);
});

router.get("/:id/posts", validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
    .then((userPosts) => {
      res.json(userPosts);
    })
    .catch(next);
});

router.post("/:id/posts", validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Posts.insert({ user_id: req.params.id, text: req.newPostText })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch(next);
});

router.use(
  (
    err,
    req,
    res,
    next //eslint-disable-line
  ) => {
    res.status(err.status || 500).json({
      message: "something is missed up with the server, try again never",
    });
  }
);

// do not forget to export the router
module.exports = router;
