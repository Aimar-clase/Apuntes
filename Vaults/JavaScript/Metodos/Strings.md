# 📘 Guía Completa de Strings en JavaScript

## 📌 Conceptos Fundamentales

### ¿Qué es una String?

Una **string** (cadena de texto) es un tipo de dato primitivo que representa una secuencia de caracteres.

```js
let texto = "Hola";
let texto2 = 'Mundo';
let texto3 = `Template literal`;
```

### ⚠️ Inmutabilidad

Las strings son **inmutables**: no puedes modificar caracteres individuales directamente. Los métodos devuelven **nuevas strings** sin modificar la original.

```js
let texto = "Hola";
texto[0] = "h"; // ❌ NO funciona
console.log(texto); // "Hola" (sin cambios)

let nuevo = texto.toLowerCase(); // ✅ Crea nueva string
console.log(nuevo); // "hola"
console.log(texto); // "Hola" (original intacta)
```

---

## 📏 1. Propiedades

### `length`

**Devuelve:** `Number` - Longitud de la cadena  
**Descripción:** Número de caracteres (incluyendo espacios)

```js
let texto = "Hola Mundo";
console.log(texto.length); // 10

let vacio = "";
console.log(vacio.length); // 0

// ⚠️ Emojis pueden contar como 2 caracteres
let emoji = "😀";
console.log(emoji.length); // 2 (no es 1!)
```

---

## 🔍 2. Métodos de Búsqueda

### `includes(valor, inicio)`

**Devuelve:** `Boolean` - true si contiene el valor  
**Parámetros:**

- `valor` (String): lo que buscas
- `inicio` (Number, opcional): índice desde donde buscar

```js
let texto = "JavaScript es genial";
console.log(texto.includes("Java"));      // true
console.log(texto.includes("Python"));    // false
console.log(texto.includes("es", 15));    // false (busca desde índice 15)

// ⚠️ Es case-sensitive
console.log(texto.includes("javascript")); // false
```

---

### `indexOf(valor, inicio)`

**Devuelve:** `Number` - Índice de la primera aparición o -1  
**Parámetros:**

- `valor` (String): lo que buscas
- `inicio` (Number, opcional): desde dónde buscar

```js
let texto = "Hola Hola Mundo";
console.log(texto.indexOf("Hola"));        // 0
console.log(texto.indexOf("Hola", 1));     // 5
console.log(texto.indexOf("Python"));      // -1 (no existe)

// Uso práctico: verificar si existe
if (texto.indexOf("Mundo") !== -1) {
    console.log("Encontrado!");
}
```

---

### `lastIndexOf(valor, inicio)`

**Devuelve:** `Number` - Índice de la última aparición o -1  
**Parámetros:**

- `valor` (String): lo que buscas
- `inicio` (Number, opcional): busca hacia atrás desde este índice

```js
let texto = "Hola Hola Hola";
console.log(texto.lastIndexOf("Hola"));    // 10
console.log(texto.lastIndexOf("Hola", 8)); // 5 (busca hacia atrás desde 8)
```

---

### `startsWith(valor, inicio)` / `endsWith(valor, longitud)`

**Devuelve:** `Boolean` - true si empieza/termina con el valor  
**Parámetros:**

- `startsWith`: inicio opcional (desde qué índice comprobar)
- `endsWith`: longitud opcional (hasta qué posición comprobar)

```js
let archivo = "documento.pdf";
console.log(archivo.startsWith("doc"));         // true
console.log(archivo.startsWith("doc", 5));      // false
console.log(archivo.endsWith(".pdf"));          // true
console.log(archivo.endsWith("mento", 9));      // true (solo hasta índice 9)

// Uso práctico: validar extensiones
let esImagen = archivo.endsWith(".jpg") || archivo.endsWith(".png");
```

---

### `search(regex)`

**Devuelve:** `Number` - Índice de la primera coincidencia o -1  
**Parámetros:** `regex` (RegExp): expresión regular

