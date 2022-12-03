window.onload = () => {
    button = document.querySelector("#btn");
    // Función para calcular el IMC
    button.addEventListener("click", calculateAndRenderBMI);
};
function calculateAndRenderBMI() {
    /* Consiguiendo el input del usuario para la altura
       también lo parseo para poder operar con el valor*/
    const height = document.querySelector("#height").value;
    const heightValue = parseInt(height);
    /* Consiguiendo el input del usuario para el peso
       también lo parseo para poder operar con el valor*/
    const weight = document.querySelector("#weight").value;
    const weightValue = parseInt(weight);
    let result = document.querySelector("#result");
    // Revisando si el usuario ingresó un valor válido
    if (height === "" || isNaN(height))
        result.innerHTML = "ERROR: Danos una altura válida!";
    else if (weight === "" || isNaN(weight))
        result.innerHTML = "ERROR: Danos un peso válido!";
    // Si ambos son válidos el IMC se calculará
    else {
        // Fórmula para calcular el IMC, se mostrarán hasta 2 decimales
        let bmi = calculateBMI(heightValue, weightValue);
        // Clasificando de acuerdo al valor obtenido
        if (bmi < 18.6) result.innerHTML =
            `Tu IMC es de <b>${bmi}</b> lo que indica que está en la categoría de <b>bajo peso</b> para adultos de su estatura. El IMC es una medida de detección y no para diagnosticar enfermedades o padecimientos. Para obtener más información converse con su médico sobre su IMC.`;
        else if (bmi >= 18.6 && bmi < 24.9)
            result.innerHTML = `Tu IMC es de <b>${bmi}</b> lo que indica que está en la categoría <b>normal</b> para adultos de su estatura. El IMC es una medida de detección y no para diagnosticar enfermedades o padecimientos. Para obtener más información converse con su médico sobre su IMC.`;
        else result.innerHTML = `Tu IMC es de <b>${bmi}</b> lo que indica que está en la categoría de <b>Sobrepeso</b> para adultos de su estatura. El IMC es una medida de detección y no para diagnosticar enfermedades o padecimientos. Para obtener más información converse con su médico sobre su IMC.`;
    }
    let initialWeight = 40;
    let resultHTML = ""
    
    while (initialWeight <= 120) {
        let tableBMIvalue = calculateBMI(heightValue, initialWeight);
        let BMItype = getBMIType(tableBMIvalue);
        initialWeight = initialWeight + 5;
        resultHTML = resultHTML + `<tr> <th scope="col">${initialWeight}</th> <th scope="col">${tableBMIvalue}</th> <th scope="col">${BMItype}</th>`
    }
    document.querySelector("#tableBMI").innerHTML = resultHTML;
}
function calculateBMI(height, weight) {
    let bmi = (weight / ((height * height) / 10000)).toFixed(2);
    return bmi;
}
function getBMIType(bmi) {
    let result;
    if (bmi < 18.6) result = "Bajo peso"
    else if (bmi >= 18.6 && bmi < 24.9)
        result = "Normal";
    else result = "Sobrepeso";
    return result;
}