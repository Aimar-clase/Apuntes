# 🔢 Guía Completa de Math en JavaScript

## 📌 Conceptos Fundamentales

### ¿Qué es Math?

**Math** es un objeto incorporado en JavaScript que proporciona **propiedades y métodos matemáticos**. A diferencia de otros objetos, **Math no es un constructor**, por lo que todos sus métodos y propiedades son **estáticos**.

```js
// ✅ Correcto: usar directamente
console.log(Math.PI);
console.log(Math.sqrt(16));

// ❌ Incorrecto: NO puedes instanciarlo
// const miMath = new Math(); // Error
```

### 🔑 Características importantes:

- **Estático:** Todos los métodos se llaman como `Math.metodo()`
- **No modifica valores:** Siempre devuelve nuevos resultados
- **Trabaja con Number:** Opera sobre números JavaScript

---

## 📏 1. Constantes Matemáticas

### `Math.PI`

**Devuelve:** `Number` - 3.141592653589793  
**Descripción:** El número π (pi), relación entre circunferencia y diámetro

```js
console.log(Math.PI); // 3.141592653589793

// Calcular circunferencia de un círculo
const radio = 5;
const circunferencia = 2 * Math.PI * radio;
console.log(circunferencia); // 31.41592653589793

// Calcular área de un círculo
const area = Math.PI * radio ** 2;
console.log(area); // 78.53981633974483

// Convertir grados a radianes
function gradosARadianes(grados) {
    return grados * (Math.PI / 180);
}

console.log(gradosARadianes(90));  // 1.5707963267948966
console.log(gradosARadianes(180)); // 3.141592653589793
```

---

### `Math.E`

**Devuelve:** `Number` - 2.718281828459045  
**Descripción:** La constante de Euler, base de logaritmos naturales

```js
console.log(Math.E); // 2.718281828459045

// Crecimiento exponencial
function crecimientoExponencial(valorInicial, tasa, tiempo) {
    return valorInicial * Math.E ** (tasa * tiempo);
}

console.log(crecimientoExponencial(100, 0.05, 10)); // ~164.87
```

---

### `Math.LN2` / `Math.LN10`

**Devuelve:** `Number` - Logaritmo natural de 2 y 10  
**Descripción:** ln(2) ≈ 0.693 y ln(10) ≈ 2.303

```js
console.log(Math.LN2);  // 0.6931471805599453
console.log(Math.LN10); // 2.302585092994046

// Útiles para conversiones de logaritmos
```

---

### `Math.LOG2E` / `Math.LOG10E`

**Devuelve:** `Number` - Logaritmo de E en base 2 y 10  
**Descripción:** log₂(e) ≈ 1.443 y log₁₀(e) ≈ 0.434

```js
console.log(Math.LOG2E);  // 1.4426950408889634
console.log(Math.LOG10E); // 0.4342944819032518
```

---

### `Math.SQRT1_2` / `Math.SQRT2`

**Devuelve:** `Number` - Raíz cuadrada de 1/2 y 2  
**Descripción:** √(1/2) ≈ 0.707 y √2 ≈ 1.414

```js
console.log(Math.SQRT1_2); // 0.7071067811865476
console.log(Math.SQRT2);   // 1.4142135623730951
```

---

## 🔢 2. Métodos de Redondeo (MUY USADOS)

### `Math.round(x)`

**Devuelve:** `Number` - Entero más cercano  
**Parámetros:** `x` (Number) - número a redondear  
**Descripción:** Redondea al entero más cercano (.5 redondea hacia arriba)

```js
console.log(Math.round(4.3));  // 4
console.log(Math.round(4.5));  // 5
console.log(Math.round(4.7));  // 5
console.log(Math.round(-4.3)); // -4
console.log(Math.round(-4.5)); // -4 (hacia arriba en valor absoluto)
console.log(Math.round(-4.7)); // -5

// Redondear a N decimales
function redondearA(numero, decimales) {
    const factor = 10 ** decimales;
    return Math.round(numero * factor) / factor;
}

console.log(redondearA(3.14159, 2));  // 3.14
console.log(redondearA(3.14159, 3));  // 3.142
console.log(redondearA(3.14159, 0));  // 3

// Uso práctico: precios
const precio = 19.556;
const precioFinal = Math.round(precio * 100) / 100;
console.log(precioFinal); // 19.56
```

---

### `Math.floor(x)`

**Devuelve:** `Number` - Entero menor o igual  
**Parámetros:** `x` (Number)  
**Descripción:** Redondea hacia abajo (hacia -∞)

```js
console.log(Math.floor(4.9));  // 4
console.log(Math.floor(4.1));  // 4
console.log(Math.floor(4.0));  // 4
console.log(Math.floor(-4.1)); // -5 (hacia abajo)
console.log(Math.floor(-4.9)); // -5

// Uso práctico: obtener parte entera
const decimal = 3.14159;
const parteEntera = Math.floor(decimal);
console.log(parteEntera); // 3

// Índice de página (paginación)
function calcularPagina(elemento, elementosPorPagina) {
    return Math.floor(elemento / elementosPorPagina) + 1;
}

console.log(calcularPagina(15, 10)); // Página 2
console.log(calcularPagina(25, 10)); // Página 3

// División entera
function divisionEntera(a, b) {
    return Math.floor(a / b);
}

console.log(divisionEntera(17, 5)); // 3
```