```js
let texto = "abc123def456";
console.log(texto.search(/\d+/));        // 3 (primer número)
console.log(texto.search(/xyz/));        // -1 (no existe)

// ⚠️ Diferencia con indexOf: search() acepta regex
console.log(texto.search(/\d{3}/));      // 3 (busca 3 dígitos seguidos)
```

---

## ✂️ 3. Métodos de Extracción

### `slice(inicio, fin)`

**Devuelve:** `String` - Porción extraída  
**Parámetros:**

- `inicio` (Number): índice inicial (inclusivo)
- `fin` (Number, opcional): índice final (exclusivo)

```js
let texto = "JavaScript";
console.log(texto.slice(0, 4));    // "Java" (del 0 al 3)
console.log(texto.slice(4));       // "Script" (desde 4 hasta el final)
console.log(texto.slice(-6));      // "Script" (últimos 6 caracteres)
console.log(texto.slice(-6, -2));  // "Scri" (acepta negativos en ambos)

// ⚠️ El índice final NO se incluye
console.log(texto.slice(0, 1));    // "J" (solo el primer carácter)
```

**💡 Regla nemotécnica:** `fin - inicio = longitud del resultado`

---

### `substring(inicio, fin)`

**Devuelve:** `String` - Porción extraída  
**Parámetros:**

- `inicio` (Number): índice inicial
- `fin` (Number, opcional): índice final

```js
let texto = "JavaScript";
console.log(texto.substring(0, 4));   // "Java"
console.log(texto.substring(4, 10));  // "Script"

// ⚠️ Diferencias con slice():
console.log(texto.substring(10, 4));  // "Script" (auto-intercambia)
console.log(texto.slice(10, 4));      // "" (devuelve vacío)

console.log(texto.substring(-3));     // "JavaScript" (negativos = 0)
console.log(texto.slice(-3));         // "ipt" (cuenta desde el final)
```

**🎯 Cuándo usar cada uno:**

- `slice()`: cuando necesitas índices negativos
- `substring()`: cuando los índices pueden estar desordenados

---

### `substr(inicio, longitud)` ⚠️ OBSOLETO

**Devuelve:** `String` - Porción extraída  
**Parámetros:**

- `inicio` (Number): índice inicial
- `longitud` (Number, opcional): cantidad de caracteres

```js
let texto = "JavaScript";
console.log(texto.substr(4, 6));  // "Script"

// ❌ NO usar: está deprecado
// ✅ Usa slice() en su lugar
console.log(texto.slice(4, 10)); // Equivalente
```

---

### `charAt(index)` / `at(index)`

**Devuelve:** `String` - Carácter en esa posición (vacío si no existe)  
**Parámetros:** `index` (Number): posición del carácter

```js
let texto = "JavaScript";
console.log(texto.charAt(0));     // "J"
console.log(texto.charAt(100));   // "" (vacío, no error)

// at() es más moderno y acepta negativos
console.log(texto.at(0));         // "J"
console.log(texto.at(-1));        // "t" (último carácter)
console.log(texto.at(-2));        // "p" (penúltimo)

// También puedes usar notación de array
console.log(texto[0]);            // "J"
console.log(texto[texto.length - 1]); // "t"
```

**💡 Preferencia:** Usa `at()` por su soporte de índices negativos

---

## 🔄 4. Métodos de Transformación

### `toUpperCase()` / `toLowerCase()`

**Devuelve:** `String` - Nueva cadena en mayúsculas/minúsculas  
**Parámetros:** Ninguno

```js
let texto = "HoLa MuNdO";
console.log(texto.toUpperCase());  // "HOLA MUNDO"
console.log(texto.toLowerCase());  // "hola mundo"
console.log(texto);                // "HoLa MuNdO" (original sin cambios)

// Uso práctico: comparaciones sin importar mayúsculas
let usuario = "ADMIN";
if (usuario.toLowerCase() === "admin") {
    console.log("Acceso concedido");
}
```

---

### `trim()` / `trimStart()` / `trimEnd()`

