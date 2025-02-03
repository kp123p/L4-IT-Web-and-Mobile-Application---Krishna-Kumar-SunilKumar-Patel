function toggleMenu() {
    const navLinks = document.querySelector("nav ul");
    navLinks.classList.toggle("activate");
}

function addToCart(itemName, itemPrice) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartItems.push({ name: itemName, price: itemPrice });

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    alert(`${itemName} has been added to your order.`);

    updateCartDisplay();
}

function updateOrderPage() {

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const orderItemsContainer = document.getElementById('order-items');

    orderItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `<p>${item.name} - $${item.price.toFixed(2)}</p>`;
        orderItemsContainer.appendChild(orderItem);
    });

    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    document.getElementById('cart-total').textContent = totalPrice.toFixed(2);

}
if (document.getElementById('order-items')) {
    updateOrderPage();
}

const UNSPLASH_API_KEY = '4JfaeeTaLhn7IGsk8WNOabC3qW-3r543qOnYer8IJAQ';
const UNSPLASH_API_URL = `https://api.unsplash.com/photos?client_id=${UNSPLASH_API_KEY}&per_page=5`;

async function fetchImages() {
    try {
        const response = await fetch(UNSPLASH_API_URL);
        const images = await response.json();
        const imageGallery = document.getElementById('Imagegallery');

        images.forEach(img => {
            const imageElement = document.createElement('img');
            imageElement.src = img.urls.regular;
            imageElement.alt = img.alt_description || 'Gallery Image';
            imageElement.classList.add('gallery-image');
            imageGallery.appendChild(imageElement);
        });
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

fetchImages();
