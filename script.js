// script.js
const apiUrl = 'http://ergast.com/api/f1/drivers.json';
const driversList = document.getElementById('drivers-list');
const driverDetails = document.getElementById('driver-details');
const searchInput = document.getElementById('search');

async function fetchDrivers() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.MRData.DriverTable.Drivers;
}

async function init() {
    const drivers = await fetchDrivers();
    searchInput.addEventListener('input', () => filterDrivers(drivers));
}

function displayDrivers(drivers) {
    driversList.innerHTML = '';
    drivers.forEach(driver => {
        const driverCard = document.createElement('div');
        driverCard.className = 'driver-card';
        driverCard.innerHTML = `
            <h2>${driver.givenName} ${driver.familyName}</h2>
            <p>Nationality: ${driver.nationality}</p>
            <p>Date of Birth: ${driver.dateOfBirth}</p>
        `;
        driverCard.onclick = () => showDriverDetails(driver);
        driversList.appendChild(driverCard);
    });
}

function showDriverDetails(driver) {
    driverDetails.innerHTML = `
        <h2>${driver.givenName} ${driver.familyName}</h2>
        <p>Nationality: ${driver.nationality}</p>
        <p>Date of Birth: ${driver.dateOfBirth}</p>
        <p>URL: <a href="${driver.url}" target="_blank">Profile Link</a></p>
    `;
    driverDetails.classList.remove('hidden');
}

function filterDrivers(drivers) {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredDrivers = drivers.filter(driver =>
        `${driver.givenName} ${driver.familyName}`.toLowerCase().includes(searchTerm)
    );
    displayDrivers(filteredDrivers);
}

init();
