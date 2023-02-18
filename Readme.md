install npm 
install express bcryptjs dotenv express jsonwebtoken mongoose nodemon
create mongodb connection
create model for users & activity.
create controller function for signup and signin .Created Token using jsonwebtoken.Incrypt the password for safety purposes using bcryptjs.
To protect Routes to be access only by login user ,created protect middleware function
To get the output for each input activity function is created ,Using activity function we try to store each output in database.
Activitylog function is created to get access for all the activity we have created .Access to check  all the activity is only provided to student As per Q/A using restrict function .