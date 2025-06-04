
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
            .replace(/[^0-9.]/g, '') // Remove currency symbols
            .replace(/,/g, '')       // Remove thousand separators
    ) || 0;

    try {
        // ✅ Razorpay Payment Integration
        var options = {
            "key": "", // Replace with your Razorpay Key
            "amount": numericTotal * 100, // Convert ₹ to paise
            "currency": "INR",
            "name": "The Macrame Lofts",
            "description": "Order Payment",
            "prefill": {
                "name": shippingAddress.name,
                "email": shippingAddress.email,
                "contact": contactNumber
            },
            "theme": { "color": "#3399cc" },
            "handler": async function (response) {
                alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);

                // ✅ Now Create the Order in Firestore after Payment is successful
                const db = getFirestore(); // Ensure you have Firestore instance
                try {
                    // Create Order in Firestore (using modular syntax)
                    const orderRef = await addDoc(collection(db, "orders"), {
                        contactNumber,
                        shippingAddress,
                        paymentMethod: "Online",
                        cartItems: getCartData(),  // Assuming you have a function that returns cart data
                        orderDate: new Date().toISOString(),
                        finalTotal: numericTotal,
                        orderStatus: "Paid", // Set the order status to Paid
                        paymentId: response.razorpay_payment_id, // Save the Razorpay Payment ID
                    });

                    console.log("Order Created with ID:", orderRef.id);
                    
                window.location.replace(`confirmation.html?orderId=${orderRef.id}&paymentId=${response.razorpay_payment_id}`);
                
                
                } catch (error) {
                    console.error("Error creating order in Firestore:", error);
                    alert("An error occurred while creating your order. Please try again.");
                }
            },
            "modal": {
                "ondismiss": function () {
                    alert("Payment Cancelled  Order Not Placed. Please try again");
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
