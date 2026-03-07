// REGISTER FUNCTIONALITY

const registerForm = document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit", function(e){

e.preventDefault();

const username = document.getElementById("username").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const confirmPassword = document.getElementById("confirmPassword").value;

if(password !== confirmPassword){
alert("Passwords do not match");
return;
}

let users = JSON.parse(localStorage.getItem("users")) || [];

const userExists = users.some(user => user.email === email);

if(userExists){
alert("User already registered with this email");
return;
}

const userData = {
username: username,
email: email,
password: password
};

users.push(userData);

localStorage.setItem("users", JSON.stringify(users));

alert("Registration Successful");

window.location.href = "loginPage.html";

});

}


// LOGIN FUNCTIONALITY

const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit", function(e){

e.preventDefault();

const email = document.getElementById("loginEmail").value;
const password = document.getElementById("loginPassword").value;

let users = JSON.parse(localStorage.getItem("users")) || [];

const validUser = users.find(user =>
user.email === email && user.password === password
);

if(validUser){

localStorage.setItem("loggedInUser", JSON.stringify(validUser));

alert("Login Successful");

window.location.href = "HomePage.html";

}else{

alert("Invalid Email or Password");

}

});

}