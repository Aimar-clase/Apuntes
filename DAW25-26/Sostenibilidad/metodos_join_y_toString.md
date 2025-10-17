# Métodos `join()` y `toString(base)` en JavaScript

## 🧩 Método `join()`

El método **`join()`** se utiliza en **arrays** para **unir todos sus elementos en una sola cadena de texto (`string`)**.

### 🔹 Sintaxis
```js
array.join(separador)
```

- **`separador`** *(opcional)* → es el carácter o cadena que se colocará entre cada elemento.
  - Si no se especifica, por defecto se usa una **coma (`,`)**.

---

### 🔹 Ejemplos

#### Ejemplo 1: Con separador por defecto
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

Salida:
```
C
CA
CAS
CASA
```

---

### 🧠 En resumen:

| Uso | Descripción | Ejemplo | Resultado |
|------|--------------|----------|------------|
| `join()` | Une con comas | `["a","b","c"].join()` | `"a,b,c"` |
| `join("")` | Sin separador | `["a","b","c"].join("")` | `"abc"` |
| `join(" ")` | Con espacios | `["a","b","c"].join(" ")` | `"a b c"` |
| `join("\n")` | Con salto de línea | `["a","b","c"].join("\n")` | `"a\nb\nc"` |

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

console.log(numero.toString(2));  // "10011010010" (binario)
console.log(numero.toString(8));  // "2322" (octal)
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

---

### 🧠 En resumen:

| Base | Sistema | Ejemplo (`1234.toString(base)`) | Resultado |
|------|----------|--------------------------------|------------|
| 2 | Binario | `1234.toString(2)` | `"10011010010"` |
| 8 | Octal | `1234.toString(8)` | `"2322"` |
| 10 | Decimal | `1234.toString(10)` | `"1234"` |
| 16 | Hexadecimal | `1234.toString(16)` | `"4d2"` |

---

## 📋 Diferencias clave entre `join()` y `toString()`

| Método | Tipo de dato | Qué hace | Devuelve |
|---------|----------------|-----------|------------|
| `join()` | Array | Une todos los elementos en una cadena con un separador | `string` |
| `toString(base)` | Número | Convierte un número en una cadena en la base especificada | `string` |

---

### 🧭 Ejemplo comparativo

```js
let arr = [1, 2, 3];
console.log(arr.join("-"));     // "1-2-3"

let num = 255;
console.log(num.toString(16));  // "ff"
```

Ambos devuelven cadenas, pero **`join()` trabaja con arrays** y **`toString()` con números**.
