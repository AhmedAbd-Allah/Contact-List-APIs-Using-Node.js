# Contact-List-APIs-Using-Node.js

Prerequisites:
- node.js
- npm
- MongoDb


How to consume APIs:

1- Run command npm install

2- Run node server using this command: npm start

3- Run MongoDB server using these commands: 1-mongod
                                            2-mongo
                                            
4- create new user using the create user route 
    /users/adduser
  and set the user's credentials (authorization, deviceToken, fingerPrint) in the request
  
  kindly note that the data should be sent in "form-urlencoded" otherwise the data canot be parsed 
    
5- you can show all users using this route
   /users/allusers
   
6- Once you created the user, You can create and retrieve his contacts as the required task with the required specifications
   kindly note that the data should be sent in "form-urlencoded"
   
   
** in case you consume the APIs on local server, kindly notice that the node server runs on port 9000   


