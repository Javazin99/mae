// Script para inserir dinamicamente as imagens na galeria e adicionar efeito de "zoom" ao clicar

const images = [
    'png/WhatsApp Image 2025-05-22 at 10.50.00_b4d15df5.jpg',
    'png/WhatsApp Image 2025-05-22 at 10.50.01_2cea89bc.jpg',
    'png/WhatsApp Image 2025-05-22 at 10.50.01_bdeb3972.jpg',
    'png/WhatsApp Image 2025-05-22 at 10.50.02_0258f3f6.jpg',
    'png/WhatsApp Image 2025-05-22 at 10.50.04_97cc3856.jpg',
    'png/WhatsApp Image 2025-05-22 at 10.50.04_f9c9b0be.jpg',
    'png/WhatsApp Image 2025-05-22 at 10.50.05_1bdd0629.jpg',
    'png/WhatsApp Image 2025-05-22 at 10.50.13_6666bdff.jpg',
    'png/WhatsApp Image 2025-05-22 at 10.50.25_e48efab3.jpg',
    'png/WhatsApp Image 2025-05-22 at 10.50.29_dfc4e04f.jpg',
    'png/WhatsApp Image 2025-05-22 at 10.50.46_debe547a.jpg',
    'png/WhatsApp Image 2025-05-22 at 10.50.52_9d460f19.jpg',
    'png/WhatsApp Image 2025-05-22 at 10.50.54_4311a8fd.jpg',
    'png/WhatsApp Image 2025-05-22 at 10.51.37_4a918c93.jpg',
    'png/WhatsApp Image 2025-05-22 at 10.51.47_aed49c88.jpg',
    'png/WhatsApp Image 2025-05-22 at 10.51.54_7cec9197.jpg',
];

const gallery = document.querySelector('.gallery');

let currentIndex = 0;

function showModalWithIndex(index) {
    currentIndex = index;
    let modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-bg"></div>
        <button class="slide-btn prev">&#10094;</button>
        <img src="${images[index]}" class="modal-img" />
        <button class="slide-btn next">&#10095;</button>
        <span class="close">&times;</span>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    modal.querySelector('.close').onclick = closeModal;
    modal.querySelector('.modal-bg').onclick = closeModal;
    modal.querySelector('.prev').onclick = (e) => { e.stopPropagation(); slidePhoto(-1); };
    modal.querySelector('.next').onclick = (e) => { e.stopPropagation(); slidePhoto(1); };
}

function slidePhoto(direction) {
    const modalImg = document.querySelector('.modal-img');
    if (!modalImg) return;
    currentIndex = (currentIndex + direction + images.length) % images.length;
    modalImg.src = images[currentIndex];
}

// Atualiza a galeria para usar o novo modal com slide
if (gallery) {
    gallery.innerHTML = '';
    images.forEach((src, idx) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'Momentos do casal';
        img.addEventListener('click', () => showModalWithIndex(idx));
        gallery.appendChild(img);
    });
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Estilo do modal será adicionado via JS para garantir funcionamento
const modalStyle = document.createElement('style');
modalStyle.innerHTML = `
.modal {
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center;
    z-index: 1000;
}
.modal-bg { position: absolute; width: 100vw; height: 100vh; top: 0; left: 0; }
.modal-img {
    max-width: 90vw; max-height: 80vh; border-radius: 18px; box-shadow: 0 8px 32px rgba(0,0,0,0.25);
    position: relative; z-index: 2;
}
.close {
    position: absolute; top: 32px; right: 48px; color: #fff; font-size: 2.5rem; cursor: pointer; z-index: 3;
    text-shadow: 0 2px 8px #000;
}
@media (max-width: 600px) {
    .close { top: 12px; right: 18px; font-size: 2rem; }
    .modal-img { max-width: 98vw; max-height: 60vh; }
}
`;
document.head.appendChild(modalStyle);

// Adiciona estilo para os botões de slide
const slideStyle = document.createElement('style');
slideStyle.innerHTML = `
.slide-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255,255,255,0.7);
    border: none;
    color: #ffb6b9;
    font-size: 2.5rem;
    padding: 0.2em 0.6em;
    border-radius: 50%;
    cursor: pointer;
    z-index: 4;
    transition: background 0.2s;
}
.slide-btn:hover {
    background: #ffb6b9;
    color: #fff;
}
.slide-btn.prev { left: 18px; }
.slide-btn.next { right: 18px; }
`;
document.head.appendChild(slideStyle);

// Presente animado ao abrir o site
window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('present-overlay');
    const box = overlay?.querySelector('.present-box');
    if (overlay && box) {
        box.addEventListener('click', () => {
            box.classList.add('open');
            setTimeout(() => {
                overlay.classList.add('hide');
                setTimeout(() => overlay.remove(), 800);
            }, 900);
        });
    }
});
