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
  
  const productCard = $('#orderList').querySelectorAll('.product')

productCard.forEach(product => {
  product.onclick = () => handleProductClick(product);
});
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



function handleProductClick(productElement) {
  
  const imgElement = productElement.querySelector('img');
  const nameElement = productElement.querySelector('h4');
  const priceElement = productElement.querySelector('.price');
  const dateElement = productElement.querySelector('.date span');
  const cityElement = productElement.parentElement.querySelector('.city')

  if (!imgElement || !nameElement || !priceElement || !dateElement || !cityElement) {
    console.warn('Product details missing in DOM.');
    showNotifier('Product details missing in DOM.')
    return;
  }

  const img = imgElement.src;
  const productName = nameElement.textContent.trim();
  const price = priceElement.textContent.trim();
  const orderedOn = dateElement.textContent.trim();
  const city = cityElement.textContent.trim();
  const date = dateElement.textContent.trim();
  

history.pushState({}, '', `?page=selected-product`)
handlePage()
  renderProduct({img, productName, price, orderedOn, city, date});
}


const renderProduct = (data) => {
  
  $('.pname').textContent=data.productName
  $('.order-to').textContent=data.city
  $('#ordered-on').textContent= formatOrderDate(data.date)
  $('#deliveryDate').textContent=formatDeliveryDate(data.date)
};
function formatDeliveryDate(input) {
  const [day, month, year] = input.split('/').map(Number);
  const date = new Date(year, month - 1, day); // Month is 0-indexed

  date.setDate(date.getDate() + 7); // Add 7 days

  const d = date.getDate();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const m = monthNames[date.getMonth()];
  const y = `'${String(date.getFullYear()).slice(2)}`; // '25

  return `${d} ${m}, ${y}`;
}

function formatOrderDate(input) {
  
  
  const [day,month , year] = input.split('/').map(Number);
  const date = new Date(year, month - 1, day); 
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const d = String(day); // or padStart(2, '0') if needed
  const m = monthNames[date.getMonth()];
  const y = `'${String(year).slice(2)}`; // '25

  return `${d} ${m}, ${y}`;
}




const handlePage = ()=>{
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');
  
  if (page=='selected-product') {
    $('main').classList.add('hidden')
    $('.selected-product').classList.remove('hidden')
    $('header').classList.add('none')
  }
  
  if (page==null) {
    $('main').classList.add('hidden')
$('.home').classList.remove('hidden')
$('header').classList.remove('none')

  }

}



window.onpopstate = () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');
  console.log("onpopstate layer:", page);
  
  
  
  if (page==null) {
  $('.selected-product').classList.add('hidden')
$('.home').classList.remove('hidden')
$('.home').classList.add('zoomout')
$('header').classList.remove('none')
  }

  
}
