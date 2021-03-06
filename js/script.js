/* ========================================
Global variables
======================================== */

let employees = [];
const apiUrl = 'https://randomuser.me/api/?results=12&nat=nz';
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const card = document.getElementsByClassName('card');
const searchField = document.querySelector('#search');

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
            <div class='card' data-index='${index}'>
                <img src='${employee.picture.large}' alt='Image of ${employee.name.first} ${employee.name.last}' class='profile-img-small'>
                <div class='text-container'>
                    <h2 class='name'>${employee.name.first} ${employee.name.last}</h2>
                    <p class='email'>${employee.email}</p>
                    <p class='city'>${employee.location.city}</p>
                </div>
            </div>
        `
    });
    gridContainer.innerHTML = cardHtml;
    searchFilter();
}

/* ========================================
Placing information inside the modal
======================================== */

function displayModal(index) {
    let currentIndex = parseInt(index);
    
    let {
        name, dob, phone, email, location: {city, street, state, postcode}, picture
    } = employees[index];
    let date = new Date(dob.date);

    // If the current index does not equal the index then create the element, else leave it blank
    const prevArrow = currentIndex !== 0 ? `<p class='previous-arrow'>&lt;</p>` : "";
    const nextArrow = currentIndex !== 11 ? `<p class='next-arrow'>&gt;</p>` : "";

    const modalHtml = `
        ${prevArrow + nextArrow}
        <img class='profile-img-modal' src='${picture.large}' alt='Image of ${name.first} ${name.last}'>
        <div class='text-container' data-index='${index}'>
            <h2 class='name'>${name.first} ${name.last}</h2>
            <p class='email'>${email}</p>
            <p class='city'>${city}</p>
            <hr />
            <p class='phone'>${phone}</p>
            <p class='city'>${street.number} ${street.name}, ${state}, ${postcode}</p>
            <p class='birthday'>Birthday: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}<p>
        </div>
    `;

    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHtml;

    // Creates variables for the arrows - variable name explains what they will do
    const prevModal = document.querySelector('.previous-arrow');
    const nextModal = document.querySelector('.next-arrow');
    
    // Adds listeners to the arrows themselves
    if (prevArrow !== '') {
        prevModal.addEventListener('click', () => {
            // Decreases by 1
            currentIndex--;
            // Updates the open modal
            displayModal(currentIndex);
        });
    }
    if (nextArrow !== '') {
        nextModal.addEventListener('click', () => {
            // Increases by 1
            currentIndex++;
            // Updates the open modal
            displayModal(currentIndex);
        });
    }
}

/* ========================================
Event Listeners
======================================== */

gridContainer.addEventListener('click', (e) => {
    // Makes sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
        // Selects the card element based on its proximity to the actual element clicked
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index');

        displayModal(index);     
    }
});

// Closes the modal when clicking on the 'X'
modalClose.addEventListener('click', (e) => {
    if (e.target.className === 'modal-close') {
        overlay.classList.add('hidden');
    }
});

/* ========================================
Search Function
======================================== */
// Function idea borrowed from my project five which had inspo from from itsmeganlynn's GitHub repo: techdegree-project-5
function searchFilter() {
    const searchField = document.getElementById('search');
    
    searchField.addEventListener('keyup', () => {
        // Putting the searchInput variable inside the event listener allows it to be updated each time the keys are pressed
        const searchInput = searchField.value.toLowerCase();
        for (let i = 0; i < card.length; i++) {
            // Using .name allows the card info to be the content of the name class -> this is what is being compared to the searchInput
            if (card[i].querySelector('.name').innerText.toLowerCase().includes(searchInput)) {
                card[i].style.display = "";
            } else {
                card[i].style.display = 'none';
            }
        }
    });
}
