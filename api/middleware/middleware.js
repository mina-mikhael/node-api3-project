const Users = require("../users/users-model");

function logger(req, res, next) {
  console.log(
    `Request method: ${req.method}, 
    Request url: ${req.originalUrl},
     Timestamp: ${new Date().toISOString()}`
  );
  next();
}

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "user not found" });
      } else {
        req.foundUser = user;
        next();
      }
    })
    .catch(() => {
      res.status(500).json({ message: "server messed up" });
    });
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body;
  if (!name || name.trim() === "") {
    res.status(400).json({
      message: "missing required name field",
    });
  } else {
    req.userName = { name: name.trim() };
    next();
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body;
  if (!text || text.trim() === "") {
    res.status(400).json({
      message: "missing required text field",
    });
  } else {
    req.newPostText = text.trim();
    next();
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
