export const card = (data) => {
  const formattedDate = new Date(data.createdAt).toLocaleDateString();

  return `
    
      <div class="product">
        <img src="${data.img}" alt="${data.name}">

        <div class="detail">
          <h4>${data.name}</h4>
          <p>Ordered on: ${formattedDate}</p>
          <p>Status: <span>${data.status}</span></p>
        </div>

        <span class="price">₹${data.price}</span>
      </div>

      <div class="address">
        <p>Delivery to: ${data.address?.name || "Unknown"}, 
        ${data.address?.district || ""}, 
        ${data.address?.city || ""}, 
        ${data.address?.place || ""}, 
        ${data.address?.locality || ""}, 
        ${data.address?.pincode || ""}</p>
      </div>
    
  `;
};