---

### `Math.ceil(x)`

**Devuelve:** `Number` - Entero mayor o igual  
**Parámetros:** `x` (Number)  
**Descripción:** Redondea hacia arriba (hacia +∞)

```js
console.log(Math.ceil(4.1));  // 5
console.log(Math.ceil(4.9));  // 5
console.log(Math.ceil(4.0));  // 4
console.log(Math.ceil(-4.1)); // -4 (hacia arriba)
console.log(Math.ceil(-4.9)); // -4

// Uso práctico: calcular número de páginas
function calcularTotalPaginas(totalElementos, elementosPorPagina) {
    return Math.ceil(totalElementos / elementosPorPagina);
}

console.log(calcularTotalPaginas(95, 10));  // 10 páginas
console.log(calcularTotalPaginas(100, 10)); // 10 páginas
console.log(calcularTotalPaginas(101, 10)); // 11 páginas

// Calcular capacidad necesaria
function calcularCajas(productos, capacidadPorCaja) {
    return Math.ceil(productos / capacidadPorCaja);
}

console.log(calcularCajas(47, 12)); // 4 cajas necesarias
```

---

### `Math.trunc(x)`

**Devuelve:** `Number` - Parte entera (sin decimales)  
**Parámetros:** `x` (Number)  
**Descripción:** Elimina la parte decimal (trunca hacia 0)

```js
console.log(Math.trunc(4.9));  // 4
console.log(Math.trunc(4.1));  // 4
console.log(Math.trunc(-4.9)); // -4 (trunca hacia 0)
console.log(Math.trunc(-4.1)); // -4

// Diferencia con floor
console.log(Math.floor(-4.9));  // -5 (hacia -∞)
console.log(Math.trunc(-4.9));  // -4 (hacia 0)

// Uso práctico: obtener parte entera simple
const numero = 123.456;
const entero = Math.trunc(numero);
const decimal = numero - entero;

console.log(entero);  // 123
console.log(decimal); // 0.45600000000000307

// Convertir a entero
function aEntero(x) {
    return Math.trunc(x);
}

console.log(aEntero(3.14));  // 3
console.log(aEntero(-3.14)); // -3
```

---

## 🎲 3. Números Aleatorios (MUY USADO)

### `Math.random()`

**Devuelve:** `Number` - Número aleatorio entre 0 (inclusivo) y 1 (exclusivo)  
**Parámetros:** Ninguno  
**Descripción:** Genera número pseudoaleatorio: [0, 1)

```js
console.log(Math.random()); // 0.547382...
console.log(Math.random()); // 0.891234...
console.log(Math.random()); // 0.123456...

// Número aleatorio entre 0 y N (exclusivo)
function aleatorioHasta(max) {
    return Math.random() * max;
}

console.log(aleatorioHasta(10));  // 0 a 9.999...
console.log(aleatorioHasta(100)); // 0 a 99.999...

// Entero aleatorio entre 0 y N-1
function enteroAleatorio(max) {
    return Math.floor(Math.random() * max);
}

console.log(enteroAleatorio(10));  // 0 a 9
console.log(enteroAleatorio(100)); // 0 a 99

// Entero aleatorio entre min y max (inclusivo)
function aleatorioEntre(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(aleatorioEntre(1, 6));    // Dado (1-6)
console.log(aleatorioEntre(10, 20));  // 10-20
console.log(aleatorioEntre(100, 200)); // 100-200

// Decimal aleatorio entre min y max
function decimalAleatorio(min, max, decimales = 2) {
    const num = Math.random() * (max - min) + min;
    return Number(num.toFixed(decimales));
}

console.log(decimalAleatorio(1.5, 5.5));    // 1.5-5.5
console.log(decimalAleatorio(0, 1, 4));     // 0.0000-1.0000

// Elemento aleatorio de array
function elementoAleatorio(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const colores = ["rojo", "verde", "azul", "amarillo"];
console.log(elementoAleatorio(colores)); // Color aleatorio

// Booleano aleatorio
function booleanoAleatorio() {
    return Math.random() < 0.5;
}

console.log(booleanoAleatorio()); // true o false (50% cada uno)

// Con probabilidad personalizada (30% true, 70% false)
function conProbabilidad(probabilidad) {
    return Math.random() < probabilidad;
}

console.log(conProbabilidad(0.3)); // 30% de ser true

// Mezclar array (shuffle)
function mezclar(array) {
    const resultado = [...array];
    for (let i = resultado.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [resultado[i], resultado[j]] = [resultado[j], resultado[i]];
    }
    return resultado;
}

console.log(mezclar([1, 2, 3, 4, 5])); // Orden aleatorio

// Color hexadecimal aleatorio
function colorAleatorio() {
    const hex = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + hex.padStart(6, "0");
}

console.log(colorAleatorio()); // #a3f2b1
```

