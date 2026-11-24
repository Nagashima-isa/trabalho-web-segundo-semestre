document.addEventListener("DOMContentLoaded", () => {
    atualizarTabela();
    document.getElementById("buscaVoluntario").addEventListener("input", (e) => atualizarTabela(e.target.value));
    document.getElementById("formVoluntario").addEventListener("submit", salvarVol);
});

function abrirModalVol() { document.getElementById("meuModalVol").classList.remove("escondido"); }
function fecharModalVol() { document.getElementById("meuModalVol").classList.add("escondido"); }

function pegarVoluntarios() { return JSON.parse(localStorage.getItem("db_vol")) || []; }

function atualizarTabela(f = "") {
    const corpo = document.getElementById("tabelaVoluntarios");
    if(!corpo) return;
    corpo.innerHTML = "";

    pegarVoluntarios().filter(v => v.nome.toLowerCase().includes(f.toLowerCase())).forEach(v => {
        corpo.innerHTML += `
        <tr>
            <td>${v.id}</td>
            <td>${v.nome}</td>
            <td>${v.disp}</td>
            <td>
                <button class="btn-aviso" onclick="editarVol(${v.id})">Editar</button>
                <button class="btn-perigo" onclick="removerVol(${v.id})">Deletar</button>
            </td>
        </tr>`;
    });
}

function salvarVol(e) {
    e.preventDefault();
    const id = document.getElementById("volId").value;
    const nome = document.getElementById("nomeVol").value;
    const disp = document.getElementById("dispVol").value;

    let lista = pegarVoluntarios();

    if(id) {
        lista = lista.map(v => v.id === parseInt(id) ? {id: parseInt(id), nome, disp} : v);
    } else {
        lista.push({id: Date.now(), nome, disp});
    }

    localStorage.setItem("db_vol", JSON.stringify(lista));
    fecharModalVol();
    atualizarTabela();
}

function editarVol(id) {
    const v = pegarVoluntarios().find(v => v.id === id);
    document.getElementById("volId").value = v.id;
    document.getElementById("nomeVol").value = v.nome;
    document.getElementById("dispVol").value = v.disp;
    document.getElementById("modalVolLabel").innerText = "Modificando Voluntário";
    abrirModalVol();
}

function removerVol(id) {
    if(confirm("Apagar mesmo?")) {
        let lista = pegarVoluntarios().filter(v => v.id !== id);
        localStorage.setItem("db_vol", JSON.stringify(lista));
        atualizarTabela();
    }
}

function excluirTodosVoluntarios() {
    if(confirm("Deletar a lista inteira do LocalStorage?")) {
        localStorage.removeItem("db_vol");
        atualizarTabela();
    }
}