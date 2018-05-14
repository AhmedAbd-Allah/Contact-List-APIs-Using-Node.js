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




// function addNewContact (request,response)
// {
//     // req.file.filename
//     console.log(request.body);
//     var contact = new contacts({

//         _id: new mongoose.Types.ObjectId,
//         firstName:request.body.firstName,
//         lastName:request.body.lastName,
//         mobileNumber:request.body.mobile,
//         user:{
//                 ref:"user",
//                 Type: String
//              }

//      });
//     contact.save(function(err,doc){
//         if(!err)
//         {
//             console.log("entry success");
//             response.json("added");
//         }
//         else
//             response.json(err);
//         });
// }
    
// module.exports={
//     addNewContact: addNewContact,
//     contacts:contacts
// }
  

// function findUserContacts (request,response)
// {
//     console.log(request.body);
//     var page = request.body.pageNum ? request.params.pageNum:1;
//     contacts.find({},function(error,data){
//         response.send(data)
//     });

// };


// router.post("/getRecentList",urlEncodedMid,function(request,response){
//     console.log(request.body);
//     var filter = {};
//     var fields = {};
//     var options = {limit:5};
//     ProductsModel.find(filter, fields, options,function(error,data){
//         if(error)
//             {
//                 console.log(error)
//                 response.json(error);
//             }
//         else
//             {
//                 console.log(data[0])
//                 response.json(data);
//             }
//     })
// })