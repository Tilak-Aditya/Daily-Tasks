
const slideImages = [
  "https://bridge269.qodeinteractive.com/wp-content/uploads/2019/10/slider-img-1.jpg",
  "https://bridge269.qodeinteractive.com/wp-content/uploads/2019/10/slider-img-2.jpg",
  "https://bridge269.qodeinteractive.com/wp-content/uploads/2019/10/slider-img-3.jpg",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80"
];



const slider = document.getElementById("slider");

// wrapper
const wrapper = document.createElement("div");
wrapper.className = "slider-wrapper";

// track
const track = document.createElement("div");
track.className = "slider-track";

// dots container
const dotsContainer = document.createElement("div");
dotsContainer.className = "dots";

// buttons
const prevBtn = document.createElement("button");
prevBtn.className = "nav-btn prev";
prevBtn.innerHTML = "❮";

const nextBtn = document.createElement("button");
nextBtn.className = "nav-btn next";
nextBtn.innerHTML = "❯";

wrapper.append(track, prevBtn, nextBtn, dotsContainer);
slider.appendChild(wrapper);


slideImages.forEach((img, index) => {

  // slide
  const slide = document.createElement("div");
  slide.className = "slide";
  slide.style.backgroundImage = `url(${img})`;
  track.appendChild(slide);

  // dot
  const dot = document.createElement("span");
  dot.className = "dot";

  dot.addEventListener("click", () => {
    updateSlider(index);
  });

  dotsContainer.appendChild(dot);
});

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");


let currentIndex = 0;

function updateSlider(index) {

  if(index >= slides.length) index = 0;

  if(index < 0) index = slides.length - 1;

  track.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");

  currentIndex = index;
}


nextBtn.addEventListener("click", () => {
  updateSlider(currentIndex + 1);
});

prevBtn.addEventListener("click", () => {
  updateSlider(currentIndex - 1);
});



let autoSlide = setInterval(() => {
  updateSlider(currentIndex + 1);
}, 4000);

wrapper.addEventListener("mouseenter", () => clearInterval(autoSlide));

wrapper.addEventListener("mouseleave", () => {
  autoSlide = setInterval(() => {
    updateSlider(currentIndex + 1);
  }, 4000);
});

updateSlider(0);