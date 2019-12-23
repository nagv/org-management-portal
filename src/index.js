const express = require('express')
const mongoose = require('mongoose')
require('./db/mongoose')
const employeeRouter = require('./routers/employee_router')

const app = express()
const port = process.env.PORT

app.use(express.json())
// Load employee resource router
app.use(employeeRouter)


app.listen(port,()=>{
    console.log('Server is up and running on port ',port)
})
