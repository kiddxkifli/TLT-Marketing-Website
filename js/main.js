import { services, brands, awards } from './data.js';
import { initAnimations } from './animations.js';
import { initChatbot } from './chatbot.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    setYear();
    initMobileMenu();
    initSmoothScroll();
    populateContent();
    initAnimations();
    initChatbot();
    handleContactForm();
});

const setYear = () => {
    const yearElements = document.querySelectorAll('#year');
    yearElements.forEach(el => {
        if(el) el.textContent = new Date().getFullYear();
    });
};

const initMobileMenu = () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
};

const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
};

const populateContent = () => {
    populateServices();
    populateBrands();
    populateAwards();
};

const populateServices = () => {
    const container = document.getElementById('services-container');
    if (!container) return;

    services.forEach(service => {
        const serviceCard = `
            <div class="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-on-scroll">
                <div class="bg-primary-gradient text-white w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                    <i data-lucide="${service.icon}" class="w-8 h-8"></i>
                </div>
                <h3 class="font-bold text-xl mb-2 text-primary">${service.title}</h3>
                <p class="text-gray-600">${service.description}</p>
            </div>
        `;
        container.innerHTML += serviceCard;
    });
};

const populateBrands = () => {
    const container = document.getElementById('brands-container');
    if (!container) return;

    brands.forEach(brand => {
        const brandCard = `
            <div class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 animate-on-scroll">
                <a href="${brand.link}" class="block">
                    <div class="h-48 bg-gray-200 flex items-center justify-center">
                       <img src="${brand.image}" alt="${brand.name}" class="w-full h-full object-contain p-4"/>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-primary">${brand.name}</h3>
                        <p class="text-gray-600 mt-2">${brand.tagline}</p>
                    </div>
                </a>
            </div>
        `;
        container.innerHTML += brandCard;
    });
};

const populateAwards = () => {
    const list = document.getElementById('awards-list');
    if (!list) return;

    awards.forEach(award => {
        const listItem = `<li><strong>${award.year}:</strong> ${award.name}</li>`;
        list.innerHTML += listItem;
    });
};

const handleContactForm = () => {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! This is a demo form.');
            form.reset();
        });
    }
};

