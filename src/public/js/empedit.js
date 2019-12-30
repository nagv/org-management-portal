$(document).ready(function () {

    var url = window.location.href;
    var id = getUrlVars()["_id"];
    fetch('/employees/' + id).then((response) => {
        response.json().then((data) => {
            if (!data.error) {
                populateEmployeeData(data)
            }
        })
    })
    
});

// function to get all query params from URL
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

// Function to update the form details from selected employee record
function populateEmployeeData(data) {
    document.getElementById('firstName').value = data.firstName
    document.getElementById('lastName').value = data.lastName
    document.getElementById('city').value = data.city
    document.getElementById('phoneNumber').value = data.phoneNumber
    document.getElementById('country').value = data.country
    document.getElementById('state').value = data.state
    if (data.hireDate) {
        document.getElementById('hireDate').value = data.hireDate.slice(0, 10)
    }
    if (data.employmentEndDate) {
        document.getElementById('employmentEndDate').value = data.employmentEndDate.slice(0, 10)
    }
    }

// Function to perform/call service to update the employee record
function editEmployeeData() {
    const empData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        country: document.getElementById('country').value,
        hireDate: document.getElementById('hireDate').value
    }
    if (document.getElementById('employmentEndDate')) {
        empData.employmentEndDate = document.getElementById('employmentEndDate').value
    }

    var url = window.location.href;
    var id = getUrlVars()["_id"];
    fetch('/employees/' + id, {
        method: 'PATCH',
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
            window.sessionStorage.setItem("operationStatusMessage", "Employee Details updated successfully")
            window.location.href = "/";
        })
        .catch((error) => {
            $("#errorMessage").empty();
            document.getElementById('errorMessage').append(error);
        });

}