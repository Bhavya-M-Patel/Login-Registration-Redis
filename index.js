const express = require('express');
const dotenv = require("dotenv");
const path = require('path');
dotenv.config();

const bodyParser = require("body-parser");

const login = require('./routes/login');

const register = require('./routes/registration')


const app = express();
const port = process.env.app_port;

const static_path = path.join(__dirname, "./public");
app.use(express.static(static_path));
app.use(express.json());
app.use('/login',login)
app.post('/register',register);


app.listen(port, () => {
    console.log("server running on " + port);
});