---

## 📐 4. Funciones de Potencia y Raíz

### `Math.pow(base, exponente)`

**Devuelve:** `Number` - base elevada a exponente  
**Parámetros:**

- `base` (Number)
- `exponente` (Number)  
    **Descripción:** Calcula base^exponente

```js
console.log(Math.pow(2, 3));   // 8 (2³)
console.log(Math.pow(5, 2));   // 25 (5²)
console.log(Math.pow(10, -2)); // 0.01 (10⁻²)
console.log(Math.pow(4, 0.5)); // 2 (√4)
console.log(Math.pow(8, 1/3)); // 2 (∛8)

// ✅ Mejor usar operador ** (más moderno)
console.log(2 ** 3);   // 8
console.log(5 ** 2);   // 25
console.log(10 ** -2); // 0.01

// Uso práctico: interés compuesto
function interesCompuesto(capital, tasa, años) {
    return capital * Math.pow(1 + tasa, años);
}

console.log(interesCompuesto(1000, 0.05, 10)); // ~1628.89

// Crecimiento exponencial
function poblacion(inicial, tasa, tiempo) {
    return inicial * Math.pow(Math.E, tasa * tiempo);
}

console.log(poblacion(1000, 0.02, 5)); // ~1105.17
```

---

### `Math.sqrt(x)`

**Devuelve:** `Number` - Raíz cuadrada  
**Parámetros:** `x` (Number) - debe ser ≥ 0  
**Descripción:** Calcula √x

```js
console.log(Math.sqrt(4));   // 2
console.log(Math.sqrt(9));   // 3
console.log(Math.sqrt(16));  // 4
console.log(Math.sqrt(2));   // 1.4142135623730951
console.log(Math.sqrt(0));   // 0
console.log(Math.sqrt(-1));  // NaN (no existe en reales)

// Uso práctico: distancia entre dos puntos
function distancia(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

console.log(distancia(0, 0, 3, 4)); // 5 (triángulo 3-4-5)
console.log(distancia(1, 1, 4, 5)); // 5

// Hipotenusa
function hipotenusa(a, b) {
    return Math.sqrt(a ** 2 + b ** 2);
}

console.log(hipotenusa(3, 4)); // 5

// Magnitud de un vector
function magnitudVector(x, y, z = 0) {
    return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
}

console.log(magnitudVector(3, 4));    // 5
console.log(magnitudVector(1, 1, 1)); // 1.732...
```

---

### `Math.cbrt(x)`

**Devuelve:** `Number` - Raíz cúbica  
**Parámetros:** `x` (Number)  
**Descripción:** Calcula ∛x

```js
console.log(Math.cbrt(8));    // 2
console.log(Math.cbrt(27));   // 3
console.log(Math.cbrt(-8));   // -2 (funciona con negativos)
console.log(Math.cbrt(64));   // 4
console.log(Math.cbrt(0));    // 0

// Volumen a lado del cubo
function ladoCubo(volumen) {
    return Math.cbrt(volumen);
}

console.log(ladoCubo(27));  // 3
console.log(ladoCubo(125)); // 5
```

---

### `Math.hypot(...valores)`

**Devuelve:** `Number` - Raíz cuadrada de la suma de cuadrados  
**Parámetros:** N números  
**Descripción:** Calcula √(a² + b² + c² + ...)

```js
console.log(Math.hypot(3, 4));       // 5
console.log(Math.hypot(5, 12));      // 13
console.log(Math.hypot(1, 2, 2));    // 3
console.log(Math.hypot(3, 4, 5));    // 7.071...

// Equivalente a:
// Math.sqrt(3**2 + 4**2 + 5**2)

// Distancia 2D
function distancia2D(x1, y1, x2, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
}

console.log(distancia2D(0, 0, 3, 4)); // 5

// Distancia 3D
function distancia3D(x1, y1, z1, x2, y2, z2) {
    return Math.hypot(x2 - x1, y2 - y1, z2 - z1);
}

console.log(distancia3D(0, 0, 0, 1, 1, 1)); // 1.732...

// Magnitud de vector (más simple que sqrt)
const vector = [3, 4, 5];
const magnitud = Math.hypot(...vector);
console.log(magnitud); // 7.071...
```

---

## 🔄 5. Funciones de Valor Absoluto y Signo

### `Math.abs(x)`

**Devuelve:** `Number` - Valor absoluto  
**Parámetros:** `x` (Number)  
**Descripción:** Devuelve |x| (siempre positivo o 0)

```js
console.log(Math.abs(5));    // 5
console.log(Math.abs(-5));   // 5
console.log(Math.abs(0));    // 0
console.log(Math.abs(-3.14)); // 3.14

// Uso práctico: diferencia absoluta
function diferencia(a, b) {
    return Math.abs(a - b);
}

console.log(diferencia(10, 3));  // 7
console.log(diferencia(3, 10));  // 7

// Distancia en 1D
function distancia1D(x1, x2) {
    return Math.abs(x2 - x1);
}

console.log(distancia1D(-5, 10)); // 15

// Verificar si están cerca (tolerancia)
function estanCerca(a, b, tolerancia = 0.01) {
    return Math.abs(a - b) < tolerancia;
}

console.log(estanCerca(3.14, 3.145));   // true
console.log(estanCerca(3.14, 3.2));     // false
```

