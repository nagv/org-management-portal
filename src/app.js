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
console.log('public dir ',publicdir)
app.use(express.static(publicdir))

// viewed at http://localhost:3000
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/edit', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/edit.html'));
});

app.get('/add', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/add.html'));
});

module.exports = app