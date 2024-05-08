document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    signupForm?.addEventListener('submit', (event: Event) => {
        event.preventDefault();  // Prevent the default form submission

        const formData = new FormData(signupForm as HTMLFormElement);

        // Convert FormData to JSON
        const json: Record<string, any> = {};
        formData.forEach((value, key) => { json[key] = value; });

        // Perform the fetch request to the server
        fetch('/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(json)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.userCreated) {
                alert('Registration successful');
                window.location.href = '/'; // Redirect after successful registration
            } else {
                alert(`Registration failed: ${data.message}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error during registration. Please try again.');
        });
    });
});