---

### `Math.sign(x)`

**Devuelve:** `Number` - 1, -1, 0, o NaN  
**Parámetros:** `x` (Number)  
**Descripción:** Indica el signo del número

```js
console.log(Math.sign(5));    // 1 (positivo)
console.log(Math.sign(-5));   // -1 (negativo)
console.log(Math.sign(0));    // 0
console.log(Math.sign(-0));   // -0
console.log(Math.sign(NaN));  // NaN

// Uso práctico: determinar dirección
function direccion(delta) {
    const signo = Math.sign(delta);
    if (signo === 1) return "derecha";
    if (signo === -1) return "izquierda";
    return "quieto";
}

console.log(direccion(5));   // "derecha"
console.log(direccion(-3));  // "izquierda"
console.log(direccion(0));   // "quieto"

// Multiplicar por signo de otro número
function copiarSigno(numero, fuente) {
    return Math.abs(numero) * Math.sign(fuente);
}

console.log(copiarSigno(5, -1));  // -5
console.log(copiarSigno(-5, 1));  // 5
```

---

## 📊 6. Funciones de Comparación (MUY USADAS)

### `Math.max(...valores)`

**Devuelve:** `Number` - El valor máximo  
**Parámetros:** N números  
**Descripción:** Devuelve el mayor de los números

```js
console.log(Math.max(1, 2, 3));        // 3
console.log(Math.max(10, 5, 8, 12));   // 12
console.log(Math.max(-1, -5, -3));     // -1
console.log(Math.max());               // -Infinity (sin argumentos)

// Con array (usando spread)
const numeros = [5, 2, 8, 1, 9];
console.log(Math.max(...numeros)); // 9

// Encontrar máximo en array de objetos
const productos = [
    {nombre: "A", precio: 100},
    {nombre: "B", precio: 150},
    {nombre: "C", precio: 80}
];

const precioMax = Math.max(...productos.map(p => p.precio));
console.log(precioMax); // 150

// Limitar valor (clamp máximo)
function noMayorQue(valor, maximo) {
    return Math.min(valor, maximo);
}

console.log(noMayorQue(15, 10)); // 10
console.log(noMayorQue(5, 10));  // 5

// Normalizar valores a rango 0-1
function normalizar(array) {
    const max = Math.max(...array);
    return array.map(x => x / max);
}

console.log(normalizar([10, 20, 30])); // [0.333, 0.666, 1]
```

---

### `Math.min(...valores)`

**Devuelve:** `Number` - El valor mínimo  
**Parámetros:** N números  
**Descripción:** Devuelve el menor de los números

```js
console.log(Math.min(1, 2, 3));        // 1
console.log(Math.min(10, 5, 8, 12));   // 5
console.log(Math.min(-1, -5, -3));     // -5
console.log(Math.min());               // Infinity (sin argumentos)

// Con array
const numeros = [5, 2, 8, 1, 9];
console.log(Math.min(...numeros)); // 1

// Limitar valor (clamp mínimo)
function noMenorQue(valor, minimo) {
    return Math.max(valor, minimo);
}

console.log(noMenorQue(5, 10));  // 10
console.log(noMenorQue(15, 10)); // 15

// Clamp completo (limitar entre min y max)
function clamp(valor, min, max) {
    return Math.min(Math.max(valor, min), max);
}

console.log(clamp(5, 0, 10));   // 5
console.log(clamp(-5, 0, 10));  // 0
console.log(clamp(15, 0, 10));  // 10

// Encontrar rango (min y max)
function rango(array) {
    return {
        min: Math.min(...array),
        max: Math.max(...array)
    };
}

console.log(rango([5, 2, 8, 1, 9])); // {min: 1, max: 9}
```

---

## 📐 7. Funciones Trigonométricas

### `Math.sin(x)` / `Math.cos(x)` / `Math.tan(x)`

**Devuelve:** `Number` - Seno, coseno, tangente  
**Parámetros:** `x` (Number) - ángulo en **radianes**  
**Descripción:** Funciones trigonométricas básicas

