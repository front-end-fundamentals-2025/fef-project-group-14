const blurElements = document.querySelectorAll(".autoBlur");

function updateBlurEffect() {
  const windowHeight = window.innerHeight;
  const center = windowHeight / 2;
  const focusHeight = windowHeight * 0.3;

  blurElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const elementMiddle = rect.top + rect.height / 2;
    const distance = Math.abs(center - elementMiddle);
    const maxBlur = 20;

    let blurValue = 0;
    if (distance > focusHeight) {
      blurValue = ((distance - focusHeight) / (center - focusHeight)) * maxBlur;
      blurValue = Math.min(maxBlur, blurValue);
    }

    element.style.filter = "blur(" + blurValue + "px)";
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
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const plusButtons = document.querySelectorAll(".plus-button");
const cartList = document.querySelector(".cart-items");
const cartTotal = document.getElementById("cart-total");
const cartContainer = document.getElementById("cart-container");
const cartIcon = document.getElementById("cart-icon");
const payButton = document.getElementById("pay-button");
const cartCount = document.getElementById("cart-count");
const itemPrice = 15;

function updateCart() {
  cartList.innerHTML = "";
  let totalPrice = 0;

  cartIcon.addEventListener("click", () => {
    updateCart();
    cartContainer.style.display = "block";
  });

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.product + " " + `${itemPrice} kr`;

    const plusButton = document.createElement("button");
    plusButton.textContent = "+";
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
    minusButton.onclick = () => subtractFromCart(item.product);
    li.appendChild(minusButton);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
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

  document.getElementById("sum").textContent = " " + `${totalPrice} kr`;

  attachPlusButtonListeners();
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const existingItem = cart.find((item) => item.product === product);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ product: product, quantity: 1 });
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
  cart = cart.filter((item) => item.product !== product);
  updateCart();
}

if (document.getElementById("add-to-cart")) {
  document.getElementById("add-to-cart").addEventListener("click", function () {
    const productName = this.getAttribute("data-product");
    addToCart(productName);
  });
}

function attachPlusButtonListeners() {
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
