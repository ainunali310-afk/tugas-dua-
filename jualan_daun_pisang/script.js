// API Configuration
const API_BASE_URL = 'http://localhost/jualan_daun_pisang/api.php';

// State Management
const state = {
    cart: [],
    products: {
        besar: {
            id: 'besar',
            name: 'Daun Pisang Besar',
            price: 1000,
            description: 'Ukuran: 40-50 cm, cocok untuk nasi gudeg, pepes ikan',
            specs: {
                ukuran: '40-50 cm',
                asal: 'Semarang, Jawa Tengah',
                caraSimpan: 'Simpan di tempat sejuk dan kering',
                minPembelian: '10 lembar'
            },
            stock: 100,
            wholesale: {
                min: 50,
                discount: '10%',
                price: 900
            }
        },
        sedang: {
            id: 'sedang',
            name: 'Daun Pisang Sedang',
            price: 700,
            description: 'Ukuran: 30-40 cm, cocok untuk lontong, ketupat',
            specs: {
                ukuran: '30-40 cm',
                asal: 'Semarang, Jawa Tengah',
                caraSimpan: 'Simpan di tempat sejuk dan kering',
                minPembelian: '10 lembar'
            },
            stock: 150,
            wholesale: {
                min: 50,
                discount: '10%',
                price: 630
            }
        },
        kecil: {
            id: 'kecil',
            name: 'Daun Pisang Kecil',
            price: 500,
            description: 'Ukuran: 20-30 cm, cocok untuk tempe, tahu bacem',
            specs: {
                ukuran: '20-30 cm',
                asal: 'Semarang, Jawa Tengah',
                caraSimpan: 'Simpan di tempat sejuk dan kering',
                minPembelian: '10 lembar'
            },
            stock: 200,
            wholesale: {
                min: 50,
                discount: '10%',
                price: 450
            }
        }
    }
};

// Default product data
const defaultProducts = {
    besar: {
        name: 'Daun Pisang Besar',
        price: 1000,
        description: 'Ukuran: 40-50 cm, cocok untuk nasi gudeg, pepes ikan'
    },
    sedang: {
        name: 'Daun Pisang Sedang',
        price: 700,
        description: 'Ukuran: 30-40 cm, cocok untuk lontong, ketupat'
    },
    kecil: {
        name: 'Daun Pisang Kecil',
        price: 500,
        description: 'Ukuran: 20-30 cm, cocok untuk tempe, tahu bacem'
    }
};

// Fetch products from API
async function fetchProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        products = data.records || [];
        if (products.length === 0) {
            // If no products from API, use default products
            products = Object.values(defaultProducts);
        }
        updateProductDisplay();
    } catch (error) {
        console.error('Error fetching products:', error);
        // Use default products if API fails
        products = Object.values(defaultProducts);
        updateProductDisplay();
    }
}
            asal: 'Semarang, Jawa Tengah',
            caraSimpan            try {
                // ...existing code...
                products = Object.values(defaultProducts);
                updateProductDisplay();
            } catch (error) {
                console.error('Error fetching products:', error);
                // Use default products if API fails
                products = Object.values(defaultProducts);
                updateProductDisplay();
            }
            
            // Product definition should be separate
            const productDetails = {
                info: {
                    asal: 'Semarang, Jawa Tengah',
                    caraSimpan: 'Simpan di tempat sejuk dan kering',
                    minPembelian: '10 lembar'
                },
                wholesale: {
                    min: 100,
                    discount: '10%',
                    price: 900
                },
                sedang: {
                    // Additional properties for 'sedang' here
                }
            };: 'Simpan di tempat sejuk dan kering',
            minPembelian: '10 lembar'
        },
        wholesale: {
            min: 100,
            discount: '10%',
            price: 900
        }
    },
    sedang: {
        name: 'Daun Pisang Sedang',
        price: 700,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Ukuran: 30-40 cm, cocok untuk lontong, ketupat',
        specs: {
            ukuran: '30-40 cm',
            asal: 'Semarang, Jawa Tengah',
            caraSimpan: 'Simpan di tempat sejuk dan kering',
            minPembelian: '10 lembar'
        },
        wholesale: {
            min: 100,
            discount: '10%',
            price: 630
        }
    },
    kecil: {
        name: 'Daun Pisang Kecil',
        price: 500,
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        description: 'Ukuran: 20-30 cm, cocok untuk tempe, tahu bacem',
        specs: {
            ukuran: '20-30 cm',
            asal: 'Semarang, Jawa Tengah',
            caraSimpan: 'Simpan di tempat sejuk dan kering',
            minPembelian: '10 lembar'
        },
        wholesale: {
            min: 100,
            discount: '10%',
            price: 450
        }
    }
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize App
function initializeApp() {
    setupEventListeners();
    updateCartDisplay();
    loadCartFromStorage();
}

