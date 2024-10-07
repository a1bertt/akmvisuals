let slideIndex = 1; // Start at 1 since we're duplicating the first and last images
const slides = document.querySelectorAll(".carousel-image");
const totalSlides = slides.length;
let isTransitioning = false;
let slideInterval = setInterval(nextSlide, 3000);

// Clone the first and last slides for seamless transition
const gallery = document.querySelector(".gallery");
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[totalSlides - 1].cloneNode(true);
gallery.appendChild(firstSlideClone); // Add first clone at the end
gallery.insertBefore(lastSlideClone, slides[0]); // Add last clone at the start

// Slide position update
function updateSlidePosition(instant = false) {
  const newTransform = -slideIndex * 100;
  gallery.style.transition = instant ? "none" : "transform 0.4s ease-in-out";
  gallery.style.transform = `translateX(${newTransform}%)`;
}

// Next slide
function nextSlide() {
  if (isTransitioning) return;
  isTransitioning = true;

  slideIndex++;
  updateSlidePosition();

  setTimeout(() => {
    if (slideIndex === totalSlides + 1) {
      slideIndex = 1;
      updateSlidePosition(true);
    }
    isTransitioning = false;
  }, 400);
}

// Previous slide
function prevSlide() {
  if (isTransitioning) return;
  isTransitioning = true;

  slideIndex--;
  updateSlidePosition();

  setTimeout(() => {
    if (slideIndex === 0) {
      slideIndex = totalSlides;
      updateSlidePosition(true);
    }
    isTransitioning = false;
  }, 400);
}

// Restart interval after manual navigation
function restartSlideInterval() {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 3000);
}

// Navigation buttons
document.querySelector(".prev").addEventListener("click", () => {
  prevSlide();
  restartSlideInterval();
});

document.querySelector(".next").addEventListener("click", () => {
  nextSlide();
  restartSlideInterval();
});

updateSlidePosition(true);
