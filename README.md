# org-management
Repository for managing Organization Details

Application Functionaliy and Key Assumptions:
   A. This Node JS application has UI integrated along with services. Though UI and Services are part of same code base, 
   services are completely decoupled from UI logic. UI code will invoke the services internally as such it's external services and process 
   the response and error messages. This design facilitates seperating UI logic to external application 
   (I did spent some time on building Angular Application which was half way through. But considering the timelines, 
   I had stick back to the current version of UI)
  B. As per DB schema shared, I have considered Phone Number as unique field as we dont have any other suitable fields for uniqueness
  C. I assumed "HireDate" and "Employmenet End Date" as optional fileds where as HireDate will get auto populated if nothing provided from user
  D. I haven't implemented security for the APIs or UI for this assigment. Adding this feature is not a complicated activity
  E. I have tried to buitify UI and addtional validations. I belive there is a room of improvement in this version though current verison givem
  basic features(Eg: Fields level validation for create,update,Date mask, alignements etc..)

Node Version:13.1.0 Npm Version: 6.13.4

Steps to start Server in Local:
1. Clone the project
2. rune npm i or npm install ( To load all dependecies)
3. run "npm run dev" to start the server in development environment 
4. run "npm run start" to start the server in production environment
5. run "npm run test" to execute the Junit test cases in development environment
6. Launch the application at "http://localhost:3000/" which will list the employees from connected DB

Note:
Mongo DB cloud configuraiton is read from Environment variable. For Facilitating executing the application in local,
application will load Cloud DB connection if no environment property is configured in .env file (expectes Application root folder).
For testing the application with Local DB below are the steps required

1. Install Mongo DB in Local PC
2. Bring up the Mongo DB server on default port
3. create .env file at the root the project folder
4. Prodivde DB conneciton URL in below format
    DB_CONNECTION_URL=mongodb://localhost:27017/<<DB Name>>?retryWrites=true&w=majority
5. Bring up the dev or test instance as per above instructions 

Packages/Modules Used:

express: |Express is a minimal and flexible Node.js web applicaiton framework the provides
a robust set of features for the web and mobile applications
mongodb: | mongodb provides MongoDB driver and faciliates connectvity from Node application to MongoDB
mongoose:| Mongoose is the mongodb Object modeling tool designed to work in asynchornous environment
cors : | CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
         This has been installed with the intention of developing seperate Web application (Angular/React) and consume the Node services
         As of not, Cors has not been fully utilized for the Demo 
dotenv : | Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
validator : | Validator faciliates the validation of Javascript object properties. Explored other validators. But, phone Number 
              validation doesn't seems working fine in others. So, sticked to this dependecy
winston,winston-daily-rotate-file: | These modules provides convininet logging mechanisum with log level and file management for logs
http-status-codes : | Provides Constants enumerating the HTTP status codes. Based on the Java Apache HttpStatus API
date-format: | This module is been used ot perform data operations (Converting date to ISODate format) part of storing in DB. 
              I am takeing off Time component while storing the dates in DB 

Dev Dependecies:
jest: | Jest provides complete and ready to set-up JavaScript testing solution. This is been used for unit testing
supertest: |  Supertest provides a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent 

