var mongoose = require("mongoose");
var mongoose_paginate = require("mongoose-paginate");
var Schema = mongoose.Schema;
var newID = Schema.Types.ObjectId;
var express = require("express");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});
var router = express.Router();


var contacts = new Schema({
    firstName:String,
    lastName:String,
    mobileNumber:String,
    email:String,
    created_ts: {
        type : Date,
        default: Date.now
      },
     userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
      }     
  });


contacts.plugin(mongoose_paginate);

mongoose.model("contacts",contacts);

