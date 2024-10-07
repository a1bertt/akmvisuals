let slideIndex = 1; // Start at 1 since we're duplicating the first and last images
const slides = document.querySelectorAll(".carousel-image");
const totalSlides = slides.length;
let isTransitioning = false;
let slideInterval = setInterval(nextSlide, 3000);

// Clone the first and last slides
const gallery = document.querySelector(".gallery");
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[totalSlides - 1].cloneNode(true);
gallery.appendChild(firstSlideClone);
gallery.insertBefore(lastSlideClone, slides[0]);

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
  }, 200);
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

// Swipe functionality
let touchStartX = 0;
let touchEndX = 0;

gallery.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

gallery.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
});

function handleSwipeGesture() {
  if (touchEndX < touchStartX - 30) {
    nextSlide(); // Swipe left
  }
  if (touchEndX > touchStartX + 30) {
    prevSlide(); // Swipe right
  }
  restartSlideInterval();
}

// Mouse drag functionality (desktop)
let isDragging = false;
let startPos = 0;
let currentPos = 0;

gallery.addEventListener("mousedown", (e) => {
  isDragging = true;
  startPos = e.clientX;
  gallery.style.cursor = "grabbing";
});

gallery.addEventListener("mouseup", (e) => {
  isDragging = false;
  currentPos = e.clientX;
  gallery.style.cursor = "grab";
  handleMouseDrag();
});

gallery.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  currentPos = e.clientX;
});

gallery.addEventListener("mouseleave", () => {
  isDragging = false;
  gallery.style.cursor = "grab";
});

function handleMouseDrag() {
  if (currentPos < startPos - 30) {
    nextSlide(); // Drag left
  }
  if (currentPos > startPos + 30) {
    prevSlide(); // Drag right
  }
  restartSlideInterval();
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
