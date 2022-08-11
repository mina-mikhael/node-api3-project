const express = require("express");

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

//models import
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
// middlewares import
const { validateUserId } = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then((users) => {
      res.json(users);
    })
    .catch(() => {
      res.status(500).json({ message: "server error" });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.foundUser);
});

router.post("/", (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put("/:id", (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id", validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
    .then(() => {
      res.json(req.foundUser);
    })
    .catch(() => {
      res.status(500).json({ message: "server screwed up" });
    });
});

router.get("/:id/posts", (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router;
