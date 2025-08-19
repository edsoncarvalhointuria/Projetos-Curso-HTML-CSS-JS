var filtroTitulo = document.querySelectorAll(".filtro__tipo-titulo");
var openFiltro = document.querySelectorAll(".filtro__tipo");

function abrir(i) {
    openFiltro[i].classList.toggle("abrir");
}
variavel = 0;
for (i = 0; i < filtroTitulo.length; i++) {
    filtroTitulo[i].addEventListener("click", function () {
        this.parentElement.classList.toggle("abrir");
    });
    variavel++;
}

var fecharFiltro = document.querySelector(".filtro__titulo-fechar");
fecharFiltro.addEventListener("click", function () {
    document.body.classList.remove("filtro-aberto");
});

var fecharFiltro = document.querySelector(".produtos__botao");
fecharFiltro.addEventListener("click", function () {
    document.body.classList.add("filtro-aberto");
});
