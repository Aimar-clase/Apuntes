# 📦 Import y Export en JavaScript

## 🤔 ¿Qué son los módulos?

Los **módulos** permiten dividir tu código en archivos separados y reutilizables. Puedes **exportar** funciones, variables u objetos desde un archivo e **importarlos** en otro.

### ✅ Ventajas
- 🧩 Código más organizado y modular
- ♻️ Reutilización de código
- 🔒 Evita contaminar el scope global
- 📝 Más fácil de mantener

---

## 📤 Export - Exportar

Hay dos formas de exportar: **Named Exports** y **Default Export**.

### 🔹 Named Exports (Exportaciones nombradas)

Puedes exportar **múltiples elementos** de un archivo.

#### 📄 utilidades.js
```javascript
// Opción 1: Exportar al declarar
export function sumar(a, b) {
    return a + b;
}

export function restar(a, b) {
    return a - b;
}

export const PI = 3.14159;

// Opción 2: Exportar al final
function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    return a / b;
}

const autor = "Juan";

export { multiplicar, dividir, autor };
```

---

### 🔹 Default Export (Exportación por defecto)

Solo puedes tener **una exportación por defecto** por archivo.

#### 📄 calculadora.js
```javascript
// Opción 1: Export default directo
export default function calcular(operacion, a, b) {
    if (operacion === "suma") return a + b;
    if (operacion === "resta") return a - b;
    return null;
}

// Opción 2: Declarar primero, exportar después
function Calculadora(modelo) {
    this.modelo = modelo;
    this.sumar = function(a, b) {
        return a + b;
    }
}

export default Calculadora;
```

---

### 🔹 Mezclar Named y Default

#### 📄 matematicas.js
```javascript
// Export default
export default function potencia(base, exponente) {
    return Math.pow(base, exponente);
}

// Named exports
export function esPar(numero) {
    return numero % 2 === 0;
}

export function esImpar(numero) {
    return numero % 2 !== 0;
}

export const version = "1.0.0";
```

---

## 📥 Import - Importar

### 🔹 Importar Named Exports

#### 📄 main.js
```javascript
// Importar elementos específicos
import { sumar, restar, PI } from './utilidades.js';

console.log(sumar(5, 3));     // 8
console.log(restar(10, 4));   // 6
console.log(PI);              // 3.14159

// Importar todos los elementos con un alias
import * as utilidades from './utilidades.js';

console.log(utilidades.sumar(5, 3));      // 8
console.log(utilidades.multiplicar(4, 2)); // 8
console.log(utilidades.autor);            // "Juan"
```

---

### 🔹 Importar Default Export

#### 📄 app.js
```javascript
// Puedes darle el nombre que quieras
import calcular from './calculadora.js';

console.log(calcular("suma", 5, 3));   // 8
console.log(calcular("resta", 10, 4)); // 6

// O con otro nombre
import miCalculadora from './calculadora.js';
console.log(miCalculadora("suma", 2, 2)); // 4
```

---

### 🔹 Importar Named y Default juntos

#### 📄 script.js
```javascript
// Default primero, luego named entre llaves
import potencia, { esPar, esImpar, version } from './matematicas.js';

console.log(potencia(2, 3));  // 8
console.log(esPar(4));        // true
console.log(esImpar(5));      // true
console.log(version);         // "1.0.0"
```

---

### 🔹 Renombrar al importar (Alias)
```javascript
// Cambiar nombre al importar
import { sumar as suma, restar as resta } from './utilidades.js';

console.log(suma(5, 3));   // 8
console.log(resta(10, 4)); // 6
```

---

## 🌐 Usar módulos en HTML

### ⚠️ IMPORTANTE: Atributo `type="module"`

Para usar `import/export` en el navegador, **debes** añadir `type="module"` al `<script>`.

### ✅ Forma correcta

#### 📄 index.html
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Módulos en JavaScript</title>
</head>
<body>
    <h1>Ejemplo de Módulos</h1>

    
    <script type="module" src="main.js"></script>
</body>
</html>
```

#### 📄 main.js
```javascript
import { sumar, restar } from './utilidades.js';

console.log(sumar(10, 5));   // 15
console.log(restar(10, 5));  // 5
```

#### 📄 utilidades.js
```javascript
export function sumar(a, b) {
    return a + b;
}

export function restar(a, b) {
    return a - b;
}
```

---

### ❌ Forma incorrecta (sin type="module")
```html

