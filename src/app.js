const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('./db/mongoose')
const employeeRouter = require('./routers/employee_router')

const app = express()

// Enable cors for external application
app.use(cors({
    origin: 'http://localhost:4200'
  }))

app.use(express.json())
// Load employee resource router
app.use(employeeRouter)

module.exports = app
