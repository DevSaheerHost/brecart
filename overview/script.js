const product = JSON.parse(localStorage.getItem("selectedProduct"));

const $ = (selector) => document.querySelector(selector);
if (product) {
  $(".main-img").src = product.product_image || product.img;
  $(".sub-img").src = product.product_image || product.img;
  $("#productName").textContent = product.product_description || product.description;
  
  const price = Number(product.product_price ?? product.price);
$(".price").textContent = `₹${price.toLocaleString()}`;
} else {
  document.querySelector(".overview").innerHTML = `<p>No product selected.</p>`;
}

$("#back").onclick = () => window.history.back();
console.log(product)


$('.increment').onclick=()=>{
  if ($('#quantity').textContent<10) {
    $('#quantity').textContent++
    
    let quantity =Number($('#quantity').textContent)
    
    $('.decrement').style.borderColor='black'
    
    const totalPrice = (product.price?? product.product_price) * quantity;
    
    $(".price").textContent = ` ₹${totalPrice.toLocaleString()}`
    
  } else $('.increment').style.borderColor='#C5C5C5'
}
$('.decrement').onclick=()=>{
  if ($('#quantity').textContent > 1) {
    $('#quantity').textContent--
    $('.increment').style.borderColor='black'
    let quantity =Number($('#quantity').textContent)
    
    
    const totalPrice = (product.price?? product.product_price) * quantity;
    $(".price").textContent = ` ₹${totalPrice.toLocaleString()}`
  } 
  if ($('#quantity').textContent<2) {
    $('.decrement').style.borderColor='#C5C5C5'
  }
}

const params = new URLSearchParams(window.location.search);
const layerParam = params.get('layer');

if (layerParam == 'place-order') {
  $('.layer').classList.add('hidden')
  $('.buy-page').classList.remove('hidden')
}
$('.buy_btn').onclick=()=>{
  
  window.location='./?layer=place-order'
  
}

$('#placeOrder').onclick=()=>$('.order-placed-message-wrap').classList.remove('hidden')

$('.back-to-purchase').onclick=()=>window.location='../';

window.onerror = function(message, source, lineno, colno, error) {
  alert("Error: " + message + "\nLine: " + lineno + "\nColumn: " + colno);
};


$('.buy i').onclick = () => {
  const icon = $('.buy i');
  icon.classList.toggle('fa-regular');
  icon.classList.toggle('fa-solid');
};