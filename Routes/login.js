const express = require('express');
const Router = express.Router();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const validator = require('validator')
const { redisClient } = require('../helper/redisClient')



Router.post('/', async (req, res) => {

    let { email, pass } = req.body;
    if (!(validator.isEmail(email) && pass)) {
        return res.send({status:false, msg: "Please enter valid email and password" })
    }
    let hashedPassword = md5(pass)

    if (!(redisClient.isOpen && redisClient.isReady)) {
        await redisClient.connect();
    }

    let userData = await redisClient.hGetAll(email);

    if (Object.keys(userData).length) {

        if (hashedPassword == userData.password) {
            let dataToSigned = { name: userData.name, Email: userData.email };
            let secreat = process.env.secreat_key;
            const token = jwt.sign(dataToSigned, secreat, { expiresIn: '1d' })
            res.cookie(process.env.token_header_key, token, { httpOnly: true })
                .send({ msg: "login successful",status:true, data: { name: userData.name, email } });
        }
        else {
            res.send({status:false, msg: "Password is incorrect" })
        }
    }
    else {
        res.send({status:false, msg: "User doesn't exist" })
    }
})

module.exports = Router;