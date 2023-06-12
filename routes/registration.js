const router = require("express").Router();
const redis = require("redis");
const md5 = require("md5");
const validator = require("validator");
const { redisClient, connectRedisClient } = require("../helper/redisClient");
const { Router } = require("express");

router.post("/", async (req, res) => {
  console.log(req.body);
  let { email, name, pass } = req.body;
  email = email.toLowerCase();
  if (!validator.isEmail(email)) {
    res.render("index.ejs", {
      status: false,
      msg: "Invalid Email, Please register again",
    });
    return;
  }

  if (validator.isEmpty(pass) || validator.isEmpty(name)) {
    res.render("index.ejs", {
      status: false,
      msg: "Please Enter proper Name and Password",
    });
    return;
  }

  const hashedPassword = md5(pass);
  console.log("hello");
  await connectRedisClient();
  console.log("hii");

  let result = await redisClient.hSet(email, {
    name: name,
    password: hashedPassword,
  });

  if (result == 0) {
    res.render("index.ejs", { status: false, msg: "user is already exists" });
  } else {
    res.render("index.ejs", { status: false, msg: "User account is created" });
  }
});

module.exports = router;
