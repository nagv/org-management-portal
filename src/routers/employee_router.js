const express = require('express')
const Employee = require('./../models/employee')
const mongoose = require('mongoose')
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
    
    try {
        const employees = await Employee.find(filter).limit(parseInt(req.query.limit)).skip(parseInt(req.query.skip))
        res.status(201).send(employees)
    } catch (error) {
        res.status(500).send(error)
    }
})


// API to get employee by Id
router.get('/employees/:id', async (req, res) => {

    const _id = mongoose.Types.ObjectId(req.params.id)

    const employee = await Employee.findById(_id)
    try {
        if (!employee) {
            return res.status(404).send('No Employee record found')
        }
        res.status(201).send(employee)
    } catch (e) {
        res.status(500).send(error)
    }
})

// API to create new Employee Record
router.post('/employees', async (req, res) => {

    const employee = new Employee(req.body)

    try {
        await employee.save()
        res.status(201).send(employee)

    } catch (error) {
        res.status(400).send(error)
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
        return res.status(400).send('Invalid field provided for update')
    }

    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!employee) {
            return res.status(404).send('No Employee found for update')
        }

        res.status(201).send(employee)

    } catch (error) {

        res.status(400).send(error)
    }


})

// API to delete the employee by ID
router.delete('/employees/:id', async (req, res) => {

    try {
        const employee = await Employee.findByIdAndDelete(req.params.id)
        if (!employee) {
            return res.status(404).send('No Employee found')
        }

        res.status(201).send(employee)

    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports = router