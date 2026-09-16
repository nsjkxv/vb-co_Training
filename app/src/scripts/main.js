const burgerBtn = document.getElementById('burger-btn');
const menu = document.getElementById('mobile-menu');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');

const menuClosed = ['opacity-0', '-translate-y-2', 'pointer-events-none'];
const menuOpen = ['opacity-100', 'translate-y-0', 'pointer-events-auto'];
const line1Closed = ['w-4'];
const line1Open = ['w-full', 'translate-y-[9px]', 'rotate-45'];
const line3Closed = ['w-4'];
const line3Open = ['w-full', '-translate-y-[9px]', '-rotate-45'];

let isOpen = false;

function openMenu() {
    menu.classList.remove(...menuClosed);
    menu.classList.add(...menuOpen);
    line1.classList.remove(...line1Closed);
    line1.classList.add(...line1Open);
    line3.classList.remove(...line3Closed);
    line3.classList.add(...line3Open);
    line2.classList.add('opacity-0');
    document.body.classList.add('overflow-hidden');
    isOpen = true;
}

function closeMenu() {
    menu.classList.add(...menuClosed);
    menu.classList.remove(...menuOpen);
    line1.classList.add(...line1Closed);
    line1.classList.remove(...line1Open);
    line3.classList.add(...line3Closed);
    line3.classList.remove(...line3Open);
    line2.classList.remove('opacity-0');
    document.body.classList.remove('overflow-hidden');
    isOpen = false;
}

burgerBtn.addEventListener('click', () => {
    isOpen ? closeMenu() : openMenu();
});

document.addEventListener('click', (e) => {
    if (!isOpen) return;
    if (menu.contains(e.target) || burgerBtn.contains(e.target)) return;
    closeMenu();
});

const slider = document.getElementById('slider');
const dotsContainer = document.getElementById('dots');

if (slider && dotsContainer) {
    const slides = [...slider.children];
    const dots = [...dotsContainer.children];

    const activeDot = 'bg-[#0A9A5C]';
    const inactiveDot = 'bg-[#1C3241]/20';

    function setActiveDot(index) {
        dots.forEach((dot, i) => {
            dot.classList.remove(activeDot, inactiveDot);
            dot.classList.add(i === index ? activeDot : inactiveDot);
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            slides[i].scrollIntoView({behavior: 'smooth', inline: 'start', block: 'nearest'});
        });
    });

    const sliderObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveDot(slides.indexOf(entry.target));
            }
        });
    }, {root: slider, threshold: 0.6});

    slides.forEach((slide) => sliderObserver.observe(slide));
}
