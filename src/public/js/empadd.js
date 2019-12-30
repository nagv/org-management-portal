// Function to add new employee record
function addNewEmployeeRecord() {
  const empData = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    city: document.getElementById('city').value,
    state: document.getElementById('state').value,
    phoneNumber: document.getElementById('phoneNumber').value,
    country: document.getElementById('country').value
  }
  if (document.getElementById('hireDate') && document.getElementById('hireDate').value != '') {
    empData.hireDate = document.getElementById('hireDate').value
  }
  if (document.getElementById('employmentEndDate') && document.getElementById('employmentEndDate').value != '') {
    empData.employmentEndDate = document.getElementById('employmentEndDate').value
  }
  fetch('/employees/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(empData),
  })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      response.json()
    })
    .then((data) => {
      window.sessionStorage.setItem("operationStatusMessage", "Employee record created successfully");
      window.location.href = "/";
    })
    .catch((error) => {
      $("#errorMessage").empty();
      document.getElementById('errorMessage').append(error);
    });

}