import { datas } from 'https://brecart.vercel.app/data.js';

const $ = (selector) => document.querySelector(selector);

// Get slug from URL
const slug = location.pathname.split('/').pop();

if (!slug) {
  document.body.innerHTML = `<h2 style="color:red;text-align:center;">❌ No product slug provided in URL.</h2>`;
  throw new Error("No slug provided"); // Stop further execution
}

function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[\s()&,]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const products = datas.products;
const product = products.find(p => generateSlug(p.name) === slug);

if (!product) {
  document.body.innerHTML = `
    <div style="padding: 2rem; text-align: center;">
      <h2 style="color: red;">❌ Product Not Found</h2>
      <p style="margin-top: 1rem;">We couldn’t find the product you’re looking for.</p>
      <a href="/" style="margin-top: 2rem; display: inline-block; text-decoration: none; color: #0ba2ff;">← Go back to home</a>
    </div>
  `;
  throw new Error("Product not found"); // Stop further execution
}

//  Display Product Info
$(".main-img").src = product.product_image || product.img;
$(".sub-img").src = product.product_image || product.img;
$("#productName").textContent = product.product_description || product.description;

const price = Number(product.product_price ?? product.price);
$(".price").textContent = `₹${price.toLocaleString()}`;

// Quantity Button Logic
$('.increment').onclick = () => {
  if ($('#quantity').textContent < 10) {
    $('#quantity').textContent++;
    const quantity = Number($('#quantity').textContent);
    $('.decrement').style.borderColor = 'black';
    const totalPrice = (product.price ?? product.product_price) * quantity;
    $(".price").textContent = ` ₹${totalPrice.toLocaleString()}`;
  } else {
    $('.increment').style.borderColor = '#C5C5C5';
  }
};

$('.decrement').onclick = () => {
  if ($('#quantity').textContent > 1) {
    $('#quantity').textContent--;
    $('.increment').style.borderColor = 'black';
    const quantity = Number($('#quantity').textContent);
    const totalPrice = (product.price ?? product.product_price) * quantity;
    $(".price").textContent = ` ₹${totalPrice.toLocaleString()}`;
  }
  if ($('#quantity').textContent < 2) {
    $('.decrement').style.borderColor = '#C5C5C5';
  }
};

// Buy Layer Handler
const params = new URLSearchParams(window.location.search);
const layerParam = params.get('layer');
if (layerParam === 'place-order') {
  $('.layer').classList.add('hidden');
  $('.buy-page').classList.remove('hidden');
}

$('.buy_btn').onclick = () => {
  window.location = './?layer=place-order';
};
$('#placeOrder').onclick = () => $('.order-placed-message-wrap').classList.remove('hidden');
$('.back-to-purchase').onclick = () => window.location = '../';

// Bookmark Icon Toggle
$('.buy i').onclick = () => {
  const icon = $('.buy i');
  icon.classList.toggle('fa-regular');
  icon.classList.toggle('fa-solid');
};

// Related Products
const relatedList = datas.products
  .filter(p => p.type === product.type && generateSlug(p.name) !== slug)
  .slice(0, 4);

const relatedDiv = document.getElementById("related");
for (const item of relatedList) {
  const itemSlug = generateSlug(item.name);
  relatedDiv.innerHTML += `
    <a href="/product/${itemSlug}" style="text-decoration:none; color:inherit; padding: 10px; border-radius: 10px;">
      <img src="${item.img}" style="width: 100%; height: auto; border-radius: 8px;"/>
      <h4 style="margin: .5rem 0;">${item.name}</h4>
      <p style="color: green; font-weight: bold;">₹${item.price.toLocaleString()}</p>
    </a>
  `;
}

// Back button
$("#back").onclick = () => window.history.back();

// Global error alert
window.onerror = function(message, source, lineno, colno, error) {
  alert("JS Error:\n" + message + "\nLine: " + lineno + " Column: " + colno);
};