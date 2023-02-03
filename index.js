const express = require('express');
const dotenv = require("dotenv");
const path = require('path');
const cookie = require('cookie-parser');
const bodyParser = require('body-parser')
// view engine setup


dotenv.config();

const login = require('./routes/login');

const register = require('./routes/registration');
const { verifyJWT } = require('./helper/jwtHelper');


const app = express();
const port = process.env.app_port;

app.set("view engine", "ejs");


const static_path = path.join(__dirname, "./views");
app.use(express.static(static_path));
app.use(express.json());
app.use(cookie())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login',login)
app.use('/register',register);


app.get("/",(req,res)=>{
    res.render("index.ejs",{msg:""});
})

app.get("/Dashboard",verifyJWT,(req,res)=>{
    res.render("Dashboard.ejs");
})

app.listen(port, () => {
    console.log("server running on " + port);
});