
        // Mock cart for demonstration
        // Mock cart for demonstration
// Mock cart for demonstration
let cart = [];

// Store some default product data (you can modify this)

const productData = {
    'Demo Product 1': { price: 199, image: 'images/1.jpg' },
    'Demo Product 2': { price: 299, image: 'images/2.jpg' },
    'Demo Product 3': { price: 399, image: 'images/3.jpg' },
    'Demo Product 4': { price: 249, image: 'images/4.jpg' },
    'Demo Product 5': { price: 99, image: 'images/5.jpg' },
    'Demo Product 6': { price: 249, image: 'images/6.jpg' },
    'Demo Product 7': { price: 299, image: 'images/7.jpg' },
    'Demo Product 8': { price: 249, image: 'images/8.jpg' },
    'Demo Product 9': { price: 299, image: 'images/9.jpg' },
    'Demo Product 10': { price: 399, image: 'images/10.jpg' },
    'Demo Product 11': { price: 399, image: 'images/11.jpg' },
    'Demo Product 12': { price: 399, image: 'images/12.jpg' },
    'Demo Product 13': { price: 399, image: 'images/13.jpg' },
    'Demo Product 14': { price: 499, image: 'images/14.jpg' },
    'Demo Product 15': { price: 799, image: 'images/15.jpg' }, // Fixed duplicate key issue
    'Demo Product 16': { price: 499, image: 'images/16.jpg' },
    'Demo Product 17': { price: 249, image: 'images/17.jpg' },
    'Demo Product 18': { price: 799, image: 'images/18.jpg' },
    'Demo Product 19': { price: 499, image: 'images/19.jpg' },
    'Demo Product 20': { price: 249, image: 'images/20.jpg' },
    'Demo Product 21': { price: 799, image: 'images/21.jpg' },
};
function showSection(...sectionIds) {
    // Hide all sections first
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));

    // Show only the specified sections
    sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.classList.add('active');
        }
    });
}

// To display both sections by default, no changes needed in navigation

// Function to add items to the cart
function addToCart(productName, price) {
    const existingItem = cart.find(item => item.productName === productName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ productName, price, quantity: 1 });
    }
    updateCart();
}

// Update the cart display
function updateCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Clear existing items

    let total = 0;
    let tax = 0;
    let shipping = 35.00;
    let totalQuantity = 0; // Variable to store total quantity of all items

    if (cart.length === 0) {
        // Show "Your cart is empty" message
        cartItemsDiv.innerHTML = `<p class="empty-cart-message">🛒 Your cart is empty</p>`;
        document.getElementById('cart-total').innerText = "Total: ₹0.00";
        document.getElementById('taxes').innerText = "Taxes: ₹0.00";
        document.getElementById('shipping').innerText = "Shipping: ₹0.00";
        document.getElementById('final-total').innerText = "Final Total: ₹0.00";
        document.querySelector('.cart-count').innerText = "0"; // Reset counter to 0
        return;
    }

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <img src="${productData[item.productName].image}" alt="${item.productName}">
            <div class="product-info">
                <span>${item.productName}</span>
                <br>
                <div class="quantity-controls">
                    <button onclick="updateQuantity('${item.productName}', -1)">-</button>
                    <input type="text" value="${item.quantity}" readonly />
                    <button onclick="updateQuantity('${item.productName}', 1)">+</button>
                </div>
            </div>
            <span>₹${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart('${item.productName}')">❌️</button>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
        total += item.price * item.quantity;
        totalQuantity += item.quantity; // Increase total quantity count
    });

    tax = total * 0.00; // 10% tax
    const finalTotal = total + tax + shipping;

    document.getElementById('cart-total').innerText = `Total: ₹${total.toFixed(2)}`;
    document.getElementById('taxes').innerText = `Taxes: ₹${tax.toFixed(2)}`;
    document.getElementById('shipping').innerText = `Shipping: ₹${shipping.toFixed(2)}`;
    document.getElementById('final-total').innerText = `Final Total: ₹${finalTotal.toFixed(2)}`;
    
    // Update cart counter to reflect total quantity of all items
    document.querySelector('.cart-count').innerText = totalQuantity;
    
    
    
}

// Call updateCart() when the page loads to show "Your cart is empty" by default
document.addEventListener("DOMContentLoaded", function () {
    updateCart();
});



