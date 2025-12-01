let id;
let isPlaying = false;
let puntuacion = 0;
let vidas = 3;
const jugar = document.getElementById("jugar");
const inputPalabra = document.getElementById("inputPalabra");
let palabrasActivas = [];
const puntuacionP = document.getElementById("puntuacion");
const vidasP = document.getElementById("vidas");
let gameOver = false;

inputPalabra.addEventListener("keydown", function(event){
    if(event.key == "Enter"){
        const palabraInput = inputPalabra.value;
        const resultado = palabrasActivas.find(objeto => objeto.palabra === palabraInput);

        if (resultado){
            puntuacion++;
            actualizarHUD();
            clearInterval(resultado.intervalo);
            resultado.elementoHTML.remove();
            const index = palabrasActivas.findIndex(obj => obj === resultado);
            if (index !== -1) {
                palabrasActivas.splice(index, 1);
            }
            inputPalabra.value = "";   
            
        }else {
            inputPalabra.value = "";
        }

    }
    
});

const limite = document.createElement("div");
limite.style.position = "absolute";
limite.style.left = "0px";
limite.style.top = "500px";      
limite.style.width = "100%";     
limite.style.height = "4px";     
limite.style.background = "red";


document.body.appendChild(limite);

jugar.addEventListener("click", function(){
    if (isPlaying){
        alert("YA HAY UN JUEGO EN CURSO");
    }else {
        vidas = 3;
        puntuacion = 0;
        id = setInterval(createWord, 1000);
        isPlaying = true;
        gameOver = false;
    }
    
    
});

    function randomWord(){
        const palabras = ["luz","cielo","árbol","montaña","río","gato","sueño",
        "camino","nube","fuego","viento","estrella","campo","tiempo","sol",
        "mar","piedra","hoja","lluvia","flor","noche","invierno","sabana",
        "trueno","arena","ciervo","eco","brisa","ave","cascada"];
        const numeroRandom = Math.floor(Math.random() * palabras.length);
        return palabras[numeroRandom];
    }

    

function createWord(){
    
    actualizarHUD();
    let posicionX = Math.floor(Math.random() * 1000);
    const palabra = document.createElement("span");
    palabra.textContent = randomWord();
    palabra.style.position = "absolute";
    palabra.style.top = "0px";
    palabra.style.left = posicionX + "px";
    document.body.appendChild(palabra);

    
    const moverAbajoInterval = setInterval(function(){
        let posicionY = parseInt(palabra.style.top);
        posicionY += 2;
        palabra.style.top = posicionY + "px";

        const palabraRect = palabra.getBoundingClientRect();
        const limiteRect = limite.getBoundingClientRect();
        
        if (palabraRect.bottom >= limiteRect.top) {
            clearInterval(moverAbajoInterval);
            palabra.remove();
            vidas--;
            actualizarHUD();
            const index = palabrasActivas.findIndex(obj => obj.elementoHTML === palabra);
            if (index !== -1) {
                palabrasActivas.splice(index, 1);
            }
        }
        
        if(vidas === 0 && !gameOver){
            gameOver = true;
            alert("has perdido :( tu puntuacion ha sido de: " + puntuacion);
            clearInterval(id);
            isPlaying = false;
    }
    }, 100)

    palabrasActivas.push({
        "palabra": palabra.textContent,
        "elementoHTML": palabra,
        "intervalo": moverAbajoInterval
    });


}

function actualizarHUD() {
    puntuacionP.textContent = "Puntuacion: " + puntuacion;
    vidasP.textContent = "Vidas: " + vidas;
}