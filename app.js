const express = require('express');
const app = express();
const fs = require("fs");
const path = require('path');
app.use(express.static(__dirname))
app.use(express.static("public"));

//database
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactaskgroup', {useNewUrlParser: true});

// define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    subject: String,
    discription: String
  });
var contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/public', express.static('public')) // For serving static files
app.use(express.urlencoded())

//Endpoints
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/" + "public/index.html");
  });

  //contact form
app.post('/submit', (req, res)=>{
    var myGroupData = new contact(req.body);
    myGroupData.save().then(()=>{
        res.sendFile(__dirname + "/" + "public/index.html");
        // res.send("This item has been saved to database")
  // }).catch(()=>{
    //    res.status(400).send("item was not saved to the database")
    })
})

app.listen(1220);
console.log("The application started sucessfully on port 1220")