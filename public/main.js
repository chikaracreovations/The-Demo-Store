
    // Import Firebase SDKs
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
    import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
    import { getFirestore, collection, addDoc, getDocs, doc, updateDoc  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
    

    // Firebase configuration
    
    const firebaseConfig = {
    apiKey: "AIzaSyCiQsm5ARzxpkVmxWyKQlYAkso8zIdYxO8",
    authDomain: "the-demo-store.firebaseapp.com",
    projectId: "the-demo-store",
    storageBucket: "the-demo-store.firebasestorage.app",
    messagingSenderId: "41447504329",
    appId: "1:41447504329:web:0af0c1ece41c0aa8971018",
    measurementId: "G-HCMES5GED4"
  };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app); // Firestore database instance

    /**
     * Function to save an order to Firestore
     * @param {Object} orderDetails - The order data to save
     */
    async function saveOrderToFirestore(orderDetails) {
        try {
            const ordersCollection = collection(db, "orders"); // Reference Firestore collection
            const docRef = await addDoc(ordersCollection, orderDetails);
            alert(`Order placed successfully! Order ID: ${docRef.id}`);
            window.location.replace(`confirmation.html?orderId=${docRef.id}`);
            
        } catch (error) {
            console.error("Error saving order to Firestore:", error);
            alert("Failed to place the order. Please try again.");
        }
    }

    // Expose function globally for use in non-module scripts
    window.saveOrderToFirebase = saveOrderToFirestore;

    /**
     * Function to fetch and display orders in a table
     */
    async function loadOrders() {
        try {
            const ordersTable = document.getElementById("orders-table");
            const ordersCollection = collection(db, "orders");
            const snapshot = await getDocs(ordersCollection);

            ordersTable.innerHTML = ""; // Clear previous data

            snapshot.forEach((doc) => {
                const order = doc.data();
                const row = `<tr>
                    <td>${doc.id}</td>
                    <td>${order.contactNumber}</td>
                    <td>${order.shippingAddress.name}</td>
                    <td>${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}</td>
                    <td>${order.paymentMethod}</td>
                    <td>${order.cartItems.map(item => `${item.productName} (x${item.quantity})`).join("<br>")}</td>
                    <td>${order.orderDate}</td>
                </tr>`;
                ordersTable.innerHTML += row;
            });
        } catch (error) {
            console.error("Error loading orders:", error);
        }
    }
 
 async function payNow() {
    // Get User Details
    const contactNumber = document.getElementById("checkout-contact").value;
    const shippingAddress = {
        name: document.getElementById("checkout-name").value,
        email: document.getElementById("checkout-email").value,
        address: document.getElementById("checkout-address").value,
        address2: document.getElementById("checkout-address2").value,
        pincode: document.getElementById("checkout-pincode").value,
        city: document.getElementById("checkout-city").value,
        state: document.getElementById("checkout-state").value,
        total: document.getElementById("final-total").innerText,
    };

    // Create order object with numeric finalTotal
    const formattedTotal = document.getElementById('final-total').innerText.trim();
    const numericTotal = parseFloat(
        formattedTotal
            .replace(/[^0-9.]/g, '')
            .replace(/,/g, '')
    ) || 0;

    try {
        // 1. First call your backend to create a Razorpay order
        const response = await fetch('https://the-demo-store-razorpay-backend.onrender.com/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: numericTotal,
                currency: 'INR',
                receipt: 'order_' + Math.random().toString(36).substring(7),
                notes: {
                    customer_name: shippingAddress.name,
                    customer_email: shippingAddress.email,
                    customer_contact: contactNumber
                }
            })
        });

        const orderData = await response.json();

        // 2. Initialize Razorpay checkout with the order ID from your backend
        var options = {
            "key": "process.env.RAZORPAY_KEY_ID", // This can be public
            "amount": orderData.amount, // Use amount from backend
            "currency": orderData.currency,
            "name": "The Demo Store",
            "description": "Order Payment",
            "order_id": orderData.id, // Use order ID from backend
            "prefill": {
                "name": shippingAddress.name,
                "email": shippingAddress.email,
                "contact": contactNumber
            },
            "theme": { "color": "#3399cc" },
            "handler": async function (response) {
                // 3. Verify payment with your backend
                const verificationResponse = await fetch('https://the-demo-store-razorpay-backend.onrender.com/verify-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        order_id: response.razorpay_order_id,
                        payment_id: response.razorpay_payment_id,
                        signature: response.razorpay_signature
                    })
                });

                const verificationResult = await verificationResponse.json();

                if (verificationResult.success) {
                    // Payment verified - create order in Firestore
                    const db = getFirestore();
                    const orderRef = await addDoc(collection(db, "orders"), {
                        contactNumber,
                        shippingAddress,
                        paymentMethod: "Online",
                        cartItems: getCartData(),
                        orderDate: new Date().toISOString(),
                        finalTotal: numericTotal,
                        orderStatus: "Paid",
                        paymentId: response.razorpay_payment_id,
                    });

                    window.location.replace(`confirmation.html?orderId=${orderRef.id}&paymentId=${response.razorpay_payment_id}`);
                } else {
                    alert("Payment verification failed. Please contact support.");
                }
            },
            "modal": {
                "ondismiss": function () {
                    alert("Payment Cancelled - Order Not Placed. Please try again");
                }
            }
        };

        var rzp1 = new Razorpay(options);
        rzp1.open();

    } catch (error) {
        console.error("Error placing order or processing payment:", error);
        alert("An error occurred while processing your order. Please try again.");
    }
}


function validateOnlineOrder() {
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
    payNow();
    return true;
}
  
    

    // Expose loadOrders globally
    window.loadOrders = loadOrders;
    window.payNow = payNow;
    window.validateOnlineOrder = validateOnlineOrder;
