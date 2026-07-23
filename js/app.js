/**
 * Main Application Logic Controller
 * Heritage & Threads Vintage E-Commerce
 */

document.addEventListener("DOMContentLoaded", () => {
    // --- Application State ---
    let currentCategory = "All";
    let currentSearchQuery = "";
    let currentSort = "featured";
    let activeProductModal = null;
    let selectedModalSize = null;
    let selectedModalColor = null;
    let selectedModalQty = 1;
    let qrTimerInterval = null;

    // --- DOM Element References ---
    const productGridEl = document.getElementById("productGrid");
    const categoryTabsEl = document.getElementById("categoryTabs");
    const sortSelectEl = document.getElementById("sortSelect");
    const searchInputEl = document.getElementById("searchInput");
    
    // Modal Elements
    const productModalBackdrop = document.getElementById("productModalBackdrop");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalMainImg = document.getElementById("modalMainImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalPrice = document.getElementById("modalPrice");
    const modalDesc = document.getElementById("modalDesc");
    const modalSizePicker = document.getElementById("modalSizePicker");
    const modalColorPicker = document.getElementById("modalColorPicker");
    const modalQtyInput = document.getElementById("modalQtyInput");
    const modalQtyMinus = document.getElementById("modalQtyMinus");
    const modalQtyPlus = document.getElementById("modalQtyPlus");
    const modalDetailsList = document.getElementById("modalDetailsList");
    const modalAddToCartBtn = document.getElementById("modalAddToCartBtn");
    
    // Cart Drawer Elements
    const cartToggleBtn = document.getElementById("cartToggleBtn");
    const cartDrawerBackdrop = document.getElementById("cartDrawerBackdrop");
    const cartCloseBtn = document.getElementById("cartCloseBtn");
    const cartItemsListEl = document.getElementById("cartItemsList");
    const cartBadgeEl = document.getElementById("cartCountBadge");
    const cartSubtotalEl = document.getElementById("cartSubtotal");
    const cartDiscountRow = document.getElementById("cartDiscountRow");
    const cartDiscountEl = document.getElementById("cartDiscount");
    const cartTotalEl = document.getElementById("cartTotal");
    const couponInput = document.getElementById("couponInput");
    const applyCouponBtn = document.getElementById("applyCouponBtn");
    const checkoutBtn = document.getElementById("checkoutBtn");
    
    // Checkout Elements
    const checkoutView = document.getElementById("checkoutView");
    const closeCheckoutBtn = document.getElementById("closeCheckoutBtn");
    const checkoutForm = document.getElementById("checkoutForm");
    const qrContainer = document.getElementById("qrContainer");
    const qrCanvasBox = document.getElementById("qrCanvasBox");
    const qrTimerEl = document.getElementById("qrTimer");
    const simulatePaymentBtn = document.getElementById("simulatePaymentBtn");
    const orderConfirmationView = document.getElementById("orderConfirmationView");
    const checkoutSummaryTotal = document.getElementById("checkoutSummaryTotal");
    const checkoutSummarySubtotal = document.getElementById("checkoutSummarySubtotal");

    // --- Init App ---
    function init() {
        renderCategoryTabs();
        renderProducts();
        bindEvents();
        cart.subscribe(updateCartUI);
        updateCartUI(cart.getSummary());
    }

    // --- Render Category Tabs ---
    function renderCategoryTabs() {
        if (!categoryTabsEl) return;
        categoryTabsEl.innerHTML = CATEGORIES.map(cat => `
            <button class="tab-btn ${cat === currentCategory ? 'active' : ''}" data-category="${cat}">
                ${cat}
            </button>
        `).join('');
    }

    // --- Filter & Sort Products ---
    function getFilteredProducts() {
        return PRODUCTS.filter(product => {
            const matchesCategory = currentCategory === "All" || product.category === currentCategory;
            const matchesSearch = product.name.toLowerCase().includes(currentSearchQuery) || 
                                  product.description.toLowerCase().includes(currentSearchQuery) ||
                                  product.era.toLowerCase().includes(currentSearchQuery);
            return matchesCategory && matchesSearch;
        }).sort((a, b) => {
            if (currentSort === "price-low") return a.price - b.price;
            if (currentSort === "price-high") return b.price - a.price;
            if (currentSort === "rating") return b.rating - a.rating;
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        });
    }

    // --- Render Products Grid ---
    function renderProducts() {
        if (!productGridEl) return;
        const products = getFilteredProducts();

        if (products.length === 0) {
            productGridEl.innerHTML = `
                <div class="empty-catalog">
                    <div class="empty-icon">📜</div>
                    <h3 style="font-family: var(--font-heading); font-size: 1.5rem; margin-bottom: 0.5rem;">No Vintage Items Found</h3>
                    <p style="color: var(--color-brown-light);">Try clearing your search or switching to another category tab.</p>
                </div>
            `;
            return;
        }

        productGridEl.innerHTML = products.map(product => `
            <div class="product-card" data-id="${product.id}">
                <div class="card-image-container">
                    <div class="card-badge-top">
                        <span class="badge badge-era">${product.era}</span>
                        ${product.featured ? '<span class="badge badge-rare">Rare Find</span>' : ''}
                    </div>
                    <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy" />
                </div>
                <div class="card-content">
                    <div class="card-category-era">
                        <span>${product.category}</span>
                        <span>${product.condition}</span>
                    </div>
                    <h3 class="card-title" data-action="view">${product.name}</h3>
                    <div class="card-rating">
                        <span class="star-icon">★</span>
                        <span>${product.rating}</span>
                        <span style="color: var(--color-brown-light)">(${product.reviewsCount} reviews)</span>
                    </div>
                    <div class="card-footer">
                        <div class="price-box">
                            <span class="current-price">$${product.price.toFixed(2)}</span>
                            ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                        </div>
                        <button class="btn btn-primary card-add-btn" data-action="add-cart">
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // --- Product Detail Modal ---
    function openProductModal(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        activeProductModal = product;
        selectedModalSize = product.sizes ? product.sizes[0] : null;
        selectedModalColor = product.colors ? product.colors[0].name : null;
        selectedModalQty = 1;

        modalMainImg.src = product.image;
        modalMainImg.alt = product.name;
        modalTitle.textContent = product.name;
        modalCategory.textContent = `${product.category} • ${product.era} • ${product.condition}`;
        modalPrice.textContent = `$${product.price.toFixed(2)}`;
        modalDesc.textContent = product.description;
        modalQtyInput.value = 1;

        // Render Size Options
        if (product.sizes && product.sizes.length > 0) {
            modalSizePicker.innerHTML = product.sizes.map((size, idx) => `
                <button class="size-chip ${idx === 0 ? 'active' : ''}" data-size="${size}">${size}</button>
            `).join('');
            modalSizePicker.parentElement.style.display = "flex";
        } else {
            modalSizePicker.parentElement.style.display = "none";
        }

        // Render Color Options
        if (product.colors && product.colors.length > 0) {
            modalColorPicker.innerHTML = product.colors.map((c, idx) => `
                <div class="color-dot ${idx === 0 ? 'active' : ''}" data-color="${c.name}" style="background-color: ${c.hex}" title="${c.name}"></div>
            `).join('');
            modalColorPicker.parentElement.style.display = "flex";
        } else {
            modalColorPicker.parentElement.style.display = "none";
        }

        // Details list
        modalDetailsList.innerHTML = product.details.map(d => `<li>${d}</li>`).join('');

        productModalBackdrop.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeProductModal() {
        productModalBackdrop.classList.remove("active");
        document.body.style.overflow = "";
        activeProductModal = null;
    }

    // --- Cart Drawer Management ---
    function toggleCartDrawer(open) {
        if (open) {
            cartDrawerBackdrop.classList.add("active");
            document.body.style.overflow = "hidden";
        } else {
            cartDrawerBackdrop.classList.remove("active");
            document.body.style.overflow = "";
        }
    }

    function updateCartUI(summary) {
        // Update badge count
        if (cartBadgeEl) cartBadgeEl.textContent = summary.itemCount;

        // Render Items in Cart Drawer
        if (!cartItemsListEl) return;

        if (summary.items.length === 0) {
            cartItemsListEl.innerHTML = `
                <div class="empty-cart-msg">
                    <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🛍️</div>
                    <p style="font-weight: 600;">Your vintage cart is empty</p>
                    <p style="font-size: 0.85rem;">Discover timeless pieces in our collection!</p>
                </div>
            `;
            checkoutBtn.disabled = true;
        } else {
            checkoutBtn.disabled = false;
            cartItemsListEl.innerHTML = summary.items.map((item, index) => `
                <div class="cart-item-card" data-index="${index}">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-meta">Size: ${item.selectedSize} | ${item.selectedColor}</div>
                        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                        <div class="cart-item-actions">
                            <div class="qty-picker" style="transform: scale(0.85); transform-origin: left center;">
                                <button class="qty-btn" data-cart-action="minus" data-index="${index}">-</button>
                                <input type="text" class="qty-input" value="${item.quantity}" readonly />
                                <button class="qty-btn" data-cart-action="plus" data-index="${index}">+</button>
                            </div>
                            <button class="cart-remove-btn" data-cart-action="remove" data-index="${index}">Remove</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Subtotals
        cartSubtotalEl.textContent = `$${summary.subtotal.toFixed(2)}`;
        if (summary.discountAmount > 0) {
            cartDiscountRow.style.display = "flex";
            cartDiscountEl.textContent = `-$${summary.discountAmount.toFixed(2)}`;
        } else {
            cartDiscountRow.style.display = "none";
        }
        cartTotalEl.textContent = `$${summary.total.toFixed(2)}`;
    }

    // --- Checkout & Scannable QR Code Payment Flow ---
    function openCheckout() {
        const summary = cart.getSummary();
        if (summary.items.length === 0) return;

        toggleCartDrawer(false);
        checkoutView.classList.add("active");
        orderConfirmationView.style.display = "none";
        checkoutForm.style.display = "block";
        document.body.style.overflow = "hidden";

        checkoutSummarySubtotal.textContent = `$${summary.subtotal.toFixed(2)}`;
        checkoutSummaryTotal.textContent = `$${summary.total.toFixed(2)}`;

        // Generate QR code payment preview
        generatePaymentQRCode(summary.total);
    }

    function closeCheckout() {
        checkoutView.classList.remove("active");
        document.body.style.overflow = "";
        if (qrTimerInterval) clearInterval(qrTimerInterval);
    }

    // Generate dynamic QR Code for payment simulation
    function generatePaymentQRCode(amount) {
        if (!qrCanvasBox) return;
        qrCanvasBox.innerHTML = "";

        const orderId = "HERITAGE-" + Math.floor(100000 + Math.random() * 900000);
        const upiPayload = `upi://pay?pa=heritage.threads@vintage&pn=Heritage%20Threads&am=${amount.toFixed(2)}&cu=USD&tn=Order%20${orderId}`;

        // Render QR Code using standalone library
        new QRCode(qrCanvasBox, {
            text: upiPayload,
            width: 180,
            height: 180,
            colorDark: "#2B2C28",
            colorLight: "#FAEDCD"
        });

        // 10-Minute Countdown Timer Simulation
        let timeLeft = 600; // 10 minutes in seconds
        if (qrTimerInterval) clearInterval(qrTimerInterval);

        qrTimerInterval = setInterval(() => {
            timeLeft--;
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            qrTimerEl.textContent = `⏱️ QR Code expires in ${mins}:${secs < 10 ? '0' : ''}${secs}`;

            if (timeLeft <= 0) {
                clearInterval(qrTimerInterval);
                qrTimerEl.textContent = "⚠️ QR Code expired. Please refresh checkout.";
            }
        }, 1000);
    }

    // Handle Payment Simulation
    function handleSimulatedPayment() {
        const summary = cart.getSummary();
        const orderId = "HT-" + Math.floor(100000 + Math.random() * 900000);
        const orderDate = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });

        // Switch to Order Confirmation Receipt View
        checkoutForm.style.display = "none";
        orderConfirmationView.style.display = "block";
        if (qrTimerInterval) clearInterval(qrTimerInterval);

        orderConfirmationView.innerHTML = `
            <div class="stamp-icon">✓</div>
            <h2 style="font-family: var(--font-heading); font-size: 2rem; color: var(--color-charcoal); margin-bottom: 0.5rem;">Payment Received!</h2>
            <p style="color: var(--color-brown-light);">Thank you for shopping with Heritage & Threads.</p>

            <div class="receipt-summary">
                <div style="border-bottom: 1px dashed var(--color-border-dark); padding-bottom: 0.5rem; margin-bottom: 0.75rem; font-weight: 700;">
                    ORDER RECEIPT #${orderId}
                </div>
                <div>Date: ${orderDate}</div>
                <div>Payment Method: QR Code Mobile Scan</div>
                <div style="margin-top: 0.75rem; border-top: 1px dashed var(--color-border-dark); padding-top: 0.75rem;">
                    ${summary.items.map(item => `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
                            <span>${item.quantity}x ${item.name} (${item.selectedSize})</span>
                            <span>$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                </div>
                <div style="border-top: 1px dashed var(--color-border-dark); margin-top: 0.75rem; padding-top: 0.5rem; display: flex; justify-content: space-between; font-weight: 700; font-size: 1rem;">
                    <span>TOTAL PAID:</span>
                    <span style="color: var(--color-terracotta);">$${summary.total.toFixed(2)}</span>
                </div>
            </div>

            <p style="font-size: 0.88rem; color: var(--color-brown-faded); margin-bottom: 1.5rem;">
                A confirmation email and tracking link have been dispatched. Your handcrafted vintage items are being prepared for shipping!
            </p>
            <button class="btn btn-primary" id="finishOrderBtn">Continue Shopping</button>
        `;

        document.getElementById("finishOrderBtn").addEventListener("click", () => {
            cart.clearCart();
            closeCheckout();
        });

        showToast("Payment Verified! Order Confirmed.");
    }

    // --- Toast Notifications ---
    function showToast(message) {
        let container = document.getElementById("toastContainer");
        if (!container) {
            container = document.createElement("div");
            container.id = "toastContainer";
            container.className = "toast-container";
            document.body.appendChild(container);
        }

        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerHTML = `<span>📜</span><span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transition = "opacity 0.3s ease";
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // --- Event Listeners ---
    function bindEvents() {
        // Category Filter Click
        if (categoryTabsEl) {
            categoryTabsEl.addEventListener("click", (e) => {
                if (e.target.classList.contains("tab-btn")) {
                    currentCategory = e.target.dataset.category;
                    renderCategoryTabs();
                    renderProducts();
                }
            });
        }

        // Sort Select Change
        if (sortSelectEl) {
            sortSelectEl.addEventListener("change", (e) => {
                currentSort = e.target.value;
                renderProducts();
            });
        }

        // Live Search Input
        if (searchInputEl) {
            searchInputEl.addEventListener("input", (e) => {
                currentSearchQuery = e.target.value.toLowerCase().trim();
                renderProducts();
            });
        }

        // Product Grid Click Delegation
        if (productGridEl) {
            productGridEl.addEventListener("click", (e) => {
                const card = e.target.closest(".product-card");
                if (!card) return;
                const productId = card.dataset.id;
                const product = PRODUCTS.find(p => p.id === productId);

                if (e.target.closest('[data-action="add-cart"]')) {
                    e.stopPropagation();
                    cart.addItem(product);
                    showToast(`Added ${product.name} to your cart!`);
                } else {
                    openProductModal(productId);
                }
            });
        }

        // Modal Close Button & Backdrop
        if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeProductModal);
        if (productModalBackdrop) {
            productModalBackdrop.addEventListener("click", (e) => {
                if (e.target === productModalBackdrop) closeProductModal();
            });
        }

        // Modal Size / Color Pickers
        if (modalSizePicker) {
            modalSizePicker.addEventListener("click", (e) => {
                if (e.target.classList.contains("size-chip")) {
                    modalSizePicker.querySelectorAll(".size-chip").forEach(c => c.classList.remove("active"));
                    e.target.classList.add("active");
                    selectedModalSize = e.target.dataset.size;
                }
            });
        }

        if (modalColorPicker) {
            modalColorPicker.addEventListener("click", (e) => {
                if (e.target.classList.contains("color-dot")) {
                    modalColorPicker.querySelectorAll(".color-dot").forEach(c => c.classList.remove("active"));
                    e.target.classList.add("active");
                    selectedModalColor = e.target.dataset.color;
                }
            });
        }

        // Modal Quantity Adjusters
        if (modalQtyMinus) {
            modalQtyMinus.addEventListener("click", () => {
                if (selectedModalQty > 1) {
                    selectedModalQty--;
                    modalQtyInput.value = selectedModalQty;
                }
            });
        }

        if (modalQtyPlus) {
            modalQtyPlus.addEventListener("click", () => {
                selectedModalQty++;
                modalQtyInput.value = selectedModalQty;
            });
        }

        // Modal Add to Cart
        if (modalAddToCartBtn) {
            modalAddToCartBtn.addEventListener("click", () => {
                if (activeProductModal) {
                    cart.addItem(activeProductModal, selectedModalSize, selectedModalColor, selectedModalQty);
                    showToast(`Added ${activeProductModal.name} to cart!`);
                    closeProductModal();
                    toggleCartDrawer(true);
                }
            });
        }

        // Cart Drawer Toggle
        if (cartToggleBtn) cartToggleBtn.addEventListener("click", () => toggleCartDrawer(true));
        if (cartCloseBtn) cartCloseBtn.addEventListener("click", () => toggleCartDrawer(false));
        if (cartDrawerBackdrop) {
            cartDrawerBackdrop.addEventListener("click", (e) => {
                if (e.target === cartDrawerBackdrop) toggleCartDrawer(false);
            });
        }

        // Cart Item Actions (Quantity, Remove)
        if (cartItemsListEl) {
            cartItemsListEl.addEventListener("click", (e) => {
                const action = e.target.dataset.cartAction;
                const index = parseInt(e.target.dataset.index);
                if (isNaN(index)) return;

                if (action === "minus") {
                    const item = cart.items[index];
                    cart.updateQuantity(index, item.quantity - 1);
                } else if (action === "plus") {
                    const item = cart.items[index];
                    cart.updateQuantity(index, item.quantity + 1);
                } else if (action === "remove") {
                    cart.removeItem(index);
                }
            });
        }

        // Apply Coupon Code
        if (applyCouponBtn) {
            applyCouponBtn.addEventListener("click", () => {
                const result = cart.applyCoupon(couponInput.value);
                showToast(result.message);
            });
        }

        // Checkout Button Click
        if (checkoutBtn) checkoutBtn.addEventListener("click", openCheckout);
        if (closeCheckoutBtn) closeCheckoutBtn.addEventListener("click", closeCheckout);

        // Payment Option Switch
        const paymentOpts = document.querySelectorAll(".payment-opt");
        paymentOpts.forEach(opt => {
            opt.addEventListener("click", () => {
                paymentOpts.forEach(o => o.classList.remove("active"));
                opt.classList.add("active");

                if (opt.dataset.method === "qr") {
                    qrContainer.style.display = "flex";
                } else {
                    qrContainer.style.display = "none";
                }
            });
        });

        // Simulate Payment Trigger Button
        if (simulatePaymentBtn) {
            simulatePaymentBtn.addEventListener("click", handleSimulatedPayment);
        }
    }

    // Launch App
    init();
});
