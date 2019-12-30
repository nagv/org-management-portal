const express = require('express')
const Employee = require('./../models/employee')
const mongoose = require('mongoose')
const HttpStatus = require('http-status-codes')
const logger = require('../util/logger')
const processError = require('../util/commonutil')
require('./../db/mongoose')
var constants = require('./../util/employeeconstants')
empConstants = constants.constants

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
        const errorResponse = processError(error,'GET_EMPLOYEES')
        res.statusMessage = errorResponse.statusMessage
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(errorResponse.errorMessage)
        
    }
})


// API to get employee by Id
router.get('/employees/:id', async (req, res) => {

    try {
    
    const _id = mongoose.Types.ObjectId(req.params.id)

    const employee = await Employee.findById(_id)
    
        if (!employee) {
            logger.info('No Employee record found for input id:',_id)
            res.statusMessage = empConstants.GET_EMP_NO_ENTRY
            return res.status(HttpStatus.NOT_FOUND).send(empConstants.GET_EMP_NO_ENTRY)
        }
        res.status(HttpStatus.OK).send(employee)
    } catch (e) {
        const errorResponse = processError(e,'GET_EMPLOYEE')
        res.statusMessage = errorResponse.statusMessage
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(errorResponse.errorMessage)
    }
})

// API to create new Employee Record
router.post('/employees', async (req, res) => {

    const employee = new Employee(req.body)

    try {
        await employee.save()
        res.status(HttpStatus.OK).send(employee)

    } catch (error) {
        const errorResponse = processError(error,'ADD_EMPLOYEE')
        res.statusMessage = errorResponse.statusMessage
        res.status(HttpStatus.BAD_REQUEST).send(errorResponse.errorMessage)
    }

})
// API to update the employee by ID
router.patch('/employees/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdateFields = ['firstName', 'lastName', 'phoneNumber', 'city', 'state', 'country','hireDate', 'employmentEndDate']

    const isUpdateAllowed = updates.every((update) => {
        return allowedUpdateFields.includes(update)
    })

    if (!isUpdateAllowed) {
        res.statusMessage = empConstants.UPDATE_EMP_WRONG_FIELD
        return res.status(HttpStatus.BAD_REQUEST).send(empConstants.UPDATE_EMP_WRONG_FIELD)
    }

    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!employee) {
            res.statusMessage = empConstants.GET_EMP_NO_ENTRY
            return res.status(HttpStatus.NOT_FOUND).send(empConstants.GET_EMP_NO_ENTRY)
        }

        res.status(HttpStatus.OK).send(employee)

    } catch (error) {

        const errorResponse = processError(error,'UPDATE_EMPLOYEE')
        res.statusMessage = errorResponse.statusMessage
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(errorResponse.errorMessage)
        
    }


})

// API to delete the employee by ID
router.delete('/employees/:id', async (req, res) => {

    try {
        const employee = await Employee.findByIdAndDelete(req.params.id)
        if (!employee) {
            res.statusMessage = empConstants.GET_EMP_NO_ENTRY
            return res.status(HttpStatus.NOT_FOUND).send( empConstants.GET_EMP_NO_ENTRY)
        }

        res.status(HttpStatus.OK).send(employee)

    } catch (error) {
        const errorResponse = processError(error,'DELETE_EMPLOYEE')
        res.statusMessage = errorResponse.statusMessage
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(errorResponse.errorMessage)
    }
})



module.exports = router