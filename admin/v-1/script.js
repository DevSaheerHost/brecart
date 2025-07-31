const productTable = document.getElementById("productTable");
let products = [];

function renderProducts() {
  productTable.innerHTML = '';
  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${product.image}" /></td>
      <td>${product.name}</td>
      <td>${product.variant}</td>
      <td>${product.stock}</td>
      <td>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;
    productTable.appendChild(row);
  });
}


function deleteProduct(index) {
  if (confirm("Are you sure to delete this product?")) {
    products.splice(index, 1);
    renderProducts();
  }
}

let editIndex = null;

function editProduct(index) {
  const p = products[index];
  document.getElementById("productId").value = p.id;
  document.getElementById("productName").value = p.name;
  document.getElementById("variant").value = p.variant;
  document.getElementById("stock").value = p.stock;
  document.getElementById("description").value = p.desc;

  const imageInputsContainer = document.getElementById("imageInputs");
  imageInputsContainer.innerHTML = ''; // Clear all

  p.allImages.forEach((img, i) => {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "imageUrl";
    input.placeholder = `Image URL ${i + 1}`;
    input.value = img;
    
    
    const imgElem = document.createElement('img')
    imgElem.src = img;
    imgElem.alt=`img ${i}`
    
    imageInputsContainer.appendChild(input);
    imageInputsContainer.appendChild(imgElem)
    
  });

  imageCount = p.allImages.length;
  editIndex = index;
}

function addProduct() {
  const id = document.getElementById("productId").value;
  const name = document.getElementById("productName").value;
  const variant = document.getElementById("variant").value;
  const imageInputs = document.querySelectorAll(".imageUrl");
  const stock = document.getElementById("stock").value;
  const desc = document.getElementById("description").value;

  const images = Array.from(imageInputs).map(input => input.value).filter(val => val);

  if (!id || !name || !variant || images.length === 0 || !stock) {
    alert("Please fill all required fields.");
    return;
  }

  const newProduct = {
    id,
    name,
    variant,
    image: images[0], // First image as thumbnail
    allImages: images, // All images
    stock,
    desc
  };

  if (editIndex !== null) {
    products[editIndex] = newProduct;
    editIndex = null;
  } else {
    products.push(newProduct);
  }

  renderProducts();
  clearForm();
}

function clearForm() {
  document.getElementById("productId").value = '';
  document.getElementById("productName").value = '';
  document.getElementById("variant").value = '';
  document.getElementById("stock").value = '';
  document.getElementById("description").value = '';

  const imageInputs = document.getElementById("imageInputs");
  imageInputs.innerHTML = '<input type="text" class="imageUrl" placeholder="Image URL 1" />';
  imageCount = 1;
}

let imageCount = 1;

function addMoreImages() {
  imageCount++;
  const imageInputs = document.getElementById("imageInputs");
  
  const imgElem = document.createElement('img')
    
    imgElem.alt=`img ${imageCount}`

  const newInput = document.createElement("input");
  newInput.type = "text";
  newInput.placeholder = `Image URL ${imageCount}`;
  newInput.className = "imageUrl";
  newInput.oninput=()=>imgElem.src = newInput.value;
  imageInputs.appendChild(newInput);
  imageInputs.appendChild(imgElem);
}

function logout() {
  alert("Logout clicked. You can implement Firebase or session clearing here.");
}


// After renderProducts()
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function loadProducts() {
  const saved = localStorage.getItem("products");
  if (saved) {
    products = JSON.parse(saved);
    renderProducts();
  }
}

function previewImage(input) {
  const img = input.nextElementSibling;
  img.src = input.value;
}

// Call on page load
window.onload = loadProducts;

// Modify renderProducts() to also save:
function renderProducts() {
  productTable.innerHTML = '';
  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${product.image}" onerror="this.src='no-image.png'" /></td>
      <td>${product.name}</td>
      <td>${product.variant}</td>
      <td>${product.stock}</td>
      <td>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;
    productTable.appendChild(row);
  });

  saveProducts(); // Save after render
}