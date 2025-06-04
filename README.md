# 🛒 The Demo Store

**The Demo Store** is a modern e-commerce web application built for demonstration purposes. It showcases the full flow of an online shopping experience — from browsing products to checkout — with real-time database integration and secure payment processing.

---

## 🚀 Features

- 📦 **Product Catalog** – Browse a range of products with images, prices, and descriptions.
- 🛒 **Shopping Cart** – Add, update, and remove items with automatic cart totals.
- 🔐 **User Authentication** – Secure login and registration using Firebase Auth.
- 💳 **Online Payments** – Seamless checkout using **Razorpay Payment Gateway**.
- 🔥 **Real-Time Database** – All product and order data stored in Firebase Firestore.
- 📱 **Responsive UI** – Optimized for mobile, tablet, and desktop screens.

---

## 🧰 Tech Stack

| Layer       | Technology                    |
|-------------|-------------------------------|
| **Frontend**| HTML, CSS, JavaScript         |
| **Backend** | Firebase (Auth, Firestore)    |
| **Payments**| Razorpay Payment Gateway      |
| **Deployment** | Firebase Hosting / Vercel |

---

## ⚙️ Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/chikaracreovations/The-Demo-Store.git
cd The-Demo-Store

2. Install Dependencies

npm install

3. Configure Environment Variables

Create a .env file in the root directory and add your Firebase and Razorpay credentials:

# Firebase Config
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Razorpay Key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id

4. Run the Development Server

npm run dev

Visit http://localhost:3000 to open the app in your browser.


---

🧪 Demo Credentials (Optional)
You can use these for testing (if applicable):
Email: testuser@example.com
Password: password123

---


 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch: git checkout -b feature/feature-name
3. Commit your changes: git commit -m "Add feature"
4. Push to the branch: git push origin feature/feature-name
5. Open a pull request

---

📄 License

This project is licensed under the MIT License.

---

🌐 Live Demo

Check out the live version of this here: 
[The Demo Store](https://chikaracreovations.github.io/The-Demo-Store/public/index.html)
---

> Built️ by @chikaracreovations


### ✅ Notes:
- Replace `https://your-live-link.com` with your actual live site.
- Be sure to keep your `.env` file private and never commit it.

