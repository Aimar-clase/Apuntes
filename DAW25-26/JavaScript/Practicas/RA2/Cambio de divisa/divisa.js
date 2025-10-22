let importeId = document.getElementById("importe");
let antiguaDivisa = document.getElementById("cambiar");
const btnCambio = document.getElementById("btnCambio");
let nuevaDivisa = document.getElementById("nuevaDivisa");
let listaHistorial = document.getElementById("Historial");
let iconoFlechas = document.getElementById("flechas");

const conversiones = {
    "Euros-Dollar": 1.05,
    "Euros-Libras": 0.85,
    "Dollar-Euros": 0.95,
    "Dollar-Libras": 0.80,
    "Libras-Euros": 1.18,
    "Libras-Dollar": 1.25
}


iconoFlechas.addEventListener("click", function(){
    let temp = antiguaDivisa.value;
    antiguaDivisa.value = nuevaDivisa.value;
    nuevaDivisa.value = temp;
})



btnCambio.addEventListener("click", function(){
    
    let fecha = new Date();
    let importe = importeId.value;
    let valorCambio = antiguaDivisa.value;
    let valorNuevaDivisa = nuevaDivisa.value;
    let fechaFormateada = fecha.toLocaleString();

    if (valorCambio === valorNuevaDivisa){
        let resultado = importe;
        let newLi = document.createElement("li");
            newLi.textContent = fechaFormateada + " | " +  " Importe: " + importe + " " + valorCambio;
            listaHistorial.appendChild(newLi);

    }else {
            let clave = valorCambio + "-" + valorNuevaDivisa;
            let tasa = conversiones[clave];
            let resultado = importe * tasa;
            

            let newLi = document.createElement("li");
            newLi.textContent = fechaFormateada + " | " +  " Importe: " + importe + " " + valorCambio + " son: " + resultado + " " + valorNuevaDivisa;
            listaHistorial.appendChild(newLi);
    }

    
})

