const blurElements = document.querySelectorAll(".autoBlur");

function updateBlurEffect() {
  const windowHeight = window.innerHeight;
  const center = windowHeight / 2;
  const focusHeight = windowHeight * 0.3; // The following line of code was adapted from https://chatgpt.com/share/67d343ba-46f4-800a-8fe5-7d750c310742 Accessed: 2025-13-03 //

  blurElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const elementMiddle = rect.top + rect.height / 2;
    const distance = Math.abs(center - elementMiddle);
    const maxBlur = 20; // The following line of code was adapted from https://chatgpt.com/share/67d343ba-46f4-800a-8fe5-7d750c310742 Accessed: 2025-13-03 //

    let blurValue = 0;
    if (distance > focusHeight) {
      blurValue = ((distance - focusHeight) / (center - focusHeight)) * maxBlur;
      blurValue = Math.min(maxBlur, blurValue);
    }

    element.style.filter = "blur(" + blurValue + "px)"; // The following line of code was adapted from https://chatgpt.com/share/67d343ba-46f4-800a-8fe5-7d750c310742 Accessed: 2025-13-03 //
  });
}

window.addEventListener("scroll", updateBlurEffect);
updateBlurEffect();

const cartClick = document.getElementById("cart-icon");
const cartOpen = document.getElementById("cart-container");

cartClick.addEventListener("click", function () {
  const scrollPosition = window.scrollY;

  if (cartOpen.style.right === "-200%" || cartOpen.style.right === "") {
    cartOpen.style.right = "0%";
  } else {
    cartOpen.style.right = "-200%";
  }

  window.scrollTo(0, scrollPosition);
});

// local storage for shopping cart
let cart = JSON.parse(localStorage.getItem("cart")) || []; // The following line of code was adapted from https://chatgpt.com/share/67d34402-b234-800a-9db7-3448be63cfd9 Accessed: 2025-13-03 //
const plusButtons = document.querySelectorAll(".plus-button");
const cartList = document.querySelector(".cart-items");
const cartTotal = document.getElementById("cart-total");
const cartContainer = document.getElementById("cart-container");
const cartIcon = document.getElementById("cart-icon");
const payButton = document.getElementById("pay-button");
const cartCount = document.getElementById("cart-count");
const itemPrice = 15;

function updateCart() {
  cartList.innerHTML = ""; // The following line of code was adapted from https://chatgpt.com/share/67d34402-b234-800a-9db7-3448be63cfd9 Accessed: 2025-13-03 //
  let totalPrice = 0;

  cartIcon.addEventListener("click", () => {
    updateCart();
    cartContainer.style.display = "block";
  });

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.product + " " + `${itemPrice} kr`; // The following line of code was adapted from https://chatgpt.com/share/67d34402-b234-800a-9db7-3448be63cfd9 Accessed: 2025-13-03 //

    const plusButton = document.createElement("button");
    plusButton.textContent = "+";
    plusButton.classList.add("plus-btn"); // The following line of code was adapted from https://chatgpt.com/share/67d343e6-aa6c-800a-86c0-7a1a6b6e09f9 Accessed: 2025-13-03 //
    plusButton.onclick = () => addToCart(item.product);
    li.appendChild(plusButton);

    const quantity = document.createElement("span");
    quantity.textContent = item.quantity;
    quantity.addEventListener("change", () =>
      updateQuantity(item.product, quantity.value)
    );
    li.appendChild(quantity);

    const minusButton = document.createElement("button");
    minusButton.textContent = "-";
    minusButton.classList.add("minus-btn"); // The following line of code was adapted from https://chatgpt.com/share/67d343e6-aa6c-800a-86c0-7a1a6b6e09f9 Accessed: 2025-13-03 //
    minusButton.onclick = () => subtractFromCart(item.product);
    li.appendChild(minusButton);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn"); // The following line of code was adapted from https://chatgpt.com/share/67d343e6-aa6c-800a-86c0-7a1a6b6e09f9 Accessed: 2025-13-03 //
    removeButton.onclick = () => removeFromCart(item.product);
    li.appendChild(removeButton);

    cartList.appendChild(li);

    totalPrice += item.quantity * itemPrice;
  });

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartTotal.textContent = totalItems;

  if (cartCount) {
    cartCount.textContent = totalItems;
  }

  document.getElementById("sum").textContent = " " + `${totalPrice} kr`; // The following line of code was adapted from https://chatgpt.com/share/67d34402-b234-800a-9db7-3448be63cfd9 Accessed: 2025-13-03 //

  attachPlusButtonListeners();
  localStorage.setItem("cart", JSON.stringify(cart)); // The following line of code was adapted from https://chatgpt.com/share/67d34402-b234-800a-9db7-3448be63cfd9 Accessed: 2025-13-03 //
}

function addToCart(product) {
  const existingItem = cart.find((item) => item.product === product);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ product: product, quantity: 1 }); // The following line of code was adapted from https://chatgpt.com/share/67d34402-b234-800a-9db7-3448be63cfd9 Accessed: 2025-13-03 //
  }
  updateCart();
}

function subtractFromCart(product) {
  const existingItem = cart.find((item) => item.product === product);
  if (existingItem) {
    if (existingItem.quantity > 1) {
      existingItem.quantity--;
    } else {
      removeFromCart(product);
    }
  }
  updateCart();
}

function updateQuantity(product, newQuantity) {
  const existingItem = cart.find((item) => item.product === product);
  if (existingItem && newQuantity >= 1) {
    existingItem.quantity = parseInt(newQuantity);
    updateCart();
  }
}

function removeFromCart(product) {
  cart = cart.filter((item) => item.product !== product); // The following line of code was adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter Accessed: 2025-13-03 //
  updateCart();
}

if (document.getElementById("add-to-cart")) {
  // The following 4 lines of code was adapted from https://chatgpt.com/share/67d34402-b234-800a-9db7-3448be63cfd9 Accessed: 2025-13-03 //
  document.getElementById("add-to-cart").addEventListener("click", function () {
    const productName = this.getAttribute("data-product");
    addToCart(productName);
  });
}

function attachPlusButtonListeners() {
  // The following line of code was adapted from https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener Accessed: 2025-13-03 //
  const plusButtons = document.querySelectorAll(".plus-button");
}

plusButtons.forEach((button) => {
  const productName = button.getAttribute("data-name");
  button.addEventListener("click", () => addToCart(productName));
});

updateCart();

//button to hide cart
const shopButton = document.getElementById("shop-button");
const Container = document.getElementById("cart-container");

shopButton.addEventListener("click", () => {
  Container.style.right = "-100%";
});
