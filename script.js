function setStyles(element, styles) {
    Object.assign(element.style, styles);
}

function createThemeButton() {
    const btn = document.createElement('button');
    btn.textContent = '🌙 Modo Oscuro';

    setStyles(btn, {
        position: 'fixed',
        top: '15px',
        right: '15px',
        padding: '10px 15px',
        borderRadius: '20px',
        border: 'none',
        cursor: 'pointer',
        background: '#2e7d32',
        color: '#fff',
        zIndex: '1000'
    });

    btn.addEventListener('click', toggleTheme);
    document.body.appendChild(btn);
}

function toggleTheme() {
    const dark = document.body.dataset.theme === 'dark';
    document.body.dataset.theme = dark ? 'light' : 'dark';
    localStorage.setItem('theme', document.body.dataset.theme);

    applyTheme();
}

function applyTheme() {
    const dark = document.body.dataset.theme === 'dark';

    document.body.style.background = dark ? '#121212' : '';
    document.body.style.color = dark ? '#e0e0e0' : '';

    document.querySelectorAll('.desc').forEach(d => {
        d.style.background = dark ? '#1e1e1e' : '';
    });

    document.querySelectorAll('#caracteristicas li').forEach(li => {
        li.style.background = dark ? '#2a2a2a' : '';
        li.style.borderLeftColor = dark ? '#81c784' : '';
    });
}

function updateVisitCounter() {
    let visits = parseInt(localStorage.getItem('visits') || '0') + 1;
    localStorage.setItem('visits', visits);

    const p = document.createElement('p');
    p.textContent = `Has visitado esta página ${visits} ${visits === 1 ? 'vez' : 'veces'}`;

    setStyles(p, {
        marginTop: '20px',
        fontWeight: 'bold'
    });

    document.querySelector('.desc').appendChild(p);
}

function animateEntry() {
    const elements = document.querySelectorAll('header, .img, .desc');

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
    });

    let delay = 0;
    elements.forEach(el => {
        setTimeout(() => {
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, delay);
        delay += 200;
    });
}

function scrollReveal() {
    const items = document.querySelectorAll('#caracteristicas li');

    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }
    });
}

function addHoverEffects() {
    document.querySelectorAll('#caracteristicas li').forEach(li => {
        li.style.opacity = '0';
        li.style.transform = 'translateX(-20px)';

        li.addEventListener('mouseenter', () => {
            li.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });

        li.addEventListener('mouseleave', () => {
            li.style.boxShadow = '';
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createThemeButton();
    document.body.dataset.theme = localStorage.getItem('theme') || 'light';
    applyTheme();

    updateVisitCounter();
    animateEntry();
    addHoverEffects();

    window.addEventListener('scroll', scrollReveal);
});
