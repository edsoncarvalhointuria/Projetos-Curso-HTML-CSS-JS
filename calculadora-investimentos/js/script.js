import { gerarArray } from "./gerarArray.js";
import { Chart } from "chart.js/auto";
import { createTable } from "./table.js";

const $sidebarBtnHidden = document.getElementById("sidebar__hidden-btn");
const $sidebarBtnShow = document.getElementById("sidebar__show-btn");
const $form = document.querySelector("form");
const $main = document.querySelector("main");
const $btnLimpar = document.getElementById("btn-limpar");
const $btnLeft = document.querySelector(".arrows__left");
const $btnRight = document.querySelector(".arrows__right");
const $canvaDonut = document.getElementById("donut");
const $canvaProgression = document.getElementById("progression");
let donut = {};
let progression = {};
const objTable = [
    { name: "Mês", reference: "mes" },
    {
        name: "Total Investimento",
        reference: "totalInvestimento",
        localeString: format,
    },
    {
        name: "Rendimento Mensal",
        reference: "rendimento",
        localeString: format,
    },
    {
        name: "Rendimento Total",
        reference: "totalRendimento",
        localeString: format,
    },
    { name: "Quantidade Total", reference: "total", localeString: format },
];

$sidebarBtnHidden.addEventListener("click", () => {
    document.body.classList.add("hidden--sidebar");
});

$sidebarBtnShow.addEventListener("click", () => {
    document.body.classList.remove("hidden--sidebar");
});

$form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (document.querySelector(".form__container--erro")) {
        return;
    }

    const investimentoInicial = Number($form["InvestimentoInicial"].value);
    const aportesAdicionais = Number($form["AportesAdicionais"].value);
    const prazo = Number($form["Prazo"].value);
    const prazoSelect = $form["PrazoSelect"].value;
    const rentabilidade = Number($form["Rentabilidade"].value);
    const rentabilidadeSelect = $form["RentabilidadeSelect"].value;
    const impostoSobreOLucro = Number($form["ImpostoSobreLucro"].value);

    destroyCharts();
    removeTable();

    const arrayInvestimento = gerarArray(
        investimentoInicial,
        prazo,
        prazoSelect,
        aportesAdicionais,
        rentabilidade,
        rentabilidadeSelect
    );

    const objUltimoInvestimento =
        arrayInvestimento[arrayInvestimento.length - 1];

    donut = new Chart($canvaDonut, {
        type: "doughnut",
        data: {
            labels: ["Total Investimento", "Rendimento", "Imposto"],
            datasets: [
                {
                    data: [
                        objUltimoInvestimento.totalInvestimento.toFixed(2),
                        (
                            objUltimoInvestimento.totalRendimento *
                            (1 - impostoSobreOLucro / 100)
                        ).toFixed(2),
                        (
                            objUltimoInvestimento.totalRendimento *
                            (impostoSobreOLucro / 100)
                        ).toFixed(2),
                    ],
                    backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                    ],
                    hoverOffset: 4,
                },
            ],
        },
    });

    progression = new Chart($canvaProgression, {
        type: "bar",
        data: {
            labels: arrayInvestimento.map((obj) => obj.mes),
            datasets: [
                {
                    label: "Total Investido",
                    data: arrayInvestimento.map((obj) =>
                        obj.totalInvestimento.toFixed(2)
                    ),
                    backgroundColor: "rgb(255, 99, 132)",
                },
                {
                    label: "Retorno Investimento",
                    data: arrayInvestimento.map((obj) =>
                        obj.rendimento.toFixed(2)
                    ),
                    backgroundColor: "rgb(54, 162, 235)",
                },
            ],
        },
        options: {
            responsive: true,
            interaction: {
                intersect: false,
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        maxRotation: 0,
                    },
                },
                y: {
                    stacked: true,
                },
            },
        },
    });

    createTable("table", objTable, arrayInvestimento);
});

$btnLimpar.addEventListener("click", () => {
    for (let element of document.querySelectorAll(".form__container--erro")) {
        element.classList.remove("form__container--erro");
    }

    destroyCharts();
    removeTable();
});

$btnLeft.addEventListener("click", () => {
    $main.scrollLeft -= $main.clientWidth;
});

$btnRight.addEventListener("click", () => {
    $main.scrollLeft += $main.clientWidth;
});

function destroyCharts() {
    if (
        !(Object.keys(donut).length === 0) &&
        !(Object.keys(progression).length === 0)
    ) {
        donut.destroy();
        progression.destroy();
    }
}

function removeTable() {
    const thead = document.querySelector("thead");
    const tbody = document.querySelector("tbody");

    if (!thead || !tbody) {
        return;
    }

    thead.remove();
    tbody.remove();
}

function format(number) {
    return Number(number).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

for (let element of $form.querySelectorAll("input")) {
    element.addEventListener("blur", (e) => {
        if (e.target.value === "") {
            return;
        }

        const value = Number(e.target.value.replaceAll(",", "."));
        const grandParentElement = e.target.parentElement.parentElement;

        if (
            e.target.id !== "AportesAdicionais" &&
            (Number.isNaN(value) || value < 0)
        ) {
            grandParentElement.classList.add("form__container--erro");
        } else if (Number.isNaN(value) || value <= 0) {
            grandParentElement.classList.add("form__container--erro");
        } else {
            grandParentElement.classList.remove("form__container--erro");
        }
    });
}
