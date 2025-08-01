import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
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
import {showNotifier} from './notifier.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const dbRef = ref(db);
let foudQ=''
// Shorthand
const $ = (selector) => document.querySelector(selector);
$(".deals .list-view").innerHTML = "";

// Load wishlist from localStorage
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


  // url test
  function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[\s()&,]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}


const handleHideAllMains = () => {
  const allMainEle = document.querySelectorAll('main')
  allMainEle.forEach(ele=>ele.classList.add('hidden'))
}
  
  //$('.input-box').onclick=()=>window.location='./?layer=search'
  $('.input-box').onclick=()=>{
    window.history.pushState({}, '', './?layer=search');
window.dispatchEvent(new PopStateEvent("popstate"));
  }

// Get URL parameters
const params = new URLSearchParams(window.location.search);
const typeParam = params.get('type');
const layerParamRaw = params.get('layer') || '';
const layerParam = layerParamRaw.trim().toLowerCase();
const layerKey = layerParam.slice(0, 10); // only use first 10 characters
console.log(layerKey)

function renderProductList(products) {
  if (products.length === 0) {
   // $('.product_list .list').innerHTML = '<p class="empty">No products found</p>';
    return;
  }
  navigator.vibrate([20]);
  $('.product_list .list').innerHTML = products.map(product => `
    <div class="item" data-name="${product.name}">
      <i class="fa-heart heart fa-regular"></i>
      <img src="${product.img}" alt="${product.name}">
      <div class="detail">
        <p class="product_name">${product.name}</p>
        <p class="price">₹${product.price.toLocaleString()}</p>
        <p class="delivery">${product.delivery? 'Deliver fee ₹'+product.delivery:'Free delivery'}</p>
      </div>
    </div>
  `).join('');
  
  document.querySelectorAll(".product_list .list .item").forEach(el => {
  
    el.addEventListener("click", () => {
      const name = el.getAttribute("data-name");
      const item = datas.products.find((i) => i.name === name);
      localStorage.setItem("selectedProduct", JSON.stringify(item));
      //window.location.href = `./product/${generateSlug(name)}`;
      window.location.href = `./product/index.html?${generateSlug(name)}`;
    });
  });
}

// 1. Special case: Search Layer
if (layerParam === 'search') {
  handleHideAllMains()
  $('.product_list').classList.add('hidden');
  $('main.home').classList.add('hidden');
  $('.layer.search').classList.remove('hidden');
  $('header').classList.add('hidden');
  $('nav').classList.add('hidden');
  $('.layer.search input').focus()
}

