var constants = require('./employeeconstants')
empConstants = constants.constants

const processErrors= (error,operation)=>{

    var result = {}
    switch(operation){
        case 'GET_EMPLOYEES': {

            if (error.name == empConstants.VALIDATON_ERROR) {
                result.errorMessage = error.message;
                result.statusText = errorMessage
            } else {
                result.errorMessage = empConstants.FEATH_ALL_EMP_ERROR
                result.statusText = result.errorMessage
            }
        }
        break;
        case 'GET_EMPLOYEE': {

            result.errorMessage = empConstants.GET_EMP_ERR_MSG
            result.statusText = empConstants.GET_EMP_ERR_MSG
        }
        break;
        case 'ADD_EMPLOYEE':
        case 'UPDATE_EMPLOYEE':{
            console.log('Emp edit validation ',error.name)

            if (error.name == empConstants.VALIDATON_ERROR) {
                result.errorMessage = error.message;
                result.statusMessage = error.message;
            } else if (error.name==empConstants.MONGO_VALIDATION_PREFIX){
                if(error.message.indexOf(empConstants.MONGO_VALIDATION_DUP_ERR_CODE) !=-1) {
                    result.errorMessage = empConstants.EMP_VALIDATION_UNIQUE_PHONE
                    result.statusMessage = empConstants.EMP_VALIDATION_UNIQUE_PHONE
                }
            }else {
                result.errorMessage = empConstants.EMP_SAVE_UPDATE_ERROR
                result.statusMessage = result.errorMessage
            }
        }
        break;
        case 'DELETE_EMPLOYEE':{
            result.statusMessage=empConstants.EMP_DELETE_ERROR
            result.errorMessage = result.statusMessage
        }
        break;
        default:{
            result.statusMessage=empConstants.EMP_VALIDATION_GENERIC_ERROR
            result.errorMessage = result.statusMessage
        }
    }

    return result;
}

const processQueryParams = (req)=>{

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

    return filter
}

module.exports = {
    processErrors:processErrors,
    processQueryParams: processQueryParams
}