```js
// ⚠️ IMPORTANTE: trabajan en RADIANES, no grados
console.log(Math.sin(0));              // 0
console.log(Math.sin(Math.PI / 2));    // 1
console.log(Math.cos(0));              // 1
console.log(Math.cos(Math.PI));        // -1
console.log(Math.tan(0));              // 0
console.log(Math.tan(Math.PI / 4));    // 1

// Convertir grados a radianes
function gradosARadianes(grados) {
    return grados * (Math.PI / 180);
}

console.log(Math.sin(gradosARadianes(30)));  // 0.5
console.log(Math.sin(gradosARadianes(90)));  // 1
console.log(Math.cos(gradosARadianes(60)));  // 0.5
console.log(Math.tan(gradosARadianes(45)));  // 1

// Uso práctico: movimiento circular
function posicionCircular(angulo, radio) {
    return {
        x: Math.cos(angulo) * radio,
        y: Math.sin(angulo) * radio
    };
}

console.log(posicionCircular(0, 10));           // {x: 10, y: 0}
console.log(posicionCircular(Math.PI / 2, 10)); // {x: 0, y: 10}

// Animación de onda
function onda(tiempo, amplitud, frecuencia) {
    return Math.sin(tiempo * frecuencia) * amplitud;
}

console.log(onda(0, 10, 1));    // 0
console.log(onda(1, 10, 1));    // 8.41...
```

---

### `Math.asin(x)` / `Math.acos(x)` / `Math.atan(x)` / `Math.atan2(y, x)`

**Devuelve:** `Number` - Arcoseno, arcocoseno, arcotangente (en radianes)  
**Parámetros:** `x` (Number) entre -1 y 1 (para asin/acos)  
**Descripción:** Funciones trigonométricas inversas

```js
console.log(Math.asin(0.5));   // 0.523... (30°)
console.log(Math.acos(0.5));   // 1.047... (60°)
console.log(Math.atan(1));     // 0.785... (45°)

// Convertir radianes a grados
function radianesAGrados(radianes) {
    return radianes * (180 / Math.PI);
}

console.log(radianesAGrados(Math.asin(0.5))); // 30°

// atan2: calcula ángulo entre dos puntos
// Ventaja: maneja todos los cuadrantes correctamente
function anguloEntre(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
}

console.log(radianesAGrados(anguloEntre(0, 0, 1, 1)));  // 45°
console.log(radianesAGrados(anguloEntre(0, 0, -1, 1))); // 135°
```

---

## 📈 8. Funciones Logarítmicas y Exponenciales

### `Math.exp(x)`

**Devuelve:** `Number` - e^x  
**Parámetros:** `x` (Number)  
**Descripción:** Calcula e elevado a x

```js
console.log(Math.exp(0));  // 1
console.log(Math.exp(1));  // 2.718... (e)
console.log(Math.exp(2));  // 7.389...
console.log(Math.exp(-1)); // 0.367...

// Equivalente a Math.E ** x
console.log(Math.E ** 2);  // 7.389...

// Crecimiento exponencial natural
function crecimiento(inicial, tasa, tiempo) {
    return inicial * Math.exp(tasa * tiempo);
}

console.log(crecimiento(100, 0.05, 10)); // ~164.87
```

---

### `Math.log(x)` / `Math.log10(x)` / `Math.log2(x)`

**Devuelve:** `Number` - Logaritmo  
**Parámetros:** `x` (Number) - debe ser > 0  
**Descripción:** ln(x), log₁₀(x), log₂(x)

```js
// Logaritmo natural (base e)
console.log(Math.log(1));      // 0
console.log(Math.log(Math.E)); // 1
console.log(Math.log(10));     // 2.302...

// Logaritmo base 10
console.log(Math.log10(1));     // 0
console.log(Math.log10(10));    // 1
console.log(Math.log10(100));   // 2
console.log(Math.log10(1000));  // 3

// Logaritmo base 2
console.log(Math.log2(1));    // 0
console.log(Math.log2(2));    // 1
console.log(Math.log2(4));    // 2
console.log(Math.log2(8));    // 3
console.log(Math.log2(1024)); // 10

// Logaritmo en cualquier base
function logBase(x, base) {
    return Math.log(x) / Math.log(base);
}

console.log(logBase(8, 2));    // 3 (log₂(8))
console.log(logBase(1000, 10)); // 3 (log₁₀(1000))

// Uso práctico: tiempo de duplicación
function tiempoDuplicacion(tasa) {
    return Math.log(2) / Math.log(1 + tasa);
}

console.log(tiempoDuplicacion(0.07)); // ~10.24 años al 7%

// Número de bits necesarios
function bitsNecesarios(n) {
    return Math.ceil(Math.log2(n + 1));
}

console.log(bitsNecesarios(7));   // 3 bits
console.log(bitsNecesarios(255)); // 8 bits
```

---

### `Math.log1p(x)`

**Devuelve:** `Number` - ln(1 + x)  
**Parámetros:** `x` (Number)  
**Descripción:** Más preciso que Math.log(1 + x) para valores pequeños

```js
console.log(Math.log1p(0));     // 0
console.log(Math.log1p(1));     // 0.693...
console.log(Math.log1p(0.001)); // 0.0009995...

// Más preciso que:
console.log(Math.log(1 + 0.001)); // 0.0009995... (puede perder precisión)

// Uso práctico: calcular tasas de crecimiento
function tasaCrecimiento(valorInicial, valorFinal) {
    return Math.log1p((valorFinal - valorInicial) / valorInicial);
}
```

---

### `Math.expm1(x)`

**Devuelve:** `Number` - e^x - 1  
**Parámetros:** `x` (Number)  
**Descripción:** Más preciso que Math.exp(x) - 1 para valores pequeños

