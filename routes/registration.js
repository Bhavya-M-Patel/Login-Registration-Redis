const express = require('express');
const redis = require('redis');
const md5 = require('md5');
const validator = require('validator');


const client = redis.createClient({
    host:"127.0.0.1",
    port:"6379"
});    

const register = async(req,res) =>{
    const {email,name, pass} = req.body;

    if (!validator.isEmail(email)) {
      return res.json({ 
        "msg": "Invalid Email",
        "status": false
       });
    }

    if(validator.isEmpty(pass) || validator.isEmpty(name)){
      return res.json({
        "msg":"Please Enter proper Name and Password",
        "status":false
      })
    }
    
    
    const hashedPassword = md5(pass);

    if(!(client.isOpen && client.isReady)){
      await client.connect();
    }
    
    let result = await client.hSet(email,{"name":name,"password":hashedPassword});
    name 
    if(result==0){
      res.json({
        "msg":"user is already exists",
        "status":false
      })
    }
    
    else{
      res.status(201).json({
        "msg":"User account is created",
        "status":true
      })
    }
};

module.exports = register;

