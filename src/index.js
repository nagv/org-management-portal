const app = require('./app.js')
const {PORT} = require('../config');

app.listen(PORT,()=>{
    console.log('Server is up and running on port ',PORT)
})