**Devuelve:** `String` - Cadena sin espacios en blanco  
**Parámetros:** Ninguno

```js
let texto = "   Hola Mundo   ";
console.log(texto.trim());       // "Hola Mundo"
console.log(texto.trimStart());  // "Hola Mundo   " (solo inicio)
console.log(texto.trimEnd());    // "   Hola Mundo" (solo final)

// También funciona con tabs y saltos de línea
let sucio = "\n\t  Hola  \t\n";
console.log(sucio.trim());       // "Hola"

// Uso práctico: limpiar input de usuario
let input = "  usuario@email.com  ";
let limpio = input.trim();
```

---

### `replace(patron, reemplazo)`

**Devuelve:** `String` - Nueva cadena con el reemplazo  
**Parámetros:**

- `patron` (String | RegExp): lo que buscas
- `reemplazo` (String | Function): por qué lo reemplazas

```js
let texto = "Hola Mundo Mundo";
console.log(texto.replace("Mundo", "JS"));     // "Hola JS Mundo" (solo 1ª)
console.log(texto.replace(/Mundo/g, "JS"));    // "Hola JS JS" (todas con regex)

// Con función de reemplazo
let precios = "El libro cuesta 20 euros";
let resultado = precios.replace(/\d+/, (match) => match * 2);
console.log(resultado); // "El libro cuesta 40 euros"

// ⚠️ Solo reemplaza la primera coincidencia sin regex
```

---

### `replaceAll(patron, reemplazo)`

**Devuelve:** `String` - Nueva cadena con todos los reemplazos  
**Parámetros:**

- `patron` (String | RegExp): lo que buscas
- `reemplazo` (String | Function): por qué lo reemplazas

```js
let texto = "gato gato gato";
console.log(texto.replaceAll("gato", "perro")); // "perro perro perro"

// Con regex (debe tener flag 'g')
console.log(texto.replaceAll(/gato/g, "perro")); // "perro perro perro"

// ⚠️ Error si usas regex sin 'g'
// texto.replaceAll(/gato/, "perro"); // ❌ TypeError
```

---

### `repeat(veces)`

**Devuelve:** `String` - Cadena repetida N veces  
**Parámetros:** `veces` (Number): número de repeticiones

```js
let texto = "Hi! ";
console.log(texto.repeat(3));   // "Hi! Hi! Hi! "
console.log("=".repeat(20));    // "===================="

// Uso práctico: crear separadores
console.log("=".repeat(50));
console.log("TÍTULO");
console.log("=".repeat(50));

// ⚠️ Si pones 0, devuelve string vacía
console.log("a".repeat(0));     // ""
```

---

### `padStart(longitud, relleno)` / `padEnd(longitud, relleno)`

**Devuelve:** `String` - Cadena rellenada hasta la longitud  
**Parámetros:**

- `longitud` (Number): longitud final deseada
- `relleno` (String, opcional): con qué rellenar (default: espacio)

```js
let numero = "7";
console.log(numero.padStart(3, "0"));  // "007"
console.log(numero.padEnd(3, "0"));    // "700"

let hora = "9";
let minuto = "5";
console.log(`${hora.padStart(2, "0")}:${minuto.padStart(2, "0")}`); // "09:05"

// Si el relleno es largo, se corta
console.log("5".padStart(5, "abc"));   // "abca5" (se corta "abc" a "abca")

// Si la string ya es >= longitud, no hace nada
console.log("12345".padStart(3, "0")); // "12345" (no cambia)
```

---

### `concat(...cadenas)`

**Devuelve:** `String` - Concatenación de todas las cadenas  
**Parámetros:** `...cadenas` (String): cadenas a concatenar

```js
let saludo = "Hola";
let nombre = "Juan";
console.log(saludo.concat(" ", nombre));     // "Hola Juan"
console.log(saludo.concat(", ", nombre, "!")); // "Hola, Juan!"

// ⚠️ Es mejor usar template literals
console.log(`${saludo} ${nombre}`);          // Más legible
console.log(saludo + " " + nombre);          // Más común
```

