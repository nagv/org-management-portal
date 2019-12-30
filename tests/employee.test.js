const request = require('supertest')
const app = require('../src/app')
const Employee = require('../src/models/employee')
const HttpStatus = require('http-status-codes')
require('../src/util/commonutil')

beforeEach(async () => {
    await Employee.deleteMany()
})


test('Validate Mandatory field first name for Employee creation', async () => {
    const response = await request(app).post('/employees').send({
        "lastName": "V",
        "phoneNumber": "1123-123-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.BAD_REQUEST)

})

test('Validate Mandatory field last name for Employee creation', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "V",
        "phoneNumber": "1123-123-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.BAD_REQUEST)

})

test('Validate Mandatory field phone number for Employee creation', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "LN",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.BAD_REQUEST)

})


test('Validate Mandatory field state for Employee creation', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "LN",
        "city": "Wauksi",
        "phoneNumber": '123-123-1234',
        "country": "USA"

    }).expect(HttpStatus.BAD_REQUEST)

})

test('Validate Mandatory field country for Employee creation', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "LN",
        "city": "Wauksi",
        "phoneNumber": '123-123-1234',
        "state": 'CA'

    }).expect(HttpStatus.BAD_REQUEST)

})

test('Validate field Names for employee creation', async () => {
    const response = await request(app).post('/employees').send({
        "firstname": "Nagaraju",
        "lastName": "V",
        "phoneNumber": "123-123-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.BAD_REQUEST)


})


test('Validate data type(lastname) validation for employee creation', async () => {
    const response = await request(app).post('/employees').send({
        "firstname": "Nagaraju",
        "lastName": 1,
        "phoneNumber": "123-123-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.BAD_REQUEST)


})


test('Validate data type(firstName) validation for employee creation', async () => {
    const response = await request(app).post('/employees').send({
        "firstname": 234,
        "lastName": "LN",
        "phoneNumber": "123-123-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.BAD_REQUEST)


})

test('Validate data type(phone number) validation for employee creation', async () => {
    const response = await request(app).post('/employees').send({
        "firstname": "FN",
        "lastName": "LN",
        "phoneNumber": 1234,
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.BAD_REQUEST)


})

test('Validate data type(city) validation for employee creation', async () => {
    const response = await request(app).post('/employees').send({
        "firstname": "FN",
        "lastName": "LN",
        "phoneNumber": "123-123-1234",
        "city": 1234,
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.BAD_REQUEST)

})

test('Validate data type(state) validation for employee creation', async () => {
    const response = await request(app).post('/employees').send({
        "firstname": "FN",
        "lastName": "LN",
        "phoneNumber": "123-123-1234",
        "city": "Wauksi",
        "state": 1,
        "country": "USA"

    }).expect(HttpStatus.BAD_REQUEST)


})

test('Validate data type(country) validation for employee creation', async () => {
    const response = await request(app).post('/employees').send({
        "firstname": "FN",
        "lastName": "LN",
        "phoneNumber": "123-123-1234",
        "city": "Wauksi",
        "state": "CA",
        "country": 1

    }).expect(HttpStatus.BAD_REQUEST)


})


test('Validate empty last name for employee creation', async () => {
    const response = await request(app).post('/employees').send({
        "firstname": "FN",
        "lastName": "",
        "phoneNumber": "123-123-1234",
        "city": "Wauksi",
        "state": "CA",
        "country": "USA"

    }).expect(HttpStatus.BAD_REQUEST)


})

test('Validate empty first name for employee creation', async () => {
    const response = await request(app).post('/employees').send({
        "firstname": " ",
        "lastName": "LN",
        "phoneNumber": "1234-123-1234",
        "city": "Wauksi",
        "state": "CA",
        "country": "USA"

    }).expect(HttpStatus.BAD_REQUEST)


})


test('Validate valid phone number for employee creation', async () => {
    const response = await request(app).post('/employees').send({
        "firstname": "FN",
        "lastName": "LN",
        "phoneNumber": "1234-1236-1234",
        "city": "Wauksi",
        "state": "CA",
        "country": "USA"

    }).expect(HttpStatus.BAD_REQUEST)

})


test('Validate Uniqueness of phone number part of creation', async () => {
    const emp1 = await request(app).post('/employees').send({
        "firstName": "Nagaraju",
        "lastName": "V",
        "phoneNumber": "732-456-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const emp2 = await request(app).post('/employees').send({
        "firstName": "Nagaraju",
        "lastName": "V",
        "phoneNumber": "732-456-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.BAD_REQUEST)

})

test('Validate fields in Employee after creation', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "Nagaraju",
        "lastName": "V",
        "phoneNumber": "732-456-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    // Make sure all the fields populated
    expect(response.body).toMatchObject({
        firstName: 'Nagaraju',
        lastName: 'V',
        phoneNumber: '732-456-1234',
        city: 'Wauksi',
        state: 'WC',
        country: 'USA'
    })
    // Make sure hireDate is populated
    expect(response.body.hireDate).not.toBeNull()
})


test('Validate trim feature after Employee creation', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": " Jostna ",
        "lastName": " B ",
        "phoneNumber": "786-423-1234",
        "city": "Ballwin ",
        "state": " MO",
        "country": "USA "

    }).expect(HttpStatus.OK)

    // Make sure all the fields populated
    expect(response.body).toMatchObject({
        firstName: 'Jostna',
        lastName: 'B',
        phoneNumber: '786-423-1234',
        city: 'Ballwin',
        state: 'MO',
        country: 'USA'
    })
    // Make sure hireDate is populated
    expect(response.body.hireDate).not.toBeNull()
})


test('Validate fields in Employee after creation', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "Krishna",
        "lastName": "Murthy",
        "phoneNumber": "786-423-1234",
        "city": "Wausuke",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    // Make sure all the fields populated
    expect(response.body).toMatchObject({
        firstName: 'Krishna',
        lastName: 'Murthy',
        phoneNumber: '786-423-1234',
        city: 'Wausuke',
        state: 'WC',
        country: 'USA'
    })
    // Make sure hireDate is populated
    expect(response.body.hireDate).not.toBeNull()
})


test('Validate Get all employess', async () => {
    const emp1 = await request(app).post('/employees').send({
        "firstName": "Nagaraju",
        "lastName": "V",
        "phoneNumber": "732-456-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const emp2 = await request(app).post('/employees').send({
        "firstName": "Jostna",
        "lastName": "V",
        "phoneNumber": "732-456-5273",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const employees = await request(app).get('/employees').send().expect(HttpStatus.OK)

    expect(employees).not.toBeNull()

    expect(employees.body.length).toEqual(2)

})


test('Validate Get all employess with firstName filter', async () => {
    const emp1 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "V",
        "phoneNumber": "732-456-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const emp2 = await request(app).post('/employees').send({
        "firstName": "FirstN",
        "lastName": "V",
        "phoneNumber": "732-456-5276",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const employees = await request(app).get('/employees?firstName=FN').send().expect(HttpStatus.OK)

    expect(employees).not.toBeNull()

    expect(employees.body.length).toEqual(1)

})


test('Validate Get all employess with lastName filter', async () => {
    const emp1 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "V",
        "phoneNumber": "732-456-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const emp2 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "VO",
        "phoneNumber": "732-456-5273",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const employees = await request(app).get('/employees?lastName=V').send().expect(HttpStatus.OK)

    expect(employees).not.toBeNull()

    expect(employees.body.length).toEqual(1)

})


test('Validate Get all employess with phoneNumber filter', async () => {
    const emp1 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "V",
        "phoneNumber": "732-456-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const emp2 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "VO",
        "phoneNumber": "732-456-5273",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const employees = await request(app).get('/employees?phoneNumber=732-456-5273').send().expect(HttpStatus.OK)

    expect(employees).not.toBeNull()

    expect(employees.body.length).toEqual(1)

})


test('Validate Get all employess with city filter', async () => {
    const emp1 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "V",
        "phoneNumber": "732-456-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const emp2 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "VO",
        "phoneNumber": "732-456-5273",
        "city": "Morganville",
        "state": "NJ",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const employees = await request(app).get('/employees?city=Morganville').send().expect(HttpStatus.OK)

    expect(employees).not.toBeNull()

    expect(employees.body.length).toEqual(1)

})


test('Validate Get all employess with state filter', async () => {
    const emp1 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "V",
        "phoneNumber": "732-456-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const emp2 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "VO",
        "phoneNumber": "732-456-5273",
        "city": "Morganville",
        "state": "NJ",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const employees = await request(app).get('/employees?state=NJ').send().expect(HttpStatus.OK)

    expect(employees).not.toBeNull()

    expect(employees.body.length).toEqual(1)

})


test('Validate Get all employess with country filter', async () => {
    const emp1 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "V",
        "phoneNumber": "732-456-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const emp2 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "VO",
        "phoneNumber": "732-456-5273",
        "city": "Morganville",
        "state": "NJ",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const employees = await request(app).get('/employees?country=IN').send().expect(HttpStatus.OK)

    expect(employees).not.toBeNull()

    expect(employees.body.length).toEqual(0)

})

test('Validate Get all employess with limit filter', async () => {
    const emp1 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "V",
        "phoneNumber": "732-456-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const emp2 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "VO",
        "phoneNumber": "732-456-5273",
        "city": "Morganville",
        "state": "NJ",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const employees = await request(app).get('/employees?limit=1').send().expect(HttpStatus.OK)

    expect(employees).not.toBeNull()

    expect(employees.body.length).toEqual(1)

})


test('Validate Get all employess with skip filter', async () => {
    const emp1 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "V",
        "phoneNumber": "732-456-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const emp2 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "VO",
        "phoneNumber": "732-456-5273",
        "city": "Morganville",
        "state": "NJ",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const emp3 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "VO",
        "phoneNumber": "732-456-2273",
        "city": "Morganville",
        "state": "NJ",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const employees = await request(app).get('/employees?skip=1').send().expect(HttpStatus.OK)

    expect(employees).not.toBeNull()

    expect(employees.body.length).toEqual(2)

})


test('Validate Get all employess with skip and limit filter', async () => {
    const emp1 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "V",
        "phoneNumber": "732-456-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const emp2 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "VO",
        "phoneNumber": "732-456-5273",
        "city": "Morganville",
        "state": "NJ",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const emp3 = await request(app).post('/employees').send({
        "firstName": "FN",
        "lastName": "VO",
        "phoneNumber": "732-456-2273",
        "city": "Morganville",
        "state": "NJ",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const employees = await request(app).get('/employees?limit=1&skip=1').send().expect(HttpStatus.OK)

    expect(employees).not.toBeNull()

    expect(employees.body.length).toEqual(1)

})

test('Validate Get all employess', async () => {
    const emp1 = await request(app).post('/employees').send({
        "firstName": "Nagaraju",
        "lastName": "V",
        "phoneNumber": "732-456-1234",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const emp2 = await request(app).post('/employees').send({
        "firstName": "Jostna",
        "lastName": "V",
        "phoneNumber": "732-456-5273",
        "city": "Wauksi",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const employees = await request(app).get('/employees').send().expect(HttpStatus.OK)

    expect(employees).not.toBeNull()

    expect(employees.body.length).toEqual(2)

})


test('Validate Get Employee by Id', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "Krishna",
        "lastName": "Murthy",
        "phoneNumber": "786-423-1234",
        "city": "Wausuke",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const employee = await Employee.findById(response.body._id)
    expect(employee).not.toBeNull()
})



test('Validate Update Employee wrong field name', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "Krishna",
        "lastName": "Murthy",
        "phoneNumber": "786-423-1234",
        "city": "Wausuke",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const empId = response._id
    await request(app).patch('/employees/'.concat(empId)).send({
        "fName": "Krishna",
        "lastName": "Murthy",
        "phoneNumber": "786-423-1234",
        "city": "Wausuke",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.BAD_REQUEST)

})

test('Validate Update Employee extra field', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "Krishna",
        "lastName": "Murthy",
        "phoneNumber": "786-423-1234",
        "city": "Wausuke",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const empId = response._id
    await request(app).patch('/employees/'.concat(empId)).send({
        "firstName": "Krishna",
        "wrongField":"Test",
        "lastName": "Murthy",
        "phoneNumber": "786-423-1234",
        "city": "Wausuke",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.BAD_REQUEST)

})


test('Validate Update Employee first name', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "Krishna",
        "lastName": "Murthy",
        "phoneNumber": "732-423-1234",
        "city": "Wausuke",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)


    const empId = response.body._id
    await request(app).patch('/employees/'.concat(empId)).send({
        "firstName": "Krishna Kumar"

    }).expect(HttpStatus.OK)

    const employee = await Employee.findById(response.body._id)
    expect(employee.firstName).toEqual('Krishna Kumar')

})

test('Validate Update Employee last name', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "Krishna",
        "lastName": "Murthy",
        "phoneNumber": "732-423-1234",
        "city": "Wausuke",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)


    const empId = response.body._id
    await request(app).patch('/employees/'.concat(empId)).send({
        "lastName": "M"

    }).expect(HttpStatus.OK)

    const employee = await Employee.findById(response.body._id)
    expect(employee.lastName).toEqual('M')

})

test('Validate Update Employee Phone number', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "Krishna",
        "lastName": "Murthy",
        "phoneNumber": "732-423-1234",
        "city": "Wausuke",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)


    const empId = response.body._id
    await request(app).patch('/employees/'.concat(empId)).send({
        "phoneNumber": "732-423-1236"

    }).expect(HttpStatus.OK)

    const employee = await Employee.findById(response.body._id)
    expect(employee.phoneNumber).toEqual('732-423-1236')

})


test('Validate Update Employee City', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "Krishna",
        "lastName": "Murthy",
        "phoneNumber": "732-423-1234",
        "city": "Wausuke",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)


    const empId = response.body._id
    await request(app).patch('/employees/'.concat(empId)).send({
        "city": "Fremont"

    }).expect(HttpStatus.OK)

    const employee = await Employee.findById(response.body._id)
    expect(employee.city).toEqual('Fremont')

})

test('Validate Update Employee State', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "Krishna",
        "lastName": "Murthy",
        "phoneNumber": "732-423-1234",
        "city": "Wausuke",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)


    const empId = response.body._id
    await request(app).patch('/employees/'.concat(empId)).send({
        "state": "CA"

    }).expect(HttpStatus.OK)

    const employee = await Employee.findById(response.body._id)
    expect(employee.state).toEqual('CA')

})

test('Validate Update Employee country', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "Krishna",
        "lastName": "Murthy",
        "phoneNumber": "732-423-1234",
        "city": "Wausuke",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)


    const empId = response.body._id
    await request(app).patch('/employees/'.concat(empId)).send({
        "country": "IN"

    }).expect(HttpStatus.OK)

    const employee = await Employee.findById(response.body._id)
    expect(employee.country).toEqual('IN')

})

