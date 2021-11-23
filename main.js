let poblacion = [];
let poblacionFem = [];

function calcular() {
    poblacion = [];
    var numeroAnhos = parseInt(document.getElementById("input_anhos").value)
    var poblacionMasculina = parseInt(document.getElementById("input_masc").value)
    var poblacionFemenina = parseInt(document.getElementById("input_fem").value)
    var mortalidadMasculina = parseInt(document.getElementById("tasa_mort_masc").value) / 100
    var mortalidadFemenina = parseInt(document.getElementById("tasa_mort_fem").value) / 100
    var natalidadMasculina = parseInt(document.getElementById("tasa_nat_masc").value) / 100
    var natalidadFemenina = parseInt(document.getElementById("tasa_nat_fem").value) / 100
    var poblacionFertil = parseInt(document.getElementById("num_mujeres_fertil").value)

    //TODO VERIFICAR QUE TODOS LOS CAMPOS SEAN VALIDOS

    console.log(calculoPoplacion(numeroAnhos, poblacionMasculina, natalidadMasculina, mortalidadMasculina));
    console.log(poblacion);
    numNacimientos = poblacionMasculina * natalidadMasculina + poblacionFemenina * natalidadFemenina;
    console.log(calculoFecundidad(numNacimientos, poblacionFertil));
}

function calculoPoplacion(n, p, tasa_nat, tasa_mort) {
    if (n == 0) {
        return p;
    } else {
        anhoAnterior = calculoPoplacion(n - 1, p, tasa_nat, tasa_mort);
        poblacionActual = Math.round(anhoAnterior + anhoAnterior * tasa_nat - anhoAnterior * tasa_mort);
        poblacion.push(poblacionActual);

        return poblacionActual;
    }
}

function calculoFecundidad(numNacimientos, pf) {
    //TODO CALCULAR POR AÑO
    return numNacimientos / pf * 10;
}