# 🔢 Guía Completa de Number en JavaScript

## 📌 Conceptos Fundamentales

### ¿Qué es Number?

**Number** es el tipo de dato numérico en JavaScript. Representa tanto enteros como decimales (punto flotante de 64 bits).

```js
// Todos son tipo Number
const entero = 42;
const decimal = 3.14;
const negativo = -10;
const cientifico = 1e6; // 1,000,000

console.log(typeof entero);   // "number"
console.log(typeof decimal);  // "number"
console.log(typeof negativo); // "number"
```

### 🔑 Características importantes:

- **Un solo tipo numérico:** No hay diferencia entre int, float, double
- **64 bits:** IEEE 754 double-precision
- **Rango seguro:** -2^53 a 2^53
- **Valores especiales:** Infinity, -Infinity, NaN

---

## 🔄 1. Conversión a Number (MUY USADO)

### `Number(valor)`

**Devuelve:** `Number` - Valor convertido a número o NaN  
**Parámetros:** `valor` (any) - valor a convertir  
**Descripción:** Convierte cualquier valor a número

```js
// Strings a números
console.log(Number("123"));      // 123
console.log(Number("3.14"));     // 3.14
console.log(Number("-10"));      // -10
console.log(Number("  42  "));   // 42 (ignora espacios)

// Booleanos
console.log(Number(true));       // 1
console.log(Number(false));      // 0

// null y undefined
console.log(Number(null));       // 0
console.log(Number(undefined));  // NaN

// Strings vacíos o solo espacios
console.log(Number(""));         // 0
console.log(Number("   "));      // 0

// Strings no numéricos
console.log(Number("hola"));     // NaN
console.log(Number("123abc"));   // NaN
console.log(Number("12.34.56")); // NaN

// Objetos y arrays
console.log(Number([]));         // 0 (array vacío)
console.log(Number([5]));        // 5 (array con 1 número)
console.log(Number([1, 2]));     // NaN (array con varios)
console.log(Number({}));         // NaN

// Uso práctico: validar input
function validarEdad(input) {
    const edad = Number(input);
    if (isNaN(edad)) {
        return "Edad inválida";
    }
    return edad;
}

console.log(validarEdad("25"));   // 25
console.log(validarEdad("abc"));  // "Edad inválida"
```

---

### `parseInt(string, base)`

**Devuelve:** `Number` - Entero parseado o NaN  
**Parámetros:**

- `string` (String) - cadena a parsear
- `base` (Number, opcional) - base numérica (2-36), default: 10  
    **Descripción:** Convierte string a entero (ignora decimales)

```js
// Conversión básica
console.log(parseInt("123"));       // 123
console.log(parseInt("3.14"));      // 3 (ignora decimales)
console.log(parseInt("   42   ")); // 42 (ignora espacios)

// Para en el primer carácter no numérico
console.log(parseInt("123abc"));    // 123
console.log(parseInt("12.34.56"));  // 12
console.log(parseInt("abc123"));    // NaN (empieza con letra)

// Con diferentes bases
console.log(parseInt("10", 2));     // 2 (binario)
console.log(parseInt("10", 8));     // 8 (octal)
console.log(parseInt("10", 10));    // 10 (decimal)
console.log(parseInt("10", 16));    // 16 (hexadecimal)
console.log(parseInt("FF", 16));    // 255 (hex a decimal)

// ⚠️ Siempre especifica la base
console.log(parseInt("08"));        // 8 (puede ser confuso)
console.log(parseInt("08", 10));    // 8 (mejor, explícito)

// Casos especiales
console.log(parseInt(""));          // NaN (string vacío)
console.log(parseInt("   "));       // NaN (solo espacios)
console.log(parseInt(null));        // NaN
console.log(parseInt(undefined));   // NaN

// Uso práctico: extraer números de strings
const precio = "Precio: 19.99€";
const numero = parseInt(precio.replace(/[^\d]/g, ""));
console.log(numero); // 1999 (sin decimales)

// Convertir código de color
const hex = "FF5733";
const r = parseInt(hex.slice(0, 2), 16); // 255
const g = parseInt(hex.slice(2, 4), 16); // 87
const b = parseInt(hex.slice(4, 6), 16); // 51
console.log(`rgb(${r}, ${g}, ${b})`); // rgb(255, 87, 51)
```

