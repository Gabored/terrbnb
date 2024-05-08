const token: string | null = sessionStorage.getItem('token');

document.addEventListener("DOMContentLoaded", function() {
    const button: HTMLElement | null = document.getElementById("submit-button");
    if (button) {
        button.addEventListener("click", handleSubmit);
    }
});

async function handleSubmit(event: MouseEvent) {
    const urlReserve: string = './reservation';

    const startDate: string | null = (document.getElementById('check-in') as HTMLInputElement).value;
    const endDate: string | null = (document.getElementById('check-out') as HTMLInputElement).value;
    const idProperty: string | null = sessionStorage.getItem('id-property');
    const idUser: string | null = sessionStorage.getItem('user-id'); 

    const reservation: { idUser: string | null, idProperty: string | null, startDate: string | null, endDate: string | null } = {idUser, idProperty, startDate, endDate};

    const res: Response = await fetch(urlReserve, {
        method: 'POST', 
        headers: {'Content-Type': 'application/json', 'authorization': String(token)},
        body: JSON.stringify(reservation)
    });
}