// 2. TYPE FILTER
else if (typeParam) {
  handleHideAllMains()
  $('main.home').classList.add('hidden');
  $('.product_list').classList.remove('hidden');

  try {
    const filteredProducts = datas.products.filter(product => product.type === typeParam);

    renderProductList(filteredProducts)

  } catch (e) {
    navigator.vibrate([20, 100, 20]);
    console.error('Error while rendering Product list on typeParam: ', e.message);
    onpageshow('Error while rendering Product list on typeParam: ', e.message);
  }
}
else if (layerParam=='search-list') {
  handleHideAllMains()
   $('.product_list').classList.remove('hidden');
  $('main.home').classList.add('hidden');
  $('.layer.search').classList.add('hidden');
  
  
  
  try {
  const searchInputRaw = localStorage.getItem('searchWord');
  const searchInput = searchInputRaw ? searchInputRaw.trim().toLowerCase() : '';

  console.log("Search input:", searchInput);  // debug log
  if (!searchInput) throw new Error('Search word is empty or not found in localStorage.');

  const filteredProducts = datas.products.filter(product => {
    const name = (product.name || '').toLowerCase();
    const description = (product.description || '').toLowerCase();
    return name.includes(searchInput) || description.includes(searchInput);
  });

  console.log("Filtered products:", filteredProducts); // debug log

  renderProductList(filteredProducts)

} catch (e) {
  console.error('Error while rendering Product list on search:', e.message);
  navigator.vibrate([20, 100, 20]);
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

  // Item click → product
  document.querySelectorAll(".deals .item").forEach((el) => {
    el.addEventListener("click", () => {
      const name = el.getAttribute("data-name");
      const item = items.find((i) => i.product_name === name || i.description === name);
      localStorage.setItem("selectedProduct", JSON.stringify(item));
      //window.location.href = `./product/${generateSlug(name)}`;
      window.location.href = `./product/index.html?${generateSlug(name)}`;
     

// const word = el.querySelector('p').textContent.trim().toLowerCase();

// const fixedWord = word.includes('magsafe') ? 'magsafe' : word;

//performSearch(fixedWord)
      
     
//window.scrollTo({ top: 0, behavior: 'smooth' });
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



const viewProduct = product=>{
  localStorage.setItem("selectedProduct", JSON.stringify(product))
  //const sugle = generateSlug(product.name)
//window.location.href = `./product/${generateSlug(name)}`
window.location.href = `./product/index.html?${generateSlug(product.name)}`;
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
              <p>From INR ₹${item.price}</p>

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
    //console.log(item.dataset.type)
    item.onclick=()=>{
     
      window.history.pushState({}, '', `./?type=${item.dataset.type}`);
window.dispatchEvent(new PopStateEvent("popstate"));


    }
  })
  
  $('.lineup .flex').querySelectorAll('.item').forEach(item=>{
    //console.log(item)
      item.onclick=()=>{
        const product={
      name: item.querySelector('h3').textContent,
      img: item.querySelector('img').src,
      price: item.querySelector('p').textContent
      
    }
        viewProduct(product)
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
      imgEl.dataset.name=datas.banner[i].path

      requestAnimationFrame(() => {
        imgEl.style.opacity = 1;
      });

      // console.log("Changed to image", i + 1);
      i++;
      changeImage();
    }, 400); // match fade-out duration
  }, 3000); // display time per image
  imgEl.onclick=()=>console.log(imgEl.dataset.name)
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
  
  
  
  
  
function searchDatas(query) {
  
  const keyword = query.toLowerCase();

  const result = {
    category: [],
    lineup: [],
    products: []
  };

  ['category', 'lineup', 'products'].forEach(section => {
    datas[section].forEach(item => {
      const name = item.name?.toLowerCase() || '';
      const description = item.description?.toLowerCase() || '';
      
      if (name.includes(keyword) || description.includes(keyword)) {
        result[section].push(item);
      }
    });
  });

  return result;
}
  

  // -------- Search func --------- //

const input = document.querySelector('input[type="search"]');
const historyWrap = document.querySelector('.history-wrap');
const suggestions = document.querySelector('.suggestions');
const STORAGE_KEY = 'searchHistory';
let history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

renderHistory(history);

// On typing
input.addEventListener('input', () => {
  const text = input.value.trim().toLowerCase();
  if (!text) {
    renderHistory(history);
    suggestions.innerHTML = '';
    return;
  }

  const historyMatches = history.filter((item) =>
    item.toLowerCase().includes(text)
  );

  if (historyMatches.length > 2) {
    renderSuggestions(historyMatches, true);
  } else {
    const dataMatches = getSuggestionsFromData(text);
    renderSuggestions(dataMatches, false);
  }
});

// On Enter key
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const text = input.value.trim();
    if (text) {
      addToHistory(text);
      performSearch(text);
      input.blur();
      navigator.vibrate([ 20]);
    }
  }
});


input.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    suggestions.innerHTML = '';
    input.blur();
  }
});



// On clicking suggestion
suggestions.addEventListener('click', (e) => {
  const suggestion = e.target.closest('.suggestion');
  if (suggestion) {
    const keyword = suggestion.dataset.text;
    input.value = keyword;
    addToHistory(keyword);
    performSearch(keyword);
    suggestions.innerHTML = '';
  }
});