```js
console.log(Math.expm1(0));     // 0
console.log(Math.expm1(1));     // 1.718...
console.log(Math.expm1(0.001)); // 0.001...

// Más preciso que:
console.log(Math.exp(0.001) - 1); // Similar pero menos preciso
```

---

## 🔧 9. Funciones Avanzadas

### `Math.fround(x)`

**Devuelve:** `Number` - Representación en float32  
**Parámetros:** `x` (Number)  
**Descripción:** Redondea a precisión de 32 bits

```js
console.log(Math.fround(1.5));     // 1.5
console.log(Math.fround(1.337));   // 1.3370000123977661
console.log(Math.fround(1.5) === 1.5); // true

// Útil para compatibilidad con otros lenguajes
```

---

### `Math.imul(a, b)`

**Devuelve:** `Number` - Multiplicación entera de 32 bits  
**Parámetros:** `a` (Number), `b` (Number)  
**Descripción:** Multiplicación como enteros de 32 bits con signo

```js
console.log(Math.imul(2, 4));          // 8
console.log(Math.imul(-1, 8));         // -8
console.log(Math.imul(0xffffffff, 5)); // -5

// Para operaciones bit a bit optimizadas
```

---

### `Math.clz32(x)`

**Devuelve:** `Number` - Cantidad de ceros a la izquierda en 32 bits  
**Parámetros:** `x` (Number)  
**Descripción:** Cuenta leading zeros en representación binaria

```js
console.log(Math.clz32(1));    // 31 (00000000000000000000000000000001)
console.log(Math.clz32(4));    // 29 (00000000000000000000000000000100)
console.log(Math.clz32(1000)); // 22

// Útil en algoritmos de bajo nivel
```

---

## 🎯 10. Patrones y Casos de Uso Prácticos

### Cálculos financieros

```js
// Interés simple
function interesSimple(capital, tasa, tiempo) {
    return capital * (1 + tasa * tiempo);
}

console.log(interesSimple(1000, 0.05, 3)); // 1150

// Interés compuesto
function interesCompuesto(capital, tasa, periodos, frecuencia = 1) {
    return capital * Math.pow(1 + tasa / frecuencia, periodos * frecuencia);
}

console.log(interesCompuesto(1000, 0.05, 10)); // ~1628.89
console.log(interesCompuesto(1000, 0.05, 10, 12)); // ~1647.01 (mensual)

// Amortización de préstamo
function pagoMensual(principal, tasaAnual, meses) {
    const r = tasaAnual / 12;
    return principal * r * Math.pow(1 + r, meses) / (Math.pow(1 + r, meses) - 1);
}

console.log(pagoMensual(100000, 0.05, 360)); // ~536.82

// Valor presente neto (NPV)
function vpn(flujos, tasa) {
    return flujos.reduce((total, flujo, i) => {
        return total + flujo / Math.pow(1 + tasa, i);
    }, 0);
}

console.log(vpn([-1000, 300, 400, 500, 600], 0.1)); // ~423.97
```

---

### Geometría y física

```js
// Área de círculo
function areaCirculo(radio) {
    return Math.PI * Math.pow(radio, 2);
}

console.log(areaCirculo(5)); // 78.53...

// Volumen de esfera
function volumenEsfera(radio) {
    return (4 / 3) * Math.PI * Math.pow(radio, 3);
}

console.log(volumenEsfera(5)); // 523.59...

// Velocidad de escape
function velocidadEscape(masa, radio) {
    const G = 6.674e-11; // Constante gravitacional
    return Math.sqrt(2 * G * masa / radio);
}

// Caída libre
function alturaEnTiempo(alturaInicial, tiempo) {
    const g = 9.81; // Gravedad
    return alturaInicial - 0.5 * g * Math.pow(tiempo, 2);
}

console.log(alturaEnTiempo(100, 3)); // ~55.855 metros

// Ángulo entre vectores
function anguloVectores(x1, y1, x2, y2) {
    const dot = x1 * x2 + y1 * y2;
    const mag1 = Math.hypot(x1, y1);
    const mag2 = Math.hypot(x2, y2);
    return Math.acos(dot / (mag1 * mag2));
}

console.log(radianesAGrados(anguloVectores(1, 0, 1, 1))); // 45°
```

---

### Estadísticas básicas

