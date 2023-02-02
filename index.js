const express = require('express');
const dotenv = require("dotenv");
const path = require('path');
dotenv.config();
const port = process.env.app_port;
const app = express();
const bodyParser = require("body-parser");
const login = require('./Routes/login');

const static_path = path.join(__dirname, "./public");
app.use(express.static(static_path));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login',login)

app.listen(port, () => {
    console.log("server running on " + port);
});