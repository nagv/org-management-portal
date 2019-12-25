const express = require('express')
const mongoose = require('mongoose')
require('./db/mongoose')
const employeeRouter = require('./routers/employee_router')

const app = express()
app.use(express.json())
// Load employee resource router
app.use(employeeRouter)

module.exports = app
