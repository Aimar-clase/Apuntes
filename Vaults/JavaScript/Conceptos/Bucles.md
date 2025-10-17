# 🔁 Guía Completa de Bucles en JavaScript

## 📌 Conceptos Fundamentales

### ¿Qué es un bucle?

Un **bucle** (loop) es una estructura que permite **repetir código** múltiples veces sin tener que escribirlo repetidamente.

```js
// ❌ Sin bucle (repetitivo)
console.log(1);
console.log(2);
console.log(3);
console.log(4);
console.log(5);

// ✅ Con bucle (eficiente)
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```

### 🔑 Características importantes:

- **Condición:** Determina cuándo continuar o parar
- **Iteración:** Cada repetición del bucle
- **Contador:** Variable que controla las iteraciones
- **Cuerpo:** Código que se ejecuta en cada iteración

---

## 🔢 1. Bucle FOR (el más usado)

### Sintaxis básica

```js
for (inicialización; condición; actualización) {
    // Código a repetir
}
```

**Partes:**

1. **Inicialización:** Se ejecuta UNA vez al inicio
2. **Condición:** Se verifica ANTES de cada iteración
3. **Actualización:** Se ejecuta DESPUÉS de cada iteración
4. **Cuerpo:** Código entre llaves {}

---

### Ejemplo básico

```js
// Contar del 1 al 5
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
// 1, 2, 3, 4, 5

// Desglose paso a paso:
// Paso 1: i = 1, ¿1 <= 5? Sí → console.log(1) → i++
// Paso 2: i = 2, ¿2 <= 5? Sí → console.log(2) → i++
// Paso 3: i = 3, ¿3 <= 5? Sí → console.log(3) → i++
// Paso 4: i = 4, ¿4 <= 5? Sí → console.log(4) → i++
// Paso 5: i = 5, ¿5 <= 5? Sí → console.log(5) → i++
// Paso 6: i = 6, ¿6 <= 5? No → TERMINA
```

---

### Variaciones comunes

```js
// Empezar en 0
for (let i = 0; i < 5; i++) {
    console.log(i);
}
// 0, 1, 2, 3, 4

// Contar hacia atrás
for (let i = 5; i >= 1; i--) {
    console.log(i);
}
// 5, 4, 3, 2, 1

// Incrementar de 2 en 2
for (let i = 0; i <= 10; i += 2) {
    console.log(i);
}
// 0, 2, 4, 6, 8, 10

// Incrementar de 5 en 5
for (let i = 0; i <= 50; i += 5) {
    console.log(i);
}
// 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50

// Decrementar de 3 en 3
for (let i = 30; i >= 0; i -= 3) {
    console.log(i);
}
// 30, 27, 24, 21, 18, 15, 12, 9, 6, 3, 0

// Múltiplos de 3
for (let i = 3; i <= 15; i += 3) {
    console.log(i);
}
// 3, 6, 9, 12, 15
```

---

### Recorrer Arrays

```js
const frutas = ["manzana", "pera", "plátano", "uva"];

// Forma tradicional
for (let i = 0; i < frutas.length; i++) {
    console.log(frutas[i]);
}
// manzana, pera, plátano, uva

// Con índice y valor
for (let i = 0; i < frutas.length; i++) {
    console.log(`${i}: ${frutas[i]}`);
}
// 0: manzana
// 1: pera
// 2: plátano
// 3: uva

// Recorrer hacia atrás
for (let i = frutas.length - 1; i >= 0; i--) {
    console.log(frutas[i]);
}
// uva, plátano, pera, manzana
```

---

### Casos prácticos

```js
// Sumar números del 1 al 10
let suma = 0;
for (let i = 1; i <= 10; i++) {
    suma += i;
}
console.log(suma); // 55

// Tabla de multiplicar
const numero = 5;
for (let i = 1; i <= 10; i++) {
    console.log(`${numero} x ${i} = ${numero * i}`);
}
// 5 x 1 = 5
// 5 x 2 = 10
// 5 x 3 = 15
// ...

// Números pares del 1 al 20
for (let i = 2; i <= 20; i += 2) {
    console.log(i);
}
// 2, 4, 6, 8, 10, 12, 14, 16, 18, 20

// O con condición
for (let i = 1; i <= 20; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}

// Crear array de cuadrados
const cuadrados = [];
for (let i = 1; i <= 5; i++) {
    cuadrados.push(i ** 2);
}
console.log(cuadrados); // [1, 4, 9, 16, 25]

// Contar vocales en una palabra
const palabra = "javascript";
let contadorVocales = 0;
const vocales = "aeiou";

for (let i = 0; i < palabra.length; i++) {
    if (vocales.includes(palabra[i])) {
        contadorVocales++;
    }
}
console.log(contadorVocales); // 3 (a, a, i)
```

