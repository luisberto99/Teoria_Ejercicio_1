function calcular() {
    var poblacion = [];
    var numeroAnhos = document.getElementById("input_anhos").value
    var poblacionMasculina = document.getElementById("input_masc").value
    var poblacionFemenina = document.getElementById("input_fem").value
    var mortalidadMasculina = document.getElementById("tasa_mort_masc").value / 100
    var mortalidadFemenina = document.getElementById("tasa_mort_fem").value / 100
    var natalidad = document.getElementById("tasa_nat").value / 100

    //TODO VERIFICAR QUE TODOS LOS CAMPOS SEAN VALIDOS

    console.log(calculoPoplacion(numeroAnhos, poblacionMasculina, natalidad, mortalidadMasculina));
}

function calculoPoplacion(n, poblacion, tasa_nat, tasa_mort) {
    if (n == 0) {
        return poblacion;
    } else {
        anhoAnterior = calculoPoplacion(n - 1, poblacion, tasa_nat, tasa_mort);
        console.log(anhoAnterior);
        return añoAnterior + anhoAnterior * tasa_nat - anhoAnterior * tasa_mort;
    }
}