function performSearch(keyword) {
  const cleanKeyword = keyword.toLowerCase().replace(/\s+/g, '-').slice(0, 30);
  localStorage.setItem('searchWord', keyword)
  //window.location = `./?layer=search-list`;
  window.history.pushState({}, '', './?layer=search-list');
window.dispatchEvent(new PopStateEvent("popstate"));
  foudQ=cleanKeyword
  
  const text = input.value;
  if (text) {
    $('#searchPlaceHolder').textContent=text
  } else {
    $('#searchPlaceHolder').textContent='Search'
    
  }
}
console.log(history)
function addToHistory(text) {
  if (!history.includes(text)) {
    
    history.unshift(text);
    if (history.length > 8) history.pop(); // limit to last 8 searches
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    renderHistory(history);
  }
}

function renderHistory(items) {
  historyWrap.innerHTML = items
    .map(
      (text, index) => `
      <div class="item" data-index="${index}">
        <i class="fa-solid fa-arrow-trend-up"></i>
        <p>${text}</p>
        <span class="remove">×</span>
      </div>
    `
    )
    .join('');
}

historyWrap.addEventListener('click', (e) => {
  const item = e.target.closest('.item');
  if (e.target.classList.contains('remove')) {
    const index = item.dataset.index;
    history.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    renderHistory(history);
    return;
  }
  if (item) {
    const text = item.querySelector('p').textContent;
    input.value = text;
    performSearch(text);
  }
});

function renderSuggestions(items, isHistory) {
  const inputText = input.value.trim().toLowerCase();
  suggestions.innerHTML = items
    .map((text) => {
      const lower = text.toLowerCase();
      const start = lower.indexOf(inputText);
      const end = start + inputText.length;
      const highlighted = text.substring(0, start) +
                          '<strong>' + text.substring(start, end) + '</strong>' +
                          text.substring(end);
      return `
        <div class="suggestion" data-text="${text}">
          <i class="fa-solid ${isHistory ? 'fa-clock' : 'fa-magnifying-glass'}"></i>
          <span class="text">${highlighted}</span>
        </div>
      `;
    })
    .join('');
}

// Search suggestions fix here if needed

const fullSuggestionList = [...new Set([
  ...datas.category.map((c) => c.name),
  ...datas.products.map((p) => p.name),
  ...datas.products.map((pd) => pd.description.split(' ').slice(0, 10).join(' ')), // Here
  ...datas.lineup.map((l) => l.name),
])];

function getSuggestionsFromData(query) {
  return fullSuggestionList.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );
}






