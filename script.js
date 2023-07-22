// alert("Hello World");
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
// alert(nav);
let togle = true;
if (bar) {
  bar.addEventListener("click", () => {
    if (togle) {
      nav.classList.add("ace");
      togle = false;
    } else {
      nav.classList.remove("ace");
      togle = true;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartTotal = document.getElementById("cart-total");
  const cartItemsContainer = document.getElementById("cart-items");

  // Function to save cart items to local storage
  function saveCartToLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  // Function to update cart total
  function updateCartTotal() {
    let total = 0;
    for (const item of cartItems) {
      total += item.price;
    }
    cartTotal.textContent = "$" + total.toFixed(2);
  }

  // Function to render cart items
  function renderCartItems() {
    cartItemsContainer.innerHTML = "";
    for (const item of cartItems) {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-info">
          <h5>${item.name}</h5>
          <p>Price: $${item.price.toFixed(2)}</p>
          <button class="remove-btn">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);

      // Add event listener to remove button
      const removeButton = cartItem.querySelector(".remove-btn");
      removeButton.addEventListener("click", function () {
        const index = cartItems.indexOf(item);
        if (index !== -1) {
          cartItems.splice(index, 1);
          renderCartItems();
          updateCartTotal();
          saveCartToLocalStorage(); // Save updated cart to local storage
        }
      });
    }
  }

  // Function to add item to cart
  function addToCart(item) {
    cartItems.push(item);
    updateCartTotal();
    renderCartItems();
    saveCartToLocalStorage(); // Save updated cart to local storage
  }

  // Sample products data (replace with your actual products data)
  const products = [
    {
      name: "Cartoon Astronaut T-shirts",
      price: 12,
      image: "img/products/f1.jpg",
    },
    {
      name: "Blue Classic Shirt",
      price: 15,
      image: "img/products/n1.jpg",
    },
    // Add more product items here
  ];

  // Add event listener to "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  for (const button of addToCartButtons) {
    button.addEventListener("click", function () {
      const productIndex = parseInt(button.dataset.index);
      if (
        !isNaN(productIndex) &&
        productIndex >= 0 &&
        productIndex < products.length
      ) {
        addToCart(products[productIndex]);
      }
    });
  }

  // Render cart items on page load
  renderCartItems();
});