---

### Bucles anidados (bucle dentro de bucle)

```js
// Tabla de multiplicar completa
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        console.log(`${i} x ${j} = ${i * j}`);
    }
}
// 1 x 1 = 1
// 1 x 2 = 2
// 1 x 3 = 3
// 2 x 1 = 2
// 2 x 2 = 4
// 2 x 3 = 6
// 3 x 1 = 3
// 3 x 2 = 6
// 3 x 3 = 9

// Crear matriz (array 2D)
const matriz = [];
for (let i = 0; i < 3; i++) {
    const fila = [];
    for (let j = 0; j < 3; j++) {
        fila.push(i * 3 + j);
    }
    matriz.push(fila);
}
console.log(matriz);
// [[0, 1, 2], [3, 4, 5], [6, 7, 8]]

// Patrón de asteriscos
for (let i = 1; i <= 5; i++) {
    let linea = "";
    for (let j = 1; j <= i; j++) {
        linea += "*";
    }
    console.log(linea);
}
// *
// **
// ***
// ****
// *****
```

---

## 🔄 2. Bucle WHILE

### Sintaxis

```js
while (condición) {
    // Código a repetir
}
```

**Se ejecuta MIENTRAS la condición sea verdadera**

---

### Ejemplos básicos

```js
// Contar del 1 al 5
let i = 1;
while (i <= 5) {
    console.log(i);
    i++;
}
// 1, 2, 3, 4, 5

// ⚠️ CUIDADO: Si olvidas i++, bucle infinito
let j = 1;
while (j <= 5) {
    console.log(j);
    // ❌ Falta j++ → bucle infinito
}

// Contar hacia atrás
let cuenta = 5;
while (cuenta > 0) {
    console.log(cuenta);
    cuenta--;
}
// 5, 4, 3, 2, 1

// Sumar hasta llegar a 100
let total = 0;
let numero = 1;
while (total < 100) {
    total += numero;
    numero++;
}
console.log(`Total: ${total}, Último número: ${numero - 1}`);
// Total: 105, Último número: 14
```

---

### Casos prácticos

```js
// Pedir input hasta que sea válido (simulado)
let respuesta = "";
let intentos = 0;

while (respuesta !== "si" && intentos < 3) {
    // respuesta = prompt("¿Continuar? (si/no)");
    respuesta = "si"; // Simulado
    intentos++;
}

// Generar número aleatorio hasta obtener 5
let aleatorio = 0;
let conteo = 0;
while (aleatorio !== 5) {
    aleatorio = Math.floor(Math.random() * 10);
    conteo++;
}
console.log(`Se necesitaron ${conteo} intentos`);

// Dividir hasta que sea menor que 1
let valor = 1000;
let divisiones = 0;
while (valor >= 1) {
    valor /= 2;
    divisiones++;
}
console.log(`Divisiones: ${divisiones}, Valor final: ${valor}`);
// Divisiones: 10, Valor final: 0.9765625

// Recorrer string
let texto = "Hola";
let index = 0;
while (index < texto.length) {
    console.log(texto[index]);
    index++;
}
// H, o, l, a
```

---

### WHILE vs FOR

```js
// FOR: cuando sabes cuántas iteraciones
for (let i = 0; i < 10; i++) {
    console.log(i);
}

// WHILE: cuando NO sabes cuántas iteraciones
let correcto = false;
while (!correcto) {
    // let respuesta = prompt("Contraseña:");
    // correcto = respuesta === "1234";
    correcto = true; // Simulado
}
```

---

## 🔁 3. Bucle DO...WHILE

### Sintaxis

```js
do {
    // Código a repetir
} while (condición);
```

**Se ejecuta AL MENOS UNA VEZ**, luego verifica la condición

---

### Diferencia con WHILE

