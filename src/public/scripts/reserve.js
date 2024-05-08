const token  = sessionStorage.getItem('token');

document.addEventListener("DOMContentLoaded", function() {
    const button = document.getElementById("submit-button");
    button.addEventListener("click", handleSubmit);
});

async function handleSubmit(event) {
    const urlReserve = './reservation';

    const startDate = document.getElementById('check-in').value;
    const endDate = document.getElementById('check-out').value;
    const idProperty = sessionStorage.getItem('id-property');
    const idUser = sessionStorage.getItem('user-id'); 

    let reservation = {idUser, idProperty, startDate, endDate};

    const res = await fetch(urlReserve, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json', 'authorization': String(token)},
        body: JSON.stringify(reservation)
    });
}