```js
// Media (promedio)
function media(numeros) {
    return numeros.reduce((a, b) => a + b, 0) / numeros.length;
}

console.log(media([1, 2, 3, 4, 5])); // 3

// Mediana
function mediana(numeros) {
    const ordenados = [...numeros].sort((a, b) => a - b);
    const medio = Math.floor(ordenados.length / 2);
    
    if (ordenados.length % 2 === 0) {
        return (ordenados[medio - 1] + ordenados[medio]) / 2;
    }
    return ordenados[medio];
}

console.log(mediana([1, 2, 3, 4, 5])); // 3
console.log(mediana([1, 2, 3, 4]));    // 2.5

// Desviación estándar
function desviacionEstandar(numeros) {
    const promedio = media(numeros);
    const varianza = numeros.reduce((sum, num) => {
        return sum + Math.pow(num - promedio, 2);
    }, 0) / numeros.length;
    return Math.sqrt(varianza);
}

console.log(desviacionEstandar([2, 4, 4, 4, 5, 5, 7, 9])); // 2

// Normalización Z-score
function zScore(valor, promedio, desviacion) {
    return (valor - promedio) / desviacion;
}

// Rango intercuartílico
function iqr(numeros) {
    const ordenados = [...numeros].sort((a, b) => a - b);
    const q1Pos = Math.floor(ordenados.length * 0.25);
    const q3Pos = Math.floor(ordenados.length * 0.75);
    return ordenados[q3Pos] - ordenados[q1Pos];
}

console.log(iqr([1, 2, 3, 4, 5, 6, 7, 8, 9])); // 4
```

---

### Animaciones y easing

```js
// Linear interpolation (lerp)
function lerp(inicio, fin, t) {
    return inicio + (fin - inicio) * t;
}

console.log(lerp(0, 100, 0.5));  // 50
console.log(lerp(10, 20, 0.25)); // 12.5

// Ease in (aceleración)
function easeIn(t) {
    return Math.pow(t, 2);
}

// Ease out (desaceleración)
function easeOut(t) {
    return 1 - Math.pow(1 - t, 2);
}

// Ease in-out (aceleración y desaceleración)
function easeInOut(t) {
    return t < 0.5 
        ? 2 * Math.pow(t, 2)
        : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// Bounce (rebote)
function bounce(t) {
    return Math.sin(t * Math.PI) * (1 - t);
}

// Elastic (elástico)
function elastic(t) {
    return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
}

// Aplicar easing a animación
function animar(inicio, fin, duracion, easingFn = easeInOut) {
    const delta = fin - inicio;
    return function(tiempo) {
        const t = Math.min(tiempo / duracion, 1);
        return inicio + delta * easingFn(t);
    };
}

const animacion = animar(0, 100, 1000);
console.log(animacion(500)); // Posición en t=500ms
```

---

### Conversiones y utilidades

```js
// Mapear valor de un rango a otro
function mapear(valor, min1, max1, min2, max2) {
    return min2 + (valor - min1) * (max2 - min2) / (max1 - min1);
}

console.log(mapear(5, 0, 10, 0, 100));   // 50
console.log(mapear(75, 0, 100, 0, 255)); // 191.25

// Porcentaje
function porcentaje(parte, total) {
    return (parte / total) * 100;
}

console.log(porcentaje(25, 100)); // 25
console.log(porcentaje(3, 12));   // 25

// Parte de un porcentaje
function calcularPorcentaje(porcentaje, total) {
    return (porcentaje / 100) * total;
}

console.log(calcularPorcentaje(20, 500)); // 100
console.log(calcularPorcentaje(15, 80));  // 12

// Incremento porcentual
function incremento(valorInicial, valorFinal) {
    return ((valorFinal - valorInicial) / valorInicial) * 100;
}

console.log(incremento(50, 75)); // 50%
console.log(incremento(100, 80)); // -20%

// Promedio ponderado
function promedioPonderado(valores, pesos) {
    const sumaPonderada = valores.reduce((sum, val, i) => {
        return sum + val * pesos[i];
    }, 0);
    const sumaPesos = pesos.reduce((a, b) => a + b, 0);
    return sumaPonderada / sumaPesos;
}

console.log(promedioPonderado([90, 80, 70], [0.5, 0.3, 0.2])); // 83

// Redondear a múltiplo
function redondearAMultiplo(numero, multiplo) {
    return Math.round(numero / multiplo) * multiplo;
}

console.log(redondearAMultiplo(23, 5));  // 25
console.log(redondearAMultiplo(47, 10)); // 50

// Formatear número con separadores
function formatearNumero(numero, decimales = 2) {
    return numero.toFixed(decimales).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

console.log(formatearNumero(1234567.89));    // "1,234,567.89"
console.log(formatearNumero(1234567.89, 0)); // "1,234,568"
```

---

## 🚨 Errores Comunes y Casos Especiales

### 1. Olvidar que funciones trigonométricas usan radianes

```js
// ❌ Error común
console.log(Math.sin(90)); // 0.893... (esperabas 1)

// ✅ Convertir a radianes
function gradosARadianes(grados) {
    return grados * (Math.PI / 180);
}
console.log(Math.sin(gradosARadianes(90))); // 1
```

---

### 2. Usar sort() sin comparador para números

```js
const nums = [10, 5, 40, 25];

// ❌ Ordena como strings
nums.sort(); // [10, 25, 40, 5]

// ✅ Usa comparador
nums.sort((a, b) => a - b); // [5, 10, 25, 40]
```

---

### 3. Confundir floor, ceil, round y trunc