// Setup Event Listeners
function setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Cart icon click
    document.querySelector('.cart-icon').addEventListener('click', function(e) {
        e.preventDefault();
        showCart();
    });

    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Checkout form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutForm);
    }
}

// Quantity Controls
// Product Functions
function changeQuantity(productId, change) {
    const input = document.getElementById(`qty-${productId}`);
    if (!input) return;
    
    const currentValue = parseInt(input.value) || 1;
    const newValue = Math.max(1, currentValue + change);
    input.value = newValue;
    updateSubtotal(productId);
}

function updateSubtotal(productId) {
    const input = document.getElementById(`qty-${productId}`);
    const subtotalElement = document.getElementById(`subtotal-${productId}`);
    if (!input || !subtotalElement || !products[productId]) return;

    const quantity = parseInt(input.value) || 1;
    const price = products[productId].price;
    const subtotal = quantity * price;
    subtotalElement.textContent = subtotal.toLocaleString();
}

// Cart Functions
function addToCart(productId) {
    const quantityInput = document.getElementById(`qty-${productId}`);
    if (!quantityInput || !products[productId]) return;

    const quantity = parseInt(quantityInput.value) || 1;
    const product = products[productId];
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity
        });
    }

    updateCartCount();
    showNotification('Produk ditambahkan ke keranjang!');
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (!cartCount) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    showCart();
}

// Display Functions
function showCart() {
    const modal = document.getElementById('cartModal');
    const cartContent = document.getElementById('cartContent');
    const cartTotal = document.getElementById('cartTotal');
    if (!modal || !cartContent || !cartTotal) return;

    let html = '<div class="cart-items">';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Rp ${item.price.toLocaleString()} x ${item.quantity}</p>
                </div>
                <div class="cart-item-total">
                    <p>Rp ${itemTotal.toLocaleString()}</p>
                    <button onclick="removeFromCart('${item.id}')" class="btn-remove">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    html += '</div>';
    cartContent.innerHTML = html;
    cartTotal.textContent = total.toLocaleString();
    modal.style.display = 'block';
}

function showProductDetail(productId) {
    const modal = document.getElementById('productModal');
    const content = document.getElementById('productDetailContent');
    if (!modal || !content || !products[productId]) return;

    const product = products[productId];

    content.innerHTML = `
        <h2>${product.name}</h2>
        <div class="product-detail-content">
            <img src="aset/${productId}.jpg" alt="${product.name}">
            <div class="product-detail-info">
                <p class="price">Rp ${product.price.toLocaleString()}<span>/lembar</span></p>
                <p class="description">${product.description}</p>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Cart icon click
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            showCart();
        });
    }

    // Close modals
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            showNotification(`Terima kasih ${name}! Pesan Anda telah dikirim.`);
            contactForm.reset();
        });
    }

    // Checkout form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = {
                customer_name: document.getElementById('buyerName').value,
                phone: document.getElementById('buyerPhone').value,
                address: document.getElementById('buyerAddress').value,
                payment_method: document.querySelector('input[name="payment"]:checked').value,
                shipping_method: document.querySelector('input[name="shipping"]:checked').value,
                items: cart,
                total_amount: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            };

            try {
                const response = await fetch(`${API_BASE_URL}/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                showNotification('Pesanan berhasil dibuat!');
                cart = [];
                updateCartCount();
                document.getElementById('checkoutModal').style.display = 'none';
            } catch (error) {
                showNotification('Terjadi kesalahan. Silakan coba lagi.', 'error');
                console.error('Error submitting order:', error);
            }
        });
    }

    // Window click to close modals
    window.addEventListener('click', (e) => {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});

function updateQuantity(productType) {
    updateSubtotal(productType);
}

function updateSubtotal(productType) {
    const qty = parseInt(document.getElementById(`qty-${productType}`).value);
    const price = products[productType].price;
    const subtotal = qty * price;
    
    document.getElementById(`subtotal-${productType}`).textContent = subtotal.toLocaleString('id-ID');
}

// Cart Functions
function addToCart(productType) {
    const qty = parseInt(document.getElementById(`qty-${productType}`).value);
    const product = products[productType];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.type === productType);
    
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({
            type: productType,
            name: product.name,
            price: product.price,
            quantity: qty,
            image: product.image
        });
    }
    
    updateCartDisplay();
    saveCartToStorage();
    showSuccessMessage(`${product.name} berhasil ditambahkan ke keranjang!`);
}