---

## 🔀 5. Métodos de División y Unión

### `split(separador, limite)`

**Devuelve:** `Array` - Array de strings divididas  
**Parámetros:**

- `separador` (String | RegExp): por dónde dividir
- `limite` (Number, opcional): máximo de elementos en el array

```js
let texto = "manzana,pera,plátano,uva";
console.log(texto.split(","));        // ["manzana","pera","plátano","uva"]
console.log(texto.split(",", 2));     // ["manzana","pera"] (solo 2 primeros)

// Dividir por cada carácter
console.log("Hola".split(""));        // ["H","o","l","a"]

// Dividir por espacio
let frase = "Hola Mundo Cruel";
console.log(frase.split(" "));        // ["Hola","Mundo","Cruel"]

// Con regex
let numeros = "1,2;3|4";
console.log(numeros.split(/[,;|]/));  // ["1","2","3","4"]

// ⚠️ Si no pones separador, devuelve array con toda la string
console.log("Hola".split());          // ["Hola"]
```

---

### `join(separador)` ⚠️ Es método de ARRAY, no de String

**Devuelve:** `String` - Une elementos de array en string  
**Parámetros:** `separador` (String, opcional): qué poner entre elementos

```js
let frutas = ["manzana", "pera", "plátano"];
console.log(frutas.join());           // "manzana,pera,plátano"
console.log(frutas.join(" - "));      // "manzana - pera - plátano"
console.log(frutas.join(""));         // "manzanaperaplátano"

// Uso práctico: split() y join() juntos
let texto = "hola mundo";
let resultado = texto.split(" ").join("-"); // "hola-mundo"

// ⚠️ join() NO es método de String, es de Array
// "hola".join(" "); // ❌ TypeError
```

---

## 🔍 6. Métodos con Expresiones Regulares

### `match(regex)`

**Devuelve:** `Array | null` - Array de coincidencias o null  
**Parámetros:** `regex` (RegExp): patrón a buscar

```js
let texto = "Hola 123 y 456 más 789";

// Sin flag 'g': devuelve array con info detallada
console.log(texto.match(/\d+/));
// ["123", index: 5, input: "Hola 123 y 456 más 789", groups: undefined]

// Con flag 'g': devuelve array simple con todas las coincidencias
console.log(texto.match(/\d+/g));     // ["123", "456", "789"]

// Si no hay coincidencias
console.log(texto.match(/xyz/));      // null

// Uso práctico: extraer todas las palabras
let palabras = "Hola, ¿cómo estás?".match(/\w+/g);
console.log(palabras); // ["Hola", "cómo", "estás"]
```

---

### `matchAll(regex)`

**Devuelve:** `Iterator` - Iterador con todas las coincidencias detalladas  
**Parámetros:** `regex` (RegExp con flag 'g'): patrón a buscar

```js
let texto = "test123demo456";

// ⚠️ La regex DEBE tener flag 'g'
for (const match of texto.matchAll(/(\w+)(\d+)/g)) {
    console.log(match);
    // [0]: coincidencia completa
    // [1]: primer grupo capturado
    // [2]: segundo grupo capturado
}
// Primera iteración: ["test123", "test", "123", ...]
// Segunda iteración: ["demo456", "demo", "456", ...]

// Convertir a array
let matches = [...texto.matchAll(/\d+/g)];
console.log(matches); // Array de objetos match
```

---

## 🔢 7. Métodos de Comparación

### `localeCompare(otraCadena, locales, options)`

**Devuelve:** `Number` - -1 (menor), 0 (igual), 1 (mayor)  
**Parámetros:**

- `otraCadena` (String): cadena a comparar
- `locales` (String, opcional): idioma/región
- `options` (Object, opcional): opciones de comparación

