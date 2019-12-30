
var  constants= {
    VALIDATON_ERROR:"ValidationError",
    FEATH_ALL_EMP_ERROR:"Error in fetching employee information",
    GET_EMP_ERR_MSG:"Error in fetching employee information with given input",
    GET_EMP_NO_ENTRY:"No Employee record found for given input",
    UPDATE_EMP_WRONG_FIELD : "Invalid field provided for update. Valid fields are firstName,lastName,city,phoneNumber,state,country,hireDate and employmentEndDate",
    ADD_UPDATE_VALIDATION_ERR:"firstName,lastName,phoneNumber,city,state and country are mandatory for Employee creation",
    EMP_VALIDATION_PREFIX:"employee validation failed:",
    MONGO_VALIDATION_PREFIX :"MongoError",
    MONGO_VALIDATION_DUP_ERR_CODE:"E11000",
    EMP_VALIDATION_UNIQUE_PHONE:"There is an employee record with given Phone number.Please provide alternate phone number",
    EMP_SAVE_UPDATE_ERROR:"Error in storing employee record",
    EMP_DELETE_ERROR:"Error in deleting employee record.",
    EMP_VALIDATION_GENERIC_ERROR:"Error in invoking the backend services"
}

exports.constants = Object.freeze(constants);
