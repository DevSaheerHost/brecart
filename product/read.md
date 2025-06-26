<!-- overview.html -->
<body>
  <div class="overview"></div>

  <script>
    const product = JSON.parse(localStorage.getItem("selectedProduct"));

    if (product) {
      document.querySelector(".overview").innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.img}" alt="${product.title}">
        <!-- Add other product info here -->
      `;
    } else {
      document.querySelector(".overview").innerHTML = `<p>No product selected.</p>`;
    }
  </script>
</body>
Ui upgrade 




