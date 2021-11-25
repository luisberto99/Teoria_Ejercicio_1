var poblacionMasc = [];
var poblacionFem = [];
var poblacionTotal = [];
var numNacimientosMasc = [];
var numNacimientosFem = [];
var numNacimientosTotal = [];
var numMuertesMasc = [];
var numMuertesFem = [];
var numMuertesTotal = [];
var tasaFecundidad = [];
var labels = [];

const data = {
    labels: labels,
    datasets: [{
        label: 'Grafica de Poblacion Masculina',
        backgroundColor: 'rgb(25, 99, 132)',
        borderColor: 'rgb(25, 99, 132)',
        data: poblacionMasc,
    }, {
        label: 'Grafica de Poblacion Femenina',
        backgroundColor: 'rgb(255, 5, 236)',
        borderColor: 'rgb(255, 5, 236)',
        data: poblacionFem,
    }, {
        label: 'Grafica de Poblacion Total',
        backgroundColor: 'rgb(255, 100, 25)',
        borderColor: 'rgb(255, 100, 25)',
        data: poblacionTotal,
    }]
};
const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            }
        }
    },
};
const myChart = new Chart(
    document.getElementById('myChart'),
    config
);

function calcular() {
    poblacionMasc = [];
    poblacionFem = [];
    numNacimientosMasc = [];
    numNacimientosFem = [];
    numNacimientosTotal = [];
    numMuertesMasc = [];
    numMuertesFem = [];
    numMuertesTotal = [];
    tasaFecundidad = [];
    labels = [];
    var numeroAnhos = parseInt(document.getElementById("input_anhos").value)
    var poblacionMasculina = parseInt(document.getElementById("input_masc").value)
    var poblacionFemenina = parseInt(document.getElementById("input_fem").value)
    var mortalidadMasculina = parseInt(document.getElementById("tasa_mort_masc").value) / 100
    var mortalidadFemenina = parseInt(document.getElementById("tasa_mort_fem").value) / 100
    var natalidadMasculina = parseInt(document.getElementById("tasa_nat_masc").value) / 100
    var natalidadFemenina = parseInt(document.getElementById("tasa_nat_fem").value) / 100
    var poblacionFertil = parseInt(document.getElementById("num_mujeres_fertil").value)

    //TODO VERIFICAR QUE TODOS LOS CAMPOS SEAN VALIDOS

    calculoPoplacionMasc(numeroAnhos, poblacionMasculina, natalidadMasculina, mortalidadMasculina);
    calculoPoplacionFem(numeroAnhos, poblacionFemenina, natalidadFemenina, mortalidadFemenina)
    numNacimientos = poblacionMasculina * natalidadMasculina + poblacionFemenina * natalidadFemenina;

    tasaFecundidad(); /* CALULO DE TASA DE FECUNDIDAD */
    //console.log(calculoFecundidad(numNacimientos, poblacionFertil));
    for (let i = 1; i <= numeroAnhos; i++) {
        labels.push(i)
    }

    /* OBTENER DATOS DE POBLACION TOTAL */
    getPoblacionTotal();
    myChart.data.labels = labels;
    myChart.data.datasets.pop();
    myChart.data.datasets.pop();
    myChart.data.datasets.pop();
    myChart.data.datasets.push({
        label: 'Grafica de Poblacion Masculina',
        backgroundColor: 'rgb(25, 99, 132)',
        borderColor: 'rgb(25, 99, 132)',
        data: poblacionMasc,
    });
    myChart.data.datasets.push({
        label: 'Grafica de Poblacion Femenina',
        backgroundColor: 'rgb(255, 5, 236)',
        borderColor: 'rgb(255, 5, 236)',
        data: poblacionFem,
    });
    myChart.data.datasets.push({
        label: 'Grafica de Poblacion Total',
        backgroundColor: 'rgb(255, 100, 25)',
        borderColor: 'rgb(255, 100, 25)',
        data: poblacionTotal,
    });
    myChart.update();

}
/* OBTENER DATOS DE POBLACION TOTAL */
function getPoblacionTotal() {
    poblacionTotal = [];
    numNacimientosTotal = [];
    numMuertesTotal = [];
    for (let i = 0; i < labels.length; i++) {
        poblacionTotal[i] = poblacionMasc[i] + poblacionFem[i];
        numNacimientosTotal[i] = numNacimientosFem[i] + numNacimientosMasc[i];
        numMuertesTotal[i] = numMuertesFem[i] + numMuertesMasc[i];
    }
}

function calculoPoplacionMasc(n, p, tasa_nat, tasa_mort) {
    if (n == 0) {
        return p;
    } else {
        anhoAnterior = calculoPoplacionMasc(n - 1, p, tasa_nat, tasa_mort);
        poblacionActual = Math.round(anhoAnterior + anhoAnterior * tasa_nat - anhoAnterior * tasa_mort);
        poblacionMasc.push(poblacionActual);
        numNacimientosMasc.push(Math.round(tasa_nat * anhoAnterior))
        numMuertesMasc.push(Math.round(tasa_mort * anhoAnterior))
        return poblacionActual;
    }
}

function calculoPoplacionFem(n, p, tasa_nat, tasa_mort) {
    if (n == 0) {
        return p;
    } else {
        anhoAnterior = calculoPoplacionFem(n - 1, p, tasa_nat, tasa_mort);
        poblacionActual = Math.round(anhoAnterior + anhoAnterior * tasa_nat - anhoAnterior * tasa_mort);
        poblacionFem.push(poblacionActual);
        numNacimientosFem.push(Math.round(tasa_nat * anhoAnterior))
        numMuertesFem.push(Math.round(tasa_mort * anhoAnterior))
        return poblacionActual;
    }
}

/* CALULO DE TASA DE FECUNDIDAD */
function calculoFecundidad(numNacimientos, pf) {
    //TODO CALCULAR POR AÑO
    for (let i = 0; i < labels.length; i++) {
        tasaFecundidad[i] = numNacimientosTotal[i] / pf * 10;
    }
}