// Update quantity for a product
function updateQuantity(productName, change) {
    const item = cart.find(item => item.productName === productName);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) item.quantity = 1; // Prevent negative or zero quantity
    }
    updateCart();
}

// Function to remove an item from the cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.productName !== productName);
    updateCart();
}

// Apply discount code function
function applyDiscount() {
    const discountCode = document.getElementById('discount-code').value;
    let discount = 0;
    
    if (discountCode === 'DISCOUNT10') {
        discount = 0.99; // 10% discount
    }
    
    let total = 0;
    let tax = 0;
    let shipping = 35.00;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    tax = total * 0.00; // 10% tax
    const discountAmount = total * discount;
    const finalTotal = total + tax + shipping - discountAmount;

    document.getElementById('final-total').innerText = `Final Total: $${finalTotal.toFixed(2)}`;
}
        // Function to simulate placing an order (Checkout)
        function placeOrder() {
            const name = document.getElementById('checkout-name').value;
            const email = document.getElementById('checkout-email').value;
            const address = document.getElementById('checkout-address').value;

            if (name && email && address) {
                alert(`Thank you for your order, ${name}! Your order will be shipped to: ${address}.`);
                // Clear cart after checkout
                cart = [];
                updateCart();
                showSection('home');
            } else {
                alert('Please fill in all the fields!');
            }
        }

        // Function to view product details
        function viewProduct(productName, price, imageUrl) {
            alert(`Product: ${productName}\nPrice: ${price}\nImage: ${imageUrl}`);
        }

        // Initialize the homepage section as active on load
        document.addEventListener('DOMContentLoaded', () => {
            showSection('home');
        });
 
 // Function to handle "Buy Now" button clicks
function buyNow(productName, price) {
    // Add the product to the cart
    addToCart(productName, price);

    // Redirect to the cart section
    showSection('cart');
}


