
const carousel = document.querySelector('.carousel');
const slides = carousel.querySelector('.slides-container');

// #region Carousel controls

const previousButton = document.querySelector('.previous');
const nextButton = document.querySelector('.next');
const trackers = document.querySelector('.slide-trackers');
// #endregion

document.addEventListener('DOMContentLoaded', e => {
    for(let i = 0; i < slides.childElementCount; i++){
        const newTracker = document.createElement('div');
        newTracker.classList.add('tracker');
        trackers.appendChild(newTracker);
    }
    trackers.firstElementChild.classList.add('active');
})

let carouselCurrentWidth;
let currentItemIndex = 0;
  
trackers.addEventListener('click', e => {
    const { target } = e;
    if(target.classList.contains('tracker') && !target.classList.contains('active')){
        clearTrackers();

        currentItemIndex = Array.from(trackers.children).indexOf(target);
        
        slides.scrollTo({left: carouselCurrentWidth * currentItemIndex, behavior: 'smooth'});
        trackers.children[currentItemIndex].classList.add('active');

        target.classList.add('active');
    }
})


const observer = new ResizeObserver(entries => {
    entries.forEach(entry => {
        carouselCurrentWidth = entry.contentRect.width;

        slides.scrollTo({left: carouselCurrentWidth * currentItemIndex, behavior: 'auto'});
    })
});
observer.observe(carousel);

previousButton.addEventListener('click', e => {
    if(currentItemIndex > 0){
        slides.scrollTo({left: (carouselCurrentWidth * currentItemIndex--) - carouselCurrentWidth, behavior: 'smooth'});
        clearTrackers();
        trackers.children[currentItemIndex].classList.add('active');
    }
})

nextButton.addEventListener('click', e => {
    if(currentItemIndex + 1 < slides.childElementCount){
        slides.scrollTo({left: carouselCurrentWidth * ++currentItemIndex, behavior: 'smooth'});
        clearTrackers();
        trackers.children[currentItemIndex].classList.add('active');
    }
})

function clearTrackers(){
    for(const tracker of trackers.children){
        tracker.classList.contains('active') && tracker.classList.remove('active');
    };
}