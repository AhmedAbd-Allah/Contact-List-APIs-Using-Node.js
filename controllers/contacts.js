var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var contactModel = mongoose.model("contacts");
var bodyParser = require("body-parser");
var urlEncodedMid = bodyParser.urlencoded({extended:true});
var express = require("express");
var router = express.Router();
var userModel = mongoose.model("users");
var validator = require('validator');


router.post("/addContact",urlEncodedMid,Authenticate,addMiddleWare,addNewContact)
router.post("/getList",urlEncodedMid,Authenticate,findUserContacts)
router.post("/getRecentList",urlEncodedMid,Authenticate,recentContacts)



function Authenticate (request, response, next)
{
    authorization = request.body.authorization;
    deviceToken = request.body.deviceToken;
    fingerPrint = request.body.fingerPrint;
        
    var filter = {authorization:authorization, deviceToken:deviceToken, fingerPrint:fingerPrint};
    userModel.findOne(filter, function(error,data){
        if (data)
        {
            request.body.userId = data._id
            next()
        }
        else
        {
            response.send("Access Denied, Authentication Failed")
        }
    })
}

function addMiddleWare (request,response,next)
{

    email = validator.trim(request.body.email);
    firstName = validator.trim(request.body.firstName);
    lastName = validator.trim(request.body.lastName);
    mobile = validator.trim(request.body.mobile);
    fingerPrint = validator.trim(request.body.fingerPrint);
    
    validateEmail = validator.isEmail(email);
    validateFirstName = validator.isAlpha(firstName);
    validateLastName = validator.isAlpha(lastName);
    validateMobile = validator.isMobilePhone(request.body.mobile,"ar-EG")    
    errors = {};

    var validationResult =  validateEmail &&  validateFirstName && validateLastName && validateMobile
    if (validationResult)
    {
        next()
    }
    else
    {
        if (!validateEmail)
        {
            errors.email = ("Email is not valid")
        }
        if(!validateFirstName)
        {
            errors.firstName = ("firstName is not valid")
        }
        if(!validateLastName)
        {
            errors.lastName = ("lastName is not valid")
        }
        if(!validateMobile)
        {
            errors.mobile = ("mobile is not valid")
        }

        response.json(errors)
    }
}

function addNewContact (request,response)
{

        var filter = {email:request.body.email, userId:request.body.userId};
        contactModel.findOne(filter,function(error,data){
            if(error)
                {
                    response.json(error);
                }
            else
                {
                    if(data)
                    {
                        response.send("this user already has this contact in his contact list");
                    }
                    else
                    {
                        var contact = new contactModel({

                            _id: new mongoose.Types.ObjectId,
                            firstName:request.body.firstName,
                            lastName:request.body.lastName,
                            mobileNumber:request.body.mobile,
                            userId:request.body.userId,
                            email:request.body.email

                        });
                        contact.save(function(error,data){
                            if(!err)
                            {
                                response.json(data);
                            }
                            else
                                response.json(error);
                            });
                    }
                                        
                }
        })
    
}

function findUserContacts (request,response)
{
    var requiredPage = request.body.pageNum ? request.body.pageNum:1;
        
        requiredPage = parseInt(request.body.pageNum)
        var filter = {userId:request.body.userId};
        contactModel.paginate(filter, { page: requiredPage, limit: 3 }, function(error, data){
            if(error)
            {
                response.json(error);
            }
            else
            {
                if(data.docs.length != 0)
                {
                    response.json(data);
                }
                else
                {
                    response.json("User does not have so many friends to show, try a lower page Number");
                }
                
            }  
      
    });

};

function recentContacts (request,response)
{
        var filter = {userId:request.body.userId};
        var fields = {};
        var options = {sort:{ created_ts: -1 }, limit:5};
        contactModel.find(filter, fields, options,function(error,data){
            if(error)
                {
                    response.json(error);
                }
            else
                {
                    response.json(data);
                }
        })
    }

module.exports = router;