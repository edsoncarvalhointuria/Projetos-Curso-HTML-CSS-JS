document.addEventListener("DOMContentLoaded", async () => {
    //Global
    const filmes = JSON.parse(localStorage.getItem("FILMES")) ?? {};
    let resultado;

    //NavForm
    const $navForm = document.querySelector(".nav__form");
    const $filmName = document.getElementById("filme");
    const $filmYear = document.getElementById("ano");

    // Modal
    const $fecharFilme = document.querySelector(".newFilme__fechar");
    $fecharFilme.addEventListener("click", fecharModal);
    const $newFilme = document.querySelector("article");
    const $title = $newFilme.querySelector(".newFilme__titulo");
    const $img = $newFilme.querySelector("img");
    const $description = $newFilme.querySelector(".newFilme__descricao");
    const $actor = $newFilme
        .querySelector(".newFilme__elenco")
        .querySelector(".newFilme--info");
    const $genre = $newFilme
        .querySelector(".newFilme__genero")
        .querySelector(".newFilme--info");
    const $btnModal = $newFilme.querySelector(".newFilme__botao");

    function fecharModal() {
        document.body.classList.remove("exibir-filme");
    }

    function formatFilmName(value) {
        if (!value) {
            throw new Error("O nome não está preenchido");
        }
        return value.trim().replace(/\s+/g, " ").replace(/\s/g, "+");
    }

    function formatFilmYear(value) {
        if (Number.isNaN(Number(value))) {
            throw new Error("Número invalido");
        } else if (
            (value < 1800 || value > new Date().getFullYear()) &&
            value.length > 0
        ) {
            throw new Error("O ano está invalido");
        }
        return value.trim().replace(/\s/g, "");
    }

    function createModal(data, visualizacao = false) {
        if (visualizacao) {
            $btnModal.classList.add("newFilme__botao--ocult");
        } else {
            $btnModal.classList.remove("newFilme__botao--ocult");
        }
        $title.textContent = data.Title + " - " + data.Year;
        $img.src = data.Poster;
        $img.alt = "Filme do " + data.Title;
        $description.textContent = data.Plot;
        $actor.textContent = data.Actors;
        $genre.textContent = data.Genre;
    }

    function createFilme(data) {
        const filmeDivImg = () => {
            const div = document.createElement("div");
            div.classList.add("hero__filme-img");
            const filmeImg = document.createElement("img");
            filmeImg.src = data.Poster;
            filmeImg.alt = "Filme do " + data.title;
            div.appendChild(filmeImg);
            div.addEventListener("click", () => {
                createModal(filmes[div.parentElement.id], true);
                document.body.classList.add("exibir-filme");
            });

            return div;
        };

        const filmeDivBotao = () => {
            const div = document.createElement("div");
            div.classList.add("hero__filme-remover", "btn");
            const i = document.createElement("i");
            i.classList.add("bx", "bx-trash");
            const p = document.createElement("p");
            p.textContent = "Remover";

            div.appendChild(i);
            div.appendChild(p);

            div.addEventListener("click", () => {
                notie.confirm({
                    text: "Tem certeza que deseja excluir?",
                    submitText: "Sim",
                    cancelText: "Não",
                    submitCallback: () => {
                        document.getElementById(data.imdbID).remove();
                        delete filmes[data.imdbID];
                        saveStorage();
                    },
                });
            });

            return div;
        };

        const filmeContainer = () => {
            const div = document.createElement("div");
            div.classList.add("hero__filme");
            div.id = data.imdbID;

            div.appendChild(filmeDivImg());
            div.appendChild(filmeDivBotao());

            return div;
        };

        document.querySelector(".hero__filmes").appendChild(filmeContainer());
    }

    function saveStorage() {
        localStorage.setItem("FILMES", JSON.stringify(filmes));
    }

    $btnModal.addEventListener("click", () => {
        if (!filmes[resultado.imdbID]) {
            filmes[resultado.imdbID] = resultado;
            createFilme(resultado);
            fecharModal();
            saveStorage();
        } else {
            notie.alert({
                type: "info",
                text: "Este filme já está na sua lista",
            });
        }
    });

    $navForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        try {
            const link = `https://blossom-habitual-yacht.glitch.me/get/omdbapi/${formatFilmName(
                $filmName.value
            )}/${formatFilmYear($filmYear.value) || "not"}`;

            const request = await fetch(link);
            const json = await request.json();

            if (!json.Error) {
                createModal(json);
                resultado = json;
                document.body.classList.add("exibir-filme");
            } else {
                throw new Error("Filme não encontrado");
            }
        } catch (erro) {
            notie.alert({
                type: "error",
                text: erro.message,
            });
        }
    });

    for (let key in filmes) {
        createFilme(filmes[key]);
    }
});