function openProductPage(productName, images, description, price, reviews) {
    // Get the product-detail section and its child elements
    const productDetailSection = document.getElementById('product-detail');
    const productGallery = productDetailSection.querySelector('.swiper-wrapper');
    const productNameElement = productDetailSection.querySelector('.product-name');
    const productDescriptionElement = productDetailSection.querySelector('.product-description');
    const productPriceElement = productDetailSection.querySelector('.product-price');
    const productReviews = productDetailSection.querySelector('.product-reviews');

    // Update the product gallery with the new images
    productGallery.innerHTML = images
        .map(
            (image) => `
            <div class="swiper-slide">
                <img src="${image}" alt="${productName}">
            </div>
        `
        )
        .join('');

    // Update product details
    productNameElement.textContent = productName;
    productDescriptionElement.textContent = description;
    productPriceElement.textContent = `₹${price.toFixed(2)}`;

    // Update the reviews section
    productReviews.innerHTML = `
        <h3>Customer Reviews</h3>
        ${reviews
            .map(
                (review) => `
            <div class="review">
                <p><strong>${review.name}</strong> <span class="rating">${'⭐'.repeat(review.rating)}</span></p>
                <p>${review.comment}</p>
            </div>
        `
            )
            .join('')}
    `;

    // Show the product-detail section and hide the current section
    document.querySelector('.section.active').classList.remove('active'); // Hide current section
    productDetailSection.classList.add('active'); // Show product-detail section

    // Initialize or reinitialize Swiper for the new images
    new Swiper('.swiper-container', {
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}
// Function to toggle Billing Address form based on the checkbox selection
function toggleBillingAddress() {
    const sameAsShipping = document.getElementById('same-as-shipping').checked;
    const billingForm = document.getElementById('billing-address-form');
    
    // If "Same as Shipping Address" is checked, hide billing address form
    if (sameAsShipping) {
        billingForm.style.display = 'none';  // Hide billing address form
    } else {
        billingForm.style.display = 'block';  // Show billing address form
    }
}

// Function to fill the form fields with default cart info (assumes cart data is available)
function fillFormWithCartData() {
    const cart = getCartData();  // Example function to get cart data
    if (cart && cart.shippingAddress) {
        const shippingAddress = cart.shippingAddress;

        // Pre-fill the shipping address fields with cart data
        document.getElementById('checkout-name').value = shippingAddress.name || '';
        document.getElementById('checkout-email').value = shippingAddress.email || '';
        document.getElementById('checkout-address').value = shippingAddress.address || '';
        document.getElementById('checkout-address2').value = shippingAddress.address2 || '';
        document.getElementById('checkout-pincode').value = shippingAddress.pincode || '';
        document.getElementById('checkout-city').value = shippingAddress.city || '';
        document.getElementById('checkout-state').value = shippingAddress.state || '';
    }
}

// Function to validate the form before placing an order
function validateOrder() {
    // Check if all required fields are filled
    const requiredFields = [
        'checkout-name', 'checkout-email', 'checkout-address', 'checkout-pincode',
        'checkout-city', 'checkout-state'
        , 'checkout-contact'
    ];

    // If billing address is different, validate those fields as well
    if (!document.getElementById('same-as-shipping').checked) {
        requiredFields.push('billing-name', 'billing-email', 'billing-address', 'billing-pincode', 'billing-city', 'billing-state');
    }

    // Loop through each required field and check if it's empty
    for (let fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            alert("Please fill all the required fields.");
            return false;
        }
    }

    // If validation passes, proceed with placing the order
    placeOrder();
    return true;
}

// Function to place the order (this can be connected to an actual order processing backend)
// Initialize EmailJS
(function() {
    emailjs.init("7gY9g2j8kcoGIHIxK"); // Replace with your EmailJS user ID
})();





function placeOrder() {
    const contactNumber = document.getElementById('checkout-contact').value;
    const shippingAddress = {
        name: document.getElementById('checkout-name').value,
        email: document.getElementById('checkout-email').value,
        address: document.getElementById('checkout-address').value,
        address2: document.getElementById('checkout-address2').value,
        pincode: document.getElementById('checkout-pincode').value,
        city: document.getElementById('checkout-city').value,
        state: document.getElementById('checkout-state').value,
        total: document.getElementById('final-total').innerText,
    };
    
    let billingAddress = null;

    // Check if "Different from shipping" is checked
    if (!document.getElementById('same-as-shipping').checked) {
        billingAddress = {
            name: document.getElementById('billing-name').value,
            email: document.getElementById('billing-email').value,
            address: document.getElementById('billing-address').value,
            address2: document.getElementById('billing-address2').value,
            pincode: document.getElementById('billing-pincode').value,
            city: document.getElementById('billing-city').value,
            state: document.getElementById('billing-state').value,
        };
    }

    
    // Get payment method
    const paymentMethod = document.getElementById('payment-method').value;

// Create order object with numeric finalTotal
const formattedTotal = document.getElementById('final-total').innerText.trim();
const numericTotal = parseFloat(
    formattedTotal
        .replace(/[^0-9.]/g, '') // Remove currency symbols
        .replace(/,/g, '')       // Remove thousand separators
) || 0;

const orderDetails = {
    contactNumber,
    shippingAddress,
    billingAddress,
    paymentMethod,
    cartItems: getCartData(),
    orderDate: new Date().toISOString(),
    finalTotal: numericTotal, // Add cleaned numeric value
    orderStatus: "Unfulfilled[COD]" // Add initial status
};

    // ✅ Ensure the module function is being called correctly
    if (typeof window.saveOrderToFirebase === "function") {
        window.saveOrderToFirebase(orderDetails);
    } else {
        console.error("Error: saveOrderToFirebase is not defined or not loaded yet.");
        alert("Order placement failed. Please try again later.");
        return; // Stop execution if function is missing
    }

    // ✅ Send email with order details using EmailJS
    emailjs.send("service_vu3yx5c", "template_ha7jtcq", {
        contactNumber: orderDetails.contactNumber,
        shippingName: orderDetails.shippingAddress.name,
        shippingEmail: orderDetails.shippingAddress.email,
        shippingAddress: orderDetails.shippingAddress.address,
        shippingAddress2: orderDetails.shippingAddress.address2,
        shippingPincode: orderDetails.shippingAddress.pincode,
        shippingCity: orderDetails.shippingAddress.city,
        shippingState: orderDetails.shippingAddress.state,
        billingName: orderDetails.billingAddress ? orderDetails.billingAddress.name : "N/A",
        billingEmail: orderDetails.billingAddress ? orderDetails.billingAddress.email : "N/A",
        billingAddress: orderDetails.billingAddress ? orderDetails.billingAddress.address : "N/A",
        billingAddress2: orderDetails.billingAddress ? orderDetails.billingAddress.address2 : "N/A",
        billingPincode: orderDetails.billingAddress ? orderDetails.billingAddress.pincode : "N/A",
        billingCity: orderDetails.billingAddress ? orderDetails.billingAddress.city : "N/A",
        billingState: orderDetails.billingAddress ? orderDetails.billingAddress.state : "N/A",
        paymentMethod: orderDetails.paymentMethod,
        cartItems: JSON.stringify(orderDetails.cartItems),
    }).then(function(response) {
        console.log("Email sent successfully", response);
        
    }).catch(function(error) {
        console.error("Error sending email:", error);
        
    });
    
}
// Function to get cart data (mock function)


function getCartData() {
    // Getting shipping address data from the input fields
    const shippingAddress = {
        name: document.getElementById('name').value || '',
        email: document.getElementById('email').value || '',
        address: document.getElementById('address1').value || '',
        address2: document.getElementById('address2').value || '',
        pincode: document.getElementById('pincode').value || '',
        city: document.getElementById('city').value || '',
        state: document.getElementById('state').value || '',
    };
    
    // Update totals
document.getElementById('order-total').innerHTML = document.getElementById('final-total').innerHTML;
document.getElementById('taxes').innerHTML = document.getElementById('taxes').innerHTML;
document.getElementById('shipping').innerHTML = document.getElementById('shipping').innerHTML;
document.getElementById('final-total').innerHTML = document.getElementById('final-total').innerHTML;

    // Get the cart items from the cart HTML structure
    const items = [];
    const cartItemsDiv = document.getElementById('cart-items');
    
    // Loop through each item in the cart
    const cartItems = cartItemsDiv.getElementsByClassName('cart-item');  // We are assuming the cart items are within divs with the class 'cart-item'
    for (let itemDiv of cartItems) {
        // Get product name and price
        const productName = itemDiv.querySelector('.product-info span').textContent.trim();
        const priceText = itemDiv.querySelector('.product-info + span').textContent;
        const price = parseFloat(priceText.replace('$', '').trim()) || 0;

        // Get quantity
        const quantity = parseInt(itemDiv.querySelector('.quantity-controls input').value) || 1;

        // Push the item data to the items array
        items.push({
            productName,
            price,
            quantity
        });
    }

    // Return the shipping address and cart items
    return {
        shippingAddress,
        items,
    };
}
// Pre-fill the form with the cart data when the page loads
window.onload = function() {
    fillFormWithCartData();
};





     
function proceedToCheckout() {
    // First, call the function to show the checkout section

    // Check if the cart is empty by verifying if the items array is empty
    const cartData = getCartData(); // Get the cart data
    if (cartData.items.length === 0) {
        alert("Your cart is empty. Please add items to your cart before proceeding to checkout.");
        return; // Stop the checkout process if the cart is empty
    }

    // Check if all required fields are filled
    const requiredFields = [
        'name', 'email', 'address1', 'pincode', 'city', 'state'
    ];

    // If billing address is different, validate those fields as well
    if (!document.getElementById('same-as-shipping').checked) {
        requiredFields.push('billing-name', 'billing-email', 'billing-address', 'billing-pincode', 'billing-city', 'billing-state');
    }

    // Loop through each required field and check if it's empty
    for (let fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            alert("Please fill all the required fields.");
            return;  // Stop the process if any field is empty
        }
    }

    // If validation passes, proceed with checkout (this can be your order placement logic)
    // Then, pre-fill the shipping address form with cart data
    fillFormWithCartData();
    showSection('checkout');

    // Add event listeners to the form fields to trigger validation before checkout
}
// Ensure both #home and #home2 are active on page load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('home').classList.add('active');
    document.getElementById('home2').classList.add('active');
    document.getElementById('sale-timer').classList.add('active');
    
    document.getElementById('macrame-featured-section').classList.add('active');
    
});