<script src="main.js"></script>
```

> [!warning] ⚠️ Error común
> Si no usas `type="module"`, obtendrás el error: **"Cannot use import statement outside a module"**

---

## 📁 Estructura de carpetas típica
```
proyecto/
│
├── index.html
├── css/
│   └── styles.css
│
└── js/
    ├── main.js           (punto de entrada)
    ├── utilidades.js     (funciones auxiliares)
    ├── calculadora.js    (módulo específico)
    └── dom.js           (manipulación DOM)
```

### 📄 index.html
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi Proyecto Modular</title>
</head>
<body>
    <h1>Proyecto con Módulos</h1>
    
    
    <script type="module" src="js/main.js"></script>
</body>
</html>
```

### 📄 js/main.js
```javascript
// Main importa de otros módulos
import { inicializarApp } from './dom.js';
import { calcular } from './calculadora.js';
import { formatearFecha } from './utilidades.js';

inicializarApp();
console.log(calcular(5, 3));
console.log(formatearFecha(new Date()));
```

---

## 💡 Ejemplos prácticos completos

### 🎯 Ejemplo 1: Conversor de temperaturas

#### 📁 Estructura
```
proyecto/
├── index.html
└── js/
    ├── app.js
    └── conversor.js
```

#### 📄 index.html
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Conversor de Temperatura</title>
</head>
<body>
    <h1>🌡️ Conversor de Temperatura</h1>
    
    <input type="number" id="celsius" placeholder="Grados Celsius">
    <button id="convertir">Convertir</button>
    
    <p id="resultado"></p>

    <script type="module" src="js/app.js"></script>
</body>
</html>
```

#### 📄 js/conversor.js
```javascript
// Exportar funciones de conversión
export function celsiusAFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

export function celsiusAKelvin(celsius) {
    return celsius + 273.15;
}

// Export default
export default function convertirTodo(celsius) {
    return {
        fahrenheit: celsiusAFahrenheit(celsius),
        kelvin: celsiusAKelvin(celsius)
    };
}
```

#### 📄 js/app.js
```javascript
// Importar del módulo conversor
import convertirTodo, { celsiusAFahrenheit } from './conversor.js';

let input = document.getElementById("celsius");
let boton = document.getElementById("convertir");
let resultado = document.getElementById("resultado");

boton.addEventListener("click", function() {
    let celsius = parseFloat(input.value);
    
    if (isNaN(celsius)) {
        resultado.textContent = "❌ Introduce un número válido";
        return;
    }
    
    let conversiones = convertirTodo(celsius);
    
    resultado.innerHTML = `
        🌡️ ${celsius}°C equivale a:<br>
        📊 ${conversiones.fahrenheit.toFixed(2)}°F<br>
        📊 ${conversiones.kelvin.toFixed(2)}K
    `;
});
```

---

### 🎯 Ejemplo 2: Gestión de tareas modular

#### 📁 Estructura
```
proyecto/
├── index.html
└── js/
    ├── main.js
    ├── tareas.js
    └── dom.js
```

#### 📄 index.html
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Lista de Tareas Modular</title>
</head>
<body>
    <h1>📝 Lista de Tareas</h1>
    
    <input type="text" id="nuevaTarea" placeholder="Nueva tarea...">
    <button id="agregar">Añadir</button>
    
    <ul id="listaTareas"></ul>

    <script type="module" src="js/main.js"></script>
</body>
</html>
```

#### 📄 js/tareas.js
```javascript
// Gestión de datos de tareas
let tareas = [];

export function agregarTarea(texto) {
    let nuevaTarea = {
        id: Date.now(),
        texto: texto,
        completada: false
    };
    tareas.push(nuevaTarea);
    return nuevaTarea;
}

export function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
}

export function obtenerTareas() {
    return tareas;
}
```

