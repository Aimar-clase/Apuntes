
// setTimeout(decirHola, 10000);

let contador = 0 ;
function decirHola(){
    contador++;
    console.log("HOLAAA");
    
    if (contador === 5){
        clearInterval(id);
    };
};

const id = setInterval(decirHola, 1000);

