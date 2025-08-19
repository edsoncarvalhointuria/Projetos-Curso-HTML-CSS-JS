document.addEventListener("DOMContentLoaded", () => {
    const cuponsValidos = { DESCONTO10: 10, NUSER15: 15 };
    const cupom = document.querySelector(".resumo__cupom");
    const formCupom = cupom.querySelector(".resumo__form");
    const spanPreco = document.querySelector(".resumo__preco-span");
    const precoTotal = Number.parseFloat(
        spanPreco.textContent.replace(".", "").replace(",", ".")
    );
    const dadosForm = document.querySelector(".dados__form");
    const listaInputs = dadosForm.querySelectorAll("input");

    cupom
        .querySelector(".resumo__cupom-titulo")
        .addEventListener("click", () => {
            cupom.classList.toggle("resumo__cupom--abrir");
        });
    formCupom.addEventListener("submit", (e) => {
        e.preventDefault();

        const c = e.target.querySelector("#cupom").value.toUpperCase().trim();

        if (cuponsValidos[c]) {
            spanPreco.textContent = (
                precoTotal *
                (1 - cuponsValidos[c] / 100)
            ).toLocaleString();
            localStorage.setItem("CUPOM", c);
            cupom.classList.add("resumo__cupom-aplicado");
            cupom.classList.remove("resumo__cupom-invalido");
        } else {
            spanPreco.textContent = precoTotal.toLocaleString();
            cupom.classList.add("resumo__cupom-invalido");
            cupom.classList.remove("resumo__cupom-aplicado");
        }

        cupom.classList.remove("resumo__cupom--abrir");
    });

    dadosForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let message = "";
        let link;
        const add = (v) => {
            v.classList.add("erro");
            link = v;
        };

        for (let value of listaInputs) {
            if (value.id === "comp") {
                continue;
            }

            if (!value.value) {
                add(value);
            } else if (value.id === "cpf" && value.value.length < 11) {
                message += "O CPF precisa ter 11 digitos...\n";
                add(value);
            } else if (value.id === "cep" && value.value.length < 8) {
                message += "O cep precisa ter 8 digitos...\n";
                add(value);
            } else if (value.id === "tel" && value.value.length < 11) {
                message += "O Telefone precisa ter 11 digitos...\n";
                add(value);
            }
        }

        if (link) {
            link.scrollIntoView(false);

            if (message) {
                alert(message);
            }
        } else {
            const f = new FormData(dadosForm);
            const storage = {};

            for (let [key, value] of f.entries()) {
                storage[key] = value;
            }

            localStorage.setItem("dadosFormulario", JSON.stringify(storage));
            dadosForm.reset();
            alert("Dados salvos com sucesso;");
        }
    });

    for (let value of listaInputs) {
        value.addEventListener("focus", (e) => {
            value.classList.remove("erro");
        });
        if (value.id === "name") {
            value.addEventListener("blur", (e) => {
                e.target.value = e.target.value
                    .replace(/[^a-zA-Z\s]/g, "")
                    .replace(/\s+/g, " ");
            });
        } else if (value.id === "cpf") {
            value.addEventListener("keydown", (e) => {
                if (e.key === ".") {
                    e.preventDefault();
                    // e.target.value.replace(".", "");
                }
            });
        } else if (value.id === "tel") {
            value.addEventListener("keydown", (e) => {
                if (e.key.match(/[a-zA-Z]/) && e.key.length < 2) {
                    e.preventDefault();
                }
            });
        } else if (value.id === "cep") {
            value.addEventListener("keydown", (e) => {
                if (e.key.match(/[.,:!?-]/)) {
                    e.preventDefault();
                }
            });
        }
    }

    localStorage.removeItem("CUPOM");
});
