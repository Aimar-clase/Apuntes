# 🔢 Métodos y propiedades del objeto Number en JavaScript

  

El objeto **`Number`** en JavaScript se utiliza para representar y manipular valores numéricos.  

A continuación se listan **solo los métodos y propiedades que pertenecen al propio objeto `Number` o a instancias numéricas**, sin incluir funciones globales como `parseInt()` o `parseFloat()`.

  

---

  

## 🧩 Métodos estáticos de `Number`

  

### 🔹 1. `Number.isInteger(valor)`

Devuelve `true` si el valor es un **entero**.

```js

console.log(Number.isInteger(10));   // true

console.log(Number.isInteger(10.5)); // false

console.log(Number.isInteger("10")); // false

```

  

---

  

### 🔹 2. `Number.isFinite(valor)`

Comprueba si el valor es un **número finito** (no `Infinity`, `-Infinity` o `NaN`).

```js

console.log(Number.isFinite(25));       // true

console.log(Number.isFinite(Infinity)); // false

console.log(Number.isFinite("25"));     // false

```

  

---

  

### 🔹 3. `Number.isNaN(valor)`

Devuelve `true` si el valor es exactamente `NaN`.

```js

console.log(Number.isNaN(NaN));    // true

console.log(Number.isNaN("NaN"));  // false

console.log(Number.isNaN(5));      // false

```

  

---

  

## ⚙️ Propiedades del objeto `Number`

  

### 🔹 4. `Number.EPSILON`

Representa la **diferencia mínima** entre 1 y el siguiente número representable.  

Se usa para comparar números de punto flotante con precisión.

  

```js

let a = 0.1 + 0.2;

console.log(Math.abs(a - 0.3) < Number.EPSILON); // true

```

  

---

  

### 🔹 5. `Number.MAX_VALUE` y `Number.MIN_VALUE`

Representan el **mayor y menor número positivo** que se pueden representar.

  

```js

console.log(Number.MAX_VALUE); // 1.7976931348623157e+308

console.log(Number.MIN_VALUE); // 5e-324

```

  

---

  

### 🔹 6. `Number.MAX_SAFE_INTEGER` y `Number.MIN_SAFE_INTEGER`

Representan el **mayor y menor entero seguro**, es decir, que puede representarse sin pérdida de precisión.

  

```js

console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991

```

  

---

  

### 🔹 7. `Number.POSITIVE_INFINITY` / `Number.NEGATIVE_INFINITY`

Constantes que representan **infinito positivo y negativo**.

  

```js

console.log(1 / 0);                     // Infinity

console.log(-1 / 0);                    // -Infinity

console.log(Number.POSITIVE_INFINITY);  // Infinity

```

  

---

  

### 🔹 8. `Number.NaN`

Constante que representa el valor **NaN** ("Not a Number").

  

```js

console.log(Number.NaN);        // NaN

console.log(typeof Number.NaN); // "number"

```

  

---

  

## 💡 Métodos de instancia (de los valores numéricos)

  

### 🔹 9. `toFixed(decimales)`

Devuelve una cadena con el número **redondeado** a la cantidad de decimales indicada. #Cast 

  

```js

let num = 3.14159;

console.log(num.toFixed(2)); // "3.14"

console.log(num.toFixed(0)); // "3"

```

  

> ⚠️ Devuelve una **cadena**, no un número.  

> Usa `parseFloat()` si necesitas volver a número.

  

---

  

### 🔹 10. `toPrecision(dígitos)`

Devuelve una cadena con el número con una **precisión total** (número de cifras significativas).

  

```js

let num = 123.456;

console.log(num.toPrecision(4)); // "123.5"

console.log(num.toPrecision(2)); // "1.2e+2"

```

  

---

  

### 🔹 11. `toExponential(decimales)`

Devuelve una cadena con el número en **notación científica**.

  

```js

let num = 1234;

console.log(num.toExponential(2)); // "1.23e+3"

```

  

---

  

### 🔹 12. `toLocaleString([locale], [options])`

Convierte el número en una cadena formateada según el **idioma o región**.

  

```js

let num = 1234567.89;

console.log(num.toLocaleString("es-ES")); // "1.234.567,89"

console.log(num.toLocaleString("en-US")); // "1,234,567.89"

console.log(num.toLocaleString("de-DE", { style: "currency", currency: "EUR" })); // "1.234.567,89 €"

```

  

---

  

### 🔹 13. `toString([base])`

Convierte el número en una **cadena**, opcionalmente en otra base numérica. #Cast 

  

```js

let num = 255;

console.log(num.toString());   // "255"

console.log(num.toString(16)); // "ff" (hexadecimal)

console.log(num.toString(2));  // "11111111" (binario)

```

  

---

  

### 🔹 14. `valueOf()`

Devuelve el **valor primitivo** de un objeto `Number`.

  

```js

let numObj = new Number(42);

console.log(numObj.valueOf()); // 42

```

  
  

---

  

## 🧠 Resumen rápido

  

| Tipo | Nombre | Descripción |

|------|---------|-------------|

| 🧩 Método estático | `Number.isInteger()` | Comprueba si el valor es entero |

| 🧩 Método estático | `Number.isFinite()` | Comprueba si es finito |

| 🧩 Método estático | `Number.isNaN()` | Comprueba si es `NaN` |

| ⚙️ Propiedad | `Number.EPSILON` | Precisión mínima para comparar flotantes |

| ⚙️ Propiedad | `Number.MAX_VALUE` / `MIN_VALUE` | Límites de valores positivos |

| ⚙️ Propiedad | `Number.MAX_SAFE_INTEGER` / `MIN_SAFE_INTEGER` | Límites enteros seguros |

| ⚙️ Propiedad | `Number.POSITIVE_INFINITY` / `NEGATIVE_INFINITY` | Representa infinitos |

| ⚙️ Propiedad | `Number.NaN` | Representa “Not a Number” |

| 💡 Instancia | `toFixed()` | Redondea a decimales fijos |

| 💡 Instancia | `toPrecision()` | Redondea a precisión total |

| 💡 Instancia | `toExponential()` | Muestra en notación científica |

| 💡 Instancia | `toLocaleString()` | Formatea según idioma/región |

| 💡 Instancia | `toString()` | Convierte a cadena o base |

| 💡 Instancia | `valueOf()` | Valor primitivo del número |

  

---

  

✨ **Ejemplo combinado**

```js

let precio = 1234.56789;

  

console.log(precio.toFixed(2));               // "1234.57"

console.log(precio.toLocaleString("es-ES"));  // "1.234,57"

console.log(precio.toExponential(3));         // "1.235e+3"

console.log(Number.isFinite(precio));         // true

console.log(Number.isInteger(precio));        // false

```