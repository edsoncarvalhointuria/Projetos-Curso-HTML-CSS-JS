var descT = document.querySelector(".item__descricao-titulo--topo");
var desc = document.querySelector(".item__descricao");

descT.addEventListener("click", function () {
    desc.classList.toggle("item__descricao--abrir");
});

var botoesTrilho = document.querySelectorAll(".item__botao-trilho");
var carrossel = document.querySelector(".item__imgs-trilho");

botoesTrilho.forEach(function (ele, i) {
    ele.addEventListener("click", function () {
        carrossel.style = "transform: translateX(-" + i * 100 + "%)";

        botoesTrilho.forEach(function (elemento) {
            if (ele == elemento) {
                ele.classList.add("item__botao-trilho--selecionado");
            } else {
                elemento.classList.remove("item__botao-trilho--selecionado");
            }
        });
    });
});
