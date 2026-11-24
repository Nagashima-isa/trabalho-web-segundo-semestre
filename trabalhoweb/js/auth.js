let slideAtual = 0;

function atualizarCarrossel() {
    const painelSlides = document.getElementById("carrosselSlides");
    const bolinhas = document.querySelectorAll(".carrossel-indicadores .bola");
    
    if (!painelSlides) return;

    painelSlides.style.transform = `translateX(-${slideAtual * 100}%)`;

    bolinhas.forEach((bola, index) => {
        if (index === slideAtual) {
            bola.classList.add("ativa");
        } else {
            bola.classList.remove("ativa");
        }
    });
}

function mudarSlide(direcao) {
    const totalSlides = document.querySelectorAll(".slide").length;
    slideAtual += direcao;

    if (slideAtual >= totalSlides) slideAtual = 0;
    if (slideAtual < 0) slideAtual = totalSlides - 1;

    atualizarCarrossel();
}

function irParaSlide(index) {
    slideAtual = index;
    atualizarCarrossel();
}

setInterval(() => {
    mudarSlide(1);
}, 5000);

document.addEventListener("DOMContentLoaded", () => {
    checarSessao();
    document.getElementById("formCadastroUser").addEventListener("submit", salvarConta);
    document.getElementById("formLogin").addEventListener("submit", logar);
});

function abrirModalUser() { document.getElementById("meuModalUser").classList.remove("escondido"); }
function fecharModalUser() { document.getElementById("meuModalUser").classList.add("escondido"); }

function obterContas() { return JSON.parse(localStorage.getItem("contas_velhas")) || []; }

function salvarConta(e) {
    e.preventDefault();
    const user = document.getElementById("regUser").value;
    const email = document.getElementById("regEmail").value;
    const pass = document.getElementById("regPass").value;
    const flagEdicao = document.getElementById("editUserFlag").value === "true";

    let contas = obterContas();

    if (flagEdicao) {
        const logado = localStorage.getItem("sessao_user");
        contas = contas.map(c => c.user === logado ? { user, email, pass } : c);
        localStorage.setItem("contas_velhas", JSON.stringify(contas));
        localStorage.setItem("sessao_user", user);
        alert("Modificado com sucesso!");
    } else {
        contas.push({ user, email, pass });
        localStorage.setItem("contas_velhas", JSON.stringify(contas));
        alert("Conta Criada!");
    }
    fecharModalUser();
    checarSessao();
}

function logar(e) {
    e.preventDefault();
    const u = document.getElementById("loginUser").value;
    const p = document.getElementById("loginPass").value;
    const achei = obterContas().find(c => c.user === u && c.pass === p);

    if (achei) {
        localStorage.setItem("sessao_user", u);
        checarSessao();
    } else {
        alert("Erro nas credenciais.");
    }
}

function checarSessao() {
    const logado = localStorage.getItem("sessao_user");
    const caixaAuth = document.getElementById("caixaAuth");
    const caixaPerfil = document.getElementById("caixaPerfil");

    if (logado) {
        if(caixaAuth) caixaAuth.classList.add("escondido");
        if(caixaPerfil) {
            caixaPerfil.classList.remove("escondido");
            const dados = obterContas().find(c => c.user === logado);
            document.getElementById("profileUser").innerText = dados.user;
            document.getElementById("profileEmail").innerText = dados.email;
        }
    } else {
        if(caixaAuth) caixaAuth.classList.remove("escondido");
        if(caixaPerfil) caixaPerfil.classList.add("escondido");
    }
}

function prepararEdicaoUsuario() {
    const logado = localStorage.getItem("sessao_user");
    const dados = obterContas().find(c => c.user === logado);
    document.getElementById("regUser").value = dados.user;
    document.getElementById("regEmail").value = dados.email;
    document.getElementById("regPass").value = dados.pass;
    document.getElementById("editUserFlag").value = "true";
    abrirModalUser();
}

function logoutUser() {
    localStorage.removeItem("sessao_user");
    checarSessao();
}