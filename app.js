var mongoose = require("mongoose");
var express = require("express");
var http = require("http");
var fs = require("fs");
var server = express();
var bodyParser = require("body-parser");
var path = require('path');
mongoose.connect("mongodb://localhost:27017/contacts");


fs.readdirSync(path.join(__dirname,"models")).forEach(function(filename){
  require('./models/'+filename);
});

var contactRouter = require("./controllers/contacts");
server.use("/contacts",contactRouter);


var userRouter = require("./controllers/users");
server.use("/users",userRouter);


server.listen(9000,function(){
    console.log("Server On");
  });


