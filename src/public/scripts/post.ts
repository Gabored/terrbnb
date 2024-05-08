const token: string = sessionStorage.getItem('token');

document.addEventListener('DOMContentLoaded', async () => {
    const urlPosts: string = './post';

    const div_post: HTMLElement = document.getElementById('post-container');

    if (div_post) {
        const resp: Response = await fetch(urlPosts, {
            method: 'GET',
            headers: {
                "authorization": String(token)
            }
        });

        const posts: any[] = await resp.json();

        posts.forEach(post => {
            const card: HTMLDivElement = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.description}</p>
                <a href="/reserve"><button id="${post.idProperty}" class="button-reserve">Reservar</button></a>
            `;

            div_post.appendChild(card);
        });

        const buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.button-reserve');

        buttons.forEach(button => {
            button.addEventListener('click', handleClick);
        });
    }
});

function handleClick(event: MouseEvent) {
    const clicked_button: HTMLElement | null = event.target instanceof HTMLElement ? event.target.closest('button') : null;
    if (clicked_button) {
        const button_id: string | null = clicked_button.getAttribute('id');
        if (button_id) {
            sessionStorage.setItem('id-property', button_id);
        }
    }
}
