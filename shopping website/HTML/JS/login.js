function createLoginForm() {
  const loginPage = document.createElement('div');
  loginPage.innerHTML = `
    <div class="form-container">
      <h2>Log In</h2>
      <form id="loginForm">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Enter your username" required>

        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required>

        <button type="submit" class="btn">Log In</button>
      </form>
      <div id="loginMessage"></div>
    </div>
  `;

  document.body.innerHTML = '';
  document.body.appendChild(loginPage);

  document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    const loginMessage = document.getElementById('loginMessage');

    if (data.success) {
      loginMessage.textContent = `Welcome, ${data.user.name}!`;
      loginMessage.style.color = 'green';
    } else {
      loginMessage.textContent = data.message;
      loginMessage.style.color = 'red';
    }
  });
}

function createSignupForm() {
  const signupPage = document.createElement('div');
  signupPage.innerHTML = `
    <div class="form-container">
      <h2>Sign Up</h2>
      <form id="signupForm">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Enter your username" required>

        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required>

        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required>

        <button type="submit" class="btn">Sign Up</button>
      </form>
      <div id="signupMessage"></div>
    </div>
  `;

  document.body.innerHTML = '';
  document.body.appendChild(signupPage);

  document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    const signupMessage = document.getElementById('signupMessage');

    if (data.success) {
      signupMessage.textContent = 'Registration successful! You can now log in.';
      signupMessage.style.color = 'green';
    } else {
      signupMessage.textContent = data.message;
      signupMessage.style.color = 'red';
    }
  });
}

document.getElementById('loginButton').addEventListener('click', function () {
  createLoginForm();
});

document.getElementById('signupButton').addEventListener('click', function () {
  createSignupForm();
});

document.getElementById('googleLoginButton').addEventListener('click', function () {
  alert('Redirecting to Google Login...');
  window.location.href = 'https://accounts.google.com/signup/v2/webcreateaccount?hl=en-GB&flowName=GlifWebSignIn&flowEntry=SignUp/';
});