---

### `parseFloat(string)`

**Devuelve:** `Number` - Número decimal o NaN  
**Parámetros:** `string` (String) - cadena a parsear  
**Descripción:** Convierte string a número decimal

```js
// Conversión básica
console.log(parseFloat("3.14"));      // 3.14
console.log(parseFloat("123"));       // 123
console.log(parseFloat("  3.14  ")); // 3.14

// Para en el primer carácter no numérico
console.log(parseFloat("3.14abc"));   // 3.14
console.log(parseFloat("12.34.56"));  // 12.34 (solo primer decimal)

// Notación científica
console.log(parseFloat("1.5e3"));     // 1500
console.log(parseFloat("3.14e-2"));   // 0.0314

// Casos especiales
console.log(parseFloat(""));          // NaN
console.log(parseFloat("abc"));       // NaN
console.log(parseFloat(null));        // NaN

// Uso práctico: parsear precios
const precioTexto = "19.99€";
const precio = parseFloat(precioTexto);
console.log(precio); // 19.99

// Diferencia con parseInt
console.log(parseInt("3.14"));        // 3 (sin decimales)
console.log(parseFloat("3.14"));      // 3.14 (con decimales)
```

---

## ✅ 2. Validación de Números (MUY USADO)

### `isNaN(valor)`

**Devuelve:** `Boolean` - true si es NaN (después de convertir)  
**Parámetros:** `valor` (any)  
**Descripción:** Verifica si el valor es NaN (convierte primero)

```js
// ⚠️ isNaN convierte el valor primero
console.log(isNaN(NaN));        // true
console.log(isNaN(123));        // false
console.log(isNaN("123"));      // false (convierte "123" a 123)
console.log(isNaN("hola"));     // true (convierte "hola" a NaN)
console.log(isNaN(undefined));  // true (undefined → NaN)
console.log(isNaN({}));         // true ({} → NaN)
console.log(isNaN(true));       // false (true → 1)

// Comportamiento confuso
console.log(isNaN(""));         // false ("" → 0)
console.log(isNaN("   "));      // false ("   " → 0)
console.log(isNaN(null));       // false (null → 0)

// Uso práctico (pero mejor usar Number.isNaN)
function validarNumero(input) {
    if (isNaN(input)) {
        return "No es un número válido";
    }
    return "Número válido";
}
```

---

### `Number.isNaN(valor)` ✅ RECOMENDADO

**Devuelve:** `Boolean` - true si es exactamente NaN  
**Parámetros:** `valor` (any)  
**Descripción:** Verifica si el valor ES NaN (sin convertir)

```js
// ✅ Number.isNaN NO convierte
console.log(Number.isNaN(NaN));        // true
console.log(Number.isNaN(123));        // false
console.log(Number.isNaN("123"));      // false (es string, no NaN)
console.log(Number.isNaN("hola"));     // false (es string, no NaN)
console.log(Number.isNaN(undefined));  // false
console.log(Number.isNaN({}));         // false

// Más predecible que isNaN
console.log(Number.isNaN(""));         // false
console.log(Number.isNaN(null));       // false

// Uso práctico: verificar resultado de operación
function dividir(a, b) {
    const resultado = a / b;
    if (Number.isNaN(resultado)) {
        return "Resultado inválido";
    }
    return resultado;
}

console.log(dividir(10, 2));    // 5
console.log(dividir(10, 0));    // Infinity
console.log(dividir("a", 2));   // "Resultado inválido"
```

---

### `isFinite(valor)`

**Devuelve:** `Boolean` - true si es número finito (después de convertir)  
**Parámetros:** `valor` (any)  
**Descripción:** Verifica si es número finito (no Infinity, no NaN)

