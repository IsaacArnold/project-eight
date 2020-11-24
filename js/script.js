/* ========================================
Global variables
======================================== */

let employees = [];
const apiUrl = 'https://randomuser.me/api/?results=12';

/* ========================================
Getting data from API
======================================== */

fetch(apiUrl)
    .then(response => response.json())
    .then(res => res.results)
    .then (data => console.log(data))
    .catch(err => console.log(err));

/* ========================================
Placing the employee data into the grid
======================================== */