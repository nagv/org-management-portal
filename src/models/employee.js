const mongoose = require('mongoose')
const validator = require('validator')
const { check, validationResult } = require('express-validator');


const Employee = mongoose.model('employee',{
    firstName: {
        type:String,
        require:true,
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
        trim:true,
        validate(value){
            /**if(!validator.isMobilePhone(value)){
                throw new Error('Please provide valid US Phone number')
            }*/

            if(!check(value).isMobilePhone()){
                throw new Error('Please provide valid US Phone number..')
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
    hireDate:{
        type:Date,
        default:Date.now
    },
    employmentEndDate:{
        type:Date
    }
})

module.exports = Employee