function removeFromCart(productType) {
    cart = cart.filter(item => item.type !== productType);
    updateCartDisplay();
    saveCartToStorage();
    updateCartModal();
}

function updateCartItemQuantity(productType, newQty) {
    if (newQty <= 0) {
        removeFromCart(productType);
        return;
    }
    
    const item = cart.find(item => item.type === productType);
    if (item) {
        item.quantity = newQty;
        updateCartDisplay();
        saveCartToStorage();
        updateCartModal();
    }
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Modal Functions
function showProductDetail(productType) {
    const product = products[productType];
    const modal = document.getElementById('productModal');
    const content = document.getElementById('productDetailContent');
    
    content.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <p class="price">Rp ${product.price.toLocaleString('id-ID')}<span>/lembar</span></p>
                <p class="description">${product.description}</p>
                
                <div class="product-specs">
                    <h4>Spesifikasi Produk</h4>
                    <p><strong>Ukuran:</strong> ${product.specs.ukuran}</p>
                    <p><strong>Asal:</strong> ${product.specs.asal}</p>
                    <p><strong>Cara Simpan:</strong> ${product.specs.caraSimpan}</p>
                    <p><strong>Minimal Pembelian:</strong> ${product.specs.minPembelian}</p>
                </div>
                
                <div class="wholesale-info">
                    <h4>Harga Grosir</h4>
                    <p>Beli minimal ${product.wholesale.min} lembar → Diskon ${product.wholesale.discount}</p>
                    <p>Harga grosir: Rp ${product.wholesale.price.toLocaleString('id-ID')}/lembar</p>
                </div>
                
                <div class="quantity-controls">
                    <button class="qty-btn minus" onclick="changeQuantityModal('${productType}', -1)">-</button>
                    <input type="number" id="modal-qty-${productType}" value="1" min="1">
                    <button class="qty-btn plus" onclick="changeQuantityModal('${productType}', 1)">+</button>
                </div>
                
                <button class="btn btn-primary" onclick="addToCartFromModal('${productType}')">Beli Sekarang</button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

function changeQuantityModal(productType, change) {
    const qtyInput = document.getElementById(`modal-qty-${productType}`);
    let currentQty = parseInt(qtyInput.value);
    let newQty = currentQty + change;
    
    if (newQty < 1) newQty = 1;
    qtyInput.value = newQty;
}

function addToCartFromModal(productType) {
    const qty = parseInt(document.getElementById(`modal-qty-${productType}`).value);
    const product = products[productType];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.type === productType);
    
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({
            type: productType,
            name: product.name,
            price: product.price,
            quantity: qty,
            image: product.image
        });
    }
    
    updateCartDisplay();
    saveCartToStorage();
    document.getElementById('productModal').style.display = 'none';
    showSuccessMessage(`${product.name} berhasil ditambahkan ke keranjang!`);
}

function showCart() {
    const modal = document.getElementById('cartModal');
    updateCartModal();
    modal.style.display = 'block';
}