window.onpopstate = () => {
  const params = new URLSearchParams(window.location.search);
  const layer = params.get('layer');
  const page = params.get('page');
  //showNotifier("onpopstate layer:", layer);
  handleHideAllMains()
  if (layer === 'search-list') {
    // Show search results
    handleHideAllMains()
    $('header').classList.remove('hidden');
    $('nav').classList.remove('hidden');
    $('.product_list').classList.remove('hidden');
    $('main.home').classList.add('hidden');
    $('.layer.search').classList.add('hidden');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    localStorage.setItem('previousPage', 'search');
    
    const word = localStorage.getItem('searchWord') || '';
    const searchInput = word.trim().toLowerCase();
    
    const filteredProducts = datas.products.filter(product => {
      const name = (product.name || '').toLowerCase();
      const description = (product.description || '').toLowerCase();
      return name.includes(searchInput) || description.includes(searchInput);
    });
    
    renderProductList(filteredProducts);
  }
  
  else if (layer === 'search') {
    handleHideAllMains()
    $('.product_list').classList.add('hidden');
    $('main.home').classList.add('hidden');
    $('.layer.search').classList.remove('hidden');
    $('header').classList.add('hidden');
    $('nav').classList.add('hidden');
    $('.layer.search input').focus();
    
    localStorage.setItem('previousPage', 'search');
  }
  
  else if(params.get('type')){
    const Type = params.get('type'); // example: "case,pencil"

    const allowedTypes = Type ? Type.split(',') : [];
    console.log(allowedTypes)


    const filteredProducts = datas.products.filter(product => product.type === Type);
    renderProductList(filteredProducts)
    datas.products.forEach(product => {
    
      if (Type && allowedTypes.includes(product.type)) {
        console.log("Showing:", product.name);
        $('.product_list').classList.remove('hidden');
        $('main.home').classList.add('hidden');
        //window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
        window.scrollTo(0,0);
  } else {
    console.log('No products found!')
    navigator.vibrate([20, 100, 20]);
  }
});
  } else{
    // Default: home
    $('.product_list').classList.add('hidden');
    $('.layer.search').classList.add('hidden');
    $('main.home').classList.remove('hidden');
    $('header').classList.remove('hidden');
    $('nav').classList.remove('hidden');
    localStorage.setItem('previousPage', 'home');
    $('main.home').classList.add('zoomout');
    
    navButtons.forEach(btn=>{
// btn.dataset.icon==page?btn.classList.add('active'):btn.classList.remove('active');

btn.classList.remove('active')
    })
 !page?$('nav .default').classList.add('active'):'';
 showNotifier(page)
  }
  
  
  
  if (page!='home') {
   // const pages = document.querySelectorAll('main')
// pages.forEach(p=>p.classList.add('hidden'))
   
   // $(`main.home`).classList.remove('hidden')
//    showNotifier(page)
    
   // navButtons.forEach(btn=>{
  // btn.classList.remove('active');
  //  })
    //$('nav .default').classList.add('active')
    return
  }
  if (page) {
  const pages = document.querySelectorAll('main')
 pages.forEach(p=>p.classList.add('hidden'))
   
    $(`main.${page}`).classList.remove('hidden')
    
    navButtons.forEach(btn=>{
   btn.classList.remove('active');
    })
    
    page=='home'?$('nav .default').classList.add('active'):''
}
  

  


};


//later clear history
// document.querySelector('.clear-history').onclick = () => {
//   history = [];
//   localStorage.removeItem(STORAGE_KEY);
//   renderHistory([]);
// };
// author 


//const params = new URLSearchParams(window.location.search);
//const layer = params.get('layer'); // example: "case,pencil"



window.onerror = function (message, source, lineno, colno, error) {
  showNotifier("Error: " + message + "\nLine: " + lineno + "\nColumn: " + colno);
  navigator.vibrate([200, 100, 200]);
  //showNotifier(mess)
};









// function generateSlug(name) {
//   return name
//     .toLowerCase()
//     .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
//     .trim()
//     .replace(/\s+/g, '-')         // Replace spaces with -
// }

// const name = "iPhone 15 Pro Max Back Cover Silicon Blue";
// const slug = generateSlug(name);

// console.log(slug); 
// // Output: "iphone-15-pro-max-back-cover-silicon-blue"

const navButtons = document.querySelectorAll('nav span')

navButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
  //  navButtons.forEach(b => b.classList.remove('active'));
    //e.currentTarget.classList.add('active');
    
    const icon = e.target.dataset.icon
    icon?switchPage(icon):showNotifier('Somthing went wrong!')
  });
});

const switchPage=icon=>{
  //document.querySelector('.layer').classList.add('hidden')
 // document.querySelector(`.${icon}`).classList.remove('hidden')
 

 $('main').classList.add('hidden')
 if (icon=='myorder') {
   document.location='./myorder/index.html'
 } else {
   window.history.pushState({}, '', `./?page=${icon}`);
window.dispatchEvent(new PopStateEvent("popstate"));

    const pages = document.querySelectorAll('main')
 pages.forEach(page=>page.classList.add('hidden'))
   
    $(`main.${icon}`).classList.remove('hidden')
    navButtons.forEach(btn=>{
      btn.classList.remove('active')
      btn.dataset.icon==icon?btn.classList.add('active'):''
    })
    
 }
}



