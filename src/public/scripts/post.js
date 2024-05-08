const token  = sessionStorage.getItem('token');

document.addEventListener('DOMContentLoaded', async function () {
    const urlPosts = './post';

    let div_post = document.getElementById ('post-container');

    let resp = await fetch(urlPosts, {
        method: 'GET',
        headers: {
            "authorization" : String(token)
        }   
    });

    let posts = await resp.json();

    posts.forEach(post => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.description}</p>
        <a href="/reserve"><button id="${post.idProperty}" class="button-reserve">Reservar</button></a>
        `

        div_post.appendChild(card);
    });

    const buttons = document.querySelectorAll('.button-reserve');

    buttons.forEach(button => {
        button.addEventListener('click', handleClick);
    })
})


function handleClick(event) {
    const clicked_button = event.target.closest('button');
    let button_id = clicked_button.getAttribute('id');

    sessionStorage.setItem('id-property',button_id);

}