#### 📄 js/dom.js
```javascript
// Manipulación del DOM
import { agregarTarea, eliminarTarea } from './tareas.js';

export function renderizarTareas(tareas, contenedor) {
    contenedor.innerHTML = "";
    
    tareas.forEach(tarea => {
        let li = document.createElement("li");
        li.textContent = tarea.texto;
        
        let botonBorrar = document.createElement("button");
        botonBorrar.textContent = "❌";
        botonBorrar.addEventListener("click", function() {
            eliminarTarea(tarea.id);
            renderizarTareas(obtenerTareas(), contenedor);
        });
        
        li.appendChild(botonBorrar);
        contenedor.appendChild(li);
    });
}

export function inicializarEventos() {
    let input = document.getElementById("nuevaTarea");
    let boton = document.getElementById("agregar");
    let lista = document.getElementById("listaTareas");
    
    boton.addEventListener("click", function() {
        if (input.value.trim() === "") return;
        
        agregarTarea(input.value);
        input.value = "";
        renderizarTareas(obtenerTareas(), lista);
    });
}

// Necesario importar para usar en renderizarTareas
import { obtenerTareas } from './tareas.js';
```

#### 📄 js/main.js
```javascript
// Punto de entrada de la aplicación
import { inicializarEventos } from './dom.js';

// Iniciar la aplicación
inicializarEventos();
console.log("✅ Aplicación iniciada");
```

---

## 🔒 Scope de módulos

> [!info] 📝 Variables privadas
> Por defecto, **todo lo que NO se exporta es privado** y no accesible desde otros archivos.
```javascript
// utilidades.js

// ❌ Privada (no exportada)
const secreto = "No me puedes ver desde fuera";

// ✅ Pública (exportada)
export const publico = "Sí me puedes ver";

function privada() {
    return "Función privada";
}

export function publica() {
    return "Función pública que usa: " + privada();
}
```
```javascript
// main.js
import { publico, publica } from './utilidades.js';

console.log(publico);    // ✅ Funciona
console.log(publica());  // ✅ Funciona
console.log(secreto);    // ❌ Error: secreto is not defined
```

---

## ⚠️ Errores comunes

### ❌ Error 1: Olvidar type="module"
```html

<script src="main.js"></script>


<script type="module" src="main.js"></script>
```

### ❌ Error 2: Olvidar la extensión .js
```javascript
// ❌ NO FUNCIONA
import { sumar } from './utilidades';

// ✅ FUNCIONA
import { sumar } from './utilidades.js';
```

### ❌ Error 3: Ruta incorrecta
```javascript
// ❌ NO FUNCIONA (ruta absoluta sin servidor)
import { sumar } from '/js/utilidades.js';

// ✅ FUNCIONA (ruta relativa)
import { sumar } from './utilidades.js';
import { restar } from '../utils/matematicas.js';
```

### ❌ Error 4: CORS al abrir directamente el HTML

> [!warning] ⚠️ Política CORS
> Los módulos NO funcionan abriendo el archivo HTML directamente con `file://`. Necesitas un servidor local.

**Soluciones:**
- 🔧 Usa **Live Server** en VS Code
- 🔧 Usa `python -m http.server` en la terminal
- 🔧 Usa Node.js con `npx http-server`

---

## 📊 Resumen

| Concepto | Descripción | Sintaxis |
|----------|-------------|----------|
| **Named Export** | 📤 Múltiples exportaciones | `export function nombre() {}` |
| **Default Export** | 📤 Una exportación principal | `export default function() {}` |
| **Named Import** | 📥 Importar específicos | `import { nombre } from './file.js'` |
| **Default Import** | 📥 Importar default | `import nombre from './file.js'` |
| **Import All** | 📥 Importar todo | `import * as alias from './file.js'` |
| **Alias** | 🔄 Renombrar al importar | `import { nombre as alias }` |

---

## 💡 Tips importantes

> [!tip] 🎯 Organización
> Agrupa funciones relacionadas en el mismo módulo. Por ejemplo: todas las funciones de validación en `validaciones.js`.

> [!tip] 🚀 Performance
> Los módulos se cargan una sola vez. Si importas el mismo módulo en varios archivos, solo se ejecuta una vez.

> [!tip] 📝 Nomenclatura
> Usa nombres descriptivos para tus módulos: `utilidadesFechas.js`, `validacionFormularios.js`, etc.

> [!warning] ⚠️ Servidor requerido
> Para desarrollo local, usa un servidor (Live Server, http-server, etc.). Los módulos no funcionan con `file://`.

---

## 🔗 Enlaces útiles

- 📚 [MDN - Módulos JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules)
- 📚 [MDN - import](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/import)
- 📚 [MDN - export](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/export)
- 📖 [[JavaScript Básico]]
- 📖 [[DOM]]

---

**📅 Fecha de creación:** 2025-10-31  
**🏷️ Tags:** #javascript #modulos #import #export #organizacion