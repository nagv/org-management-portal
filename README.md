# org-management
Repository for managing Organization Details

      Application Functionality and Key Assumptions:
      
1.	As per DB schema shared, I have considered "Phone Number" as unique field as we dont have any other suitable fields for uniqueness
2.	I have considered "HireDate" and "Employment End Date" as optional fields where as HireDate gets auto populated if no user input provided
3.	I have kept the application simple without any security/other token. Adding these features is not complicated activity 
4.	I tired to come up with basic UI per the assignment. There is a room for adding some extra validations and alignments 
5.	Though UI and Services are part of same code base, Node services are completely decoupled from UI logic to facilitate consumption of these services from external applications (I started Angular version of UI which I can finish and share if you would like see that sort of integration)
  

Node Version:13.1.0 Npm Version: 6.13.4

Steps to start Server in Local(Assemption is Node is installed in local)
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
1. express: |Express is a minimal and flexible Node.js web application framework the provides
a robust set of features for the web and mobile applications
2. mongodb: | mongodb provides MongoDB driver and facilitates connectivity from Node application to MongoDB
3. mongoose:| Mongoose is the mongodb Object modeling tool designed to work in asynchornous environment
4. cors : | CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. This has been installed with the intention of developing separate Web application (Angular/React) and consume the Node services
5. dotenv : | Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
6. validator : | Validator faciliates the validation of Javascript object properties. Explored other validators. But, phone Number validation doesn't seems working fine in others. So, sticked to this dependecy
winston,winston-daily-rotate-file: | These modules provides convininet logging mechanisum with log level and file management for logs
7. http-status-codes : | Provides Constants enumerating the HTTP status codes. Based on the Java Apache HttpStatus API
8.date-format: | This module is been used to perform data operations (Converting date to ISODate format) part of storing in DB. I am taking off Time component while storing the dates in DB 
Dev Dependencies:
9.jest: | Jest provides complete and ready to set-up JavaScript testing solution. This is been used for unit testing
supertest: |  Supertest provides a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent 




