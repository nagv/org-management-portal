// Below is the hard coded mango cloud DB to faciliate the application to be executed without DB installation. 
// Ideal case if have Mongo DB installed in local and have .env file configured with these values 
const DB_CLOUD_URL = 'mongodb+srv://raj_vorugan:Hariom143@orgcluster-0wpoe.gcp.mongodb.net/company?retryWrites=true&w=majority'
module.exports = {
    DB_CONNECTION_URL: process.env.DB_CONNECTION_URL || DB_CLOUD_URL,
    PORT : process.env.PORT || 3000
}