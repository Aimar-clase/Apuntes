# 📘 Métodos principales de Strings en JavaScript

  

Las **strings** en JavaScript son inmutables, lo que significa que sus valores no pueden modificarse directamente, pero sí puedes crear nuevas cadenas a partir de ellas.

  

---

  

## 🔹 1. `length`

Devuelve la **longitud** (número de caracteres) de la cadena.

```js

let texto = "Hola";

console.log(texto.length); // 4

```

  

---

  

## 🔹 2. `toUpperCase()`

Convierte todos los caracteres a **mayúsculas**.

```js

let texto = "hola";

console.log(texto.toUpperCase()); // "HOLA"

```

  

---

  

## 🔹 3. `toLowerCase()`

Convierte todos los caracteres a **minúsculas**.

```js

let texto = "HOLA";

console.log(texto.toLowerCase()); // "hola"

```

  

---

  

## 🔹 4. `charAt(index)` / `at(index)`

Devuelve el **carácter** en la posición indicada (`at` acepta índices negativos).

```js

let texto = "JavaScript";

console.log(texto.charAt(4)); // "S"

console.log(texto.at(-1));    // "t"

```

  

---

  

## 🔹 5. `indexOf(valor)` / `lastIndexOf(valor)`

Índice de la **primera** / **última** aparición. `-1` si no existe.

```js

let texto = "Hola Hola";

console.log(texto.indexOf("Hola"));     // 0

console.log(texto.lastIndexOf("Hola")); // 5

```

  

---

  

## 🔹 6. `includes(valor[, desde])`

`true` si la cadena **contiene** el valor.

```js

let texto = "Aprendiendo JavaScript";

console.log(texto.includes("Java"));    // true

console.log(texto.includes("Java", 13)); // false

```

  

---

  

## 🔹 7. `startsWith(valor[, desde])` / `endsWith(valor[, longitud])`

Comprueba si **empieza** / **termina** con el valor.

```js

let texto = "script.js";

console.log(texto.startsWith("script")); // true

console.log(texto.endsWith(".js"));      // true

```

  

---

  

## 🔹 8. `slice(inicio, fin)`

Extrae una **parte** (Pero el ultimo índice no lo incluye por eso en el ejemplo sale java y no JavaS). Acepta índices negativos.

```js

let texto = "JavaScript";

console.log(texto.slice(0, 4));  // "Java"

console.log(texto.slice(-6));    // "Script"

```

  

---

  

## 🔹 9. `substring(inicio, fin)`

Similar a `slice()`, pero **no acepta negativos** y reordena si `inicio hasta fin`.

```js

let texto = "JavaScript";

console.log(texto.substring(4, 10)); // "Script"

console.log(texto.substring(10, 4)); // "Script"

```

  

---

  

## 🔹 10. `replace(valor, nuevoValor)`

Reemplaza la **primera coincidencia** (usa regex `g` para todas).

```js

let texto = "Hola Mundo Mundo";

console.log(texto.replace("Mundo", "JS"));     // "Hola JS Mundo"

console.log(texto.replace(/Mundo/g, "JS"));    // "Hola JS JS"

```

  

---

  

## 🔹 11. `replaceAll(valor, nuevoValor)`

Reemplaza **todas** las coincidencias del literal o regex global.

```js

let texto = "gato gato gato";

console.log(texto.replaceAll("gato", "perro")); // "perro perro perro"

```

  

---

  

## 🔹 12. `trim()` / `trimStart()` / `trimEnd()`

Elimina **espacios en blanco** al inicio/fin.

```js

let texto = "   Hola   ";

console.log(texto.trim());      // "Hola"

console.log(texto.trimStart()); // "Hola   "

console.log(texto.trimEnd());   // "   Hola"

```

  

---

  

## 🔹 13. `split(separador[, límite])`

Divide en **array** por separador.

Esto convierte una String en un array! #Cast

El limite no es un índice sino el numero de cadenas q dará al array por ejemplo si pones de limite 2 y tienes 20 cadenas solo pillara las 2 primeras cadenas al array

```js

let texto = "manzana,pera,plátano";

console.log(texto.split(","));      // ["manzana","pera","plátano"]

console.log(texto.split(",", 2));   // ["manzana","pera"]

```

  

---

  

## 🔹 14. `repeat(veces)`

Repite la cadena N veces.

```js

let texto = "Hi ";

console.log(texto.repeat(3)); // "Hi Hi Hi "

```

  

---

  

## 🔹 15. `concat(...cadenas)`

Concatena cadenas (equivalente a `+`).

```js

let saludo = "Hola";

let nombre = "Juan";

console.log(saludo.concat(" ", nombre)); // "Hola Juan"

```

  

