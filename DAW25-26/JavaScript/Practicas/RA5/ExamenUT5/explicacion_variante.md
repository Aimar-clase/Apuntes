# Explicación del Ejercicio Variante: "Atrapa la Palabra - Onda Sinusoidal"

Este ejercicio es una variante del juego original "Atrapa la Palabra". Se han introducido dos cambios fundamentales en la lógica del juego para demostrar diferentes técnicas de animación y control de tiempo en JavaScript.

## 1. Recursive `setTimeout` vs `setInterval`

En el juego original, el spawn (aparición) de palabras se controlaba dentro del bucle principal (`loop`) comprobando si había pasado cierto tiempo desde la última aparición.

En esta variante, hemos implementado un patrón de **`setTimeout` recursivo** para controlar la aparición de palabras.

### ¿Por qué este cambio?
`setInterval` ejecuta una función repetidamente con un intervalo fijo. Si queremos cambiar ese intervalo dinámicamente (por ejemplo, para que el juego sea más impredecible), `setInterval` puede ser rígido o requerir limpiar y recrear el intervalo constantemente.

El patrón de `setTimeout` recursivo nos permite:
1.  **Intervalos Dinámicos**: Calcular un nuevo tiempo de espera para *cada* iteración. En este ejercicio, usamos `Math.random()` para variar ligeramente el tiempo entre palabras, haciendo el ritmo menos mecánico.
2.  **Mejor Control**: Evita que se acumulen llamadas si la pestaña del navegador se queda en segundo plano (aunque `requestAnimationFrame` ya ayuda con esto para el renderizado, `setTimeout` es bueno para la lógica).

### Código Implementado
```javascript
scheduleNextSpawn() {
    if (!this.state.isPlaying) return;

    // Calculamos un retraso variable para la próxima palabra
    // Esto hace que el juego se sienta más orgánico y menos robótico
    const randomVariation = Math.random() * 500; 
    const nextSpawnDelay = Math.max(500, this.state.spawnRate - randomVariation);

    this.state.spawnTimer = setTimeout(() => {
        if (this.state.isPlaying) {
            this.spawnWord();
            this.scheduleNextSpawn(); // Llamada recursiva
        }
    }, nextSpawnDelay);
}
```

## 2. Animación de Onda Sinusoidal

En el juego original, las palabras caían en línea recta (solo cambiaba su coordenada Y). En esta variante, hemos añadido un movimiento horizontal basado en una función **Seno** (`Math.sin`), creando un efecto de onda.

### Lógica Matemática
La posición X de cada palabra se calcula en cada frame usando la fórmula:
`x = x_inicial + amplitud * sin(y * frecuencia)`

*   **Amplitud (50px)**: Cuánto se desplaza la palabra a izquierda y derecha.
*   **Frecuencia (0.02)**: Qué tan rápido oscila la onda en relación a la caída.

### Código Implementado
```javascript
updateWords() {
    // ...
    word.y += this.state.speed;
    
    // Movimiento sinusoidal
    const amplitude = 50;
    const frequency = 0.02;
    word.x = word.initialX + Math.sin(word.y * frequency) * amplitude;

    // ...
    word.element.style.top = `${word.y}px`;
    word.element.style.left = `${word.x}px`;
}
```

## Resumen
Esta variante demuestra cómo una pequeña alteración en la lógica de actualización (`updateWords`) y en el control de flujo (`scheduleNextSpawn`) puede cambiar drásticamente la sensación ("game feel") del juego, haciéndolo más dinámico y visualmente interesante.
