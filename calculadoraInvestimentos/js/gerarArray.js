function converterPeriodoAnual(rentabilidadeAnual) {
    return rentabilidadeAnual ** (1 / 12);
}

export function gerarArray(
    investimentoInicial = 0,
    prazo = 0,
    periodoPrazo = "mes",
    aporteAdicional = 0,
    rentabilidade = 0,
    periodoRentabilidade = "mes"
) {
    if (!prazo || !investimentoInicial) {
        throw new Error(
            "Investimento e prazo devem ser preenchidos com valores positivos"
        );
    }

    const rentabilidadeFinal =
        periodoRentabilidade === "mes"
            ? rentabilidade / 100 + 1
            : converterPeriodoAnual(rentabilidade / 100 + 1);
    const prazoFinal = periodoPrazo === "mes" ? prazo : prazo * 12;

    const objetoInvestimento = {
        totalInvestimento: investimentoInicial,
        rendimento: 0,
        totalRendimento: 0,
        mes: 0,
        total: investimentoInicial,
    };

    const arrayInvestimento = [objetoInvestimento];

    for (let i = 0; i < prazoFinal; i++) {
        const total =
            arrayInvestimento[i].total * rentabilidadeFinal + aporteAdicional;
        const rendimento =
            arrayInvestimento[i].total * (rentabilidadeFinal - 1);
        const totalInvestimento =
            investimentoInicial + aporteAdicional * (i + 1);
        const totalRendimento = total - totalInvestimento;

        arrayInvestimento.push({
            totalInvestimento,
            rendimento,
            totalRendimento,
            mes: i + 1,
            total,
        });
    }

    return arrayInvestimento;
}