---

  

## 🔹 16. `padStart(longitud, relleno)` / `padEnd(longitud, relleno)`

Rellena al **inicio** / **final** hasta alcanzar la longitud.

```js

let codigo = "7";

console.log(codigo.padStart(3, "0")); // "007"

console.log(codigo.padEnd(3, "0"));   // "700"

```

  

---

  

## 🔹 17. `match(regex)` / `matchAll(regex)`

Busca con **expresión regular**; `matchAll` devuelve un **iterador** con grupos.

```js

let texto = "Hola 123 y 456";

console.log(texto.match(/\d+/g)); // ["123","456"]

  

for (const m of texto.matchAll(/(\d+)/g)) {

  console.log(m[0]); // "123", luego "456"

}

```

  

---

  

## 🔹 18. `search(regex)`

Devuelve el **índice** de la primera coincidencia de regex (o `-1`).

```js

let texto = "abc123def";

console.log(texto.search(/\d+/)); // 3

```

  

---

  

## 🔹 19. `localeCompare(otraCadena[, locale, options])`

Compara según **orden local** (útil con tildes/idiomas).

```js

console.log("a".localeCompare("b"));      // -1

console.log("b".localeCompare("a"));      // 1

console.log("a".localeCompare("a"));      // 0

console.log("ñ".localeCompare("n", "es"));// 1 (depende de la locale)

```

  

---

  

## 🔹 20. `normalize([form])`

Normaliza Unicode (NFC, NFD, NFKC, NFKD).

```js

let conTilde = "a\u0301"; // "a" + combinante

console.log(conTilde.normalize("NFC")); // "á"

```

  

---

  

## 🔹 21. `codePointAt(index)` / `fromCodePoint(...)` (estático en `String`)

Trabaja con **puntos de código** (emoji, caracteres fuera de BMP).

```js

let emoji = "😀";

console.log(emoji.codePointAt(0));          // 128512

console.log(String.fromCodePoint(128512));  // "😀"

```

  

---

  

## 🔹 22. `valueOf()` / `toString()`

Devuelven el **valor primitivo** o representación en texto.

```js

let texto = new String("Hola");

console.log(texto.valueOf()); // "Hola"

console.log(texto.toString()); // "Hola"

```

  

---

  

## 🔹 23. (Obsoleto) `substr(inicio, longitud)`

Evítalo; usa `slice()` o `substring()`.

```js

let texto = "JavaScript";

console.log(texto.substr(4, 6)); // "Script"

```

  

---

## 🔹 24. `join()`

El método **`join()`** se utiliza en **arrays** para **unir todos sus elementos en una sola cadena de texto (`string`)**.


```js

let frutas = ["manzana", "pera", "plátano"];

let texto = frutas.join();

console.log(texto); // "manzana,pera,plátano"

```

  

#### Ejemplo 2: Con separador personalizado

```js

let frutas = ["manzana", "pera", "plátano"];

let texto = frutas.join(" - ");

console.log(texto); // "manzana - pera - plátano"

```

  

#### Ejemplo 3: Sin separador

```js

let letras = ["C", "A", "S", "A"];

let palabra = letras.join("");

console.log(palabra); // "CASA"

```

  

#### Ejemplo 4: Con salto de línea

```js

let escalera = ["C", "CA", "CAS", "CASA"];

console.log(escalera.join("\n"));

```
  

---

## 🔢 Método `toString(base)`

  

El método **`toString()`** se usa para **convertir un número en una cadena de texto**, y opcionalmente, se puede indicar una **base numérica** (sistema de numeración).

  

### 🔹 Sintaxis

```js

numero.toString(base)

```

  

- **`base`** *(opcional)* → indica el sistema numérico al que se convierte:

  - `2` → Binario  

  - `8` → Octal  

  - `10` → Decimal (por defecto)  

  - `16` → Hexadecimal  

  

---

  

### 🔹 Ejemplos

  

#### Ejemplo 1: Conversión a diferentes bases

```js

let numero = 1234;

  

console.log(numero.toString(2));  // "10011010010" (binario)

console.log(numero.toString(8));  // "2322" (octal)

console.log(numero.toString(10)); // "1234" (decimal)

console.log(numero.toString(16)); // "4d2" (hexadecimal)

```

  

#### Ejemplo 2: De número a string

```js

let numero = 255;

let texto = numero.toString();

console.log(typeof texto); // "string"

```

  

#### Ejemplo 3: Uso práctico

```js

let color = 255;

let colorHex = "#" + color.toString(16).padStart(2, "0");

console.log(colorHex); // "#ff"

```

Aquí se convierte un número decimal a su representación **hexadecimal**, útil en colores CSS (`#ff0000`).