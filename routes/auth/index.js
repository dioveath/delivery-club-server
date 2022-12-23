const Router = require("express").Router;
const logger = require('../../lib/logger');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const config = require("../../config");
const UserAccess = require("../../data-access/user-db");

const authRouter = new Router();

authRouter.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(406).send({
      status: "fail",
      errorList: ["Please give proper credentials."],
    });

  const user = await UserAccess.findUserBy("email", req.body.email);

  if (user) {
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(406).send({
        status: "fail",
        errorList: ["User or Password don't match!"],
      });
    }

    const accessToken = issueJwt(user.id);
    return res.send({
      status: "success",
      userId: user.id,
      accessToken: accessToken
    });
  }

  return res.status(406).send({
    status: "fail",
    errorList: ["User not found with email, " + req.body.email],
  });
});

authRouter.post("/register", async (req, res) => {
  try {
    const user = await UserAccess.addUser(req.body);
    const accessToken = issueJwt(user.id, user.roles);

    logger.info(`user created sucessfully: ${user.id}`);

    return res.send({
      status: "success",
      userId: user.id,
      accessToken: accessToken,
    });
  } catch (error) {
    return res.status(406).send({
      status: "fail",
      errorList: error.message.split(","),
    });
  }
});


function issueJwt(userId) {
  const tokenOptions = {
    expiresIn: "1h",
  };
  return jwt.sign(
    {
      sub: userId,
      iss: config.JWT_ISSUER,
      aud: config.JWT_AUDIENCE,
    },
    config.JWT_SECRET,
    tokenOptions
  );
}

module.exports = authRouter;