```js
// WHILE: puede NO ejecutarse nunca
let i = 10;
while (i < 5) {
    console.log(i); // NO se ejecuta
    i++;
}

// DO...WHILE: se ejecuta AL MENOS UNA VEZ
let j = 10;
do {
    console.log(j); // Se ejecuta 1 vez (imprime 10)
    j++;
} while (j < 5);
```

---

### Ejemplos prácticos

```js
// Menú que se muestra al menos una vez
let opcion;
do {
    console.log("1. Opción A");
    console.log("2. Opción B");
    console.log("3. Salir");
    // opcion = prompt("Elige:");
    opcion = "3"; // Simulado
} while (opcion !== "3");

// Validar input (siempre se pregunta al menos 1 vez)
let numero;
do {
    // numero = parseInt(prompt("Número entre 1 y 10:"));
    numero = 5; // Simulado
} while (numero < 1 || numero > 10);

// Juego de adivinanza
let secreto = 7;
let intento;
let intentos = 0;
do {
    // intento = parseInt(prompt("Adivina (1-10):"));
    intento = 7; // Simulado
    intentos++;
    if (intento < secreto) console.log("Muy bajo");
    if (intento > secreto) console.log("Muy alto");
} while (intento !== secreto);
console.log(`¡Correcto en ${intentos} intentos!`);
```

---

## 🔢 4. Bucle FOR...OF (para iterables)

### Sintaxis

```js
for (const elemento of iterable) {
    // Código
}
```

**Itera sobre VALORES de iterables** (arrays, strings, Set, Map)

---

### Con Arrays

```js
const frutas = ["manzana", "pera", "plátano"];

// ✅ FOR...OF: más simple y legible
for (const fruta of frutas) {
    console.log(fruta);
}
// manzana, pera, plátano

// ❌ FOR tradicional: más verboso
for (let i = 0; i < frutas.length; i++) {
    console.log(frutas[i]);
}

// Con índice (usando entries)
for (const [indice, fruta] of frutas.entries()) {
    console.log(`${indice}: ${fruta}`);
}
// 0: manzana
// 1: pera
// 2: plátano

// Sumar números
const numeros = [10, 20, 30, 40];
let suma = 0;
for (const num of numeros) {
    suma += num;
}
console.log(suma); // 100

// Filtrar elementos
const nums = [1, 2, 3, 4, 5, 6];
const pares = [];
for (const num of nums) {
    if (num % 2 === 0) {
        pares.push(num);
    }
}
console.log(pares); // [2, 4, 6]
```

---

### Con Strings

```js
const palabra = "Hola";

// Iterar caracteres
for (const letra of palabra) {
    console.log(letra);
}
// H, o, l, a

// Contar vocales
const texto = "javascript";
let vocales = 0;
for (const char of texto) {
    if ("aeiou".includes(char)) {
        vocales++;
    }
}
console.log(vocales); // 3

// Invertir string
const original = "Hola";
let invertida = "";
for (const char of original) {
    invertida = char + invertida;
}
console.log(invertida); // "aloH"
```

---

### Con Set

```js
const numeros = new Set([1, 2, 3, 4, 5]);

for (const num of numeros) {
    console.log(num);
}
// 1, 2, 3, 4, 5

// Sumar valores de Set
let total = 0;
for (const valor of numeros) {
    total += valor;
}
console.log(total); // 15
```

---

### Con Map

```js
const mapa = new Map([
    ["nombre", "Ana"],
    ["edad", 25],
    ["ciudad", "Madrid"]
]);

// Iterar pares [clave, valor]
for (const [clave, valor] of mapa) {
    console.log(`${clave}: ${valor}`);
}
// nombre: Ana
// edad: 25
// ciudad: Madrid

// Solo claves
for (const clave of mapa.keys()) {
    console.log(clave);
}
// nombre, edad, ciudad

// Solo valores
for (const valor of mapa.values()) {
    console.log(valor);
}
// Ana, 25, Madrid
```

---

## 🔑 5. Bucle FOR...IN (para objetos)

### Sintaxis

```js
for (const clave in objeto) {
    // Código
}
```

**Itera sobre CLAVES (propiedades) de objetos**

---

### Con Objetos

