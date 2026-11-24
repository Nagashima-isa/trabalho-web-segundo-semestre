function alternarTema() {
    const body = document.body;
    if (body.classList.contains("light-theme")) {
        body.className = "dark-theme";
        localStorage.setItem("tema_amador", "dark");
    } else {
        body.className = "light-theme";
        localStorage.setItem("tema_amador", "light");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const salvo = localStorage.getItem("tema_amador") || "light";
    document.body.className = salvo + "-theme";
});