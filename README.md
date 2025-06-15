# 🛒 BreCart — Modern E-Commerce Web Application

BreCart is a fast, responsive, and user-focused e-commerce web application built with modern web technologies. It includes product listings, search filters, wishlist management, Firebase integration, and dynamic layered routing — all optimized for seamless performance and scalability.

---

## ✨ Features

- 🔍 **Advanced Search with History & Suggestions**
- 🎯 **Layered URL Routing** (`/?layer=search-list`, `/?layer=wishlist`, etc.)
- 📦 **Product Listing with Filtering (by category, name, etc.)**
- ❤️ **Wishlist Support (localStorage)**
- ⚡ **Real-time Data Fetching** (Firebase Realtime Database)
- 📊 **Banner & Deal Management**
- 🔁 **Debounced Search Input for Performance**
- 🔐 **User-Aware Chat Integration (Coming Soon)**

---

## 📁 Folder Structure

BreCart/ ├── public/ 
         ├── src/ 
         │   
         ├── assets/ 
         │   
         ├── components/ 
         │   
         ├── firebase/ 
         │
         ├── pages/ 
         │   
         ├── styles/ 
         │   
         ├── utils/ 
         │   
         └── index.js 
         ├── .gitignore 
         ├── package.json 
         ├── README.md 
         └── index.html




  Brecart/ 
F/ ├── Assets/ 
   │   ├── Logo.jpg 
   │   └── Ads/ 
   │       └── [ad-image files] 
   ├── Auth/ 
   │   ├── index.html 
   │   ├── style.css 
   │   └── script.js 
   ├── List view/ 
   │   ├── index.html 
   │   ├── style.css 
   │   └── script.js 
   ├── Overview/ 
   │   ├── index.html 
   │   ├── style.css 
   │   └── script.js 
   ├── Wishlist/ 
   │   ├── index.html 
   │   ├── style.css 
   │   └── script.js 
   ├── Data.js 
   ├── index.html          Home page
   ├── style.css           Global Styles 
   └── responsive.css      Mobile Responsiveness
   
---

## 🔧 Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Backend:** Firebase Realtime Database
- **Hosting:** Firebase Hosting / GitHub Pages
- **Version Control:** Git + GitHub

---

## 🚀 Getting Started

### 1. Clone the Repo


git clone https://github.com/Devsaheerhost/brecart.git
cd brecart



2. Set Up Firebase

Go to Firebase Console

Create a project and enable Realtime Database

Copy the Firebase config and replace it inside /firebase/init.js


// firebase/init.js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

3. Run Locally

Open index.html in a local web server like Live Server or host with Vite/Parcel for better dev experience.


---

## 📌 Roadmap

[x] Product Search & Filtering

[x] Wishlist (localStorage)

[x] Firebase Integration

[x] Banner & Deal Showcase

[ ] User Auth + Login

[ ] Cart Functionality

[ ] Checkout & Orders

[ ] Real-time Chat System



---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome!
Please open an issue first to discuss what you would like to change.

git checkout -b feature/YourFeature
git commit -m "Add your feature"
git push origin feature/YourFeature


---

## 📜 License

This project is licensed under the MIT License.
See LICENSE for more information.


---

## 📬 Contact

Maintainer: Saheer Babu
GitHub: @DevSaheerHost


---

> “BreCart — Crafted for speed. Built for users.”
