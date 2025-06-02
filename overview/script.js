const product = JSON.parse(localStorage.getItem("selectedProduct"));

const $ = (selector) => document.querySelector(selector);
if (product) {
  $(".main-img").src = product.product_image;
  $("#productName").textContent = product.product_title;
} else {
  document.querySelector(".overview").innerHTML = `<p>No product selected.</p>`;
}

$("#back").onclick = () => window.history.back();
