$(document).ready(function () {

    var url = window.location.href;
    var id = getUrlVars()["_id"];
    console.log('id value from query', id);
    fetch('/employees/' + id).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log('error in fetching data ', data.error)
            } else {
                populateEmployeeData(data)
            }
        })
    })
    
});

function updateEmployeeRecord(){
    var editPayload = {}
    editPayload.firstName = "FN"

    console.log('editPayload val',editPayload)

    console.log('editPayload val',JSON.stringify(editPayload))
}

function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
});
return vars;
}


function populateEmployeeData(data){
        document.getElementById('firstName').value = data.firstName
        document.getElementById('lastName').value = data.lastName
        document.getElementById('city').value = data.city
        document.getElementById('phoneNumber').value = data.phoneNumber
        document.getElementById('country').value = data.country
        document.getElementById('state').value = data.state
        if(data.hireDate){
        document.getElementById('hireDate').value = data.hireDate.slice(0,10)
        }
        if(data.employmentEndDate){
        document.getElementById('employmentEndDate').value = data.employmentEndDate.slice(0,10)
        }
    }


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

    console.log('paylad for update ', empData);

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
            window.location.href = "/";
        })
        .catch((error) => {
            $("#errorMessage").empty();
            document.getElementById('errorMessage').append(error);
        });

}