```js
const persona = {
    nombre: "Ana",
    edad: 25,
    ciudad: "Madrid"
};

// Iterar claves
for (const clave in persona) {
    console.log(clave);
}
// nombre, edad, ciudad

// Iterar claves y valores
for (const clave in persona) {
    console.log(`${clave}: ${persona[clave]}`);
}
// nombre: Ana
// edad: 25
// ciudad: Madrid

// Crear array de claves
const claves = [];
for (const clave in persona) {
    claves.push(clave);
}
console.log(claves); // ["nombre", "edad", "ciudad"]

// Contar propiedades
let contador = 0;
for (const clave in persona) {
    contador++;
}
console.log(contador); // 3

// Filtrar propiedades
const usuario = {
    nombre: "Juan",
    edad: 30,
    activo: true,
    premium: false
};

for (const prop in usuario) {
    if (typeof usuario[prop] === "boolean") {
        console.log(`${prop}: ${usuario[prop]}`);
    }
}
// activo: true
// premium: false
```

---

### ⚠️ FOR...IN con Arrays (NO recomendado)

```js
const frutas = ["manzana", "pera", "plátano"];

// ❌ FOR...IN con arrays (itera índices, no valores)
for (const indice in frutas) {
    console.log(indice); // "0", "1", "2" (strings!)
    console.log(typeof indice); // "string"
}

// ✅ Usa FOR...OF con arrays
for (const fruta of frutas) {
    console.log(fruta); // "manzana", "pera", "plátano"
}
```

---

## 🛑 6. Break y Continue

### BREAK: Salir del bucle

```js
// Buscar número en array
const numeros = [1, 5, 3, 8, 2, 9];
let encontrado = false;

for (const num of numeros) {
    if (num === 8) {
        encontrado = true;
        break; // Sale del bucle inmediatamente
    }
}
console.log(encontrado); // true

// Buscar primera vocal
const texto = "JavaScript";
for (const char of texto) {
    if ("aeiou".includes(char.toLowerCase())) {
        console.log(`Primera vocal: ${char}`);
        break; // No sigue buscando
    }
}
// Primera vocal: a

// Limitar iteraciones
for (let i = 1; i <= 100; i++) {
    console.log(i);
    if (i === 10) {
        break; // Para en 10
    }
}
// Imprime del 1 al 10
```

---

### CONTINUE: Saltar iteración actual

```js
// Imprimir solo números impares
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        continue; // Salta esta iteración
    }
    console.log(i);
}
// 1, 3, 5, 7, 9

// Saltar múltiplos de 3
for (let i = 1; i <= 20; i++) {
    if (i % 3 === 0) {
        continue;
    }
    console.log(i);
}
// 1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20

// Procesar solo strings
const mixto = [1, "hola", true, "mundo", null, "javascript"];
for (const elemento of mixto) {
    if (typeof elemento !== "string") {
        continue; // Salta no-strings
    }
    console.log(elemento.toUpperCase());
}
// HOLA, MUNDO, JAVASCRIPT

// Saltar valores negativos
const nums = [5, -3, 8, -1, 10, -7, 4];
let suma = 0;
for (const num of nums) {
    if (num < 0) {
        continue; // Ignora negativos
    }
    suma += num;
}
console.log(suma); // 27 (5 + 8 + 10 + 4)
```

---

## 📊 7. Comparación de Bucles

|Bucle|Uso Principal|Cuándo Usarlo|
|---|---|---|
|**for**|Contador conocido|Iterar N veces, recorrer arrays por índice|
|**while**|Condición desconocida|Repetir hasta que algo ocurra|
|**do...while**|Al menos 1 iteración|Menús, validaciones|
|**for...of**|Iterar valores|Arrays, strings, Set, Map|
|**for...in**|Iterar claves|Objetos (propiedades)|

---

## 💡 8. Patrones Comunes

### Sumar elementos de array

```js
const numeros = [1, 2, 3, 4, 5];

// Método 1: for tradicional
let suma1 = 0;
for (let i = 0; i < numeros.length; i++) {
    suma1 += numeros[i];
}

// Método 2: for...of
let suma2 = 0;
for (const num of numeros) {
    suma2 += num;
}

// Método 3: reduce (más avanzado)
const suma3 = numeros.reduce((a, b) => a + b, 0);

console.log(suma1, suma2, suma3); // 15, 15, 15
```

---

### Encontrar máximo/mínimo