```js
// ⚠️ isFinite convierte primero
console.log(isFinite(123));        // true
console.log(isFinite(Infinity));   // false
console.log(isFinite(-Infinity));  // false
console.log(isFinite(NaN));        // false

// Convierte strings
console.log(isFinite("123"));      // true (convierte a 123)
console.log(isFinite("hola"));     // false (convierte a NaN)

// Comportamiento con otros tipos
console.log(isFinite(null));       // true (null → 0)
console.log(isFinite(true));       // true (true → 1)
console.log(isFinite(""));         // true ("" → 0)
```

---

### `Number.isFinite(valor)` ✅ RECOMENDADO

**Devuelve:** `Boolean` - true si es número finito  
**Parámetros:** `valor` (any)  
**Descripción:** Verifica si es número finito (sin convertir)

```js
// ✅ Number.isFinite NO convierte
console.log(Number.isFinite(123));        // true
console.log(Number.isFinite(Infinity));   // false
console.log(Number.isFinite(-Infinity));  // false
console.log(Number.isFinite(NaN));        // false

// NO convierte strings
console.log(Number.isFinite("123"));      // false (es string)
console.log(Number.isFinite(null));       // false
console.log(Number.isFinite(true));       // false

// Uso práctico: validar entrada numérica
function esNumeroValido(valor) {
    return Number.isFinite(valor) && valor > 0;
}

console.log(esNumeroValido(10));       // true
console.log(esNumeroValido("10"));     // false (es string)
console.log(esNumeroValido(Infinity)); // false
console.log(esNumeroValido(-5));       // false (negativo)
```

---

### `Number.isInteger(valor)`

**Devuelve:** `Boolean` - true si es entero  
**Parámetros:** `valor` (any)  
**Descripción:** Verifica si es un número entero

```js
console.log(Number.isInteger(123));      // true
console.log(Number.isInteger(123.0));    // true (sin decimales)
console.log(Number.isInteger(123.45));   // false (tiene decimales)
console.log(Number.isInteger(-10));      // true
console.log(Number.isInteger(0));        // true

// NO convierte
console.log(Number.isInteger("123"));    // false (es string)
console.log(Number.isInteger(true));     // false
console.log(Number.isInteger(null));     // false

// Casos especiales
console.log(Number.isInteger(Infinity)); // false
console.log(Number.isInteger(NaN));      // false

// Uso práctico: validar edad
function validarEdad(edad) {
    if (!Number.isInteger(edad)) {
        return "La edad debe ser un número entero";
    }
    if (edad < 0 || edad > 120) {
        return "Edad fuera de rango";
    }
    return "Edad válida";
}

console.log(validarEdad(25));     // "Edad válida"
console.log(validarEdad(25.5));   // "La edad debe ser un número entero"
console.log(validarEdad("25"));   // "La edad debe ser un número entero"
```

---

## 📊 3. Constantes de Number

### `Number.MAX_VALUE` / `Number.MIN_VALUE`

**Devuelve:** `Number` - Valor máximo/mínimo representable  
**Descripción:** Límites de números en JavaScript

```js
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
console.log(Number.MIN_VALUE); // 5e-324 (más cercano a 0, no el más negativo)

// Valores mayores son Infinity
console.log(Number.MAX_VALUE * 2); // Infinity

// MIN_VALUE es el positivo más pequeño, NO el más negativo
console.log(Number.MIN_VALUE > 0); // true
```

---

### `Number.MAX_SAFE_INTEGER` / `Number.MIN_SAFE_INTEGER`

**Devuelve:** `Number` - Entero seguro máximo/mínimo  
**Descripción:** Rango donde los enteros son precisos

```js
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991 (2^53 - 1)
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

// Fuera de este rango, pierde precisión
console.log(Number.MAX_SAFE_INTEGER + 1); // 9007199254740992 ✅
console.log(Number.MAX_SAFE_INTEGER + 2); // 9007199254740992 ❌ (igual!)

// Uso práctico: verificar si número es seguro
console.log(Number.isSafeInteger(123));                    // true
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // true
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)); // false
```

