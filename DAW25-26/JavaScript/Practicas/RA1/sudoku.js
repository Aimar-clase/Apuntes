/*

🧠 3. Sudoku Validator

  

Dado un tablero de Sudoku 9x9 (array bidimensional), verifica si cumple las reglas de Sudoku:

  

Cada fila debe tener los números del 1 al 9 sin repetirse.

  

Cada columna debe tener los números del 1 al 9 sin repetirse.

  

Cada cuadrante 3x3 debe tener los números del 1 al 9 sin repetirse. */

function validarSudoku(tablero) {
  let primeraRegla = seDuplica(tablero);

  let segundaRegla = reglaDos(tablero);

  let terceraRegla = bloques3x3(tablero);

  let esValidoElSudoku = false;

  if (primeraRegla && segundaRegla && terceraRegla) {
    esValidoElSudoku = true;
  }

  return esValidoElSudoku;
}

function bloques3x3(tablero) {
  const bloques = new Map([
    ["B1", []],

    ["B2", []],

    ["B3", []],

    ["B4", []],

    ["B5", []],

    ["B6", []],

    ["B7", []],

    ["B8", []],

    ["B9", []],
  ]);

  for (let i = 0; i < tablero.length; i++) {
    for (let j = 0; j < tablero.length; j++) {
      let num = tablero[i][j];

      let bloqueFila = Math.floor(i / 3);

      let bloqueCol = Math.floor(j / 3);

      let numBloque = bloqueFila * 3 + bloqueCol + 1;

      let clave = `B${numBloque}`;

      bloques.get(clave).push(num);
    }
  }

  let arrayBloques = [...bloques.values()];

  return seDuplica(arrayBloques);
}

function reglaDos(tablero) {
  let arrayTodasColumnas = [];

  let arrayColumnas = [];

  if (tablero.length == 9) {
    for (let i = 0; i < tablero.length; i++) {
      arrayTodasColumnas = [];

      for (let j = 0; j < tablero.length; j++) {
        arrayTodasColumnas.push(tablero[j][i]);
      }

      arrayColumnas.push(arrayTodasColumnas);
    }
  }

  return seDuplica(arrayColumnas);
}

function seDuplica(tablero) {
  let seDuplica = false;

  for (let i = 0; i < tablero.length; i++) {
    let sinDuplicados = new Set(tablero[i]);

    if (sinDuplicados.size != 9) {
      return (seDuplica = false);
    } else {
      seDuplica = true;
    }
  }

  return seDuplica;
}

const sudokuCorrecto = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],

  [6, 7, 2, 1, 9, 5, 3, 4, 8],

  [1, 9, 8, 3, 4, 2, 5, 6, 7],

  [8, 5, 9, 7, 6, 1, 4, 2, 3],

  [4, 2, 6, 8, 5, 3, 7, 9, 1],

  [7, 1, 3, 9, 2, 4, 8, 5, 6],

  [9, 6, 1, 5, 3, 7, 2, 8, 4],

  [2, 8, 7, 4, 1, 9, 6, 3, 5],

  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

const sudokuIncorrecto = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],

  [6, 7, 6, 1, 9, 5, 3, 4, 8], // ← dos 6 en la fila
  [1, 9, 8, 3, 4, 2, 5, 9, 7], // ← dos 9 en la columna 8
  [8, 5, 9, 7, 6, 1, 4, 2, 3],

  [4, 2, 5, 8, 5, 3, 7, 9, 1], // ← dos 5 en el bloque central
  [7, 1, 3, 9, 2, 4, 8, 5, 6],

  [9, 6, 1, 5, 3, 7, 2, 8, 4],

  [2, 8, 7, 4, 1, 9, 6, 3, 5],

  [3, 4, 5, 2, 8, 6, 1, 7, 9],
];

console.log(validarSudoku(sudokuCorrecto));
console.log(validarSudoku(sudokuIncorrecto));
