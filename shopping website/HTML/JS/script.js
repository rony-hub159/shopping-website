document.getElementById('products-button').addEventListener('click', function() { 
    const listContainer = document.querySelector('.dropdown-products-list'); 
    listContainer.scrollBy({ 
        top: 30, // Scroll down by 30 pixels 
        behavior: 'smooth' // Smooth scrolling 
    }); 
}); 
// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", () => {

    // Function to handle the search bar functionality
    const searchInput = document.querySelector(".search-bar input");
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      const products = document.querySelectorAll(".product");
      
      products.forEach(product => {
        const productName = product.querySelector("h3").textContent.toLowerCase();
        if (productName.includes(query)) {
          product.style.display = "block"; // Show the product
        } else {
          product.style.display = "none"; // Hide the product
        }
      });
    });
  
    // Functionality to handle "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".product button");
    addToCartButtons.forEach(button => {
      button.addEventListener("click", () => {
        alert("Product added to cart!");
        // You can add functionality here to actually store the cart items.
      });
    });
  
    // Functionality for mobile responsiveness (optional)
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    mediaQuery.addListener(handleResponsiveLayout);
    handleResponsiveLayout(mediaQuery); // Initial call
  
    // Handle responsive layout for mobile screens
    function handleResponsiveLayout(e) {
      if (e.matches) {
        // Adjust layout for mobile
        document.querySelector(".hero-images").style.flexDirection = "column";
      } else {
        // Reset layout for larger screens
        document.querySelector(".hero-images").style.flexDirection = "row";
      }
    }
  });
  // Fetch the product data from the backend
function loadProducts() {
  fetch('/products')
    .then(response => response.json())
    .then(products => {
      const productList = document.getElementById('product-list');
      
      // Clear existing content
      productList.innerHTML = '';

      // Loop through each product and add it to the page
      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
          <h2>${product.name}</h2>
          <p>${product.description}</p>
          <p>Price: $${product.price}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
}

// Add product to the shopping cart (simple example, localStorage used here)
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart!');
}

// Call loadProducts() when the products page loads
if (window.location.pathname === '/products') {
  loadProducts();
}
window.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-bar input");
  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    console.log(`Searching for: ${query}`);
  });
});

  