test('Validate Update Employee More than one field', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "Krishna",
        "lastName": "Murthy",
        "phoneNumber": "732-423-1234",
        "city": "Wausuke",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)


    const empId = response.body._id
    await request(app).patch('/employees/'.concat(empId)).send({
        "firstName": "Krishna Murthy",
        "lastName": "K",
        "phoneNumber": "732-423-2234",
        "city": "Fremont",
        "state": "CA",
        "country": "US"

    }).expect(HttpStatus.OK)

    const employee = await Employee.findById(response.body._id)
    expect(employee.city).toEqual('Fremont')
    expect(employee.firstName).toEqual('Krishna Murthy')
    expect(employee.lastName).toEqual('K')
    expect(employee.phoneNumber).toEqual('732-423-2234')
    expect(employee.state).toEqual('CA')
    expect(employee.country).toEqual('US')

})


test('Validate Delete Employee by wrong Id', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "Krishna",
        "lastName": "Murthy",
        "phoneNumber": "786-423-1234",
        "city": "Wausuke",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const employee = await Employee.findById(response.body._id)
    expect(employee).not.toBeNull()

    await request(app).delete('/employees/'.concat(response.body._id).concat('2')).send().expect(HttpStatus.INTERNAL_SERVER_ERROR)
   

})

test('Validate Delete Employee by Id', async () => {
    const response = await request(app).post('/employees').send({
        "firstName": "Krishna",
        "lastName": "Murthy",
        "phoneNumber": "786-423-1234",
        "city": "Wausuke",
        "state": "WC",
        "country": "USA"

    }).expect(HttpStatus.OK)

    const employee = await Employee.findById(response.body._id)
    expect(employee).not.toBeNull()

    await request(app).delete('/employees/'.concat(response.body._id)).send().expect(HttpStatus.OK)
    const employeePostDelete = await Employee.findById(response.body._id)
    expect(employeePostDelete).toBeNull()

})