```js
console.log(Math.floor(4.9));  // 4 (hacia -∞)
console.log(Math.ceil(4.1));   // 5 (hacia +∞)
console.log(Math.round(4.5));  // 5 (al más cercano)
console.log(Math.trunc(4.9));  // 4 (elimina decimales)

// Con negativos son diferentes
console.log(Math.floor(-4.9));  // -5
console.log(Math.ceil(-4.9));   // -4
console.log(Math.round(-4.5));  // -4
console.log(Math.trunc(-4.9));  // -4
```

---

### 4. Precisión de punto flotante

```js
console.log(0.1 + 0.2);              // 0.30000000000000004 ❌
console.log(0.1 + 0.2 === 0.3);      // false

// ✅ Comparar con tolerancia
function sonIguales(a, b, tolerancia = 1e-10) {
    return Math.abs(a - b) < tolerancia;
}

console.log(sonIguales(0.1 + 0.2, 0.3)); // true

// ✅ O redondear
console.log(Math.round((0.1 + 0.2) * 100) / 100); // 0.3
```

---

### 5. Math.random() no es criptográficamente seguro

```js
// ❌ NO usar para seguridad
const token = Math.random().toString(36); // NO seguro

// ✅ Para seguridad, usa crypto
const array = new Uint32Array(1);
crypto.getRandomValues(array);
console.log(array[0]); // Número aleatorio seguro
```

---

### 6. Valores especiales

```js
// Infinitos
console.log(Math.sqrt(-1));           // NaN
console.log(Math.log(-1));            // NaN
console.log(1 / 0);                   // Infinity
console.log(-1 / 0);                  // -Infinity
console.log(Math.pow(10, 1000));      // Infinity (overflow)

// Verificar valores especiales
console.log(isNaN(Math.sqrt(-1)));    // true
console.log(isFinite(1 / 0));         // false
console.log(Number.isFinite(Infinity)); // false

// Usar valores seguros
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
```

---

## 📊 Tabla Resumen de Métodos

|Categoría|Métodos|Uso Común|
|---|---|---|
|**Redondeo**|round, floor, ceil, trunc|Redondear números|
|**Aleatorio**|random|Generar números aleatorios|
|**Potencia**|pow, sqrt, cbrt, hypot|Cálculos de potencias y raíces|
|**Comparación**|min, max, abs, sign|Encontrar mínimo/máximo|
|**Trigonometría**|sin, cos, tan, asin, acos, atan, atan2|Ángulos y círculos|
|**Logaritmos**|log, log10, log2, log1p, exp, expm1|Crecimiento exponencial|
|**Constantes**|PI, E, SQRT2, LN2, etc.|Valores matemáticos|

---

## 🏆 Orden de Uso (Más → Menos Común)

1. **Math.random()** - Números aleatorios
2. **Math.floor()** - Redondear hacia abajo
3. **Math.round()** - Redondear al más cercano
4. **Math.ceil()** - Redondear hacia arriba
5. **Math.max()** - Valor máximo
6. **Math.min()** - Valor mínimo
7. **Math.abs()** - Valor absoluto
8. **Math.sqrt()** - Raíz cuadrada
9. **Math.pow()** o `**` - Potencias
10. **Math.PI** - Constante π
11. **Math.sin()**, **Math.cos()** - Trigonometría
12. **Math.trunc()** - Eliminar decimales
13. **Math.sign()** - Signo del número
14. **Otros** - Menos frecuentes

---

## 💡 Tips y Mejores Prácticas

### 1. Usa operador ** en lugar de Math.pow()

```js
// ❌ Menos legible
Math.pow(2, 3);

// ✅ Más moderno
2 ** 3;
```

---

### 2. Encadena operaciones cuando sea posible

```js
// Limitar valor entre 0 y 100
const valor = Math.min(Math.max(numero, 0), 100);
```

---

### 3. Cachea cálculos costosos

```js
// ❌ Calcula PI * 2 muchas veces
for (let i = 0; i < 1000; i++) {
    const circunferencia = Math.PI * 2 * radio[i];
}

// ✅ Calcula una sola vez
const TAU = Math.PI * 2;
for (let i = 0; i < 1000; i++) {
    const circunferencia = TAU * radio[i];
}
```

---

### 4. Maneja casos especiales

```js
function dividirSeguro(a, b) {
    if (b === 0) return Infinity;
    return a / b;
}

function raizCuadradaSegura(x) {
    if (x < 0) return NaN;
    return Math.sqrt(x);
}
```

---

## 📚 Recursos Adicionales

- **MDN Web Docs - Math:** Documentación oficial completa
- **JavaScript.info - Numbers:** Tutorial sobre números
- **Math.js:** Librería para matemáticas avanzadas

---

## 💭 Conclusión

El objeto **Math** es fundamental para:

- ✅ Cálculos matemáticos básicos y avanzados
- ✅ Generación de números aleatorios
- ✅ Redondeo y formateo de números
- ✅ Geometría y trigonometría
- ✅ Estadísticas y análisis de datos
- ✅ Animaciones y efectos visuales

Todos los métodos son **estáticos** y **no modifican valores**, simplemente devuelven resultados. Perfectos para cualquier operación matemática en JavaScript.