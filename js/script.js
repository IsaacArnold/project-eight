/* ========================================
Global variables
======================================== */

let employees = [];
const apiUrl = 'https://randomuser.me/api/?results=12&nat=nz';
const gridcontainer = document.querySelector('.grid-container');

/* ========================================
Getting data from API
======================================== */

fetch(apiUrl)
    .then(response => response.json())
    .then(res => res.results)
    .then (data => displayEmployees(data))
    .catch(err => console.log(err));

/* ========================================
Placing the employee data into the grid
======================================== */

function displayEmployees(data) {
    employees = data;
    let cardHtml = "";

    employees.forEach((employee, index) => {
        cardHtml += `
            <div class='card'>
                <img src='${employee.picture.large}' alt='Image of ${employee.name.first} ${employee.name.last}' class='profile-img-small'>
                <div class='text-container'>
                    <h2 class='name'>${employee.name.first} ${employee.name.last}</h2>
                    <p class='email'>${employee.email}</p>
                    <p class='city'>${employee.location.city}</p>
                </div>
            </div>
        `
    });
    gridcontainer.innerHTML = cardHtml;
}