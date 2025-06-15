<!DOCTYPE html>
<html>
<head>
  <title>Firebase Realtime DB</title>
  <script type="module">
    // Import Firebase libraries from CDN
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
    import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

    // Your Firebase config
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    // Read data from "users"
    const dbRef = ref(db);

    get(child(dbRef, "users")).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val()); // ✅ Use data here
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  </script>
</head>
<body>
  <h1>Check the console for Firebase data</h1>
</body>
</html>





function renderDeals(items) {
  $('.deals .list-view').innerHTML = items.map(item => {
    const isWishlisted = wishlist.some(w => w.title === item.title);
    return `
      <div class="item" data-title="${item.title}">
        <i class="${isWishlisted ? 'fa-solid' : 'fa-regular'} fa-heart heart" data-title="${item.title}"></i>
        <img src="${item.img}" alt="product">
        <p>${item.title}</p>
      </div>
    `;
  }).join('');

  // Heart button logic
  document.querySelectorAll('.heart').forEach(icon => {
    icon.addEventListener('click', (e) => {
      e.stopPropagation(); // prevent item click
      const title = icon.getAttribute('data-title');
      const item = items.find(i => i.title === title);
      const index = wishlist.findIndex(w => w.title === title);

      if (index > -1) {
        wishlist.splice(index, 1);
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
      } else {
        wishlist.push(item);
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    });
  });

  // Product item click → go to overview
  document.querySelectorAll('.item').forEach(el => {
    el.addEventListener('click', () => {
      const title = el.getAttribute('data-title');
      const item = items.find(i => i.title === title);
      localStorage.setItem('selectedProduct', JSON.stringify(item));
      window.location.href = './overview.html';
    });
  });
}






<img id="bannerImage" src="" alt="Banner Image" width="300" />

<script>
const datas = {
  banner: [
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwF2fk3rRuRxkR5X0kls4zEMEVA0THPS3YfEvqSJptnRFmQI99oyFwaWrJ&s=10',
      path: ''
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjijGQHUvfmjnGjKnc_lwrd0pFkgbbJGeApfnDHan0ybcm7_NXJfwPcVY&s=10',
      path: ''
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_jfjPlTbjmJHQtLcZojr4j2hWmNZC4qCyfXE23A4Ej62-cmT72kslV5g&s=10',
      path: ''
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLd_NTREVBgE-I4CSo956zGGUlJirmEPwpQMybp3GM-7t_A4-DFPy-r3Z2&s=10',
      path: ''
    }
  ]
};

let i = 0;

function changeImage() {
  if (i < datas.banner.length) {
    setTimeout(() => {
      document.getElementById('bannerImage').src = datas.banner[i].img;
      i++;
      changeImage();
    }, 1000); // 1 second
  }
}

changeImage();
</script>


<img id="bannerImage" src="" alt="Banner Image" width="300" style="transition: opacity 0.5s ease; opacity: 1;" />

<script>
const $ = selector => document.querySelector(selector);

const datas = {
  banner: [
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwF2fk3rRuRxkR5X0kls4zEMEVA0THPS3YfEvqSJptnRFmQI99oyFwaWrJ&s=10',
      path: ''
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjijGQHUvfmjnGjKnc_lwrd0pFkgbbJGeApfnDHan0ybcm7_NXJfwPcVY&s=10',
      path: ''
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_jfjPlTbjmJHQtLcZojr4j2hWmNZC4qCyfXE23A4Ej62-cmT72kslV5g&s=10',
      path: ''
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLd_NTREVBgE-I4CSo956zGGUlJirmEPwpQMybp3GM-7t_A4-DFPy-r3Z2&s=10',
      path: ''
    }
  ]
};

let i = 0;
const imgEl = $('#bannerImage');
imgEl.src = datas.banner[i].img; // Initial image
i++;

const changeImage = () => {
  if (i < datas.banner.length) {
    setTimeout(() => {
      imgEl.style.opacity = 0;

      setTimeout(() => {
        imgEl.src = datas.banner[i].img;
        imgEl.style.opacity = 1;
        console.log('Changed to image', i + 1);
        i++;
        changeImage();
      }, 500); // Wait for fade out before changing src

    }, 3000); // Wait before starting fade
  }
};

changeImage();
</script>


