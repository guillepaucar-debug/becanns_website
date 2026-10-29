/**
 * Variables y Configuración Global
 */
const WHATSAPP_NUMBER = '51954146357'; 

/**
 * Abre la ventana de WhatsApp con un mensaje predefinido o personalizado
 * @param {string} customText - Mensaje opcional 
 */
function openWhatsApp(customText) {
    const defaultText = "¡Hola BECANNS! Deseo consultar modelos, tallas y precios de sus jeans para hombres.";
    const message = encodeURIComponent(customText || defaultText);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
}

/**
 * Control del DOM (Menús y Scroll)
 */
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const header = document.getElementById('main-header');

    // 1. Efecto Scroll en el Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.replace('border-transparent', 'border-gray-800/80');
            header.classList.add('shadow-lg');
        } else {
            header.classList.replace('border-gray-800/80', 'border-transparent');
            header.classList.remove('shadow-lg');
        }
    });

    // 2. Control del Menú Móvil
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que se dispare el click en document
            const isHidden = mobileMenu.classList.toggle('hidden');
            menuBtn.setAttribute('aria-expanded', !isHidden);
        });

        // Cerrar menú al hacer clic en un enlace
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Cerrar menú si el usuario hace clic fuera de él
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

/**
 * Filtro de categorías del Catálogo con suave transición
 * @param {string} category 
 */
function filterCategory(category) {
    const cards = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.cat-btn');

    // Actualizar estilos de los botones
    buttons.forEach(btn => {
        btn.classList.remove('bg-denim-blue', 'text-white', 'border-denim-blue');
        btn.classList.add('bg-bg-card', 'text-gray-400', 'border-gray-800');
    });

    const activeBtn = document.getElementById(`btn-cat-${category}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-bg-card', 'text-gray-400', 'border-gray-800');
        activeBtn.classList.add('bg-denim-blue', 'text-white', 'border-denim-blue');
    }

    // Filtrar tarjetas
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(`item-${category}`)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}