---

### `Number.POSITIVE_INFINITY` / `Number.NEGATIVE_INFINITY`

**Devuelve:** `Number` - Infinity positivo/negativo  
**Descripción:** Valores infinitos

```js
console.log(Number.POSITIVE_INFINITY); // Infinity
console.log(Number.NEGATIVE_INFINITY); // -Infinity

// Equivalente a
console.log(Infinity);  // Infinity
console.log(-Infinity); // -Infinity

// Operaciones con Infinity
console.log(1 / 0);           // Infinity
console.log(-1 / 0);          // -Infinity
console.log(Infinity + 1);    // Infinity
console.log(Infinity * 2);    // Infinity
console.log(Infinity / 2);    // Infinity
console.log(Infinity - Infinity); // NaN
```

---

### `Number.NaN`

**Devuelve:** `Number` - Not-a-Number  
**Descripción:** Representa un valor que no es un número válido

```js
console.log(Number.NaN); // NaN

// Equivalente a
console.log(NaN); // NaN

// Operaciones que dan NaN
console.log(0 / 0);           // NaN
console.log(Math.sqrt(-1));   // NaN
console.log(parseInt("abc")); // NaN
console.log(undefined + 1);   // NaN

// ⚠️ NaN NO es igual a nada, ni a sí mismo
console.log(NaN === NaN);     // false
console.log(NaN == NaN);      // false

// Usar Number.isNaN para verificar
console.log(Number.isNaN(NaN)); // true
```

---

## 🔧 4. Métodos de Instancia (en números)

### `toFixed(decimales)`

**Devuelve:** `String` - Número formateado con N decimales  
**Parámetros:** `decimales` (Number, 0-100) - cantidad de decimales  
**Descripción:** Redondea y formatea con decimales fijos

```js
const pi = 3.14159;

console.log(pi.toFixed(0));  // "3" (sin decimales)
console.log(pi.toFixed(1));  // "3.1"
console.log(pi.toFixed(2));  // "3.14"
console.log(pi.toFixed(3));  // "3.142" (redondea)
console.log(pi.toFixed(5));  // "3.14159"

// ⚠️ Devuelve STRING, no número
console.log(typeof pi.toFixed(2)); // "string"

// Convertir de vuelta a número
const redondeado = Number(pi.toFixed(2));
console.log(redondeado); // 3.14

// Uso práctico: precios
const precio = 19.9;
console.log(`Precio: ${precio.toFixed(2)}€`); // "Precio: 19.90€"

// Con números grandes
const grande = 1234567.89;
console.log(grande.toFixed(2)); // "1234567.89"

// Casos especiales
console.log((0.1 + 0.2).toFixed(1)); // "0.3" (arregla precisión)
console.log((2.5).toFixed(0));       // "3" (redondea hacia arriba en .5)
console.log((2.4).toFixed(0));       // "2"
```

---

### `toPrecision(precision)`

**Devuelve:** `String` - Número con N dígitos significativos  
**Parámetros:** `precision` (Number, 1-100) - dígitos totales  
**Descripción:** Formatea con precisión específica (total de dígitos)

```js
const num = 123.456;

console.log(num.toPrecision(1));  // "1e+2" (notación científica)
console.log(num.toPrecision(2));  // "1.2e+2"
console.log(num.toPrecision(3));  // "123"
console.log(num.toPrecision(4));  // "123.5"
console.log(num.toPrecision(5));  // "123.46"
console.log(num.toPrecision(6));  // "123.456"

// Diferencia con toFixed
console.log((123.456).toFixed(2));     // "123.46" (2 decimales)
console.log((123.456).toPrecision(5)); // "123.46" (5 dígitos totales)

// Con números pequeños
const pequeño = 0.00123;
console.log(pequeño.toPrecision(3)); // "0.00123" → "0.00123"

// ⚠️ También devuelve string
console.log(typeof num.toPrecision(3)); // "string"
```

