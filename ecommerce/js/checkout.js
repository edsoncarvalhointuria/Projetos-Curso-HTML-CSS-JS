var endereco = document.querySelector(".checkout__endereco");
var btnEnd = document.querySelector(".checkout__btn-endereco");

btnEnd.addEventListener("click", function () {
    endereco.classList.toggle("--abrir");
});
