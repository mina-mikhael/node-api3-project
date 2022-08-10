const Users = require("../users/users-model");

function logger(req, res, next) {
  console.log(
    `Request method: ${req.method}, Request url: ${
      req.originalUrl
    }, Timestamp: ${new Date().toISOString()}`
  );
  next();
}

function validateUserId(req, res, next) {
  Users.getById(req.params.id).then((user) => {
    if (!user) {
      res.status(400).json({ message: "something" });
      return;
    }

    req.foundUser = user;
    next();
  });
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
