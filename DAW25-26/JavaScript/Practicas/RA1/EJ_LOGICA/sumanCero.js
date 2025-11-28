





function sumanCero(array){

    let miSet = new Set(array);
    let sinDuplicados = [...miSet];
    let conbinaciones = new Set();
    let conbinacion = [];
    for (let i = 0; i < sinDuplicados.length; i++) {
        for (let j = i + 1; j < sinDuplicados.length; j++) {
            for (let z = j + i; z < sinDuplicados.length; z++) {
                conbinacion = [];
                let sumaConbinacion = sinDuplicados[i] + sinDuplicados[j] + sinDuplicados[z];
                if (sumaConbinacion === 0){
                    conbinacion.push(sinDuplicados[i], sinDuplicados[j],sinDuplicados[z]);
                    conbinaciones.add(conbinacion);
                }
            }
        }
    }
    return conbinaciones;
}

console.log(sumanCero([3,4,7,-2,-1,3,-11]));