var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});
var express = require("express");
var router = express.Router();
var userModel = mongoose.model("users");



router.post("/adduser",urlEncodedMid,addNewUser)
router.post("/allusers",urlEncodedMid,findUsers)



function addNewUser (request,response)
{

    var user = new userModel({

        _id: new mongoose.Types.ObjectId,
        name:request.body.name,
        authorization:request.body.authorization,
        deviceToken:request.body.deviceToken,
        fingerPrint:request.body.fingerPrint,

     });

     user.save(function(error,user){
        if(!error)
        {
            console.log("user entry success");
            response.json(user);
        }
        else
            response.json(error);
        });
}



function findUsers (request,response)
{
    console.log(request.body);
    userModel.find({},function(error,users){
    
        if(!error)
        {
            response.json(users);
        }
        else
            response.json(error);
        });

};

module.exports = router;