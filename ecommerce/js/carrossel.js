var elementosCarrossel = document.querySelectorAll(
    ".por-tamanho__carrossel-opcao"
);
var divCarrossel = document.querySelector(".por-tamanho__carrossel-opcoes");
var qtd = elementosCarrossel.length - 7;

// console.log(elementosCarrossel.length);
function rodarCarrossel(i) {
    divCarrossel.style =
        "transform:translateX(calc(calc(" +
        elementosCarrossel[0].offsetHeight / 10 +
        "rem + 1rem) * -" +
        i +
        "));";
}

var isNext = true;
var variavel = 0;

var indice = 1;
var carrossel = document.querySelector(".hero-mob__carrossel");
var linhaCarr = document.querySelectorAll(".hero-mob__linha");

setInterval(function () {
    // Carrossel Tamanho
    if (isNext) {
        // console.log(variavel);
        rodarCarrossel(variavel);
        variavel++;
        if (variavel > qtd) {
            isNext = false;
            variavel = qtd - 1;
        }
    } else {
        // console.log("Estou na segunda " + variavel);
        rodarCarrossel(variavel);
        variavel--;
        if (variavel == 0) {
            isNext = true;
            variavel = 0;
        }
    }

    // Carrossel Hero Mobile

    var ant = indice - 1;
    if (ant == -1) {
        ant = linhaCarr.length - 1;
    }
    carrossel.style = "transform: translateX(" + indice * -100 + "%);";
    linhaCarr[indice].classList.add("proximo");
    linhaCarr[ant].classList.remove("proximo");

    indice++;
    if (indice == linhaCarr.length) {
        indice = 0;
    }
}, 5000);
