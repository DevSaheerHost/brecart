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


// Render ads
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
              <p class="name">iPhone 15</p>
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
      console.log(items)
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });
// Category data
const datas = {
  category: [
    {
      name: "iPhone",
      img: "https://pngimg.com/uploads/iphone16/iphone16_PNG39.png",
    },
    {
      name: "CASE",
      img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MDG04?wid=400&hei=400&fmt=jpeg&qlt=90&.v=QVovL2FZYXJkSy9zaDVqdTlNNnNFUFlvYS9naDJJdU9KTWdGWjhKWFRmS1ZGS1d3SDlTVjBOQWIxNCszUkpvN2Q4MTdDbkZmVVptWDc4YitwOTh0MWc",
    },
    {
      name: "iPad",
      img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MWR43?wid=532&hei=582&fmt=png-alpha&.v=YlVpNnJwS1ZQRkJXOXRzZlgxR3E3Z0hqc0NvK2RZTVd5TWVhUDFuQlo0MVY4cVpMQ0xaaEhETEU0eUZzYitQbEk4VVI4RmlqdXNFT0xULzQxLzZIVmc",
    },
    {
      name: "Mac",
      img: "https://www.apple.com/v/macbook-air/u/images/overview/routers/trade_in__6u9w2o7115uu_small_2x.jpg",
    },
    {
      name: "Apple watch",
      img: "https://www.apple.com/v/apple-watch-se/s/images/overview/training-load/training_load__fjmftj1p5cqe_small_2x.jpg",
    },
    {
      name: "Ipad case",
      img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MWK43?wid=532&hei=582&fmt=png-alpha&.v=T2NaclZmQ0Y3aEFqL1JsemdISmk2QUhqc0NvK2RZTVd5TWVhUDFuQlo0MUYxM2JqSXFlN0dXVitSTitoZlhwbTIwUjlrb21WL0Q2cGlkaFVFdml1dWc",
    },
    {
      name: "MagSafe",
      img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MA6X4_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=VFh1amlVcjVRdXRVZTYzdW12SjJmVlZya2lKWlJmUEwrYndWOTJiVWJWQUYwVmtIbGRkS25RMVpBRlo0bk5DUUlHaGN0bk1qMDc2azdXVG9JZEo4SVE",
    },
    {
      name: "Keyboard",
      img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXK83?wid=532&hei=582&fmt=png-alpha&.v=eFlJa0thaHg0Zk5Uc3lIcElEZThBZ0hqc0NvK2RZTVd5TWVhUDFuQlo0MWlQcU93cWwvb0J4b2lHc01aQ3FTRmpTVDErb2pvVFNyNGl4TzdpOGhXQnc",
    },
    {
      name: "Cable",
      img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MU2G3?wid=532&hei=582&fmt=png-alpha&.v=VDR6aHRWaDFmcExoSmNtMlQ5c0hoUUhqc0NvK2RZTVd5TWVhUDFuQlo0MTY0cUsvMVFmWHN5aHY2R05FejlZNWpLVGNQM2N0MHVnejA3TnZTdk9XMlE",
    },
    {
      name: "Pencil",
      img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MUWA3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=dFZURmpjMWNqeXhjb0NWMDZVVnNsZ2tuVHYzMERCZURia3c5SzJFOTlPanBnR2pXWTRHU3BEaEVISG4vR2NHalJOdUZTK2hyNlk4dTdFSXp2TXpTMnc",
    },
    {
      name: "Adapter",
      img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MU7W2_GEO_AE?wid=532&hei=582&fmt=png-alpha&.v=a0xVS3BLYklJVFMwaVVOOFUvMkFvTW5GeFlBNUZ4MVNzNjJzZFhYMTFSaTZCQ3ZaNVpXeUZlM1BTdlNzLzg3cmI1QmdFNUV6cGpVMUNSQWZuZzZNRUE",
    },
    {
      name: "Airpod",
      img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FMT_WHH?wid=750&hei=556&fmt=jpeg&qlt=90&.v=WTk1dTl5UTBnZXdKN2tua2pFb1hvQ3hmVXd6RnorM2pzUlRIKzNkUEN0UVFKL0gxZTZoRVRrWTkzYU96cTExc2VsZVRlVnZHQmY5OW81bDJoczFlQVBwSnBDdWtpT0U0NUsvRE1FbnZmZ2dhUmNsWWNoeG94RS9iYlF0b3cvT3I",
      price: 19000,
    },
  ],
  banner: [
    {
      img: "./assets/logo.jpg",
      path: "",
    },
    {
      img: "./assets/ads/ad1.jpg",
      path: "",
    },
    {
      img: "./assets/ads/ad2.jpg",
      path: "",
    },
    {
      img: "./assets/ads/ad3.jpg",
      path: "",
    },
    {
      img: "./assets/ads/ad4.jpg",
      path: "",
    },
    {
      img: "./assets/ads/ad5.jpg",
      path: "",
    },
    {
      img: "./assets/ads/ad6.jpg",
      path: "",
    },
    {
      img: "./assets/ads/ad7.jpg",
      path: "",
    },
  ],
  
  lineup:[
    {
      img:'https://goldenshield.in/cdn/shop/files/iphone15plus_3.jpg?v=1702886380&width=1000',
      description :'Anti-Yellow Magsafe Clear Case'
    },
    {
      img:'https://goldenshield.in/cdn/shop/files/iphone15plus_2.jpg?v=1702886380&width=1000',
      description:'ClearVue'
    },
    {
      img:'https://goldenshield.in/cdn/shop/files/iphone15plustranspatrentcase_2.jpg?v=1712762622&width=1000',
      description:'Anti-Yellow Magsafe Clear Case'
    }
  ]
};

$('.lineup .flex').innerHTML = datas.lineup.map(item=>`

<div class="item">
            <img
              src="${item.img}"
              alt="Img"
            />

            <div class="detail">
              <p class="name">iPhone 16 pro</p>
              <p>${item.description}</p>

              
            </div>
          </div>
`).join('')


$(".category .list-view").innerHTML = datas.category
  .map(
    (item) => `

  
    <div class="item">
            <img src="${item.img}" alt="${item.name || "No image"}">
          </div>
`
  )
  .join("");

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