```js
console.log("a".localeCompare("b"));      // -1 (a < b)
console.log("b".localeCompare("a"));      // 1 (b > a)
console.log("a".localeCompare("a"));      // 0 (iguales)

// Respeta orden alfabético del idioma
console.log("ñ".localeCompare("o", "es"));  // -1 (ñ viene después de n)
console.log("ä".localeCompare("z", "de"));  // -1

// Ordenar array con acentos
let nombres = ["Álvaro", "Ana", "Ángel"];
nombres.sort((a, b) => a.localeCompare(b, "es"));
console.log(nombres); // ["Álvaro", "Ana", "Ángel"]

// ⚠️ No uses < > para strings con tildes/caracteres especiales
```

---

## 🔤 8. Métodos de Unicode

### `codePointAt(index)`

**Devuelve:** `Number` - Código Unicode del carácter  
**Parámetros:** `index` (Number): posición del carácter

```js
let texto = "A😀B";
console.log(texto.codePointAt(0));   // 65 (código de 'A')
console.log(texto.codePointAt(1));   // 128512 (emoji)
console.log(texto.codePointAt(3));   // 66 (código de 'B')

// ⚠️ Emojis ocupan 2 posiciones
console.log(texto.length);           // 4 (no 3!)
```

---

### `String.fromCodePoint(...codigos)` (método estático)

**Devuelve:** `String` - Caracteres desde códigos Unicode  
**Parámetros:** `...codigos` (Number): códigos Unicode

```js
console.log(String.fromCodePoint(65));          // "A"
console.log(String.fromCodePoint(128512));      // "😀"
console.log(String.fromCodePoint(65, 66, 67));  // "ABC"

// Uso práctico: generar caracteres especiales
let corazon = String.fromCodePoint(0x2764);     // "❤"
```

---

### `normalize(form)`

**Devuelve:** `String` - Forma normalizada Unicode  
**Parámetros:** `form` (String): "NFC", "NFD", "NFKC", "NFKD"

```js
// Hay 2 formas de representar "é": precompuesto o combinado
let precompuesto = "\u00e9";         // é (un solo carácter)
let combinado = "e\u0301";           // e + ́ (2 caracteres)

console.log(precompuesto === combinado);        // false (diferentes)
console.log(precompuesto.normalize("NFC") === combinado.normalize("NFC")); // true

// Uso práctico: comparar strings con acentos
let str1 = "café"; // puede venir de diferentes fuentes
let str2 = "café"; // con composición diferente
console.log(str1.normalize() === str2.normalize()); // comparación fiable
```

---

## 🔧 9. Métodos de Conversión

### `toString()`

**Devuelve:** `String` - Representación en string  
**Parámetros:** Ninguno

```js
let texto = new String("Hola");
console.log(texto.toString());       // "Hola"
console.log(typeof texto.toString()); // "string"

// Generalmente no necesitas usarlo
let primitivo = "Hola";
console.log(primitivo.toString());   // "Hola" (funciona igual)
```

---

### `valueOf()`

**Devuelve:** `String` - Valor primitivo  
**Parámetros:** Ninguno

```js
let textoObjeto = new String("Hola");
console.log(textoObjeto.valueOf());  // "Hola"
console.log(typeof textoObjeto);     // "object"
console.log(typeof textoObjeto.valueOf()); // "string"

// JavaScript lo usa internamente
console.log(textoObjeto == "Hola");  // true (usa valueOf())
```

---

### `Number.toString(base)` ⚠️ Es método de NUMBER, no de String

**Devuelve:** `String` - Número convertido a string en base N  
**Parámetros:** `base` (Number, 2-36): sistema numérico

```js
let numero = 255;
console.log(numero.toString());      // "255" (decimal)
console.log(numero.toString(2));     // "11111111" (binario)
console.log(numero.toString(8));     // "377" (octal)
console.log(numero.toString(16));    // "ff" (hexadecimal)

// Uso práctico: colores CSS
let red = 255;
let green = 128;
let blue = 0;
let color = `#${red.toString(16)}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
console.log(color); // "#ff8000"
```

---

## 📊 10. Template Literals (Características Modernas)

### Interpolación de variables

```js
let nombre = "Juan";
let edad = 25;
console.log(`Hola, soy ${nombre} y tengo ${edad} años`);

