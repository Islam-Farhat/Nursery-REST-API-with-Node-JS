const express = require("express");
const { model } = require("mongoose");
const loginController = require("./../Controller/authenticationController")


const loginRouter = express.Router();

loginRouter.post("/login", loginController.login)

module.exports = loginRouter;