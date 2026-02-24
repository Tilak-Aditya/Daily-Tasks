let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function currentSlide(index) {
  currentIndex = index;
  showSlide(currentIndex);
}

setInterval(nextSlide, 5000);

const initTestimonialSlider = () => {
    const slides = document.querySelectorAll(".testimonial-slide");
    if (slides.length === 0) return; 

    let currentIndex = 0;
    const intervalTime = 5000; 

    const nextSlide = () => {
        slides[currentIndex].classList.remove("testimonial-active");

        currentIndex = (currentIndex + 1) % slides.length;

        slides[currentIndex].classList.add("testimonial-active");
    };

    setInterval(nextSlide, intervalTime);
};

document.addEventListener("DOMContentLoaded", initTestimonialSlider);


document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.blog-card');

    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            console.log('Hovering over design entry...');
        });
    });
});