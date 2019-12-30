const mongoose = require('mongoose')
const validator = require('validator')
const dateFormat = require('dateformat')
//const { check, validationResult } = require('express-validator');

const employeeSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(validator.isEmpty(value,{ignore_whitespace:true})){
                throw new Error('Please provide valid value for First Name')
            }
        }
    },
    lastName:{
        type:String,
        trim:true,
        required:true,
        validate(value){
            if(validator.isEmpty(value,{ignore_whitespace:true})){
                throw new Error('Please provide valid value for Last Name')
            }
        }
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw new Error('Please provide valid US Phone number')
            }
        }
    },
    city:{
        type:String,
        required:true,
        trim:true
    },
    state:{
        type:String,
        required:true,
        trim:true
    },
    country:{
        type:String,
        required:true,
        trim:true
    },
    hireDate:{
        type:Date,
        default:dateFormat(new Date(), "isoDate")
    },
    employmentEndDate:{
        type:Date
    }
},{
    timestamps:true
})

// Exclude fields not required part of service response
employeeSchema.methods.toJSON = function(){
    const employee = this
    const employeeObj = employee.toObject()
    delete employeeObj.__v
    delete employeeObj.createdAt
    delete employeeObj.updatedAt
    return employeeObj
}
const Employee = mongoose.model('employee',employeeSchema)

module.exports = Employee