let slideAtual = 0;

const slides = document.querySelectorAll(".slide");
const indicadores = document.querySelectorAll(".bola");

function mostrarSlide(numero) {

    if (slides.length === 0) return;

    slideAtual = (numero + slides.length) % slides.length;

    const carrossel = document.getElementById("carrosselSlides");

    carrossel.style.transform =
        `translateX(-${slideAtual * 100}%)`;

    indicadores.forEach((bola, index) => {
        bola.classList.toggle("ativa", index === slideAtual);
    });
}

function mudarSlide(direcao) {
    mostrarSlide(slideAtual + direcao);
}

function irParaSlide(numero) {
    mostrarSlide(numero);
}