
if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
}

const express=require('express');
const app = express();

// import express layout
const expressLauouts=require('express-ejs-layouts');
// import route
const indexRouter=require('./routes/index')

// it is use for view and render js code in html
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');

// it is used for layout dynamically like header footer or comman
app.set('layout','layouts/layout'); 
app.use(expressLauouts);

// for access public folder like css js and public liabrary
app.use(express.static('public'));


// db connection with mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASEURL,{useNewURLParser:true,useUnifiedTopology:true});
const db=mongoose.connection;
db.on('error',error=> console.log(error));
db.once('open',()=> console.log("connected to mongoose"));



// it is used for route or controller
app.use('/', indexRouter);

// it is used for port
app.listen(process.env.PORT || 5000);