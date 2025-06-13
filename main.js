import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
import {
  getDatabase,
  ref,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

// Firebase configuration
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

import {datas} from './data.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const dbRef = ref(db);

// Shorthand
const $ = (selector) => document.querySelector(selector);
$(".deals .list-view").innerHTML = "";

// Load wishlist from localStorage
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


  // url test
  
  const params = new URLSearchParams(window.location.search);
const typeParam = params.get('type');

if (typeParam) {
  $('main.home').classList.add('hidden');
  $('.product_list').classList.remove('hidden');

  try {
    const filteredProducts = datas.products.filter(product => product.type === typeParam);

    if (filteredProducts.length > 0) {
      $('.product_list .list').innerHTML = filteredProducts.map(product => `
        <div class="item" data-name="${product.name}">
          <i class="fa-heart heart fa-regular"></i>
          <img src="${product.img}" alt="${product.name}">
          <div class="detail">
            <p class="product_name">${product.name}</p>
            <p class="price">${product.price}</p>
            <p class="delivery">Free delivery</p>
          </div>
        </div>
      `).join('');

      document.querySelectorAll(".product_list .list .item").forEach((el) => {
        el.addEventListener("click", () => {
          const name = el.getAttribute("data-name");
          const item = datas.products.find((i) => i.name === name);
          localStorage.setItem("selectedProduct", JSON.stringify(item));
          window.location.href = "./overview/";
        });
      });

    } else {
      $('.product_list .list').innerHTML = '<p class="empty">No products found</p>';
    }

  } catch (e) {
    console.error('Error while rendering Product list on url params: ', e);
  }
}

// Render deals
function renderDeals(items) {
  $(".deals .list-view").innerHTML = items
    .map((item) => {
      const isWishlisted = wishlist.some(
        (w) => w.product_name === item.product_name
      );
      return `
      <div class="item" data-name="${item.product_name}">
        <i class="${
          isWishlisted ? "fa-solid" : "fa-regular"
        } fa-heart heart" data-name="${item.product_name}"></i>
        <img src="${item.product_image}" alt="product">
        <p>${item.product_name}</p>
      </div>
    `;
    })
    .join("");

  // Heart click
  document.querySelectorAll(".heart").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      const name = icon.getAttribute("data-name");
      const item = items.find((i) => i.product_name === name);
      const index = wishlist.findIndex((w) => w.product_name === name);

      if (index > -1) {
        wishlist.splice(index, 1);
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
      } else {
        wishlist.push(item);
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    });
  });

  // Item click → overview
  document.querySelectorAll(".deals .item").forEach((el) => {
    el.addEventListener("click", () => {
      const name = el.getAttribute("data-name");
      const item = items.find((i) => i.product_name === name);
      localStorage.setItem("selectedProduct", JSON.stringify(item));
      window.location.href = "./overview/";
    });
  });
}





// Render ads not in use
function renderAds(items) {
  $(".lineup .flex").innerHTML = items
    .map((item) => {
      const isWishlisted = wishlist.some(
        (w) => w.product_name === item.product_name
      );
      return `
       <div class="item">
            <img
              src="${item}"
              alt="Img"
            />

            <div class="detail">
              <p class="name">iPhone 15 test</p>
              <p>As amazing as ever.</p>
              <p class="price">From INR 67,999</p>

              <div class="btn-wrap">
                <a href="#" class="learn"> Learn more </a>
                <p>Buy ></p>
              </div>
            </div>
          </div>
    `;
    })
    .join("");
    
    
}






// All daxxx
$('.lineup .flex').innerHTML = datas.lineup.map(item=>`

<div class="item">
<h3>${item.name}</h3>
            <img
              src="${item.img}"
              alt="Img"
            />

            <div class="detail">
              <p>From INR ${item.price}</p>

              <span>Buy</span>
            </div>
          </div>
`).join('')


$(".category .list-view").innerHTML = datas.category
  .map(
    (item) => `

  
    <div class="item" data-type="${item.type}">
            <img src="${item.img}" alt="${item.name || "No image"}">
          </div>
`
  )
  .join("");
  
  $('.category .list-view').querySelectorAll('.item').forEach(item=>{
    console.log(item.dataset.type)
    item.onclick=()=>{
      window.location=`./?type=${item.dataset.type}`
    }
  })
  
  $('.lineup .flex').querySelectorAll('.item').forEach(item=>{
    console.log(item)
      item.onclick=()=>{
        const product={
      product_name: item.querySelector('h3').textContent,
      product_image: item.querySelector('img').src,
      product_price: item.querySelector('p').textContent
      
    }
        localStorage.setItem("selectedProduct", JSON.stringify(product))
window.location.href = "./overview/";
      }
    })

let i = 0;
const imgEl = $("#bannerImage");
imgEl.src = datas.banner[i].img;
i++;

const changeImage = () => {
  setTimeout(() => {
    imgEl.style.opacity = 0;

    setTimeout(() => {
      imgEl.src = "";
    }, 300);

    setTimeout(() => {
      i = i % datas.banner.length; // Ensure loop
      imgEl.src = datas.banner[i].img;

      requestAnimationFrame(() => {
        imgEl.style.opacity = 1;
      });

      console.log("Changed to image", i + 1);
      i++;
      changeImage();
    }, 400); // match fade-out duration
  }, 3000); // display time per image
};

changeImage();

// window.onscroll = () => {
//   if (window.scrollY > 80) {
//     $("header").classList.add("scrolled");
//   } else {
//     $("header").classList.remove("scrolled");
//   }
// };


// scroll observe 


const header = document.querySelector('header');
const nav = document.querySelector('nav');
const footer = document.querySelector('footer');

const target = document.querySelector('.black');
//const targetTwo = document.querySelector('nav');

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      header.classList.add('header_black');
      nav.classList.add('header_black');
    } else {
      header.classList.remove('header_black');
      nav.classList.remove('header_black');
    }
  },
  {
    threshold: 0.5 // adjust as needed
  }
);

observer.observe(target);
observer.observe(document.querySelector('footer'));



// Fetch deals from Firebase
get(child(dbRef, "shopless/home/fresh_deals"))
  .then((snapshot) => {
    $(".loader").remove();
    if (snapshot.exists()) {
      const items = Object.values(snapshot.val());
      renderDeals(items);
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });



// Fetch Ads from Firebase
get(child(dbRef, "shopless/home/ads"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      const items = Object.values(snapshot.val());
      //renderAds(items);
      
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });
  
  
  
