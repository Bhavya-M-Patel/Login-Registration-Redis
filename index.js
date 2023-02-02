const express = require('express');
const cors = require('cors')
const app = express();
const dotennv = require('dotenv')
dotennv.config();
app.use(express.json());
app.use(cors());
const register = require('./routes/registration')
const bodyParser = require('body-parser');

 

app.post('/register',register);

app.listen(8000,()=>{
    console.log("Hey server is runnning");
})