function updateCartModal() {
    const cartContent = document.getElementById('cartContent');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartContent.innerHTML = '<p style="text-align: center; color: #666;">Keranjang belanja kosong</p>';
        cartTotal.textContent = '0';
        return;
    }
    
    let cartHTML = '';
    cart.forEach(item => {
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</p>
                    <p><strong>Subtotal: Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</strong></p>
                </div>
                <div class="cart-item-controls">
                    <button onclick="updateCartItemQuantity('${item.type}', ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartItemQuantity('${item.type}', ${item.quantity + 1})">+</button>
                    <button onclick="removeFromCart('${item.type}')" style="background: #ff4444; margin-left: 1rem;">×</button>
                </div>
            </div>
        `;
    });
    
    cartContent.innerHTML = cartHTML;
    cartTotal.textContent = getCartTotal().toLocaleString('id-ID');
}

function showCheckout() {
    if (cart.length === 0) {
        showErrorMessage('Keranjang belanja kosong!');
        return;
    }
    
    document.getElementById('cartModal').style.display = 'none';
    const modal = document.getElementById('checkoutModal');
    updateOrderSummary();
    modal.style.display = 'block';
}

function updateOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    let summaryHTML = '';
    
    cart.forEach(item => {
        summaryHTML += `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>${item.name} (${item.quantity}x)</span>
                <span>Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</span>
            </div>
        `;
    });
    
    summaryHTML += `
        <div style="border-top: 2px solid #4CAF50; padding-top: 1rem; margin-top: 1rem;">
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2rem;">
                <span>Total:</span>
                <span>Rp ${getCartTotal().toLocaleString('id-ID')}</span>
            </div>
        </div>
    `;
    
    orderSummary.innerHTML = summaryHTML;
}

// Form Handlers
function handleContactForm(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simulate form submission
    showSuccessMessage('Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.');
    
    // Reset form
    e.target.reset();
    
    // In real implementation, you would send this data to your server
    console.log('Contact form submitted:', { name, email, message });
}

function handleCheckoutForm(e) {
    e.preventDefault();
    
    const buyerName = document.getElementById('buyerName').value;
    const buyerPhone = document.getElementById('buyerPhone').value;
    const buyerAddress = document.getElementById('buyerAddress').value;
    const payment = document.querySelector('input[name="payment"]:checked')?.value;
    const shipping = document.querySelector('input[name="shipping"]:checked')?.value;
    
    if (!payment) {
        showErrorMessage('Silakan pilih metode pembayaran!');
        return;
    }
    
    if (!shipping) {
        showErrorMessage('Silakan pilih metode pengiriman!');
        return;
    }
    
    // Create order object
    const order = {
        buyer: {
            name: buyerName,
            phone: buyerPhone,
            address: buyerAddress
        },
        items: cart,
        payment: payment,
        shipping: shipping,
        total: getCartTotal(),
        orderDate: new Date().toISOString()
    };
    
    // Simulate order processing
    processOrder(order);
}

function processOrder(order) {
    // Show loading
    const submitBtn = document.querySelector('#checkoutForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Memproses pesanan...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Close modal
        document.getElementById('checkoutModal').style.display = 'none';
        
        // Clear cart
        cart = [];
        updateCartDisplay();
        saveCartToStorage();
        
        // Show success message with WhatsApp link
        const whatsappMessage = createWhatsAppMessage(order);
        const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(whatsappMessage)}`;
        
        showSuccessMessage(`
            Pesanan berhasil dikonfirmasi! 
            <br><br>
            <a href="${whatsappUrl}" target="_blank" class="btn btn-primary" style="margin-top: 1rem;">
                <i class="fab fa-whatsapp"></i> Lanjutkan ke WhatsApp
            </a>
        `);
        
        // In real implementation, you would send this data to your server
        console.log('Order processed:', order);
    }, 2000);
}

function createWhatsAppMessage(order) {
    let message = `*PESANAN DAUN PISANG SEGAR*\n\n`;
    message += `*Data Pembeli:*\n`;
    message += `Nama: ${order.buyer.name}\n`;
    message += `No. HP: ${order.buyer.phone}\n`;
    message += `Alamat: ${order.buyer.address}\n\n`;
    
    message += `*Detail Pesanan:*\n`;
    order.items.forEach(item => {
        message += `• ${item.name}: ${item.quantity} lembar x Rp ${item.price.toLocaleString('id-ID')} = Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n`;
    });
    
    message += `\n*Total: Rp ${order.total.toLocaleString('id-ID')}*\n\n`;
    message += `*Metode Pembayaran:* ${getPaymentMethodName(order.payment)}\n`;
    message += `*Metode Pengiriman:* ${getShippingMethodName(order.shipping)}\n\n`;
    message += `Mohon konfirmasi pesanan ini. Tim kami akan segera memproses dan mengantar pesanan Anda. Terima kasih! 🍃`;
    
    return message;
}

function getPaymentMethodName(method) {
    const methods = {
        'transfer': 'Transfer Bank',
        'ovo': 'OVO',
        'dana': 'DANA',
        'gopay': 'GoPay'
    };
    return methods[method] || method.toUpperCase();
}

function getShippingMethodName(method) {
    const methods = {
        'antar-langsung': 'Antar Langsung (Gratis Ongkir Area Semarang)',
        'antar-luar-kota': 'Antar ke Luar Kota (Biaya Sesuai Jarak)',
        'cod-semarang': 'COD Area Semarang'
    };
    return methods[method] || method.toUpperCase();
}

// Utility Functions
function showSuccessMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.innerHTML = message;
    
    // Insert at top of page
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
    
    // Scroll to top to show message
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showErrorMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'error-message';
    messageDiv.textContent = message;
    
    // Insert at top of page
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
    
    // Scroll to top to show message
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Local Storage Functions
function saveCartToStorage() {
    localStorage.setItem('daunPisangCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('daunPisangCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// Initialize quantity displays on page load
document.addEventListener('DOMContentLoaded', function() {
    updateSubtotal('besar');
    updateSubtotal('sedang');
    updateSubtotal('kecil');
});

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.product-card, .testimonial-card, .step');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    // Set initial state for animated elements
    const elements = document.querySelectorAll('.product-card, .testimonial-card, .step');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial animation check
    animateOnScroll();
});

