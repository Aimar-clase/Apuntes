# 📘 Métodos principales de Arrays en JavaScript

  

Los **arrays** son estructuras de datos que almacenan una lista ordenada de elementos.  

Pueden contener valores de cualquier tipo (`string`, `number`, `boolean`, objetos, etc.).

  

---

  

## 🔹 1. `length`

Devuelve la **longitud** (número de elementos) del array.

  

```js

let frutas = ["manzana", "pera", "plátano"];

console.log(frutas.length); // 3

```

  

---

  

## 🔹 2. `push()` y `pop()`

- `push()` agrega uno o más elementos al final del array.  

- `pop()` elimina y devuelve el último elemento.

  

```js

let numeros = [1, 2, 3];

numeros.push(4);

console.log(numeros); // [1, 2, 3, 4]

  

let ultimo = numeros.pop();

console.log(ultimo);  // 4

console.log(numeros); // [1, 2, 3]

```

  

---

  

## 🔹 3. `unshift()` y `shift()`

- `unshift()` agrega uno o más elementos al **inicio** del array.  

- `shift()` elimina y devuelve el **primer** elemento.

  

```js

let letras = ["b", "c"];

letras.unshift("a");

console.log(letras); // ["a", "b", "c"]

  

let primero = letras.shift();

console.log(primero); // "a"

console.log(letras);  // ["b", "c"]

```

  

---

  

## 🔹 4. `indexOf()` y `includes()`

- `indexOf()` devuelve el **índice** del elemento (o `-1` si no está).  

- `includes()` devuelve `true` o `false` según si el elemento existe.

  

```js

let colores = ["rojo", "verde", "azul"];

console.log(colores.indexOf("verde")); // 1

console.log(colores.includes("negro")); // false

```

  

---

  

## 🔹 5. `slice()`

Devuelve una **copia** de una parte del array sin modificar el original.

  

```js

let animales = ["perro", "gato", "conejo", "pez"];

let domesticos = animales.slice(0, 2);

console.log(domesticos); // ["perro", "gato"]

console.log(animales);   // ["perro", "gato", "conejo", "pez"]

```

  

---

  

## 🔹 6. `splice()`

Permite **añadir, eliminar o reemplazar** elementos (sí modifica el original).
La parte de eliminar significa que eliminara por ejemplo 3 elementos contando el indice (el indice tmb se borrara)
  

```js

let meses = ["Enero", "Febrero", "Abril"];

meses.splice(2, 0, "Marzo"); // (posición, eliminar, añadir)

console.log(meses); // ["Enero", "Febrero", "Marzo", "Abril"]

```

  

---

  

## 🔹 7. `concat()`

Combina dos o más arrays y devuelve uno nuevo.

  

```js

let a = [1, 2];

let b = [3, 4];

let combinado = a.concat(b);

console.log(combinado); // [1, 2, 3, 4]

```

  

---

  

## 🔹 8. `join()`

Une los elementos del array en una cadena de texto.

  

```js

let palabras = ["Hola", "mundo"];

console.log(palabras.join(" ")); // "Hola mundo"

```

  

---

  

## 🔹 9. `reverse()` y `sort()`

- `reverse()` invierte el orden de los elementos.  

- `sort()` ordena los elementos (por defecto, alfabéticamente).

  

```js

let letras = ["c", "a", "b"];

letras.sort();

console.log(letras); // ["a", "b", "c"]

  

letras.reverse();

console.log(letras); // ["c", "b", "a"]

```

  

---

  

## 🔹 10. `forEach()`

Ejecuta una función por cada elemento del array.

  

```js

let numeros = [1, 2, 3];

numeros.forEach(function(n) {

  console.log(n * 2);

});

// 2

// 4

// 6

```

  

---

  

## 🔹 11. `map()`

Crea un **nuevo array** con los resultados de aplicar una función a cada elemento.

  

```js

let numeros = [1, 2, 3];

let dobles = numeros.map(n => n * 2);

console.log(dobles); // [2, 4, 6]

```

  

---

  

## 🔹 12. `filter()`

Devuelve un nuevo array con los elementos que cumplan una condición.

  

```js

let edades = [12, 18, 25, 15];

let mayores = edades.filter(e => e >= 18);

console.log(mayores); // [18, 25]

```

  

---

  

## 🔹 13. `find()` y `findIndex()`

- `find()` devuelve el **primer elemento** que cumpla la condición.  

- `findIndex()` devuelve la **posición** del primer elemento q cumpla la condición.

  

```js

let numeros = [5, 12, 8, 130, 44];

let encontrado = numeros.find(n => n > 10);

console.log(encontrado); // 12

  

let indice = numeros.findIndex(n => n > 10);

console.log(indice); // 1

```

  

---

  

## 🔹 14. `reduce()`

Aplica una función acumuladora y devuelve un solo valor.

  

```js

let numeros = [1, 2, 3, 4];

let suma = numeros.reduce((acum, valor) => acum + valor, 0);

console.log(suma); // 10

```

  

---

  

## 🔹 15. `some()` y `every()`

- `some()` devuelve `true` si **algún** elemento cumple la condición.  

- `every()` devuelve `true` si **todos** la cumplen.

  

```js

let edades = [18, 22, 17];

console.log(edades.some(e => e < 18));  // true

console.log(edades.every(e => e >= 18)); // false

```

  

---

  

## 🔹 16. `flat()` y `flatMap()`

- `flat()` aplana arrays anidados.  

- `flatMap()` combina `map()` + `flat()`.

  

```js

let arr = [1, [2, [3, 4]]];

console.log(arr.flat(2)); // [1, 2, 3, 4]

  

let duplicado = [1, 2, 3].flatMap(n => [n, n * 2]);

console.log(duplicado); // [1, 2, 2, 4, 3, 6]

```

  

---

  

## 🔹 17. `at()`

Permite acceder a un índice positivo o negativo.

  

```js

let letras = ["a", "b", "c", "d"];

console.log(letras.at(0));  // "a"

console.log(letras.at(-1)); // "d"

```

  

---

  

## 🔹 18. `toSorted()`, `toReversed()`, `toSpliced()`

Versión moderna **inmutable** de `sort()`, `reverse()` y `splice()` (no modifican el original).

  

```js

let nums = [3, 1, 2];

let ordenado = nums.toSorted();

console.log(ordenado); // [1, 2, 3]

console.log(nums);     // [3, 1, 2]

```