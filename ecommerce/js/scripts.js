var itensFooter = document.querySelectorAll(".footer__lista-div");

var item;
for (i = 0; i < itensFooter.length; i++) {
    itensFooter[i].addEventListener("click", function () {
        this.classList.toggle("footer__lista--aberto");

        var itens = document.querySelectorAll(".footer__lista--aberto");
        if (itens.length > 1) {
            item.classList.remove("footer__lista--aberto");
        }

        item = this;
    });
}

var menu = document.querySelector(".header__menu-hamburguer");
var opcoes = document.querySelector(".nav__links-lista");
menu.addEventListener("click", function () {
    this.classList.toggle("abrir");
    opcoes.classList.toggle("abrir");
});

var navItem = document.querySelectorAll(".nav__item");
for (i = 0; i < navItem.length; i++) {
    navItem[i].addEventListener("click", function () {
        this.classList.toggle("nav__item--abrir");
    });
}

var userMenu = document.querySelector(".nav__usuario-logado");
userMenu.addEventListener("click", function () {
    userMenu.classList.toggle("nav__usuario-logado--menu");
});
