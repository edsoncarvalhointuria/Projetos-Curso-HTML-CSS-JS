export function createTable(idTable, objArray, arrayInfs) {
    if (
        objArray.length < 1 ||
        !Array.isArray(objArray) ||
        arrayInfs.length < 1 ||
        !Array.isArray(arrayInfs)
    ) {
        throw new Error("Array Invalido");
    }

    const $tableElement = document.getElementById(idTable);
    if (!idTable) {
        throw new Error("Tabela não foi encontrada");
    }

    createTHead($tableElement, objArray);
    createTBody($tableElement, objArray, arrayInfs);
}

function createTHead(tableElement, objArray) {
    const theadEle = tableElement.querySelector("thead");
    if (theadEle) {
        theadEle.remove();
    }

    const thead = document.createElement("thead");
    tableElement.appendChild(thead);
    const tr = document.createElement("tr");

    for (let element of objArray) {
        const th = document.createElement("th");
        th.textContent = element.name;

        tr.appendChild(th);
    }

    thead.appendChild(tr);
}

function createTBody(tableElement, objArray, array) {
    const tbodyEle = tableElement.querySelector("tbody");
    if (tbodyEle) {
        tbodyEle.remove();
    }

    const tbody = document.createElement("tbody");
    tableElement.appendChild(tbody);

    for (let info of array) {
        const tr = document.createElement("tr");

        for (let objElement of objArray) {
            const td = document.createElement("td");
            const f = objElement.localeString ?? ((item) => item);

            td.textContent = f(info[objElement.reference]);
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}
