const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;

if(!envs.NODE_ENV) {
    envs.NODE_ENV = 'development'
}

if(!process.env.PORT) {
    PORT = 3000
}

if(!envs.DB_CONNECTION_URL){
    envs.DB_CONNECTION_URL = 'mongodb+srv://raj_vorugan:Hariom143@orgcluster-0wpoe.gcp.mongodb.net/company?retryWrites=true&w=majority'
}
module.exports = envs;