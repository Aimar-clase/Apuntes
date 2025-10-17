# ⚖️ Operador Ternario en JavaScript

  

El **operador ternario** (`? :`) es una forma **abreviada** de escribir una estructura `if...else` en una sola línea.  

Su nombre “ternario” viene de que **usa tres partes**.

  

---

  

## 🔹 Sintaxis

  

```js

condición ? valorSiVerdadero : valorSiFalso;

```

  

- Si la **condición** es `true`, devuelve `valorSiVerdadero`.  

- Si la **condición** es `false`, devuelve `valorSiFalso`.

  

---

  

## 🧩 Ejemplo básico

  

```js

let edad = 18;

let puedeEntrar = edad >= 18 ? "Sí, puede entrar" : "No puede entrar";

  

console.log(puedeEntrar); // "Sí, puede entrar"

```

  

👉 Equivalente a:

```js

if (edad >= 18) {

  puedeEntrar = "Sí, puede entrar";

} else {

  puedeEntrar = "No puede entrar";

}

```

  

---

  

## 🔹 Ejemplo práctico con función

  

```js

function esPar(num) {

  return num % 2 === 0 ? "Es par" : "Es impar";

}

  

console.log(esPar(4)); // "Es par"

console.log(esPar(7)); // "Es impar"

```

  

---

  

## 🔹 Encadenar ternarios

  

Puedes anidar varios ternarios, aunque **no es recomendable** si se vuelve poco legible.

  

```js

let nota = 8;

let resultado = nota >= 9 ? "Sobresaliente"

               : nota >= 7 ? "Notable"

               : nota >= 5 ? "Aprobado"

               : "Suspendido";

  

console.log(resultado); // "Notable"

```

  

⚠️ **Consejo:** Si hay más de dos condiciones, usa `if...else if...else` para que sea más claro.

  

---

  

## 🔹 Usar en plantillas o expresiones

  

El operador ternario es muy útil dentro de **template literals** o **expresiones JSX / HTML dinámicas**.

  

```js

let usuario = { nombre: "Ana", premium: true };

console.log(`Estado: ${usuario.premium ? "Premium" : "Gratis"}`);

// Estado: Premium

```

  

---

  

## 🔹 Operador ternario sin asignar valor

  

También puede ejecutarse por sus efectos secundarios (aunque no es lo más común).

  

```js

let loggedIn = false;

loggedIn ? console.log("Bienvenido") : console.log("Inicia sesión");

// "Inicia sesión"

```

  

---

  

## 🔹 Ternario con funciones u operaciones complejas

  

```js

let conectado = true;

conectado ? iniciarSesion() : mostrarError();

  

function iniciarSesion() {

  console.log("Sesión iniciada");

}

  

function mostrarError() {

  console.log("Error: sin conexión");

}

```

  

---

  

## 🔹 En resumen

  

| Parte | Significado |

|--------|--------------|

| `condición` | Expresión booleana a evaluar |

| `?` | Separador entre condición y resultado verdadero |

| `:` | Separador entre resultado verdadero y falso |

| **Devuelve** | Un valor (no ejecuta bloques de código como `if`) |

  

---

  

## ✅ Cuándo usarlo

✅ **Sí úsalo** cuando:

- Tienes una condición simple.

- Quieres devolver o asignar un valor en una sola línea.

- Buscas un código más corto y limpio.

  

🚫 **Evítalo** cuando:

- Hay más de dos condiciones.

- La lógica es compleja o difícil de leer.

  

---

  

### 💡 Ejemplos rápidos

  

```js

// Ejemplo 1: verificar edad

let edad = 20;

let mensaje = edad >= 18 ? "Mayor de edad" : "Menor de edad";

  

// Ejemplo 2: decidir color

let modoOscuro = true;

let color = modoOscuro ? "Negro" : "Blanco";

  

// Ejemplo 3: mostrar mensaje condicional

let usuario = null;

console.log(usuario ? "Bienvenido" : "Debes registrarte");

```