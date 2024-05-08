const token  = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', async function () {
    const urlPosts = './post';

    let div_post = document.createElement('post-container');
    let data_posts = undefined;


    let resp = await fetch(urlPosts, {
        method: 'GET',
        headers: {
            "authorization" : String(token)
        }   
    });

    let posts = await resp.json();

    console.log("posts", posts);
})