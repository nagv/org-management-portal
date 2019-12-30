const logger = require('./util/logger')
const app = require('./app.js')
const {PORT} = require('../config');

app.listen(PORT,()=>{
    logger.info('Server is up and running on port ',PORT)
})
