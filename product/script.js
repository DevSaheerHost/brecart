//import { datas } from 'https://brecart.vercel.app/data.js';
import { datas } from '../data.js';
// Firebase Core
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";

// Analytics (optional)
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";

// Firebase Auth
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// ✅ Realtime Database
import {
  getDatabase,
  ref,
  push,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";
import {showNotifier} from '../notifier.js';

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

const $ = (selector) => document.querySelector(selector);

// ✅ Slug from URL query (?slug-name)
const slug = location.search.slice(1).trim();

if (!slug) {
  document.body.innerHTML = `<h2 style="color:red;text-align:center;">❌ No product slug provided in URL.</h2>`;
  
  throw new Error("No slug provided");
}


function getDeliveryDate(daysAhead = 5) {
  const today = new Date();
  today.setDate(today.getDate() + daysAhead);

  const day = today.getDate();
  const month = today.toLocaleString('en-US', { month: 'short' }); // eg: Jun
  const weekday = today.toLocaleString('en-US', { weekday: 'long' }); // eg: Thursday

  return `${day} ${month} ${weekday}`;
}



// ✅ Slug generator (same logic everywhere)
function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[\s()&,]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

console.log(generateSlug(slug))
// ✅ Find product from imported data
const products = datas.products;
const product = products.find(p => generateSlug(p.name) === slug) || datas.lineup.find(p => generateSlug(p.name) === slug);

if (!product) {
  document.body.innerHTML = `
    <div style="padding: 2rem; text-align: center;">
      <h2 style="color: red;">❌ Product Not Found</h2>
      <p style="margin-top: 1rem;">We couldn’t find the product you’re looking for.</p>
      <a href="/" style="margin-top: 2rem; display: inline-block; text-decoration: none; color: #0ba2ff;">← Go back to home</a>
    </div>
  `;
  throw new Error("Product not found");
}

// ✅ Dynamic SEO Meta Tags
document.title = `Buy ${product.name} – Brecart`;

const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
metaDescription.name = "description";
metaDescription.content = `Get the best price for ${product.name}. Fast delivery. 100% original.`;
document.head.appendChild(metaDescription);

const canonicalLink = document.querySelector('link[rel="canonical"]') || document.createElement('link');
canonicalLink.rel = "canonical";
canonicalLink.href = `https://brecart.vercel.app/product?${slug}`;
document.head.appendChild(canonicalLink);

// ✅ Render Product Info
$(".main-img").src = product.product_image || product.img;
$(".sub-img").src = product.product_image || product.img;
$("#productName").textContent = product.product_description || product.description;
$('.current_product img').src=product.img || product.product_image;
$('.compo_name').textContent=product.name
const price = Number(product.product_price ?? product.price);
$(".price").textContent = `₹${price.toLocaleString()}`;
  $(".total h3").textContent = `₹${price.toLocaleString()}`;
// ✅ Quantity Buttons
$('.increment').onclick = () => {
  let quantity = Number($('#quantity').textContent);
  if (quantity < 10) {
    $('#quantity').textContent = ++quantity;
    $('.decrement').style.borderColor = 'black';
    updateTotalPrice()
    $(".price").textContent = ` ₹${(price * quantity).toLocaleString()}`;
  } else {
    $('.increment').style.borderColor = '#C5C5C5';
  }
};

$('.decrement').onclick = () => {
  let quantity = Number($('#quantity').textContent);
  if (quantity > 1) {
    $('#quantity').textContent = --quantity;
    $('.increment').style.borderColor = 'black';
    updateTotalPrice()
    $(".price").textContent = ` ₹${(price * quantity).toLocaleString()}`;
  }
  if (quantity <= 1) {
    $('.decrement').style.borderColor = '#C5C5C5';
  }
};

// ✅ Buy Layer Handler
function handleLayer() {
  const layerParam = new URLSearchParams(location.search).get('layer');
  const showBuyPage = layerParam === 'place-order';
  const showMyorderPage = layerParam === 'myorder'
  
  
  if (showBuyPage) {
    $('.layer').classList.add('hidden');
  $('.buy-page').classList.remove('hidden');
  } else if (showMyorderPage) {
     $('.layer').classList.add('hidden');
     
  $('.myorder-page').classList.remove('hidden');
  }
  checkSavedAddress()
}

//handleLayer();
window.onpopstate = handleLayer;


$('.buy_btn').onclick = () => {
  const user = auth.currentUser;

if (user) {
  // ✅ User is signed in
  history.pushState({}, '', `?${slug}&layer=place-order`);
handleLayer();

$('#deliveryDate span').textContent = getDeliveryDate()

  console.log('Buying now as', user.email);
  // Proceed with buying process
} else {
  // ❌ User not signed in
  if (confirm('Please sign in first to buy')) {
    window.location.href = '../auth';
  }
  // Optional: redirect to login page
   
}
  
  
};

const checkSavedAddress = () =>{
const savedAddress = localStorage.getItem('userAddress');

if (savedAddress) {
  const data = JSON.parse(savedAddress);
  $('#fullname').value = data.name || '';
  $('#orderNumber').value = data.number || '';
  $('#district').value = data.district || '';
  $('#city').value = data.city || '';
  $('#locality').value = data.locality || '';
  $('#pincode').value = data.pincode || '';
}

}


$('#placeOrder').onclick = () => {
  const selectedItems = [];
  const addressInputs=['#district', '#city', '#locality', '#pincode', '#fullname', '#orderNumber']
  let hasEmpty = false;
  
  
  
  
    addressInputs.forEach(sel=>{
    const el=$(sel)
    if (el.value.trim() ==='') {
      el.classList.add('error')
      el.focus()
      hasEmpty=true
    } else el.classList.remove('error');
    
    el.oninput=()=>el.classList.remove('error')
  })
  
  if (hasEmpty) {
  showNotifier('All fields are Required');
  return;
}

const userDetails ={
  name: $('#fullname').value.trim(),
  number: $('#orderNumber').value.trim(),
  district: $('#district').value.trim(),
  city: $('#city').value.trim(),
  locality: $('#locality').value.trim(),
  pincode: $('#pincode').value.trim()
}



  localStorage.setItem('userAddress', JSON.stringify(userDetails))



  document.querySelectorAll('.compo_products input[type="checkbox"]').forEach((checkbox) => {
    if (checkbox.checked) {
      const item = checkbox.closest('.item');
      const name = item.querySelector('h4').textContent;
      const priceText = item.querySelector('.price').textContent;
      const price = Number(priceText.replace(/[^\d]/g, ''));
      const img = item.querySelector('img').src;

      selectedItems.push({ name, price, img });
    }
  });
  
console.table(selectedItems)
console.table(userDetails);
console.table(product)

addOrderToDb(userDetails, selectedItems, product)


  localStorage.setItem(`combo-${slug}`, JSON.stringify(selectedItems));
  $('.order-placed-message-wrap').classList.remove('hidden');
};

$('.back-to-purchase').onclick = () => {
  window.location = `./product?${slug}`;
};

// ✅ Wishlist (Bookmark) Icon Toggle + Persist with localStorage
const icon = $('.buy i');
const wishlistKey = `wishlist-${slug}`;
const isBookmarked = localStorage.getItem(wishlistKey) === '1';

icon.classList.toggle('fa-solid', isBookmarked);
icon.classList.toggle('fa-regular', !isBookmarked);

icon.onclick = () => {
  const isActive = icon.classList.contains('fa-solid');
  localStorage.setItem(wishlistKey, isActive ? '0' : '1');
  icon.classList.toggle('fa-solid');
  icon.classList.toggle('fa-regular');
  //console.log(auth.currentUser)
};

// ✅ Related Products (same type, excluding current)
const relatedList = products
  .filter(p => p.type === product.type && generateSlug(p.name) !== slug)
  .slice(0, 4);

const relatedDiv = document.getElementById("related");
for (const item of relatedList) {
  const itemSlug = generateSlug(item.name);
  const a = document.createElement('a');
  a.href = `./?${itemSlug}`;
  a.style = "text-decoration: none; color: inherit;";
  a.innerHTML = `
    <img src="${item.img}" alt="${item.name}" style="width: 100%; height: auto; border-radius: 8px;" />
    <h4 style="margin: 0.5rem 0;">${item.name}</h4>
    <p style="color: green; font-weight: bold;">₹${item.price.toLocaleString()}</p>
  `;
  relatedDiv.appendChild(a);
}

// ✅ Back Button
$("#back").onclick = () => window.history.back();

// ✅ Global JS Error Catch
window.onerror = function (message, source, lineno, colno, error) {
  showNotifier("Error: " + message + "\nLine: " + lineno + "\nColumn: " + colno);
};






// ✅ Render Compo Offers
const compoDiv = document.querySelector(".compo_products");
console.log(product)

const compo = datas.compo_offers.find(c =>
  product.name.toLowerCase().includes(c.for)
);

if (compo && compo.items.length) {
  compoDiv.innerHTML = ''; // clear previous content
  compo.items.forEach(item => {
    const el = document.createElement("div");
    el.className = "item";
    el.innerHTML = `
      <div class="box">
        <input type="checkbox" name="select">
        <img src="${item.img}" alt="${item.name}">
      </div>
      <div class="detail">
        <h4>${item.name}</h4>
        
<span>
${item.offer_price?
  ` <span style="color:green;" class="offer_price">₹${item.offer_price?.toLocaleString()}</span>
  
  
  <p class="price line" data-offer-price="${item.offer_price}">₹${item.price.toLocaleString()}</p>`
  
  :
  `
          <p class="price">₹${item.price.toLocaleString()}</p>
  `
}

</span>
      </div>
    `;
    compoDiv.appendChild(el);
  });
  
  document.querySelectorAll('.compo_products input[type="checkbox"]').forEach(box=>{
    box.onchange=()=>updateTotalPrice()
  })
} else {
  compoDiv.innerHTML = `<p style="text-align:center;">No combo offers available for this product.</p>`;
}


// Total price with compo ofer
function updateTotalPrice() {
  const quantity = Number($('#quantity').textContent.replace(/[^\d]/g, ''));
  const basePrice = price * quantity;
  let total = basePrice;
  let boxes = 0;
  
  const checkboxes = document.querySelectorAll('.compo_products input[type="checkbox"]');
  
  checkboxes.forEach((checkbox) => {
    
    if (checkbox.checked) {
      boxes++;
      const priceText = checkbox.closest('.item').querySelector('.price').textContent;
      const priceEl = checkbox.closest('.item').querySelector('.price');
      //const compoPrice = Number(priceText.replace(/[^\d]/g, ''));
      console.log(priceEl.getAttribute('data-offer-price'))
      const compoPrice = Number(
  priceEl.getAttribute('data-offer-price') ||
  priceText.replace(/[^\d]/g, '')
);
      total += compoPrice;
    }
  });
  
  // ✅ Total price update
  $(".total h3").textContent = `₹${total.toLocaleString()}`;
  
  // ✅ Button label + style
  const addBtn = $('.add_item');
  if (boxes > 0) {
    addBtn.textContent = `Add ${boxes} Item${boxes > 1 ? 's' : ''}`;
    addBtn.classList.add('active');
  } else {
    addBtn.textContent = 'Add Items';
    addBtn.classList.remove('active');
  }
}

// Attach listeners to all checkboxes
document.querySelectorAll('.compo_products').forEach(div => {
  div.addEventListener('change', updateTotalPrice);
});





window.onpopstate = () => {
  const params = new URLSearchParams(window.location.search);
  const layer = params.get('layer');
  console.log("onpopstate layer:", layer);
  if (layer==null) {
    $('.layer').classList.add('hidden');
    $('.buy-page').classList.add('hidden');
    $('.overview').classList.remove('hidden');
    
  }

  
}











const db = getDatabase();

function addOrderToDb(userDetails, selectedItems, product) {
  const user = auth.currentUser;

  if (user) {
    const currentUserId = user.uid;

    const ordersRef = ref(db, `orders/${currentUserId}`);
    const newOrderRef = push(ordersRef);

    set(newOrderRef, {
      ...product,
      address: userDetails,
      items: selectedItems,
      createdAt: new Date().toISOString(),
      status: "pending"
    })
    .then(() => {
      console.log("✅ Order placed!");
      // Optionally show success UI
    })
    .catch((error) => {
      console.error("❌ Order failed:", error);
    });
  } else {
    console.log("🛑 User not authenticated");
    showNotifier("Please login to place order");
  }
}


//window.location='./?none&?layer='

//history.pushState({}, '', `?${slug}&layer=myorder`);
//handleLayer();

