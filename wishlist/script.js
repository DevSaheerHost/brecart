const $ = s => document.querySelector(s);

const wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];

console.log(wishlistData);

$('.list').innerHTML = wishlistData.map(item => `
  <div class="item">
    <div class="box">
      <img src="${item.product_image}" alt="${item.product_name}" />
      <div class="detail">
        <h3>${item.product_name}</h3>
        <p class="brand-name">${item.brand || 'Brand Name'}</p>
        <p class="color">Color: <span>${item.color || 'Default'}</span></p>
        <h3>₹${item.product_price}</h3>
      </div>
    </div>

    <div class="controll-wrap">
      <span>
        <i class="fa-solid fa-pen"></i>
        <p>Edit</p>
      </span>

      <span class="count">
        <p>-</p>
        <p>1</p>
        <p>+</p>
      </span>

      <span><i class="fa-solid fa-trash"></i><p>Delete</p></span>
    </div>
  </div>
`).join('')  || '<p class="empty">Empty<p>';