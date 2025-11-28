# ⏱️ Apuntes: Temporizadores en JavaScript y el DOM

En JavaScript, el manejo del tiempo se controla principalmente a través de dos funciones del objeto global `window`: `setTimeout` y `setInterval`. Ambas son **asíncronas** (no bloquean el resto de tu código).

---

## 1. setTimeout: "Hazlo una vez, después de un rato"

Ejecuta una función **una sola vez** después de que haya pasado un tiempo específico.

### Sintaxis
```javascript
let id = setTimeout(funcionCallback, milisegundos);
```

### ¿Cuándo usarlo?
* **Retrasar una acción:** Mostrar un aviso a los 5 segundos.
* **Debouncing (Rebote):** Optimizar buscadores (ver sección 3).
* **Animaciones:** Esperas breves para transiciones CSS.

### ¿Cómo cancelarlo?
Si necesitas evitar que ocurra, usa `clearTimeout` pasando el ID devuelto.

```javascript
const temporizador = setTimeout(() => {
    console.log("Esto nunca se verá si se cancela");
}, 3000);

clearTimeout(temporizador); // Cancela la ejecución
```

---

## 2. setInterval: "Hazlo repetidamente"

Ejecuta una función **infinitamente** en intervalos de tiempo definidos.

### Sintaxis
```javascript
let id = setInterval(funcionCallback, milisegundos);
```

### ¿Cuándo usarlo?
* **Relojes / Contadores:** Actualizar cada segundo.
* **Sliders:** Cambiar imágenes automáticamente.
* **Polling:** Consultar datos al servidor periódicamente.

### ¿Cómo detenerlo?
Es vital limpiar el intervalo con `clearInterval` para evitar problemas de rendimiento (memory leaks).

```javascript
const intervalo = setInterval(() => console.log("Hola"), 1000);

clearInterval(intervalo); // Detiene el bucle
```

---

## 3. Integración con Eventos del DOM

Ejemplos prácticos combinando eventos (`click`, `input`) con temporizadores.

### A. Cronómetro (Start / Stop)

```javascript
let cuenta = 0;
let intervaloID = null;
const display = document.getElementById('contador');

// Botón Iniciar
document.getElementById('btnStart').addEventListener('click', () => {
    // Verificamos si ya existe para no crear dobles intervalos
    if (!intervaloID) {
        intervaloID = setInterval(() => {
            cuenta++;
            display.innerText = cuenta;
        }, 1000);
    }
});

// Botón Parar
document.getElementById('btnStop').addEventListener('click', () => {
    if (intervaloID) {
        clearInterval(intervaloID);
        intervaloID = null; // Limpieza de variable
    }
});
```

### B. Patrón Debounce (Buscador Optimizado)

Evita ejecutar código por cada tecla pulsada. Espera a que el usuario termine de escribir.

```javascript
const input = document.getElementById('buscador');
let timeoutID = null;

input.addEventListener('input', (e) => {
    // 1. Si el usuario sigue escribiendo, cancelamos el timer anterior
    clearTimeout(timeoutID);

    // 2. Iniciamos uno nuevo
    timeoutID = setTimeout(() => {
        // Esta lógica solo corre si pasan 500ms sin escribir
        console.log(`Buscando: ${e.target.value}`);
    }, 500);
});
```

---

## 4. Diferencias Clave

| Característica | setTimeout | setInterval |
| :--- | :--- | :--- |
| **Frecuencia** | 1 vez. | N veces (bucle). |
| **Detención** | `clearTimeout(id)` | `clearInterval(id)` |
| **Uso Principal** | Retrasos, UI Asíncrona. | Relojes, Polling, Animación continua. |

---

## 5. Pro-Tip: El "Drift" (Desviación)

`setInterval` no siempre es preciso y puede acumular errores si la función tarda mucho en ejecutarse. Para tareas de alta precisión o recursivas, se prefiere un **setTimeout recursivo**:

```javascript
function bucle() {
    // Hacer tarea...
    console.log("Tarea hecha");
    
    // Llamarse a sí mismo al terminar
    setTimeout(bucle, 1000);
}
bucle();
```