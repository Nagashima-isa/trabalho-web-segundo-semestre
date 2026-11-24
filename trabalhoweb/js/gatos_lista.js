const BANCO_GATOS = [
    { nome: "Frajola", desc: "Macho. Preto e branco. dorminhoco.", img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=300" },
    { nome: "Mingau", desc: "Fêmea. Laranja. bem ativa.", img: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=300" },
    { nome: "Ferrugem", desc: "Macho. Preto e laranja. brincalhão.", img: "https://super.abril.com.br/wp-content/uploads/2024/12/0311-gatos-layout_site2.jpg?quality=70&strip=info&w=1024&crop=1" },
    { nome: "Floco", desc: "Macho. Branco. Bem ativo.", img: "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg" },
    { nome: "Bel", desc: "Femêa. Branca com manchas. Calma.", img: "https://s2-oglobo.glbimg.com/YnzdWBKLCydHE3YSONeGYWsbXPU=/0x0:1280x869/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2024/V/O/TUDXePQSODbVWroEkVhw/cats-8096304-1280.jpg" }
];

document.addEventListener("DOMContentLoaded", () => {
    desenharGatos();
    document.getElementById("buscaGatoLista").addEventListener("input", (e) => desenharGatos(e.target.value));
});

function abrirModalAdocao(n) {
    document.getElementById("nomeGatoModal").innerText = n;
    document.getElementById("meuModalAdocao").classList.remove("escondido");
}
function fecharModalAdocao() { document.getElementById("meuModalAdocao").classList.add("escondido"); }

function desenharGatos(filtro = "") {
    const d = document.getElementById("gridGatos");
    if(!d) return;
    d.innerHTML = "";

    BANCO_GATOS.filter(g => g.nome.toLowerCase().includes(filtro.toLowerCase())).forEach(g => {
        d.innerHTML += `
        <div class="gato-card">
            <img src="${g.img}" width="100%">
            <h3>${g.nome}</h3>
            <p>${g.desc}</p>
            <button class="btn-sucesso" onclick="abrirModalAdocao('${g.nome}')">Quero Ele(a)</button>
        </div>`;
    });
}