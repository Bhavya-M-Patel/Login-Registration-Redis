const express = require('express');
const redis = require('redis');
const md5 = require('md5');
const validator = require('validator');


const client = redis.createClient({
    host:"127.0.0.1",
    port:"6379"
});    

const register = async(req,res) =>{
    const {email,name, password} = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
    
    const hashedPassword = md5(password);
    await client.connect();
    let result = await client.hSet(email,{"name":name,"password":hashedPassword});
    name 
    if(result==0){
      res.status(400).json({
        "msg":"user is already exists"
      })
    }
    else{
      res.status(201).json({
        "msg":"User account is created"
      })
    }
};

module.exports = register;

