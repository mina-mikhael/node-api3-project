const express = require("express");
const cors = require("cors");
const { logger } = require("./middleware/middleware");
const userRouter = require("./users/users-router");

const server = express();
server.use(express.json()); // this line is needed to parse JSON from the body
server.use(cors());
server.use(logger);

server.use("/api/users", userRouter);

server.use("*", (req, res, next) => {
  next({ status: 404, message: "not found" });
});

// eslint-disable-next-line
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

module.exports = server;