```js
const numeros = [5, 2, 8, 1, 9, 3];

let max = numeros[0];
let min = numeros[0];

for (const num of numeros) {
    if (num > max) max = num;
    if (num < min) min = num;
}

console.log(`Max: ${max}, Min: ${min}`); // Max: 9, Min: 1

// O con Math
const max2 = Math.max(...numeros);
const min2 = Math.min(...numeros);
```

---

### Crear nuevo array transformado

```js
const numeros = [1, 2, 3, 4, 5];

// Duplicar cada número
const duplicados = [];
for (const num of numeros) {
    duplicados.push(num * 2);
}
console.log(duplicados); // [2, 4, 6, 8, 10]

// O con map
const duplicados2 = numeros.map(n => n * 2);
```

---

### Filtrar elementos

```js
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Solo pares
const pares = [];
for (const num of numeros) {
    if (num % 2 === 0) {
        pares.push(num);
    }
}
console.log(pares); // [2, 4, 6, 8, 10]

// O con filter
const pares2 = numeros.filter(n => n % 2 === 0);
```

---

### Contar ocurrencias

```js
const letras = ["a", "b", "a", "c", "a", "b"];

const contador = {};
for (const letra of letras) {
    if (contador[letra]) {
        contador[letra]++;
    } else {
        contador[letra] = 1;
    }
}
console.log(contador); // {a: 3, b: 2, c: 1}

// O más corto
const contador2 = {};
for (const letra of letras) {
    contador2[letra] = (contador2[letra] || 0) + 1;
}
```

---

### Invertir array

```js
const original = [1, 2, 3, 4, 5];

const invertido = [];
for (let i = original.length - 1; i >= 0; i--) {
    invertido.push(original[i]);
}
console.log(invertido); // [5, 4, 3, 2, 1]

// O con reverse
const invertido2 = [...original].reverse();
```

---

## 🚨 Errores Comunes

### 1. Olvidar incrementar (bucle infinito)

```js
// ❌ Bucle infinito
let i = 0;
while (i < 5) {
    console.log(i);
    // Falta i++
}

// ✅ Correcto
let j = 0;
while (j < 5) {
    console.log(j);
    j++; // ¡No olvidar!
}
```

---

### 2. Condición incorrecta

```js
const arr = [1, 2, 3, 4, 5];

// ❌ Fuera de límites (accede a arr[5] que no existe)
for (let i = 0; i <= arr.length; i++) {
    console.log(arr[i]);
}
// 1, 2, 3, 4, 5, undefined

// ✅ Correcto
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}
```

---

### 3. Modificar array mientras se itera

```js
const nums = [1, 2, 3, 4, 5];

// ❌ Puede causar problemas
for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
        nums.splice(i, 1); // Modifica durante iteración
    }
}

// ✅ Mejor: crear nuevo array
const impares = [];
for (const num of nums) {
    if (num % 2 !== 0) {
        impares.push(num);
    }
}

// O usar filter
const impares2 = nums.filter(n => n % 2 !== 0);
```

---

### 4. Confundir for...of con for...in

```js
const arr = ["a", "b", "c"];

// ❌ for...in devuelve índices (strings)
for (const i in arr) {
    console.log(i); // "0", "1", "2"
    console.log(typeof i); // "string"
}

// ✅ for...of devuelve valores
for (const valor of arr) {
    console.log(valor); // "a", "b", "c"
}
```

---

## 🎯 Resumen Rápido

```js
// FOR: cuando sabes cuántas veces
for (let i = 0; i < 10; i++) { }

// WHILE: cuando NO sabes cuántas veces
while (condicion) { }

// DO...WHILE: al menos 1 vez
do { } while (condicion);

// FOR...OF: iterar valores (arrays, strings, Set, Map)
for (const valor of iterable) { }

// FOR...IN: iterar claves (objetos)
for (const clave in objeto) { }

// BREAK: salir del bucle
if (condicion) break;

// CONTINUE: saltar iteración
if (condicion) continue;
```

---

## 💭 Conclusión

**Elige el bucle según tu necesidad:**

- ✅ **for**: Cuando conoces el número de iteraciones
- ✅ **while**: Cuando la condición es incierta
- ✅ **for...of**: Para iterar valores de arrays/strings
- ✅ **for...in**: Para iterar propiedades de objetos

¡Practica con ejercicios y dominarás los bucles!