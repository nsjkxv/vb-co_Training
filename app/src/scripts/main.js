const burgerBtn = document.getElementById('burger-btn');
const menu = document.getElementById('mobile-menu');
const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');

const menuClosed = ['opacity-0', 'max-h-0', 'pointer-events-none'];
const menuOpen = ['opacity-100', 'max-h-[700px]', 'pointer-events-auto'];
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

const servicesTabs = document.getElementById('services-tabs');

if (servicesTabs) {
    const tabs = [...servicesTabs.querySelectorAll('[data-tab]')];
    const panels = [...document.querySelectorAll('[data-panel]')];

    let activeIndex = 0;

    function setTabState(tab, isActive) {
        const dot = tab.querySelector('.dot');
        const label = tab.querySelector('.tab-label');
        tab.setAttribute('aria-selected', String(isActive));
        tab.classList.toggle('translate-x-3', isActive);
        dot.classList.toggle('opacity-0', !isActive);
        label.classList.toggle('border-b', isActive);
        label.classList.toggle('border-[#1C3241]', isActive);
        label.classList.toggle('font-medium', isActive);
        label.classList.toggle('text-[#1C3241]', isActive);
        label.classList.toggle('text-[#1C3241]/50', !isActive);
    }

    function setPanelActive(panel, isActive) {
        panel.classList.toggle('opacity-0', !isActive);
        panel.classList.toggle('lg:pointer-events-none', !isActive);
    }

    function activateTab(index) {
        if (index === activeIndex) return;

        tabs.forEach((tab, i) => setTabState(tab, i === index));

        setPanelActive(panels[activeIndex], false);
        setPanelActive(panels[index], true);

        activeIndex = index;
    }

    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => activateTab(i));
    });
}

const rtsForm = document.getElementById('rts-form');

if (rtsForm) {
    const desktopQuery = window.matchMedia('(min-width: 1440px)');
    const fields = [
        rtsForm.querySelector('input[name="name"]'),
        rtsForm.querySelector('input[name="phone"]'),
        rtsForm.querySelector('input[name="email"]'),
    ];

    function updatePlaceholders() {
        const isDesktop = desktopQuery.matches;
        fields.forEach((field) => {
            if (!field) return;
            const base = field.placeholder.replace(/\*$/, '');
            field.placeholder = isDesktop ? base : `${base}*`;
        });
    }

    updatePlaceholders();
    desktopQuery.addEventListener('change', updatePlaceholders);
}
