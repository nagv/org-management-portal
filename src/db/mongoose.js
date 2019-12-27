const mongoose = require('mongoose')
const {DB_CONNECTION_URL} = require('../../config');
mongoose.connect(DB_CONNECTION_URL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
})