---

### `toExponential(decimales)`

**Devuelve:** `String` - Notación científica  
**Parámetros:** `decimales` (Number, opcional) - decimales después de la coma  
**Descripción:** Convierte a notación exponencial (científica)

```js
const num = 123456;

console.log(num.toExponential());    // "1.23456e+5"
console.log(num.toExponential(0));   // "1e+5"
console.log(num.toExponential(2));   // "1.23e+5"
console.log(num.toExponential(4));   // "1.2346e+5"

// Con decimales
const decimal = 0.000123;
console.log(decimal.toExponential());  // "1.23e-4"
console.log(decimal.toExponential(2)); // "1.23e-4"

// Números muy grandes o pequeños
console.log((1234567890).toExponential()); // "1.23456789e+9"
console.log((0.0000001).toExponential());  // "1e-7"
```

---

### `toString(base)`

**Devuelve:** `String` - Número convertido a string en base N  
**Parámetros:** `base` (Number, 2-36) - base numérica, default: 10  
**Descripción:** Convierte número a string en diferentes bases

```js
const num = 255;

console.log(num.toString());     // "255" (base 10)
console.log(num.toString(2));    // "11111111" (binario)
console.log(num.toString(8));    // "377" (octal)
console.log(num.toString(16));   // "ff" (hexadecimal)
console.log(num.toString(36));   // "73" (base 36: 0-9, a-z)

// Convertir de vuelta
console.log(parseInt("11111111", 2));  // 255
console.log(parseInt("ff", 16));       // 255

// Uso práctico: colores CSS
function rgbToHex(r, g, b) {
    return "#" + 
           r.toString(16).padStart(2, "0") +
           g.toString(16).padStart(2, "0") +
           b.toString(16).padStart(2, "0");
}

console.log(rgbToHex(255, 0, 128)); // "#ff0080"

// Con decimales
console.log((3.14).toString());  // "3.14"
console.log((3.14).toString(2)); // "11.001000111101011100001010001111010111000010100011111"
```

---

### `valueOf()`

**Devuelve:** `Number` - Valor primitivo  
**Parámetros:** Ninguno  
**Descripción:** Devuelve el valor numérico primitivo

```js
const num = 42;
console.log(num.valueOf()); // 42

// Usado internamente por JavaScript
const numObj = new Number(42);
console.log(typeof numObj);          // "object"
console.log(typeof numObj.valueOf()); // "number"

// Raramente se usa directamente
console.log(numObj + 10);     // 52 (usa valueOf() automáticamente)
console.log(numObj.valueOf() + 10); // 52 (equivalente)
```

---

## 🎯 5. Casos Prácticos

### Formatear precios

```js
function formatearPrecio(precio) {
    return precio.toFixed(2) + "€";
}

console.log(formatearPrecio(19.9));   // "19.90€"
console.log(formatearPrecio(100));    // "100.00€"
console.log(formatearPrecio(1234.567)); // "1234.57€"

// Con separadores de miles
function formatearPrecioCompleto(precio) {
    return precio.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "€";
}

console.log(formatearPrecioCompleto(1234567.89)); // "1,234,567.89€"
```

---

### Validar entrada numérica

```js
function validarNumero(input) {
    const num = Number(input);
    
    if (Number.isNaN(num)) {
        return {valido: false, error: "No es un número"};
    }
    
    if (!Number.isFinite(num)) {
        return {valido: false, error: "Número infinito"};
    }
    
    return {valido: true, valor: num};
}

console.log(validarNumero("42"));        // {valido: true, valor: 42}
console.log(validarNumero("abc"));       // {valido: false, error: "No es un número"}
console.log(validarNumero(Infinity));    // {valido: false, error: "Número infinito"}
```

---

### Redondear a N decimales

```js
function redondear(numero, decimales) {
    return Number(numero.toFixed(decimales));
}

console.log(redondear(3.14159, 2));  // 3.14
console.log(redondear(10.567, 1));   // 10.6
console.log(redondear(100.999, 0));  // 101

// O con Math.round
function redondearMath(numero, decimales) {
    const factor = 10 ** decimales;
    return Math.round(numero * factor) / factor;
}

console.log(redondearMath(3.14159, 2)); // 3.14
```

