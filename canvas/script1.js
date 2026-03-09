const generateBtn = document.getElementById("generateBtn");
const promptInput = document.getElementById("promptInput");
const canvas = document.querySelector(".canvaContainer");

const squareBtn = document.getElementById("squareBtn");
const circleBtn = document.getElementById("circleBtn");

const bgColor = document.getElementById("bgColor");
const roundness = document.getElementById("roundness");

const clearCanvas = document.getElementById("clearCanvas");
const downloadBtn = document.getElementById("downloadBtn");


/* GENERATE AI IMAGE */

generateBtn.addEventListener("click", function(){

const prompt = promptInput.value.trim();

if(prompt === ""){
alert("Please enter image description");
return;
}

const img = document.createElement("img");

img.src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

img.style.width = "200px";
img.style.position = "absolute";
img.style.top = "100px";
img.style.left = "200px";
img.style.cursor = "move";
img.style.borderRadius = "10px";

canvas.appendChild(img);

makeDraggable(img);

});


/* ADD SQUARE */

squareBtn.addEventListener("click", function(){

const square = document.createElement("div");

square.style.width = "100px";
square.style.height = "100px";
square.style.background = "#c83636";
square.style.position = "absolute";
square.style.top = "50px";
square.style.left = "50px";
square.style.cursor = "move";

canvas.appendChild(square);

makeDraggable(square);

});


/* ADD CIRCLE */

circleBtn.addEventListener("click", function(){

const circle = document.createElement("div");

circle.style.width = "100px";
circle.style.height = "100px";
circle.style.background = "#0c0c47";
circle.style.borderRadius = "50%";
circle.style.position = "absolute";
circle.style.top = "100px";
circle.style.left = "100px";
circle.style.cursor = "move";

canvas.appendChild(circle);

makeDraggable(circle);

});


/* BACKGROUND COLOR */

bgColor.addEventListener("input", function(){

canvas.style.backgroundColor = bgColor.value;

});


/* ROUNDNESS */

roundness.addEventListener("input", function(){

canvas.style.borderRadius = roundness.value + "px";

});


/* CLEAR CANVAS */

clearCanvas.addEventListener("click", function(){

canvas.innerHTML = "";

});


/* DOWNLOAD CANVAS */

downloadBtn.addEventListener("click", function(){

html2canvas(canvas).then(function(canvasImage){

const link = document.createElement("a");

link.download = "design.png";

link.href = canvasImage.toDataURL();

link.click();

});

});


/* DRAG FUNCTION */

function makeDraggable(element){

let isDragging = false;
let offsetX, offsetY;

element.addEventListener("mousedown", function(e){

isDragging = true;

offsetX = e.offsetX;
offsetY = e.offsetY;

});

document.addEventListener("mousemove", function(e){

if(!isDragging) return;

const rect = canvas.getBoundingClientRect();

element.style.left = (e.clientX - rect.left - offsetX) + "px";
element.style.top = (e.clientY - rect.top - offsetY) + "px";

});

document.addEventListener("mouseup", function(){

isDragging = false;

});

}