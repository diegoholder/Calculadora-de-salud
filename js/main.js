window.onload = () => {
    button = document.querySelector("#btn");
    if (button !== null)
    button.addEventListener("click", calculateAndRenderBMI);
    document.getElementById("add-user-button").addEventListener("click", updateUsersBMR);
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
// Esta parte del código será usado para los cálculos de la página relacionada al metabolismo, se implementará con Arrays y Objetos
// Creando un Array vacío para guardar los objetos de usuario
let users = [];

// Definiendo la función para calcular el metabolismo basal
function calculateBMR(weight, height, age, sex) {
    // La fórmula para hombres es: TMB = 10 * peso (kg) + 6.25 * altura (cm) - 5 * edad (años) + 5
    // La fórmula para mujeres es: TMB = 10 * peso (kg) + 6.25 * altura (cm) - 5 * edad (años) - 161
    if (sex === "male") {
        return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        return 10 * weight + 6.25 * height - 5 * age - 161;
    }
}
function createTable() {
    // Consiguiendo el elemento de la tabla
    let table = document.getElementById("user-table");

    // Limpiando las filas de la tabla
    table.innerHTML = "";

    // Loopeando los usuarios a traves del array
    for (let i = 0; i < users.length; i++) {
        // Consiguiendo el usuario actual
        let user = users[i];

        // Creando una nueva fila a la tabla
        let row = document.createElement("tr");

        // Añadiendo la información del usuario a la tabla
        row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.weight}</td>
        <td>${user.height}</td>
        <td>${user.age}</td>
        <td>${user.sex}</td>
        <td>${user.bmr}</td>
      `;

        // Añadiendo la fila a la table
        table.appendChild(row);
    }
}
// Añadiendo funcionalidad al botón usando un Event Listener
function updateUsersBMR() {
    // Esto arregla un comportamiento por defecto de javascript que me reiniciaba la página cuando le daba clic al botón del form
    event.preventDefault()
    // Consiguiendo los inputs
    let name = document.getElementById("name-input").value;
    let weight = document.getElementById("weight-input").value;
    let height = document.getElementById("height-input").value;
    let age = document.getElementById("age-input").value;
    let sex = document.querySelector('input[name="sex"]:checked').value;

    // Calculando el metabolismo con la función definida anteriormente
    let bmr = calculateBMR(weight, height, age, sex);

    // Creando el nuevo objeto de usuario y añadiéndolo al array
    let user = { name: name, weight: weight, height: height, age: age, sex: sex, bmr: bmr };
    users.push(user);
    createTable();
    // Limpiando los campos de input
    document.getElementById("name-input").value = "";
    document.getElementById("weight-input").value = "";
    document.getElementById("height-input").value = "";
    document.getElementById("age-input").value = "";
}


