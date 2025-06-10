const cartItems = [
    {
      id: 1,
      name: "Red Dress",
      price: 30.0,
      quantity: 1,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXhMN1OpfVarspJrL3aH-TUv3FpwErkEsO6g&s",
    },
    {
      id: 2,
      name: "sweater",
      price: 50.0,
      quantity: 2,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpHS0bYucCgYDieVh5eGTGcMP_S5J79gIXTA&s",
    },
  ];
  
  const renderCartItems = () => {
    const cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.innerHTML = "";
  
    let totalItems = 0;
    let totalPrice = 0;
  
    cartItems.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
  
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p>Price: $${item.price.toFixed(2)}</p>
        </div>
        <div class="cart-item-controls">
          <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
        </div>
        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        <button class="cart-item-remove" data-id="${item.id}">Remove</button>
      `;
  
      cartItemsContainer.appendChild(itemElement);
  
      totalItems += item.quantity;
      totalPrice += item.price * item.quantity;
    });
  
    document.getElementById("totalItems").textContent = totalItems;
    document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
  
    attachEventHandlers();
  };
  
  const attachEventHandlers = () => {
    const quantityInputs = document.querySelectorAll(".quantity-input");
    const removeButtons = document.querySelectorAll(".cart-item-remove");
  
    quantityInputs.forEach((input) => {
      input.addEventListener("change", (e) => {
        const itemId = parseInt(e.target.dataset.id, 10);
        const newQuantity = parseInt(e.target.value, 10);
        updateCartItem(itemId, newQuantity);
      });
    });
  
    removeButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const itemId = parseInt(e.target.dataset.id, 10);
        removeCartItem(itemId);
      });
    });
  };
  
  const updateCartItem = (itemId, newQuantity) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      item.quantity = newQuantity;
      renderCartItems();
    }
  };
  
  const removeCartItem = (itemId) => {
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);
    if (itemIndex > -1) {
      cartItems.splice(itemIndex, 1);
      renderCartItems();
    }
  };
  
  renderCartItems();
  
  document.getElementById("checkoutButton").addEventListener("click", () => {
    if (cartItems.length > 0) {
      alert("Proceeding to checkout...");
    } else {
      alert("Your cart is empty.");
    }
  });
  
  document.getElementById("continueShopping").addEventListener("click", () => {
    alert("Returning to shop...");
  });
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
  document.addEventListener("DOMContentLoaded", function() {
    
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    sidebarToggle.addEventListener("click", function() {
        sidebar.classList.toggle("active"); // Show or hide the sidebar
        mainContent.classList.toggle("sidebar-active"); // Move content accordingly
    });

    const dropdownBtns = document.querySelectorAll(".dropdown-btn");

    dropdownBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            const dropdown = btn.nextElementSibling;
            dropdown.classList.toggle("show");
            const arrow = btn.querySelector(".dropdown-arrow");
            arrow.classList.toggle("rotate");
        });
    });

    const subDropdownBtns = document.querySelectorAll(".sub-dropdown-btn");

    subDropdownBtns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            const subDropdown = btn.nextElementSibling;
            subDropdown.classList.toggle("show");
            const subArrow = btn.querySelector(".dropdown-arrow");
            subArrow.classList.toggle("rotate");
        });
    });
});