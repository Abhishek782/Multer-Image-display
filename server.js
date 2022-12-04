const express = require('express');
const app = express();

const hbs = require('express-handlebars')
const path = require('path');
const mongoose = require('mongoose');
app.use(express.json());

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','hbs');

app.engine('hbs',hbs.engine({
    extname : 'hbs',
    defaultView : 'default',
    layoutsDir: path.join(__dirname,'views'),
    partialsDir: path.join(__dirname,'views/partials')
}))


const connect=mongoose.connect('mongodb://0.0.0.0:27017/ImageUploader')
.then((db)=>{
    console.log("Connected correctly to the Database");  
},(err)=>{
    console.log("Error occured while connecting...",err);
})

app.use('/',require('./server/router/router'));

app.listen(3500,()=>{
    console.log("Server started at http://localhost:3500");
})