<img id="bannerImage" src="" alt="Banner Image" width="300" style="opacity: 1; transition: opacity 0.4s ease;" />

<script>
const $ = selector => document.querySelector(selector);

const datas = {
  banner: [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwF2fk3rRuRxkR5X0kls4zEMEVA0THPS3YfEvqSJptnRFmQI99oyFwaWrJ&s=10' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjijGQHUvfmjnGjKnc_lwrd0pFkgbbJGeApfnDHan0ybcm7_NXJfwPcVY&s=10' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_jfjPlTbjmJHQtLcZojr4j2hWmNZC4qCyfXE23A4Ej62-cmT72kslV5g&s=10' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLd_NTREVBgE-I4CSo956zGGUlJirmEPwpQMybp3GM-7t_A4-DFPy-r3Z2&s=10' }
  ]
};

let i = 0;
const imgEl = $('#bannerImage');
imgEl.src = datas.banner[i].img;
i++;

const changeImage = () => {
  if (i < datas.banner.length) {
    setTimeout(() => {
      // Fade out
      imgEl.style.opacity = '0';

      // Wait for fade-out to complete before swapping image
      setTimeout(() => {
        imgEl.src = datas.banner[i].img;

        // Allow browser to register new src before fade-in
        requestAnimationFrame(() => {
          imgEl.style.opacity = '1';
        });

        console.log('Changed to image', i + 1);
        i++;
        changeImage();
      }, 400); // match transition duration
    }, 3000); // delay before next transition
  }
};

changeImage();
</script>




<img id="bannerImage" src="" alt="Banner Image" width="300" style="opacity: 1; transition: opacity 0.4s ease;" />

<script>
const $ = selector => document.querySelector(selector);

const datas = {
  banner: [
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwF2fk3rRuRxkR5X0kls4zEMEVA0THPS3YfEvqSJptnRFmQI99oyFwaWrJ&s=10' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjijGQHUvfmjnGjKnc_lwrd0pFkgbbJGeApfnDHan0ybcm7_NXJfwPcVY&s=10' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_jfjPlTbjmJHQtLcZojr4j2hWmNZC4qCyfXE23A4Ej62-cmT72kslV5g&s=10' },
    { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLd_NTREVBgE-I4CSo956zGGUlJirmEPwpQMybp3GM-7t_A4-DFPy-r3Z2&s=10' }
  ]
};

let i = 0;
const imgEl = $('#bannerImage');
imgEl.src = datas.banner[i].img;
i++;

const changeImage = () => {
  setTimeout(() => {
    imgEl.style.opacity = 0;

    setTimeout(() => {
      i = i % datas.banner.length; // Ensure loop
      imgEl.src = datas.banner[i].img;

      requestAnimationFrame(() => {
        imgEl.style.opacity = 1;
      });

      console.log('Changed to image', i + 1);
      i++;
      changeImage();

    }, 400); // match fade-out duration

  }, 3000); // display time per image
};

changeImage();
</script>


vid link https://cdn.shopify.com/videos/c/o/v/c48eff385dea465193afbf36a54e8206.mp4



<script>
  const header = document.querySelector('header');
  const target = document.querySelector('.black');

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        header.classList.add('active');
      } else {
        header.classList.remove('active');
      }
    },
    {
      threshold: 0.5 // adjust as needed
    }
  );

  observer.observe(target);
</script>


.glass-black-box {
  background: rgba(0, 0, 0, 0.4); /* semi-transparent black */
  backdrop-filter: blur(8px);     /* blur the background behind */
  -webkit-backdrop-filter: blur(8px); /* Safari support */
  border-radius: 12px;
  padding: 1rem;
  width: fit-content;
  height: fit-content;
  color: white; /* optional: text contrast */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* optional: subtle depth */
}