function searchProducts() {
    const query = document.getElementById('search-bar').value.toLowerCase(); // Get the search query from the search bar
    const productCards = document.querySelectorAll('.product-card'); // Select all the product cards

    // Loop through each product card
    productCards.forEach(card => {
        const productNameElement = card.querySelector('h3'); // Select the h3 inside the product card

        if (productNameElement) {
            const productName = productNameElement.textContent.toLowerCase(); // Get the product name in lowercase

            // Check if the product name includes the search query
            if (productName.includes(query)) {
                card.style.display = ''; // Show the product card if it matches
            } else {
                card.style.display = 'none'; // Hide the product card if it doesn't match
            }
        }
    });
}
function startSaleTimer() {
    let hours = 3, minutes = 0, seconds = 0; // 3-hour timer

    function updateTimerDisplay() {
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }

    function countdown() {
        if (hours === 0 && minutes === 0 && seconds === 0) {
            hours = 3; // Reset timer back to 3 hours
            minutes = 0;
            seconds = 0;
        } else {
            if (seconds === 0) {
                if (minutes === 0) {
                    hours--;
                    minutes = 59;
                } else {
                    minutes--;
                }
                seconds = 59;
            } else {
                seconds--;
            }
        }
        updateTimerDisplay();
    }

    updateTimerDisplay(); // Initialize display
    setInterval(countdown, 1000); // Run countdown every second
}

