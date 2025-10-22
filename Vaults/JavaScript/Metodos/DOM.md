# 🌳 DOM (Document Object Model)

## 🤔 ¿Qué es el DOM?

El **DOM** es una representación en forma de **árbol** de tu página HTML que JavaScript puede leer y modificar. Es el puente que conecta tu código JavaScript con los elementos HTML de tu página.

Cuando el navegador carga una página HTML, crea automáticamente el DOM. Cada etiqueta HTML se convierte en un **nodo** que puedes manipular.

### 📊 Estructura de árbol
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Mi Página</title>
  </head>
  <body>
    <h1>Hola</h1>
    <p>Mundo</p>
  </body>
</html>
```

Se convierte en:
```
document
  └── html
      ├── head
      │   └── title
      │       └── "Mi Página"
      └── body
          ├── h1
          │   └── "Hola"
          └── p
              └── "Mundo"
```

---

## 🎯 Seleccionar elementos

### 🔍 getElementById()
Selecciona **un elemento** por su atributo `id`.
```javascript
let elemento = document.getElementById("miId");
```
```html
<div id="miId">Hola</div>
```

> [!tip] 💡 Más rápido
> Es el método **más rápido** para seleccionar un elemento específico.

---

### 🔍 querySelector()
Selecciona el **primer elemento** que coincida con un selector CSS.
```javascript
let elemento = document.querySelector(".miClase");
let elemento2 = document.querySelector("#miId");
let elemento3 = document.querySelector("p");
let elemento4 = document.querySelector("div > p");
```
```html
<p class="miClase">Primer párrafo</p>
<p class="miClase">Segundo párrafo</p> <!-- Este NO se selecciona -->
```

> [!info] 📝 Selectores CSS
> Puedes usar **cualquier selector CSS** (clases, ids, etiquetas, hijos, etc.)

---

### 🔍 querySelectorAll()
Selecciona **todos los elementos** que coincidan con un selector CSS.
```javascript
let elementos = document.querySelectorAll(".miClase");
// Devuelve una NodeList (similar a un array)

// Recorrer los elementos
elementos.forEach(function(elemento) {
    console.log(elemento);
});
```
```html
<p class="miClase">Primer párrafo</p>
<p class="miClase">Segundo párrafo</p>
<p class="miClase">Tercer párrafo</p>
<!-- Los 3 se seleccionan -->
```

---

### 🔍 Otros métodos (menos usados)
```javascript
// Por clase (devuelve HTMLCollection)
let elementos = document.getElementsByClassName("miClase");

// Por etiqueta
let parrafos = document.getElementsByTagName("p");

// Por nombre (para formularios)
let inputs = document.getElementsByName("email");
```

> [!warning] ⚠️ Diferencia importante
> `getElementsByClassName` y `getElementsByTagName` devuelven **HTMLCollection** (colección viva), mientras que `querySelectorAll` devuelve **NodeList** (estática).

---

## ✏️ Modificar contenido

### 📝 textContent
Cambia o lee el **texto** de un elemento (sin HTML).
```javascript
let elemento = document.getElementById("titulo");

// Leer
console.log(elemento.textContent); // "Hola Mundo"

// Modificar
elemento.textContent = "Nuevo título";
```
```html
<h1 id="titulo">Hola Mundo</h1>
```

---

### 📝 innerHTML
Cambia o lee el **contenido HTML** de un elemento.
```javascript
let div = document.getElementById("contenedor");

// Leer
console.log(div.innerHTML); // "<p>Hola</p>"

// Modificar
div.innerHTML = "<strong>Texto en negrita</strong>";
```

> [!warning] ⚠️ Cuidado con innerHTML
> Puede ser un riesgo de seguridad si insertas contenido de usuarios sin sanitizar (XSS attacks).

---

### 📝 value
Obtiene o cambia el **valor** de inputs.
```javascript
let input = document.getElementById("nombre");

// Leer valor
console.log(input.value); // Lo que escribió el usuario

// Modificar valor
input.value = "Nuevo texto";

// Limpiar input
input.value = "";
```
```html
<input type="text" id="nombre" value="Juan">
```

---

## 🎨 Modificar estilos

### 🖌️ style
Modifica estilos CSS directamente (inline styles).
```javascript
let elemento = document.getElementById("caja");

elemento.style.color = "red";
elemento.style.backgroundColor = "yellow"; // ⚠️ camelCase
elemento.style.fontSize = "20px";
elemento.style.display = "none"; // Ocultar
elemento.style.display = "block"; // Mostrar
```

> [!info] 📝 CamelCase
> Las propiedades CSS con guiones se convierten a camelCase: `background-color` → `backgroundColor`

---

### 🎨 classList
Gestiona las clases CSS de un elemento.
```javascript
let elemento = document.getElementById("caja");

// Añadir clase
elemento.classList.add("activo");

// Quitar clase
elemento.classList.remove("inactivo");

// Alternar clase (toggle)
elemento.classList.toggle("resaltado"); // Si existe la quita, si no existe la añade

