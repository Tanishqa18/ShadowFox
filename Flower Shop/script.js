const products = [
    {
        id: 1,
        name: "Classic Red Roses",
        price: 49.99,
        image: "image/ClassicRedRoses.jpg",
        category: "Romance"
    },
    {
        id: 2,
        name: "Spring Tulip Mix",
        price: 34.50,
        image: "image/SpringTulipMix.jpg",
        category: "Celebration"
    },
    {
        id: 3,
        name: "Sunflower Bouquet",
        price: 29.99,
        image: "image/SunflowerBouquet.jpg",
        category: "Celebration"
    },
    {
        id: 4,
        name: "White Orchids",
        price: 55.00,
        image: "image/WhiteOrchids.jpg",
        category: "Decor"
    },
    {
        id: 5,
        name: "Pink Lilies",
        price: 39.99,
        image: "image/PinkLilies.jpg",
        category: "Sympathy"
    },
    {
        id: 6,
        name: "Blue Hydrangeas",
        price: 45.00,
        image: "image/BlueHydranges.png",
        category: "Decor"
    },
    {
        id: 7,
        name: "Mixed Gerberas",
        price: 25.00,
        image: "image/Mixed Gerberas.png",
        category: "Celebration"
    },
    {
        id: 8,
        name: "White Daisies",
        price: 19.99,
        image: "image/WhiteDaisies.png",
        category: "Celebration"
    },
    {
        id: 9,
        name: "Purple Irises",
        price: 32.50,
        image: "image/PurpleIrises.png",
        category: "Decor"
    },
    {
        id: 10,
        name: "Yellow Carnations",
        price: 22.00,
        image: "image/YellowCarnations.png",
        category: "Sympathy"
    },
    {
        id: 11,
        name: "Orange Roses",
        price: 48.00,
        image: "image/OrangeRoses.png",
        category: "Romance"
    },
    {
        id: 12,
        name: "Lavender Bundle",
        price: 28.00,
        image: "image/LavenderBundle.jpg",
        category: "Decor"
    },
    {
        id: 13,
        name: "Peony Arrangement",
        price: 59.99,
        image: "image/PeonyArrangement.jpg",
        category: "Romance"
    },
    {
        id: 14,
        name: "Wildflower Mix",
        price: 35.00,
        image: "image/WildflowerMix.jpg",
        category: "Celebration"
    },
    {
        id: 15,
        name: "Succulent Garden",
        price: 29.50,
        image: "image/SucculentGarden.jpg",
        category: "Plants"
    },
    {
        id: 16,
        name: "Dried Flower Bouquet",
        price: 42.00,
        image: "image/DriedFlowerBouquet.jpg",
        category: "Decor"
    }
];

let cartCount = 0;
const likedProductIds = new Set();

function renderProducts(productsToRender = products) {
    const grid = document.getElementById('product-grid');
    
    if (productsToRender.length === 0) {
        grid.innerHTML = '<p>No products found matching your criteria.</p>';
        return;
    }

    grid.innerHTML = productsToRender.map(product => `
        <div class="product-card">
            <button class="like-btn ${likedProductIds.has(product.id) ? 'liked' : ''}" onclick="toggleLike(${product.id})">❤</button>
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200?text=Image+Not+Found'">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(id) {
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
    showToast("Item added to cart!");
}

function toggleLike(id) {
    if (likedProductIds.has(id)) {
        likedProductIds.delete(id);
    } else {
        likedProductIds.add(id);
    }
    
    // Re-render to update the specific button state visually
    const btn = document.querySelector(`.product-card button[onclick="toggleLike(${id})"]`);
    if (btn) btn.classList.toggle('liked');
}

function applyFilters() {
    const clearBtn = document.getElementById('clear-wishlist-btn');
    if (clearBtn) clearBtn.style.display = 'none';

    const categoryCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]:checked');
    const selectedCategories = Array.from(categoryCheckboxes).map(cb => cb.value);

    const priceRadio = document.querySelector('input[name="price"]:checked');
    const priceValue = priceRadio ? priceRadio.value : 'all';

    const filtered = products.filter(product => {
        // Category Filter
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);

        // Price Filter
        let priceMatch = true;
        if (priceValue === 'under30') priceMatch = product.price < 30;
        else if (priceValue === '30to50') priceMatch = product.price >= 30 && product.price <= 50;
        else if (priceValue === 'over50') priceMatch = product.price > 50;

        return categoryMatch && priceMatch;
    });

    renderProducts(filtered);
}

// Toast Notification Function
function showToast(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Trigger reflow
    void toast.offsetWidth;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, 3000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // renderProducts();

    const customizeBtn = document.getElementById('customize-btn');
    const modal = document.getElementById('customization-modal');
    const closeBtn = document.querySelector('.close-btn');
    const addCustomBtn = document.getElementById('add-custom-flower');
    const flowerCheckboxes = document.getElementById('flower-checkboxes');
    const quantityInput = document.getElementById('flower-quantity');
    const priceDisplay = document.getElementById('custom-price-display');

    // Populate the dropdown with available products
    if (flowerCheckboxes) {
        products.forEach(product => {
            const div = document.createElement('div');
            div.innerHTML = `
                <label>
                    <input type="checkbox" name="custom-flower" value="${product.name}" data-price="${product.price}">
                    ${product.name}
                </label>
            `;
            flowerCheckboxes.appendChild(div);
        });

        // Add event listeners for price calculation
        flowerCheckboxes.addEventListener('change', updateCustomPrice);
    }

    if (quantityInput) {
        quantityInput.addEventListener('input', updateCustomPrice);
    }

    function updateCustomPrice() {
        const checkboxes = document.querySelectorAll('input[name="custom-flower"]:checked');
        let total = 0;
        checkboxes.forEach(cb => {
            total += parseFloat(cb.getAttribute('data-price'));
        });
        
        const quantity = parseInt(quantityInput.value) || 1;
        total *= quantity;
        
        if (priceDisplay) {
            priceDisplay.textContent = `Estimated Total: $${total.toFixed(2)}`;
        }
    }

    if (customizeBtn) {
        customizeBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (addCustomBtn) {
        addCustomBtn.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('input[name="custom-flower"]:checked');
            const selectedFlowers = Array.from(checkboxes).map(cb => cb.value);
            const quantity = document.getElementById('flower-quantity').value;
            
            if (selectedFlowers.length === 0) {
                showToast('Please select at least one flower.');
                return;
            }
            
            showToast(`Custom bouquet added! (${quantity} items)`);
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Wishlist Header Button Logic
    const wishlistBtn = document.getElementById('wishlist-btn');
    const clearWishlistBtn = document.getElementById('clear-wishlist-btn');

    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            const likedProducts = products.filter(p => likedProductIds.has(p.id));
            renderProducts(likedProducts);
            if (clearWishlistBtn) clearWishlistBtn.style.display = 'block';
        });
    }

    if (clearWishlistBtn) {
        clearWishlistBtn.addEventListener('click', () => {
            likedProductIds.clear();
            renderProducts([]);
            clearWishlistBtn.style.display = 'none';
        });
    }
});

// Expose addToCart to the global scope for the onclick handler
window.addToCart = addToCart;
window.applyFilters = applyFilters;
window.toggleLike = toggleLike;
window.showToast = showToast;

// Back to Top Button Logic
const backToTopBtn = document.getElementById("back-to-top");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

backToTopBtn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});