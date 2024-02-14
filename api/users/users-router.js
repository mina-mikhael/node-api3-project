const express = require("express");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
const {
  validateUser,
  validateUserId,
  validatePost,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Users.get()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

router.get("/:id", validateUserId, (req, res) => {
  res.json(req.user);
});

router.post("/", validateUser, (req, res, next) => {
  const { name } = req.body;
  Users.insert({ name })
    .then((user) => {
      console.log(user);
      res.status(201).json(user);
    })
    .catch(next);
});

router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  Users.update(id, { name })
    .then((user) => res.json(user))
    .catch(next);
});

router.delete("/:id", validateUserId, (req, res, next) => {
  const { id } = req.params;
  Users.remove(id)
    .then(() => res.json(req.user))
    .catch(next);
});

router.get("/:id/posts", validateUserId, (req, res, next) => {
  const { id } = req.params;
  Posts.get()
    .then((posts) => {
      const userPosts = posts.filter((post) => post.user_id === Number(id));
      res.json(userPosts);
    })
    .catch(next);
});

router.post("/:id/posts", validateUserId, validatePost, (req, res, next) => {
  const { text } = req.body;
  const { id } = req.params;
  Posts.insert({ user_id: id, text })
    .then((post) => res.status(201).json(post))
    .catch(next);
});

module.exports = router;
