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




    $( document ).ready(function() {
        var operationStatusMessage = window.sessionStorage.getItem("operationStatusMessage") 
        if(operationStatusMessage){           
            $("#operationStatusMessage").empty();
            document.getElementById('operationStatusMessage').append(operationStatusMessage);
        } 
        fetch('/employees').then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        console.log('error in fetching data ', data.error)
                    } else {
                        populateEmployeeData(data)
                    }
                })
            })

            window.sessionStorage.removeItem("operationStatusMessage")

    });


    function populateEmployeeData(data){
            if (data.length > 0) {
                var table = $('<table></table>').addClass('table table-striped');
                var thead = $('<thead></thead>');
                var tableheadrow = $('<tr></tr>');
                tableheadrow.append($('<th scope="col"></th>').text("First Name"));
                tableheadrow.append($('<th scope="col"></th>').text("Last Name"));
                tableheadrow.append($('<th scope="col"></th>').text("City"));
                tableheadrow.append($('<th scope="col"></th>').text("State"));
                tableheadrow.append($('<th scope="col"></th>').text("Country"));
                tableheadrow.append($('<th scope="col"></th>').text("Phone Number"));
                tableheadrow.append($('<th scope="col"></th>').text("Hire Date"));
                tableheadrow.append($('<th scope="col"></th>').text("Employement End Date"));
                tableheadrow.append($('<th scope="col"></th>').text("Action"));
                tableheadrow.append($('<th scope="col"></th>').text("Action"));
                thead.append(tableheadrow);
                table.append(thead);
                for (i = 0; i < data.length; i++) {
                    var id = data[i]._id;
                    var editLink = '<a href=edit?_id='+data[i]._id+'>Edit</a>';
                    
                    var deleteButton = document.createElement("input");
                    deleteButton.setAttribute("type", "button");
                    deleteButton.setAttribute("value", "Delete");
                    deleteButton.setAttribute("onClick", "deleteEmployee('"+id+"','"+data[i].lastName+"')");
                    var row = $('<tr></tr>');
                    row.append($('<td></td>').text(data[i].firstName))
                    row.append($('<td></td>').text(data[i].lastName))
                    row.append($('<td></td>').text(data[i].city))
                    row.append($('<td></td>').text(data[i].state))
                    row.append($('<td></td>').text(data[i].country))
                    row.append($('<td></td>').text(data[i].phoneNumber))
                    var hireDate = data[i].hireDate;
                    if(hireDate){
                    row.append($('<td></td>').text(data[i].hireDate.slice(0,10)))
                    } else {
                        row.append($('<td></td>').text(''))
                    }
                    var employmentEndDate = data[i].employmentEndDate;
                    if(employmentEndDate){
                        employmentEndDate = employmentEndDate.slice(0,10)
                        row.append($('<td></td>').text(employmentEndDate))
                    } else {
                        row.append($('<td></td>').text(''))
                    }
                    row.append($('<th scope="row"></td>').html(editLink));
                    row.append($('<th scope="row"></td>').html(deleteButton));
                    
                    table.append(row)
                }

                $('#employeeData').append(table);
            }
        }

        function deleteEmployee(employeeId,lastName){

            var confirmation = confirm("Are you sure you want to remove "+lastName+" from System?");
            if (confirmation != true) {
              return
            }
                fetch(
                    '/employees/' + employeeId,
                    { method: 'DELETE' }
                )
                    .then(res => {
                        window.sessionStorage.setItem("operationStatusMessage"," Employee Record Deleted successfully")
                        location.reload()
                    })
                    .catch(err => console.error(err))
        }

    

