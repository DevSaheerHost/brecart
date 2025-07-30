export const card = (data) => {
  const formattedDate = new Date(data.createdAt).toLocaleDateString();

  return `
    
      <div class="product">
        <img src="${data.img}" alt="${data.name}">

        <div class="detail">
          <h4>${data.name}</h4>
          <p class='date'>Ordered on: <span>${formattedDate}</span></p>
          <p>Status: <span class='status'>${data.status}</span></p>
        </div>

        <span class="price">₹${data.price.toLocaleString()}</span>
      </div>

      <div class="address">
        <p>Delivery to: ${data.address?.name || "Unknown"}, 
        ${data.address?.district || ""}, 
       <span class='city'> ${data.address?.city || ""} </span>, 
        ${data.address?.place || ""}, 
        ${data.address?.locality || ""}, 
        ${data.address?.pincode || ""}</p>
      </div>
    
  `;
};