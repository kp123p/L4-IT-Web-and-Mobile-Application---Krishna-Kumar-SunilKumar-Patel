function toggleMenu() {
    const navLinks = document.querySelector("nav ul");
    navLinks.classList.toggle("show");
}

function addToCart(itemName, itemPrice) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartItems.push({ name: itemName, price: itemPrice });

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    alert(`${itemName} has been added to your order.`);

    updateCartDisplay();
}
function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (index >= 0 && index < cartItems.length) {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateOrderPage();
    }
}

function updateOrderPage() {

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const orderItemsContainer = document.getElementById('order-items');

    orderItemsContainer.innerHTML = '';

    cartItems.forEach((item, index) => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button onclick="removeItem(${index})" class="remove-btn">REMOVE</button>
        `;
        orderItemsContainer.appendChild(orderItem);
    });

    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    document.getElementById('cart-total').textContent = totalPrice.toFixed(2);

}
if (document.getElementById('order-items')) {
    updateOrderPage();
}

const gallery = document.getElementById('Imagegallery');
const ACCESS_KEY = '4JfaeeTaLhn7IGsk8WNOabC3qW-3r543qOnYer8IJAQ';

async function fetchCoffeeImages() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=coffee-shop&per_page=6&client_id=${ACCESS_KEY}`
    );
    const data = await response.json();
    
    data.results.forEach(photo => {
      const img = document.createElement('img');
      img.src = photo.urls.regular;
      img.alt = photo.alt_description;
      img.loading = "lazy";
      gallery.appendChild(img);
    });
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

fetchCoffeeImages();