// Expresiones dentro
console.log(`El doble de mi edad es ${edad * 2}`);
```

### Multilínea

```js
let poema = `Roses are red,
Violets are blue,
JavaScript is awesome,
And so are you!`;
console.log(poema);
```

### Tagged Templates (avanzado)

```js
function mayusculas(strings, ...valores) {
    return strings.reduce((result, str, i) => {
        return result + str + (valores[i] || "").toString().toUpperCase();
    }, "");
}

let nombre = "juan";
console.log(mayusculas`Hola ${nombre}, ¿cómo estás?`);
// "Hola JUAN, ¿cómo estás?"
```

---

## 🎯 Resumen de Tipos de Retorno

|Método|Devuelve|
|---|---|
|`length`|`Number`|
|`charAt()`, `at()`, `slice()`, `substring()`, `trim()`, etc.|`String`|
|`includes()`, `startsWith()`, `endsWith()`|`Boolean`|
|`indexOf()`, `lastIndexOf()`, `search()`|`Number` (-1 si no encuentra)|
|`split()`|`Array`|
|`match()`|`Array` o `null`|
|`matchAll()`|`Iterator`|
|`codePointAt()`|`Number`|
|`localeCompare()`|`Number` (-1, 0, 1)|

---

## 💡 Tips y Mejores Prácticas

### 1. Usar `const` para strings que no cambian

```js
const MENSAJE_ERROR = "Usuario no encontrado";
```

### 2. Template literals en lugar de concatenación

```js
// ❌ Evitar
let mensaje = "Hola " + nombre + ", tienes " + edad + " años";

// ✅ Mejor
let mensaje = `Hola ${nombre}, tienes ${edad} años`;
```

### 3. Encadenar métodos

```js
let input = "  HOLA MUNDO  ";
let limpio = input.trim().toLowerCase(); // "hola mundo"
```

### 4. Verificar existencia antes de buscar

```js
// ❌ Menos eficiente
if (texto.indexOf("palabra") !== -1) { }

// ✅ Más legible
if (texto.includes("palabra")) { }
```

### 5. Usar métodos específicos

```js
// ❌ Menos claro
let extension = archivo.slice(archivo.lastIndexOf("."));

// ✅ Más claro
let extension = archivo.split(".").pop();
// O mejor aún para validar
let esValido = archivo.endsWith(".pdf");
```

---

## 🚨 Errores Comunes

### 1. Olvidar que las strings son inmutables

```js
let texto = "hola";
texto.toUpperCase();
console.log(texto); // ❌ Sigue siendo "hola"

let mayusculas = texto.toUpperCase();
console.log(mayusculas); // ✅ "HOLA"
```

### 2. Confundir índices inclusivos/exclusivos

```js
let texto = "JavaScript";
console.log(texto.slice(0, 4)); // "Java" (0-3, no incluye 4)
```

### 3. No validar null/undefined

```js
let texto = null;
// texto.toLowerCase(); // ❌ TypeError

if (texto && texto.toLowerCase) {
    let minusculas = texto.toLowerCase(); // ✅
}
```

### 4. Usar replace() esperando reemplazar todo

```js
let texto = "gato gato gato";
console.log(texto.replace("gato", "perro")); // ❌ Solo reemplaza el primero
console.log(texto.replaceAll("gato", "perro")); // ✅ Reemplaza todos
```

---

## 🔗 Métodos Relacionados con Arrays

Algunos métodos útiles que convierten entre strings y arrays:

```js
// String → Array
"Hola".split("");           // ["H", "o", "l", "a"]
Array.from("Hola");         // ["H", "o", "l", "a"]
[..."Hola"];                // ["H", "o", "l", "a"] (spread operator)

// Array → String
["H", "o", "l", "a"].join(""); // "Hola"
```