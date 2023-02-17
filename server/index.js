const express = require("express");
require("dotenv").config();
const app = express();
const path = require('path');
const connectDB = require("./Config/db");

connectDB();

const port = process.env.PORT || 5003;

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next();
})

app.get('/', (req, res) => {
    res.send('v1.4')
})

app.use('/', require(path.join(__dirname, 'Routes/user.route')))

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
