var mongoose = require("mongoose");
// var mongoose_paginate = require("mongoose-paginate");
var Schema = mongoose.Schema;
var newID = Schema.Types.ObjectId;

var users = new Schema({
    name:String,
    authorization:String,
    deviceToken:String,
    fingerPrint:String,
  });

  mongoose.model("users",users);