<script>
  const input = document.querySelector('input[type="search"]');
  const historyWrap = document.querySelector('.history-wrap');
  const STORAGE_KEY = 'searchHistory';

  // Load history on page load
  const history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  renderHistory(history);

  // On Enter Key Pressed
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const text = input.value.trim();
      if (text && !history.includes(text)) {
        history.unshift(text);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        renderHistory(history);
      }
      performSearch(text);
    }
  });

  // Click on history item
  historyWrap.addEventListener('click', (e) => {
    const item = e.target.closest('.item');
    if (item) {
      const text = item.querySelector('p').textContent;
      input.value = text;
      performSearch(text);
    }
  });

  // Render search history
  function renderHistory(items) {
    historyWrap.innerHTML = items
      .map(
        (text) => `
      <div class="item">
        <i class="fa-solid fa-arrow-trend-up"></i>
        <p>${text}</p>
      </div>
    `
      )
      .join('');
  }

  // Search action (to be implemented)
  function performSearch(query) {
    console.log("Search triggered for:", query);
    // TODO: implement real search later with array/object
  }
</script>





<script type="module">
  import { datas } from './data.js'; // Adjust path as needed

  const input = document.querySelector('input[type="search"]');
  const historyWrap = document.querySelector('.history-wrap');
  const suggestions = document.querySelector('.suggestions');
  const STORAGE_KEY = 'searchHistory';
  let history = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  renderHistory(history);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const text = input.value.trim();
      if (text) {
        addToHistory(text);
        performSearch(text);
        input.blur(); // Optional UX
      }
    }
  });

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

    if (historyMatches.length > 0) {
      renderSuggestions(historyMatches, true);
    } else {
      const dataMatches = getSuggestionsFromData(text);
      renderSuggestions(dataMatches, false);
    }
  });

  historyWrap.addEventListener('click', (e) => {
    const item = e.target.closest('.item');
    if (item) {
      const text = item.querySelector('p').textContent;
      input.value = text;
      performSearch(text);
    }
  });

  suggestions.addEventListener('click', (e) => {
    const item = e.target.closest('.suggestion');
    if (item) {
      const text = item.dataset.text;
      input.value = text;
      addToHistory(text);
      performSearch(text);
      suggestions.innerHTML = '';
    }
  });

  function addToHistory(text) {
    if (!history.includes(text)) {
      history.unshift(text);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      renderHistory(history);
    }
  }

  function renderHistory(items) {
    historyWrap.innerHTML = items
      .map(
        (text) => `
      <div class="item">
        <i class="fa-solid fa-arrow-trend-up"></i>
        <p>${text}</p>
      </div>
    `
      )
      .join('');
  }

  function renderSuggestions(items, isHistory) {
    suggestions.innerHTML = items
      .map(
        (text) => `
      <div class="suggestion" data-text="${text}">
        <i class="fa-solid ${isHistory ? 'fa-clock' : 'fa-magnifying-glass'}"></i>
        <span>${text}</span>
      </div>
    `
      )
      .join('');
  }

  function getSuggestionsFromData(query) {
    const all = [
      ...datas.category.map((c) => c.name),
      ...datas.products.map((p) => p.name),
      ...datas.lineup.map((l) => l.name),
    ];
    const unique = [...new Set(all)];
    return unique.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }

  function performSearch(text) {
    console.log('Searching for:', text);
    // TODO: filter and display products based on `text`
  }
</script>

















  // 3. LAYER FILTER (flexible match)
else if (layerParam) {
  console.log("Layer param triggered:", layerParam);

  $('.product_list').classList.remove('hidden');
  $('main.home').classList.add('hidden');
  $('.layer.search').classList.add('hidden');

  try {
    const filteredProducts = datas.products.filter(product => {
      const name = product.name?.toLowerCase().slice(0, 10) || '';
      const category = datas.category.find(c => c.id === product.categoryId)?.name?.toLowerCase().slice(0, 10) || '';
      const lineup = datas.lineup.find(l => l.id === product.lineupId)?.name?.toLowerCase().slice(0, 10) || '';

      return (
        name.includes(layerKey) ||
        category.includes(layerKey) ||
        lineup.includes(layerKey)
      );
    });

    console.log("Filtered products (layerParam):", filteredProducts);

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
    console.error('Error while rendering Product list on layerParam:', e.message);
  }
}


product.name.replace(new RegExp(searchInput, 'gi'), match => `<mark>${match}</mark>`)





if (!history.some(item => item.toLowerCase() === text.toLowerCase())) {




// On clicking history item
// historyWrap.addEventListener('click', (e) => {
//   const item = e.target.closest('.item');
//   if (item) {
//     const text = item.querySelector('p').textContent;
//     input.value = text;
//     performSearch(text);
//   }
// });