// Blog/Article functionality (optional)
function showBlogPost(postId) {
    const blogPosts = {
        'tips-membungkus': {
            title: 'Tips Membungkus Makanan dengan Daun Pisang agar Awet',
            content: `
                <h3>Tips Membungkus Makanan dengan Daun Pisang agar Awet</h3>
                <p>Daun pisang telah digunakan secara turun-temurun sebagai pembungkus makanan alami. Berikut tips agar makanan yang dibungkus daun pisang tetap awet:</p>
                <ol>
                    <li><strong>Pilih daun yang segar:</strong> Pastikan daun pisang masih hijau segar dan tidak layu.</li>
                    <li><strong>Bersihkan dengan baik:</strong> Cuci daun dengan air bersih dan keringkan.</li>
                    <li><strong>Layukan sebentar:</strong> Lewatkan daun di atas api sebentar agar lebih lentur.</li>
                    <li><strong>Bungkus dengan rapat:</strong> Pastikan makanan terbungkus rapat tanpa celah udara.</li>
                    <li><strong>Simpan di tempat sejuk:</strong> Hindari paparan sinar matahari langsung.</li>
                </ol>
                <p>Dengan tips ini, makanan Anda akan tetap segar dan beraroma khas daun pisang!</p>
            `
        },
        'manfaat-daun-pisang': {
            title: 'Manfaat Daun Pisang sebagai Pembungkus Alami',
            content: `
                <h3>Manfaat Daun Pisang sebagai Pembungkus Alami</h3>
                <p>Daun pisang bukan hanya pembungkus tradisional, tetapi juga memiliki banyak manfaat:</p>
                <ul>
                    <li><strong>Ramah Lingkungan:</strong> 100% biodegradable dan tidak mencemari lingkungan.</li>
                    <li><strong>Antibakteri Alami:</strong> Mengandung senyawa yang dapat menghambat pertumbuhan bakteri.</li>
                    <li><strong>Memberikan Aroma Khas:</strong> Menambah cita rasa alami pada makanan.</li>
                    <li><strong>Menjaga Kelembaban:</strong> Mempertahankan tekstur dan kesegaran makanan.</li>
                    <li><strong>Ekonomis:</strong> Harga terjangkau dibanding kemasan modern.</li>
                    <li><strong>Mudah Didapat:</strong> Tersedia di berbagai daerah di Indonesia.</li>
                </ul>
                <p>Mari kembali menggunakan daun pisang untuk mendukung kelestarian lingkungan!</p>
            `
        }
    };
    
    const post = blogPosts[postId];
    if (post) {
        const modal = document.getElementById('productModal');
        const content = document.getElementById('productDetailContent');
        content.innerHTML = post.content;
        modal.style.display = 'block';
    }
}

// Add blog section to footer or create separate blog page
function addBlogSection() {
    const blogHTML = `
        <section id="blog" class="blog" style="padding: 80px 0; background: white;">
            <div class="container">
                <h2 style="text-align: center; font-size: 2.5rem; color: #2c5530; margin-bottom: 3rem;">Artikel & Tips</h2>
                <div class="blog-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                    <div class="blog-card" style="background: #f8f9fa; padding: 2rem; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                        <h3 style="color: #2c5530; margin-bottom: 1rem;">Tips Membungkus Makanan dengan Daun Pisang agar Awet</h3>
                        <p style="color: #666; margin-bottom: 1rem;">Pelajari cara membungkus makanan dengan daun pisang agar tetap segar dan awet...</p>
                        <button class="btn btn-secondary" onclick="showBlogPost('tips-membungkus')">Baca Selengkapnya</button>
                    </div>
                    <div class="blog-card" style="background: #f8f9fa; padding: 2rem; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                        <h3 style="color: #2c5530; margin-bottom: 1rem;">Manfaat Daun Pisang sebagai Pembungkus Alami</h3>
                        <p style="color: #666; margin-bottom: 1rem;">Ketahui berbagai manfaat menggunakan daun pisang untuk kesehatan dan lingkungan...</p>
                        <button class="btn btn-secondary" onclick="showBlogPost('manfaat-daun-pisang')">Baca Selengkapnya</button>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    // Insert blog section before contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.insertAdjacentHTML('beforebegin', blogHTML);
    }
}

// Add blog section when page loads
document.addEventListener('DOMContentLoaded', function() {
    addBlogSection();
});