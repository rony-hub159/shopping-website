// Retrieve cart data from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to save cart to localStorage
const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Function to add product to cart
const addToCart = (id, name, price, image) => {
  const itemIndex = cart.findIndex(item => item.id === id);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1, image });
  }
  saveCart();
  alert(`${name} has been added to your cart!`);  // Alert after adding item
  renderCartItems();  // Re-render the cart to update the total
};

// Event listener for Add to Cart buttons on the product page
document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', (e) => {
    const productElement = e.target.closest('.main');
    const id = parseInt(productElement.dataset.id);
    const name = productElement.querySelector('p').textContent;
    
    // Retrieve price by id
    const priceElement = productElement.querySelector(`#price-${id}`);
    const priceText = priceElement.textContent.replace('EGP', '').trim();  // Remove 'EGP' and trim spaces
    const price = parseFloat(priceText);  // Parse the price to a number
    
    // Check if the price is valid
    if (isNaN(price)) {
      alert("Invalid price format!");  // Alert if price is invalid
      return;
    }

    const image = productElement.querySelector('img').src;

    addToCart(id, name, price, image);
  });
});

// Function to render cart items and calculate total price
const renderCartItems = () => {
  const cartItemsContainer = document.querySelector('.cart-items');
  const totalPrice = document.getElementById('totalPrice');
  const totalItems = document.getElementById('totalItems');
  cartItemsContainer.innerHTML = '';  // Clear current items
  let totalPriceValue = 0;
  let totalItemsValue = 0;

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <p>${item.name}</p>
        <p>Price: ${item.price} EGP</p>  <!-- Display price with EGP -->
        <p>Quantity: ${item.quantity}</p>
      </div>
      <button class="remove-item" data-id="${item.id}">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
    totalPriceValue += item.price * item.quantity;  // Calculate total price for all items
    totalItemsValue += item.quantity;  // Calculate total quantity of items
  });

  // Ensure totalPriceValue is a valid number before updating the display
  if (isNaN(totalPriceValue)) {
    totalPrice.textContent = 'Invalid total price';
  } else {
    totalPrice.textContent = totalPriceValue.toFixed(2);  // Show total price with two decimals
  }
  
  totalItems.textContent = totalItemsValue;  // Show total number of items
};

// Render the cart when the page loads
renderCartItems();

// Event listener for removing an item from the cart
document.querySelector('.cart-items').addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-item')) {
    const id = parseInt(e.target.dataset.id);
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);  // Remove item from cart
      saveCart();
      renderCartItems(); // Re-render cart items after removal
    }
  }
});
