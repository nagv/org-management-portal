const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('./db/mongoose')
const employeeRouter = require('./routers/employee_router')
const path = require('path');

const app = express()
//Cors can be customized with whitelisting ports part of integration of external clients
app.use(cors())

app.use(express.json())
// Load employee resource router
app.use(employeeRouter)

const publicdir = path.join(__dirname,'../src/public')
app.use(express.static(publicdir))

// Route to display all employee data
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// Route for edit functionality
app.get('/edit', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/edit.html'));
});

// Route for adding new employee record
app.get('/add', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/add.html'));
});

module.exports = app