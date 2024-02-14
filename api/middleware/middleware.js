const Users = require("../users/users-model");

function logger(req, res, next) {
  console.log(
    `${req.method} to ${req.originalUrl} at ${new Date().toISOString()}`
  );
  next();
}

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const user = await Users.getById(id);
    if (!user) {
      next({ status: 404, message: "user not found" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function validateUser(req, res, next) {
  try {
    const { name } = req.body;

    if (!name || !name.trim() || typeof name !== "string") {
      next({ status: 400, message: "missing required name field" });
    } else {
      req.user = name;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validatePost(req, res, next) {
  const { text } = req.body;
  if (!text) {
    next({ status: 400, message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = { logger, validateUserId, validateUser, validatePost };
