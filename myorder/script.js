// ✅ All imports at the top
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getDatabase, ref, set , onValue} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

import {showNotifier} from '../notifier.js';
import {card} from './listComponent.js'

const $ = selector => document.querySelector(selector)
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

//showNotifier(currentUserId)
    // ✅ Only this user’s orders
    const userOrdersRef = ref(db, `orders/${currentUserId}`);
showNotifier("Loading...");
    onValue(userOrdersRef, (snapshot) => {
      const data = snapshot.val();
      

      data?showOrders(data): showNotifier('No data found'); // ✅ Render orders
    });
  } else {
    showNotifier("🛑 Not logged in");
    window.location.href = "../auth/";
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

  for (const orderId in data) {
    const order = data[orderId];

    // ✅ Pass order to your custom card component
    const li = document.createElement("li");
    li.innerHTML = card(order); // using your component here
    orderList.appendChild(li);
  }
}

//window.location= '../product/index.html?layer=myorder'



function getHomeURL() {
  if (location.hostname.includes('github.io')) {
    const root = location.pathname.split('/')[1];
    return `${location.origin}/${root}/`;
  } else {
    return `${location.origin}/`;
  }
}

$('#back').onclick = () => {
  if (document.referrer && document.referrer !== location.href) {
    history.back();
    setTimeout(() => {
      window.location = getHomeURL(); // fallback after 500ms
    }, 1000);
  } else {
    window.location = getHomeURL();
  }
};

console.log(getHomeURL());
$('#back').onclick=()=> window.location=getHomeURL()