/**
 * Shopping Cart Manager Module
 * Heritage & Threads E-Commerce
 */

class CartManager {
    constructor() {
        this.items = this.loadCart();
        this.discountRate = 0;
        this.appliedCoupon = "";
        this.shippingFee = 15.00;
        this.freeShippingThreshold = 150.00;
        this.listeners = [];
    }

    // Load saved cart from localStorage
    loadCart() {
        try {
            const saved = localStorage.getItem("heritage_cart");
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Could not load cart from localStorage", e);
            return [];
        }
    }

    // Save cart to localStorage
    saveCart() {
        try {
            localStorage.setItem("heritage_cart", JSON.stringify(this.items));
            this.notifyListeners();
        } catch (e) {
            console.error("Could not save cart to localStorage", e);
        }
    }

    // Add listener for state changes
    subscribe(callback) {
        this.listeners.push(callback);
    }

    notifyListeners() {
        this.listeners.forEach(cb => cb(this.getSummary()));
    }

    // Add product to cart
    addItem(product, selectedSize = null, selectedColor = null, quantity = 1) {
        const size = selectedSize || (product.sizes ? product.sizes[0] : "Default");
        const color = selectedColor || (product.colors ? product.colors[0].name : "Default");
        
        // Check if item with same ID, size, and color already exists
        const existingIndex = this.items.findIndex(item => 
            item.id === product.id && item.selectedSize === size && item.selectedColor === color
        );

        if (existingIndex > -1) {
            this.items[existingIndex].quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                category: product.category,
                price: product.price,
                image: product.image,
                era: product.era,
                selectedSize: size,
                selectedColor: color,
                quantity: quantity,
                maxStock: product.inStock || 10
            });
        }

        this.saveCart();
    }

    // Update item quantity
    updateQuantity(index, newQty) {
        if (index >= 0 && index < this.items.length) {
            if (newQty <= 0) {
                this.removeItem(index);
            } else {
                this.items[index].quantity = Math.min(newQty, this.items[index].maxStock);
                this.saveCart();
            }
        }
    }

    // Remove item from cart
    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
            this.saveCart();
        }
    }

    // Apply promo discount code
    applyCoupon(code) {
        const cleanCode = code.trim().toUpperCase();
        if (PROMO_CODES[cleanCode]) {
            this.discountRate = PROMO_CODES[cleanCode];
            this.appliedCoupon = cleanCode;
            this.notifyListeners();
            return { success: true, message: `Coupon ${cleanCode} applied (${this.discountRate * 100}% OFF)!` };
        } else {
            return { success: false, message: "Invalid promo code. Try 'VINTAGE10'" };
        }
    }

    // Remove applied coupon
    removeCoupon() {
        this.discountRate = 0;
        this.appliedCoupon = "";
        this.notifyListeners();
    }

    // Clear entire cart
    clearCart() {
        this.items = [];
        this.discountRate = 0;
        this.appliedCoupon = "";
        this.saveCart();
    }

    // Get total count of items in cart
    getTotalCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Calculate financials
    getSummary() {
        const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discountAmount = subtotal * this.discountRate;
        const netSubtotal = subtotal - discountAmount;
        
        // Free shipping if subtotal after discount >= threshold, or if cart is empty ($0)
        const isFreeShipping = netSubtotal >= this.freeShippingThreshold || subtotal === 0;
        const shipping = isFreeShipping ? 0 : this.shippingFee;
        const estimatedTax = netSubtotal * 0.08; // 8% sales tax
        const total = netSubtotal + shipping + estimatedTax;

        return {
            items: this.items,
            itemCount: this.getTotalCount(),
            subtotal: subtotal,
            discountRate: this.discountRate,
            discountAmount: discountAmount,
            appliedCoupon: this.appliedCoupon,
            shipping: shipping,
            isFreeShipping: isFreeShipping,
            freeShippingThreshold: this.freeShippingThreshold,
            tax: estimatedTax,
            total: total
        };
    }
}

// Global Cart Instance
const cart = new CartManager();
