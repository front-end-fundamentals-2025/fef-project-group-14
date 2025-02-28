const blurElements = document.querySelectorAll(".autoBlur");
let scrolling = false;

function updateBlurEffect() {
  const windowHeight = window.innerHeight;
  const focusHeight = windowHeight * 0.3;

  blurElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const elementMiddle = rect.top + rect.height / 2;
    const distanceFromCenter = Math.abs(windowHeight / 2 - elementMiddle);
    const maxBlur = 20;
    const blurValue = Math.min(
      maxBlur,
      ((distanceFromCenter - focusHeight) / (windowHeight / 2)) * maxBlur
    );
    element.style.filter = `blur(${Math.max(0, blurValue)}px)`;
  });
}

window.addEventListener("scroll", updateBlurEffect);

updateBlurEffect();

const cartClick = document.getElementById("cart-icon");
const cartOpen = document.getElementById("cart-container");

cartClick.addEventListener("click", function () {
  if (cartOpen.style.right === "-300%" || cartOpen.style.right === "") {
    cartOpen.style.right = "0%";
  } else {
    cartOpen.style.right = "-300%";
  }
});

// local storage for shopping cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const plusButtons = document.querySelectorAll(".plus-button");
const cartList = document.querySelector(".cart-items");
const cartTotal = document.getElementById("cart-total");
const cartContainer = document.getElementById("cart-container");
const cartIcon = document.getElementById("cart-icon");
const payButton = document.getElementById("pay-button");

function updateCart() {
  cartList.innerHTML = "";

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeFromCart(item);
    li.appendChild(removeButton);

    cartList.appendChild(li);
  });

  cartTotal.textContent = cart.length;

  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  if (!cart.includes(product)) {
    cart.push(product);
    updateCart();
  }
}

function removeFromCart(product) {
  cart = cart.filter((item) => item !== product);
  updateCart();
}

plusButtons.forEach((button) => {
  const productName = button.getAttribute("data-name");
  button.addEventListener("click", () => addToCart(productName));
});
updateCart();