// Start the timer when the page loads
window.onload = startSaleTimer;

// Toggle Chatbox
function toggleChatbox() {
    const chatbox = document.getElementById('chatbox');
    chatbox.style.display = chatbox.style.display === 'flex' ? 'none' : 'flex';
}

// Send Chat Message via EmailJS
function sendChatMessage() {
    const message = document.getElementById('chat-message').value;

    if (message.trim() === '') {
        alert('Please enter a message.');
        return;
    }

    // Initialize EmailJS (replace with your own EmailJS user ID)
   emailjs.send("service_vu3yx5c", "template_ha7jtcq", {
        user_message: message,
    })
    .then(() => {
        alert("Message sent successfully!");
        document.getElementById('chat-message').value = ''; // Clear input
        toggleChatbox(); // Close chatbox
    })
    .catch(error => {
        alert("Failed to send message. Please try again.");
        console.error(error);
    });
}



document.getElementById("payment-method").addEventListener("change", function() {
    let selectedMethod = this.value;
    let placeOrderBtn = document.querySelector(".place-order-btn");
    let razorpayBtn = document.getElementById("rzp-button1");

    if (selectedMethod !== "cod") {
        placeOrderBtn.style.display = "none";  // Hide Place Order Button
        razorpayBtn.style.display = "block";   // Show Razorpay Button
    } else {
        placeOrderBtn.style.display = "block";
        razorpayBtn.style.display = "none";
    }
});
        // Function to save form data and checkbox state to localStorage
        function saveFormDataToLocalStorage() {
            const formData = {
                name: document.getElementById('name').value || '',
                email: document.getElementById('email').value || '',
                address: document.getElementById('address1').value || '',
                address2: document.getElementById('address2').value || '',
                pincode: document.getElementById('pincode').value || '',
                city: document.getElementById('city').value || '',
                state: document.getElementById('state').value || '',
            };

            const saveData = document.getElementById('saveDataCheckbox').checked;

            // Save form data and checkbox state to localStorage
            localStorage.setItem('userFormData', JSON.stringify(formData));
            localStorage.setItem('saveDataEnabled', JSON.stringify(saveData));
        }

        // Function to auto-fill form fields from localStorage if data exists
        function fillFormFromLocalStorage() {
            const savedData = JSON.parse(localStorage.getItem('userFormData'));
            const isSaveEnabled = JSON.parse(localStorage.getItem('saveDataEnabled'));

            if (isSaveEnabled && savedData) {
                // Fill form fields if data is saved and checkbox is checked
                document.getElementById('name').value = savedData.name || '';
                document.getElementById('email').value = savedData.email || '';
                document.getElementById('address1').value = savedData.address || '';
                document.getElementById('address2').value = savedData.address2 || '';
                document.getElementById('pincode').value = savedData.pincode || '';
                document.getElementById('city').value = savedData.city || '';
                document.getElementById('state').value = savedData.state || '';
                document.getElementById('saveDataCheckbox').checked = true;
            } else {
                // Ensure the checkbox is unchecked if no data is saved
                document.getElementById('saveDataCheckbox').checked = false;
            }
        }

        // Event listener to save data when checkbox is clicked
        document.getElementById('saveDataCheckbox').addEventListener('change', saveFormDataToLocalStorage);

        // Fill the form with data from localStorage when the page loads
        window.onload = function() {
            fillFormFromLocalStorage(); // Auto-fill the form on page load
        };
  

  