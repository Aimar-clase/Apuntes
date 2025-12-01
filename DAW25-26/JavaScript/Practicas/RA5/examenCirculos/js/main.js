const globosUsuario = document.getElementById("maxGlobos");
const enviarNumGlobos = document.getElementById("enviarNumGlobos");
const numDeGlobosMaximos = Math.max(15, new Date().getDate());
let globosActivos = [];
let motorJuego;

enviarNumGlobos.addEventListener("click", function (e) {
    e.preventDefault();
    if (globosUsuario.value > numDeGlobosMaximos) {
        globosUsuario.setCustomValidity("El numero maximo de globos es: " + numDeGlobosMaximos);
        globosUsuario.reportValidity();
    } else {
        generarGlobos(globosUsuario.value);
    }
})


function generarGlobos(numGlobos) {
    for (let i = 0; i < numGlobos; i++) {
        const tiposGlobos = [
            "img/redCircle.jpg",
            "img/blue_Circle.png",
            "img/Yellow_Circle.png",
            "img/Green_Circle.png"
        ]
        let randomGlobo = Math.floor(Math.random() * 4);

        let posicionY = Math.floor(Math.random() * 100);
        let posicionX = Math.floor(Math.random() * 100);
        const circulo = document.createElement("img");
        circulo.src = tiposGlobos[randomGlobo];
        circulo.style.maxWidth = "50px";
        circulo.style.position = "absolute";
        circulo.style.top = posicionY + "%";
        circulo.style.left = posicionX + "%";
        document.body.appendChild(circulo);

        globosActivos.push({
            elemento: circulo,
            posicionY: circulo.getBoundingClientRect().top,
            posicionX: circulo.getBoundingClientRect().left
        });

    }
}


setInterval(function () {
    globosActivos.forEach(globo => {
        const min = 10;
        const max = 50;
        const numeroAleatorioUno = Math.floor(Math.random() * (max - min + 1)) + min;
        const numeroAleatorioDos = Math.floor(Math.random() * (max - min + 1)) + min;
        const numAleatorioMovimientoY = Math.floor(Math.random() * 2);
        const numAleatorioMovimientoX = Math.floor(Math.random() * 2);
        const movimientoY = ["Arriba", "Abajo"];
        const movimientoX = ["Izquierda", "Derecha"]

        if (movimientoX[numAleatorioMovimientoX] === "Izquierda" && movimientoY[numAleatorioMovimientoY] === "Arriba") {
            globo.posicionY -= numeroAleatorioUno;
            globo.elemento.style.top = globo.posicionY + "px";

            globo.posicionX -= numeroAleatorioDos;
            globo.elemento.style.left = globo.posicionX + "px"

        } else if (movimientoX[numAleatorioMovimientoX] === "Derecha" && movimientoY[numAleatorioMovimientoY] === "Arriba") {

            globo.posicionY -= numeroAleatorioUno;
            globo.elemento.style.top = globo.posicionY + "px";

            globo.posicionX += numeroAleatorioDos;
            globo.elemento.style.left = globo.posicionX + "px"

        } else if (movimientoX[numAleatorioMovimientoX] === "Izquierda" && movimientoY[numAleatorioMovimientoY] === "Abajo") {

            globo.posicionY += numeroAleatorioUno;
            globo.elemento.style.top = globo.posicionY + "px";

            globo.posicionX -= numeroAleatorioDos;
            globo.elemento.style.left = globo.posicionX + "px"

        } else {
            globo.posicionY += numeroAleatorioUno;
            globo.elemento.style.top = globo.posicionY + "px";

            globo.posicionX += numeroAleatorioDos;
            globo.elemento.style.left = globo.posicionX + "px"
        }


    })
}, 100)