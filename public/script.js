const WHATSAPP_NUMBER = '51954146357'; 

// ==========================================
// 1. FUNCIONES GLOBALES (WhatsApp y Filtros)
// ==========================================

// Método infalible para WhatsApp (evita bloqueos de navegadores)
function openWhatsApp(customText) {
    const defaultText = "¡Hola BECANNS! Deseo consultar modelos, tallas y precios de sus jeans para hombres.";
    const message = encodeURIComponent(customText || defaultText);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    
    // Intenta abrir en una pestaña nueva. Si el navegador lo bloquea (muy común en celulares), lo abre en la misma pestaña.
    try {
        const nuevaPestana = window.open(url, '_blank');
        if (!nuevaPestana || nuevaPestana.closed || typeof nuevaPestana.closed == 'undefined') {
            window.location.href = url;
        }
    } catch(e) {
        window.location.href = url;
    }
}

// Aseguramos que el HTML siempre encuentre las funciones
window.openWhatsApp = openWhatsApp;

window.filterCategory = function(category) {
    const cards = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.cat-btn');

    buttons.forEach(btn => {
        btn.classList.remove('bg-denim-blue', 'text-white', 'border-denim-blue');
        btn.classList.add('bg-bg-card', 'text-gray-400', 'border-gray-800');
    });

    const activeBtn = document.getElementById(`btn-cat-${category}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-bg-card', 'text-gray-400', 'border-gray-800');
        activeBtn.classList.add('bg-denim-blue', 'text-white', 'border-denim-blue');
    }

    cards.forEach(card => {
        if (category === 'all') {
            card.style.display = 'flex';
        } else {
            if (card.classList.contains(`item-${category}`)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        }
    });
};

// ==========================================
// 2. EVENTOS DEL MENÚ MÓVIL
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const header = document.querySelector('header');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
    });
});