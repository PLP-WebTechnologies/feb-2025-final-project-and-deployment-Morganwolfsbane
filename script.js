// Product Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        description: "High-quality wireless headphones with noise cancellation.",
        image: "assets/headphones.jpg"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        description: "Track your fitness and stay connected.",
        image: "assets/smartwatch.jpg"
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 79.99,
        description: "Portable speaker with 20hr battery life.",
        image: "assets/speaker.jpg"
    },
    {
        id: 4,
        name: "Laptop Backpack",
        price: 49.99,
        description: "Durable backpack with USB charging port.",
        image: "assets/backpack.jpg"
    }
];

// Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const featuredProductsEl = document.getElementById('featured-products');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');
const cartCountEl = document.getElementById('cart-count');

// Initialize the app
function init() {
    renderFeaturedProducts();
    updateCartCount();
    setupEventListeners();
}

// Render featured products
function renderFeaturedProducts() {
    if (!featuredProductsEl) return;
    
    featuredProductsEl.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Add to cart buttons
    if (featuredProductsEl) {
        featuredProductsEl.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = parseInt(e.target.closest('.product-card').dataset.id);
                addToCart(productId);
            }
        });
    }
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();
    saveCartToLocalStorage();
    showAddToCartNotification(product.name);
}

// Update cart count in header
function updateCartCount() {
    if (cartCountEl) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountEl.textContent = totalItems;
    }
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show notification when product is added to cart
function showAddToCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <p>${productName} added to cart!</p>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize the application
document.addEventListener('DOMContentLoaded', init);
