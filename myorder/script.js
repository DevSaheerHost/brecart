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










onAuthStateChanged(auth, (user) => {
  if (user) {
    const currentUserId = user.uid;

showNotifier(currentUserId)
    // ✅ Only this user’s orders
    const userOrdersRef = ref(db, `orders/${currentUserId}`);

    onValue(userOrdersRef, (snapshot) => {
      const data = snapshot.val();
      showNotifier("📦 My Orders:", data);

      showOrders(data); // ✅ Render orders
    });
  } else {
    showNotifier("🛑 Not logged in");
    window.location.href = "/login.html";
  }
});

function showOrderssssssss(data) {
  const orderList = document.getElementById("orderList");
  if (!orderList) return;

  orderList.innerHTML = '';

  if (!data || typeof data !== 'object') {
    orderList.innerHTML = '<li>No orders found.</li>';
    return;
  }

  for (const orderId in data) {
    const order = data[orderId];

    showNotifier("✅ Order:", order);

    const customerName = order?.address?.name || "Unknown";
    const productName = order?.name || "Unnamed Product";
    const productPrice = order?.price || order?.total || 0;
    const orderStatus = order?.status || "Unknown";

    const li = document.createElement('li');
    li.textContent = `${customerName} ordered ₹${productPrice} (${orderStatus}) → ${productName}`;
    orderList.appendChild(li);
  }
}



function showOrders(data) {
  const orderList = document.getElementById("orderList");
  if (!orderList) return;
  
  orderList.innerHTML = '';
  
  if (!data || typeof data !== 'object') {
    orderList.innerHTML = '<li>No orders found.</li>';
    return;
  }
  console.log(data)
  for (const orderId in data) {
    const order = data[orderId];
    
    const {
      name = "Unknown Product",
        price = 0,
        status = "Pending",
        image = "https://via.placeholder.com/64", // Optional fallback
        createdAt = new Date().toISOString(),
        address = {}
    } = order;
    
    const formattedDate = new Date(order.createdAt).toLocaleDateString();
    
    const li = document.createElement("li");
    li.className = "border rounded-xl p-4 shadow-sm";
    
    li.innerHTML = `
      <div class="flex items-center space-x-4">
        <img src="${order.img}" alt="Product" class="w-16 h-16 object-cover rounded-lg" />
        <div class="flex-1">
          <h3 class="font-semibold text-lg">${order.name}</h3>
          <p class="text-sm text-gray-600">Ordered on: ${formattedDate}</p>
          <p class="text-sm text-gray-600">Status: <span class="text-yellow-600 font-medium">${order.status}</span></p>
        </div>
        <div class="text-right">
          <p class="text-lg font-bold text-blue-600">₹${order.price}</p>
        </div>
      </div>
      <div class="mt-2 text-sm text-gray-500">
        Delivery to: ${order.address.name || ''}, ${order.address.district || ''}, ${order.address.city || ''}, ${order.address.place || ''}, ${order.address.locality || ''}, ${order.address.pincode || ''}
      </div>
    `;
    
    orderList.appendChild(li);
  }
}

window.location= '../product/index.html?layer=myorder'