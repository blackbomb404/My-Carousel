
const carousel = document.querySelector('.carousel');
const slides = carousel.querySelector('.slides-container');

let carouselCurrentWidth;
let currentItemIndex = 0;

// #region Carousel controls

const previousButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');
const trackers = document.querySelector('.slide-trackers');
// #endregion


document.addEventListener('DOMContentLoaded', e => {
    for(const _ of slides.children){
        const newTracker = document.createElement('div');
        newTracker.classList.add('tracker');
        trackers.appendChild(newTracker);
    }
    trackers.firstElementChild.classList.add('active');
})
  
trackers.addEventListener('click', e => {
    if(e.target.classList.contains('tracker') && !e.target.classList.contains('active')){

        currentItemIndex = Array.from(trackers.children).indexOf(e.target);
        moveToSlide(carouselCurrentWidth * currentItemIndex);
    }
})

const observer = new ResizeObserver(entries => {
    entries.forEach(entry => {
        carouselCurrentWidth = entry.contentRect.width;

        slides.classList.add('no-transition');
        moveToSlide(carouselCurrentWidth * currentItemIndex);
        setTimeout(() => {
            slides.classList.remove('no-transition');
        }, 50);
    })
});
observer.observe(carousel);

previousButton.addEventListener('click', e => {
    if(currentItemIndex > 0){
        // slides.scrollTo({left: (carouselCurrentWidth * currentItemIndex--) - carouselCurrentWidth, behavior: 'smooth'});
        moveToSlide((carouselCurrentWidth * currentItemIndex--) - carouselCurrentWidth);
    }
})

nextButton.addEventListener('click', e => {
    if(currentItemIndex + 1 < slides.childElementCount){
        // slides.scrollTo({left: carouselCurrentWidth * ++currentItemIndex, behavior: 'smooth'});
        moveToSlide(carouselCurrentWidth * ++currentItemIndex);
    }
})

function moveToSlide(amountToMove){
    slides.style.transform = `translateX(-${amountToMove}px)`;
    trackers.querySelector('.active')?.classList.remove('active');
    trackers.children[currentItemIndex]?.classList.add('active');
}