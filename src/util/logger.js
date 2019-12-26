const winston = require('winston')
const path = require('path') 
require('winston-daily-rotate-file')

const transport = new (winston.transports.DailyRotateFile)({
    filename: 'org-services-%DATE%.log',
    dirname:path.join(__dirname,'../../logs/'),
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  });
 
  
  const logger = winston.createLogger({
    transports: [
      transport
    ]
  });
 
  module.exports = logger