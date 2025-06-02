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