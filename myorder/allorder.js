// ✅ All imports at the top
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getDatabase, ref, set , onValue} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

import {showNotifier} from '../notifier.js';
// ✅ Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCsTD5XSRNl7VG-i6Ir0F3D1X1PxWk2Rfs",
  authDomain: "shopify-30670.firebaseapp.com",
  databaseURL: "https://shopify-30670-default-rtdb.firebaseio.com",
  projectId: "shopify-30670",
  storageBucket: "shopify-30670.appspot.com",
  messagingSenderId: "792157900529",
  appId: "1:792157900529:web:32d02d2d8b3fe05d94e350",
  measurementId: "G-MZC38NN5BZ",
};

// ✅ Initialize Firebase only once
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize Auth & Database using the same `app`
const auth = getAuth(app);
const db = getDatabase(app);

function listenToAllOrders() {
  const ordersRef = ref(db, "orders");

  onValue(ordersRef, (snapshot) => {
    const data = snapshot.val();
    console.table( data);

    // ✅ Call showOrders with data
    showOrders(data);
  });
}

// ✅ Correct usage




listenToAllOrders()

function showOrders(data) {
  
  // 🔽 Example UI render (optional)
  const orderList = document.getElementById("orderList");
  if (!orderList) return;

  orderList.innerHTML = '';

  for (const userId in data) {
    const userOrders = data[userId];
    for (const orderId in userOrders) {
      const order = userOrders[orderId];

      const li = document.createElement('li');
      li.textContent = `${order.address?.name || order.name} ordered ₹${order.total || order.price} (${order.status})`;
      orderList.appendChild(li);
    }
  }
}





onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ User ID:", user.uid);  // 👉 This is the `userId`
  }
});