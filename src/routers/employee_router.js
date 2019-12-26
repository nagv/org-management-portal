const express = require('express')
const Employee = require('./../models/employee')
const mongoose = require('mongoose')
const logger = require('../util/logger')
const HttpStatus = require('http-status-codes')
require('./../db/mongoose')

const router = new express.Router()

// API to get all the employees
router.get('/employees', async (req, res) => {
    // Prepare the filter criteria based on query param
    const filter = {}
    if(req.query.country)
    filter.country = req.query.country
    if(req.query.city)
    filter.city = req.query.city
    if(req.query.state)
    filter.state = req.query.state
    if(req.query.firstName)
    filter.firstName = req.query.firstName
    if(req.query.lastName)
    filter.lastName= req.query.lastName
    if(req.query.phoneNumber)
    filter.phoneNumber= req.query.phoneNumber
    
    logger.info('Filter criteria passed for employee query:',filter)
    try {
        const employees = await Employee.find(filter).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip))
        res.status(HttpStatus.OK).send(employees)
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
})


// API to get employee by Id
router.get('/employees/:id', async (req, res) => {

    const _id = mongoose.Types.ObjectId(req.params.id)

    const employee = await Employee.findById(_id)
    try {
        if (!employee) {
            logger.info('No Employee record found for input id:',_id)
            return res.status(HttpStatus.NOT_FOUND).send('No Employee record found')
        }
        res.status(HttpStatus.OK).send(employee)
    } catch (e) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
})

// API to create new Employee Record
router.post('/employees', async (req, res) => {

    const employee = new Employee(req.body)

    try {
        await employee.save()
        res.status(HttpStatus.OK).send(employee)

    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).send(error)
    }

})
// API to update the employee by ID
router.patch('/employees/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdateFields = ['firstName', 'lastName', 'phoneNumber', 'city', 'state', 'country','hireDate', 'employmentEndDate']

    const isAllowedUpdate = updates.every((update) => {
        return allowedUpdateFields.includes(update)
    })

    if (!isAllowedUpdate) {
        return res.status(HttpStatus.BAD_REQUEST).send('Invalid field provided for update')
    }

    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!employee) {
            return res.status(HttpStatus.NOT_FOUND).send('No Employee found for update')
        }

        res.status(HttpStatus.OK).send(employee)

    } catch (error) {

        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
    }


})

// API to delete the employee by ID
router.delete('/employees/:id', async (req, res) => {

    try {
        const employee = await Employee.findByIdAndDelete(req.params.id)
        if (!employee) {
            return res.status(HttpStatus.NOT_FOUND).send('No Employee found')
        }

        res.status(HttpStatus.OK).send(employee)

    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
})



module.exports = router