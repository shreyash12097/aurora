document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('image');
    const productsContainer = document.querySelector('.img');
  
    productForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const productName = document.getElementById('productName').value;
      const productPrice = document.getElementById('productPrice').value;
      const productImage = document.getElementById('productImage').value;

      // Create a product element
      const productElement = createProductElement(
        productName,
        productPrice,
        productImage
      );
      // Add product to the gallery
      productsContainer.insertAdjacentElement('afterbegin', productElement);
  
      // Clear form
      productForm.reset();
    });
    function createProductElement(price, imageUrl) {
        const row = document.createElement('div');
        row.classList.add('row');
    
        row.innerHTML = `
          <div class="img">
       <img src="${imageUrl}" >
    <div class="img-body">
      <p class="product-price">NPR ${price}</p>
      <button><a href="#" class="btn-btn-primary"> Add to cart</a></button>
    </div>
  </div>
        `;
    
        // Delete functionality
        row.querySelector('.delete-btn').addEventListener('click', () => {
          row.remove();
        });
    
        // Edit functionality
        row.querySelector('.edit-btn').addEventListener('click', () => {
          const newPrice = prompt('Enter new product price:', price);
          const newImage = prompt('Enter new product image URL:', imageUrl);
    
          if (newPrice && newImage) {
            row.querySelector('img').src = newImage;
            row.querySelector('.product-price').textContent = `NPR ${newPrice}`;
          }
        });
    
        return row;
      }
    });