if (window.location.pathname === '/index.html') {
    const signupForm = document.getElementById('signup-form');
    const errorMsg = document.getElementById('error-msg');
    const successMsg = document.getElementById('success-msg');
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        errorMsg.textContent = '';

        if (!name || !email || !password || !confirmPassword) {
            errorMsg.textContent = 'Error : All the fields are mandatory';
        } else if (password !== confirmPassword) {
            errorMsg.textContent = 'Passwords do not match.';
        } else {
            const user = {
                name: name,
                email: email,
                password:password,
                accessToken: generateAccessToken(16)
            };
            localStorage.setItem('user', JSON.stringify(user));
            errorMsg.textContent = 'Successfully Signed Up!';
            if(errorMsg.textContent === 'Successfully Signed Up!'){
                errorMsg.style.color = "rgb(10, 227, 10)";
            }
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 800);
        }
    });
}

// Profile Page Logic
if (window.location.pathname === '/profile.html') {
    const nameElement = document.getElementById('name');
    const emailElement = document.getElementById('email');
    const logoutBtn = document.getElementById('logout-btn');
    const passwordElement = document.getElementById('password')
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.accessToken) {
        window.location.href = 'index.html';
    } else {
        nameElement.textContent = user.name;
        emailElement.textContent = user.email;
        passwordElement.textContent = user.password;
    }

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });
}

// Generate Access Token
function generateAccessToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}