---

### Generar número aleatorio en rango

```js
function aleatorioEntre(min, max, decimales = 0) {
    const num = Math.random() * (max - min) + min;
    return Number(num.toFixed(decimales));
}

console.log(aleatorioEntre(1, 10));      // 7 (entero)
console.log(aleatorioEntre(0, 1, 2));    // 0.47 (2 decimales)
console.log(aleatorioEntre(10, 20, 1));  // 15.3 (1 decimal)
```

---

### Validar rango

```js
function estaEnRango(numero, min, max) {
    if (!Number.isFinite(numero)) {
        return false;
    }
    return numero >= min && numero <= max;
}

console.log(estaEnRango(5, 1, 10));      // true
console.log(estaEnRango(15, 1, 10));     // false
console.log(estaEnRango("5", 1, 10));    // false (es string)
console.log(estaEnRango(Infinity, 1, 10)); // false
```

---

## 🚨 Errores Comunes

### 1. Confundir isNaN con Number.isNaN

```js
// ❌ isNaN convierte primero
console.log(isNaN("hola"));        // true (convierte a NaN)
console.log(isNaN("123"));         // false (convierte a 123)

// ✅ Number.isNaN NO convierte
console.log(Number.isNaN("hola")); // false (es string, no NaN)
console.log(Number.isNaN(NaN));    // true
```

---

### 2. Olvidar que toFixed devuelve string

```js
const num = 3.14159;

// ❌ Intenta usar como número
const redondeado = num.toFixed(2);
console.log(redondeado + 10); // "3.1410" (concatenación de strings)

// ✅ Convertir a número
const correcto = Number(num.toFixed(2));
console.log(correcto + 10); // 13.14
```

---

### 3. Precisión de punto flotante

```js
// ❌ Problema conocido
console.log(0.1 + 0.2);           // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);   // false

// ✅ Soluciones
console.log((0.1 + 0.2).toFixed(1));          // "0.3"
console.log(Number((0.1 + 0.2).toFixed(10))); // 0.3
console.log(Math.round((0.1 + 0.2) * 10) / 10); // 0.3
```

---

### 4. parseInt con base incorrecta

```js
// ❌ Sin especificar base
console.log(parseInt("08"));     // 8 (puede ser confuso)
console.log(parseInt("0x10"));   // 16 (detecta hex)

// ✅ Siempre especifica la base
console.log(parseInt("08", 10)); // 8 (decimal explícito)
console.log(parseInt("10", 16)); // 16 (hex explícito)
```

---

## 📊 Tabla Resumen

|Método/Propiedad|Devuelve|Modifica|Uso Principal|
|---|---|---|---|
|`Number()`|Number|-|Convertir a número|
|`parseInt()`|Number|-|String a entero|
|`parseFloat()`|Number|-|String a decimal|
|`Number.isNaN()`|Boolean|-|Verificar NaN|
|`Number.isFinite()`|Boolean|-|Verificar si es finito|
|`Number.isInteger()`|Boolean|-|Verificar entero|
|`toFixed(n)`|String|-|Formatear decimales|
|`toPrecision(n)`|String|-|Precisión total|
|`toString(base)`|String|-|Convertir a string|

---

## 💭 Conclusión

**Number** es fundamental para:

- ✅ Convertir valores a números
- ✅ Validar entradas numéricas
- ✅ Formatear números (precios, decimales)
- ✅ Trabajar con diferentes bases (binario, hex)
- ✅ Verificar tipos y rangos

**Mejores prácticas:**

- Usa `Number.isNaN()` en lugar de `isNaN()`
- Usa `Number.isFinite()` en lugar de `isFinite()`
- Especifica siempre la base en `parseInt()`
- Recuerda que `toFixed()` devuelve string
- Maneja la precisión de punto flotante