// ADMIN PRODUCT STORAGE
let products = JSON.parse(localStorage.getItem("products")) || [];

const table = document.getElementById("productTable");
const totalProducts = document.getElementById("totalProducts");

const modal = document.getElementById("productModal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");

const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const imageInput = document.getElementById("image");
const categoryInput = document.getElementById("category");

let editIndex = null;

// OPEN MODAL
openModal.onclick = () => {
  modal.style.display = "flex";
  clearInputs();
};

// CLOSE MODAL
closeModal.onclick = () => {
  modal.style.display = "none";
};

// SAVE PRODUCTS
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

// CLEAR INPUTS
function clearInputs() {
  nameInput.value = "";
  priceInput.value = "";
  imageInput.value = "";
  categoryInput.value = "";
  editIndex = null;
}

// DISPLAY PRODUCTS
function displayProducts() {

  table.innerHTML = "";

  products.forEach((product, index) => {

    table.innerHTML += `
      <tr>
        <td>
          <img src="${product.image}" width="60">
        </td>

        <td>${product.productName}</td>

        <td>₹${product.price}</td>

        <td>${product.category}</td>

        <td>
          <button onclick="editProduct(${index})">Edit</button>
          <button onclick="deleteProduct(${index})">Delete</button>
        </td>

      </tr>
    `;

  });

  totalProducts.innerText = products.length;
}

// ADD / UPDATE PRODUCT
document.getElementById("addProductBtn").onclick = () => {

  const name = nameInput.value.trim();
  const price = priceInput.value.trim();
  const image = imageInput.value.trim();
  const category = categoryInput.value.trim().toLowerCase();

  if (!name || !price || !image || !category) {
    alert("Please fill all fields");
    return;
  }

  const product = {
    _id: Date.now().toString(),
    productName: name,
    price: Number(price),
    image,
    category,
    qty: 1
  };

  if (editIndex === null) {
    products.push(product);
  } else {
    products[editIndex] = product;
  }

  saveProducts();
  displayProducts();

  modal.style.display = "none";
  clearInputs();
};

// DELETE PRODUCT
function deleteProduct(index) {

  if (!confirm("Delete this product?")) return;

  products.splice(index, 1);

  saveProducts();
  displayProducts();
}

// EDIT PRODUCT
function editProduct(index) {

  const product = products[index];

  nameInput.value = product.productName;
  priceInput.value = product.price;
  imageInput.value = product.image;
  categoryInput.value = product.category;

  editIndex = index;

  modal.style.display = "flex";
}

displayProducts();