// Verificar si tiene una clase
if (elemento.classList.contains("activo")) {
    console.log("El elemento está activo");
}
```
```html
<div id="caja" class="contenedor"></div>
```
```css
.activo {
    background-color: green;
}
```

> [!tip] 💡 Mejor práctica
> Es mejor usar `classList` que modificar `style` directamente. Mantiene la separación entre CSS y JavaScript.

---

## ➕ Crear y añadir elementos

### 🆕 createElement()
Crea un **nuevo elemento HTML**.
```javascript
let nuevoParrafo = document.createElement("p");
let nuevoDiv = document.createElement("div");
let nuevoBoton = document.createElement("button");
```

---

### 📝 createTextNode()
Crea un **nodo de texto**.
```javascript
let texto = document.createTextNode("Hola Mundo");
```

---

### ➕ appendChild()
Añade un elemento como **hijo** al final de otro elemento.
```javascript
let lista = document.getElementById("miLista");
let nuevoItem = document.createElement("li");
let texto = document.createTextNode("Nuevo elemento");

nuevoItem.appendChild(texto);
lista.appendChild(nuevoItem);
```
```html
<ul id="miLista">
    <li>Item 1</li>
    <li>Item 2</li>
    <!-- El nuevo <li> se añade aquí -->
</ul>
```

---

### 💡 Ejemplo completo: Crear y añadir elemento
```javascript
// 1. Crear elemento
let newLi = document.createElement("li");

// 2. Crear texto
let texto = document.createTextNode("Nueva tarea");

// 3. Añadir texto al li
newLi.appendChild(texto);

// 4. Añadir el li a la lista
let lista = document.getElementById("tareas");
lista.appendChild(newLi);
```

**Forma más corta:**
```javascript
let newLi = document.createElement("li");
newLi.textContent = "Nueva tarea"; // Directamente con textContent
document.getElementById("tareas").appendChild(newLi);
```

---

## ❌ Eliminar elementos

### 🗑️ remove()
Elimina el elemento del DOM.
```javascript
let elemento = document.getElementById("borrar");
elemento.remove();
```

---

### 🗑️ removeChild()
Elimina un hijo específico (método antiguo).
```javascript
let lista = document.getElementById("miLista");
let item = document.getElementById("item3");
lista.removeChild(item);
```

> [!tip] 💡 Usar remove()
> Es más moderno y simple usar `.remove()` directamente.

---

### 🗑️ innerHTML = ""
Elimina **todo el contenido** de un elemento.
```javascript
let contenedor = document.getElementById("contenedor");
contenedor.innerHTML = ""; // Vacía todo el contenido
```

---

## 🎯 Eventos

### 👂 addEventListener()
Escucha eventos (clicks, teclas, movimientos, etc.) en un elemento.
```javascript
let boton = document.getElementById("miBoton");

boton.addEventListener("click", function() {
    alert("¡Hiciste clic!");
});
```

### 📋 Eventos más comunes

| Evento | Descripción | Ejemplo |
|--------|-------------|---------|
| `click` | 🖱️ Clic en el elemento | Botones |
| `dblclick` | 🖱️🖱️ Doble clic | Editar elemento |
| `input` | ⌨️ Cambio en input (tiempo real) | Búsqueda en vivo |
| `change` | ⌨️ Cambio en input (al perder foco) | Selects, checkboxes |
| `submit` | 📤 Envío de formulario | Validar formulario |
| `keydown` | ⌨️ Tecla presionada | Detectar Enter |
| `keyup` | ⌨️ Tecla soltada | Contador caracteres |
| `mouseenter` | 🖱️ Mouse entra en elemento | Hover effects |
| `mouseleave` | 🖱️ Mouse sale del elemento | Quitar hover |
| `focus` | 🎯 Input recibe foco | Resaltar campo |
| `blur` | 🎯 Input pierde foco | Validar campo |

### 💡 Ejemplo con parámetro event
```javascript
let input = document.getElementById("nombre");

input.addEventListener("keydown", function(event) {
    console.log("Tecla presionada:", event.key);
    
    if (event.key === "Enter") {
        console.log("¡Presionaste Enter!");
    }
});
```

---

## 🔗 Navegar por el DOM

### 👨‍👩‍👧‍👦 Relaciones entre elementos
```javascript
let elemento = document.getElementById("hijo");

// Padre
let padre = elemento.parentElement;

// Hijos
let hijos = elemento.children; // HTMLCollection
let primerHijo = elemento.firstElementChild;
let ultimoHijo = elemento.lastElementChild;

// Hermanos
let siguiente = elemento.nextElementSibling;
let anterior = elemento.previousElementSibling;
```
```html
<div id="padre">
    <p id="hijo1">Primer hijo</p>
    <p id="hijo2">Segundo hijo</p>
    <p id="hijo3">Tercer hijo</p>
</div>
```

---

## 🎯 Atributos

### 🔧 getAttribute() / setAttribute()
```javascript
let imagen = document.getElementById("foto");

