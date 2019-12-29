const employeeForm = document.querySelector('form')
const firstName = document.querySelector('firstName')
const lastName = document.querySelector('lastName')
const phoneNumber = document.querySelector('phoneNumber')
const city = document.querySelector('city')
const state = document.querySelector('state')
const country = document.querySelector('country')
const hireDate = document.querySelector('hireDate')
const employmentEndDate = document.querySelector('employmentEndDate')
const messageOne = document.querySelector('#status')
const messageTwo = document.querySelector('#error')


function showEmployees(){
  fetch('/employees').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log('error in fetching data ',data.error)
        } else {
           console.log(data)
        }
    })
})
}

employeeForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    /**
    fetch('/employees').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })*/

    (async () => {
        const rawResponse = await fetch('/employees/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({firstName: 'FN',lastName: 'LN',phoneNumber='732-456-2345',city='Ballwin',state='MO',country='USA'})
        });
        const content = await rawResponse.json();
      
        console.log(content);
      })();
})