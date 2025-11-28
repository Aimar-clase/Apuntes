








function intervalos(array){
    let minIntervalo = array[0][0];
    let maxIntervalo = array[0][1];
    let arrayIntervalo = [];

    array.sort((a,b) => a[0] - b[0]);
    for (let i = 1; i < array.length; i++) {
        
            if (array[i][0] < minIntervalo){
                minIntervalo = array[i][0];
            }

            if (array[i][1] > maxIntervalo){
                maxIntervalo = array[i][1];
            }

        
    }

    arrayIntervalo.push(minIntervalo,maxIntervalo);
    return arrayIntervalo;

}

console.log(intervalos([[1,5],[2,3],[6,7],[10, 11]]));