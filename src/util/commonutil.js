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

            if (error.name == empConstants.VALIDATON_ERROR) {
                result.errorMessage = error.message;
                var index = error.message.indexOf(empConstants.EMP_VALIDATION_PREFIX)
                if(index != -1){
                    result.statusMessage = error.message;
                } else {
                    result.statusMessage = empConstants.ADD_UPDATE_VALIDATION_ERR
                }
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
};

module.exports = processErrors;