// Leer atributo
let src = imagen.getAttribute("src");
console.log(src); // "foto.jpg"

// Modificar atributo
imagen.setAttribute("src", "nueva-foto.jpg");
imagen.setAttribute("alt", "Nueva descripción");

// Eliminar atributo
imagen.removeAttribute("title");
```

### 🔧 Acceso directo a atributos comunes
```javascript
let link = document.getElementById("miLink");

// Leer
console.log(link.href);
console.log(link.id);
console.log(link.className); // ⚠️ className, no class

// Modificar
link.href = "https://ejemplo.com";
link.id = "nuevoId";
```

---

## 💡 Ejemplos prácticos completos

### 📝 Lista de tareas dinámica
```javascript
let input = document.getElementById("nuevaTarea");
let botonAñadir = document.getElementById("añadir");
let lista = document.getElementById("listaTareas");

botonAñadir.addEventListener("click", function() {
    // Validar que no esté vacío
    if (input.value.trim() === "") {
        alert("Escribe una tarea");
        return;
    }
    
    // Crear nuevo elemento
    let nuevaTarea = document.createElement("li");
    nuevaTarea.textContent = input.value;
    
    // Añadir botón de borrar
    let botonBorrar = document.createElement("button");
    botonBorrar.textContent = "❌";
    botonBorrar.addEventListener("click", function() {
        nuevaTarea.remove();
    });
    
    // Añadir al DOM
    nuevaTarea.appendChild(botonBorrar);
    lista.appendChild(nuevaTarea);
    
    // Limpiar input
    input.value = "";
});
```

---

### 🎨 Cambiar tema (dark mode)
```javascript
let botonTema = document.getElementById("cambiarTema");

botonTema.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    
    if (document.body.classList.contains("dark-mode")) {
        botonTema.textContent = "☀️ Modo Claro";
    } else {
        botonTema.textContent = "🌙 Modo Oscuro";
    }
});
```
```css
body {
    background-color: white;
    color: black;
}

body.dark-mode {
    background-color: #1a1a1a;
    color: white;
}
```

---

### 🔍 Filtrar lista en tiempo real
```javascript
let buscador = document.getElementById("buscador");
let items = document.querySelectorAll(".item");

buscador.addEventListener("input", function() {
    let termino = buscador.value.toLowerCase();
    
    items.forEach(function(item) {
        let texto = item.textContent.toLowerCase();
        
        if (texto.includes(termino)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
});
```

---

## ⚡ Tips y buenas prácticas

> [!tip] 📍 Ubicación del script
> Coloca tu `<script>` al **final del body** o usa `defer` en el `<head>` para asegurar que el DOM esté cargado.
```html
<!-- Opción 1: Al final del body -->
<body>
    <!-- Tu HTML -->
    <script src="script.js"></script>
</body>

<!-- Opción 2: En el head con defer -->
<head>
    <script src="script.js" defer></script>
</head>
```

> [!tip] 🎯 Usa querySelector
> Para proyectos modernos, `querySelector` y `querySelectorAll` son más versátiles que `getElementById`.

> [!tip] 🎨 Separa estilos y comportamiento
> Usa `classList` en lugar de modificar `style` directamente. Mantiene tu código más limpio.

> [!warning] ⚠️ Performance
> Si necesitas hacer muchas modificaciones al DOM, es mejor hacerlas todas juntas que una por una.
```javascript
// ❌ Mal (múltiples modificaciones)
for (let i = 0; i < 100; i++) {
    let li = document.createElement("li");
    li.textContent = "Item " + i;
    lista.appendChild(li); // Modifica el DOM 100 veces
}

// ✅ Mejor (una sola modificación)
let fragmento = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    let li = document.createElement("li");
    li.textContent = "Item " + i;
    fragmento.appendChild(li);
}
lista.appendChild(fragmento); // Modifica el DOM 1 vez
```

---

## 📊 Resumen de métodos

### 🔍 Seleccionar
- `getElementById()` - Por ID (rápido)
- `querySelector()` - Primer elemento con selector CSS
- `querySelectorAll()` - Todos los elementos con selector CSS

### ✏️ Modificar contenido
- `textContent` - Texto plano
- `innerHTML` - HTML
- `value` - Valor de inputs

### 🎨 Estilos
- `style.propiedad` - Estilos inline
- `classList.add()` / `remove()` / `toggle()` - Clases CSS

### ➕ Crear/Añadir
- `createElement()` - Crear elemento
- `createTextNode()` - Crear texto
- `appendChild()` - Añadir hijo

### ❌ Eliminar
- `remove()` - Eliminar elemento
- `innerHTML = ""` - Vaciar contenido

### 👂 Eventos
- `addEventListener()` - Escuchar eventos

---

## 🔗 Enlaces útiles

- 📚 [MDN - DOM](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model)
- 📚 [MDN - Eventos](https://developer.mozilla.org/es/docs/Web/Events)
- 📖 [[JavaScript Básico]]
- 📅 [[Date]]

