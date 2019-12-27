const mongoose = require('mongoose')
const DB_CLOUD_URL = 'mongodb+srv://raj_vorugan:Hariom143@orgcluster-0wpoe.gcp.mongodb.net/company?retryWrites=true&w=majority'
const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL || DB_CLOUD_URL
mongoose.connect(DB_CONNECTION_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
})

