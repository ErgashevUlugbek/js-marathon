const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');
const sidebar = document.querySelector('.sidebar');
const container = document.querySelector('.container');
const mainSlide = document.querySelector('.main-slide');
const slidesCount = mainSlide.querySelectorAll('div').length;

let activeIndex = 0;

sidebar.style.top = `-${(slidesCount - 1) * 100}vh`;

upBtn.addEventListener('click', () => { changeSlide('up') });

downBtn.addEventListener('click', () => { changeSlide('down') });

function changeSlide(direction) {
    if (direction === 'up') {
        activeIndex++;
        if (activeIndex === slidesCount) {
            activeIndex = 0;
        }
    } else if (direction === 'down') {
        activeIndex--;
        if (activeIndex < 0) {
            activeIndex = slidesCount - 1;
        }
    }
    console.log('a');
    const height = container.clientHeight;
    mainSlide.style.transform = `translateY(-${activeIndex * height}px)`;

    sidebar.style.transform = `translateY(${activeIndex * height}px)`;
}