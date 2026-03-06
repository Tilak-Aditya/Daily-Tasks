document.addEventListener("DOMContentLoaded", () => {

let wishListProducts =
JSON.parse(localStorage.getItem("wishlist")) || [];

let cartListProducts =
JSON.parse(localStorage.getItem("cartItems")) || [];

let products =
JSON.parse(localStorage.getItem("products")) || [];


// SAVE DATA

function saveWishlist() {
localStorage.setItem("wishlist", JSON.stringify(wishListProducts));
}

function saveCart() {
localStorage.setItem("cartItems", JSON.stringify(cartListProducts));
}


// WISHLIST BADGE

function updateWishlistBadge() {

const badge = document.getElementById("wishlistCount");

if (!badge) return;

badge.textContent = wishListProducts.length;

badge.style.display =
wishListProducts.length === 0 ? "none" : "flex";

}


// WISHLIST TOGGLE

function toggleWishlist(product, icon) {

const exists = wishListProducts.some(
item => item._id === product._id
);

if (exists) {

wishListProducts = wishListProducts.filter(
item => item._id !== product._id
);

icon.classList.remove("fa-solid", "liked");
icon.classList.add("fa-regular");

} else {

wishListProducts.push(product);

icon.classList.remove("fa-regular");
icon.classList.add("fa-solid", "liked");

}

saveWishlist();
updateWishlistBadge();
}


// ADD TO CART

function addToCart(product) {

const existing = cartListProducts.find(
item => item._id === product._id
);

if (existing) {
existing.qty += 1;
} else {
cartListProducts.push({ ...product, qty: 1 });
}

saveCart();
alert("Added to cart");

}


// PRODUCT CARD

function createProduct(product) {

const card = document.createElement("div");
card.classList.add("productCard");
card.style.backgroundImage = `url(${product.image})`;

const wishlistIcon = document.createElement("i");

const liked = wishListProducts.some(
item => item._id === product._id
);

wishlistIcon.className = liked
? "fa-solid fa-heart wishIcon liked"
: "fa-regular fa-heart wishIcon";

wishlistIcon.addEventListener("click", () =>
toggleWishlist(product, wishlistIcon)
);

card.appendChild(wishlistIcon);


const container = document.createElement("div");
container.classList.add("divCon");

const title = document.createElement("h1");
title.classList.add("productName");
title.textContent = product.productName;

const price = document.createElement("p");
price.textContent = `₹${product.price}`;

const button = document.createElement("button");
button.classList.add("addTocartButton");
button.textContent = "Add to Cart";

button.addEventListener("click", () => {
addToCart(product);
});

container.append(title, price, button);

card.appendChild(container);

return card;

}


// DISPLAY PRODUCTS BY CATEGORY

function displayProducts() {

const menContainer = document.getElementById("MenSection");
const womenContainer = document.getElementById("WomenSection");
const kidsContainer = document.getElementById("kidsSection");

if (menContainer) menContainer.innerHTML = "";
if (womenContainer) womenContainer.innerHTML = "";
if (kidsContainer) kidsContainer.innerHTML = "";

products.forEach(product => {

const card = createProduct(product);

if (product.category === "men" && menContainer) {
menContainer.appendChild(card);
}

if (product.category === "women" && womenContainer) {
womenContainer.appendChild(card);
}

if (product.category === "kids" && kidsContainer) {
kidsContainer.appendChild(card);
}

});

}


// HERO SLIDER

function initSlider() {

const track = document.querySelector(".slider-track");

if (!track) return;

const slides = document.querySelectorAll(".slide");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

function updateSlider(index) {

track.style.transform = `translateX(-${index * 100}%)`;

dots.forEach(dot => dot.classList.remove("active"));

dots[index]?.classList.add("active");

currentIndex = index;

}

nextBtn?.addEventListener("click", () => {
updateSlider((currentIndex + 1) % slides.length);
});

prevBtn?.addEventListener("click", () => {
updateSlider((currentIndex - 1 + slides.length) % slides.length);
});

setInterval(() => {
nextBtn?.click();
}, 3000);

}


// TABS

function initTabs() {

const tabs = document.querySelectorAll(".tab");

if (!tabs.length) return;

const slider = document.querySelector(".slider");
const sections = document.querySelectorAll(".section");

tabs.forEach((tab, index) => {

tab.addEventListener("click", () => {

tabs.forEach(t => t.classList.remove("active"));
sections.forEach(sec => sec.classList.remove("active-section"));

tab.classList.add("active");

document
.getElementById(tab.dataset.target)
?.classList.add("active-section");

slider.style.transform = `translateX(${index * 100}%)`;

});

});

}


// INIT

initSlider();
initTabs();
displayProducts();
updateWishlistBadge();

});