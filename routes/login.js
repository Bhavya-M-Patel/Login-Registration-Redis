const express = require('express');
const Router = express.Router();
const md5 = require('md5');
const jwt = require('../helper/jwtHelper');
const redis = require('redis');
const validator = require('validator')
const { redisClient,connectRedisClient } = require('../helper/redisClient');
const { signJWT } = require('../helper/jwtHelper');



Router.post('/', async (req, res) => {
    
    let { email, pass } = req.body;
    email = email.toLowerCase();
    if (!(validator.isEmail(email) && !validator.isEmpty(pass))) {
        res.render("index.ejs",{status:false, msg: "Enter valid email and password"})
    }

    let hashedPassword = md5(pass)
    await connectRedisClient()
   

    let userData = await redisClient.hGetAll(email);

    if (Object.keys(userData).length) {

        if (hashedPassword == userData.password) {
            let personal = { name: userData.name, Email: userData.email };
            token = jwt.signJWT(personal);
            res.cookie(process.env.token_header_key, token).redirect("/Dashboard");
        }
        else {
            res.render("index.ejs",{status:false, msg: "Password is incorrect"})
        }
    }
    else {
        res.render("index.ejs",{status:false, msg: "User doesn't exist" })
    }
})

module.exports = Router;