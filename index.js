const express = require('express');
const app = express();
app.use(express.json());
const register = require('./routes/registration')

app.post('/register',register);

app.listen(8000,()=>{
    console.log("Hey server is runnning");
})


