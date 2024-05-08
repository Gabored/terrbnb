// Ensure DOM is fully loaded before attaching event handlers
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', function (event: Event) {
        event.preventDefault(); // Prevent the default form submission

        // Extract data from form elements
        const usernameInput = document.getElementById('username') as HTMLInputElement;
        const passwordInput = document.getElementById('password') as HTMLInputElement;

        if (!usernameInput || !passwordInput) {
            console.error('Form elements missing!');
            return;
        }

        const username = usernameInput.value;
        const password = passwordInput.value;

        // Define the type for the login data
        interface LoginData {
            username: string;
            password: string;
        }

        const loginData: LoginData = {
            username: username,
            password: password
        };

        // Create the AJAX request using Fetch API
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                console.log('Login successful');
                window.location.href = '/post'; 
            } else {
                console.log('Login failed');
                // Handle login failure
                alert('Login failed: ' + (data.message || 'Unknown error'));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error logging in. Please try again.');
        });
    });
});
