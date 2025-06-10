// Retrieve cart data from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to render checkout table
const renderCheckoutTable = () => {
    const checkoutProductsContainer = document.getElementById('checkout-products');
    const checkoutTotal = document.getElementById('checkout-total');

    checkoutProductsContainer.innerHTML = ''; // Clear current items
    let total = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${(item.price * item.quantity).toFixed(2)} EGP</td>
        `;
        checkoutProductsContainer.appendChild(row);
        total += item.price * item.quantity;
    });

    checkoutTotal.textContent = `${total.toFixed(2)} EGP`;
};

// Submit event listener for checkout form
document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    localStorage.removeItem('cart'); // Clear the cart after successful checkout
    location.reload(); // Reload the page to clear the table
});

// Render the checkout table when the page loads
renderCheckoutTable();
