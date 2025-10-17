# 🔀 Guía Completa de Ordenamiento en JavaScript

## 📌 Conceptos Fundamentales

### ¿Qué significa ordenar?

**Ordenar** es reorganizar elementos según un criterio específico:

- **Ascendente:** De menor a mayor (1, 2, 3...)
- **Descendente:** De mayor a menor (3, 2, 1...)
- **Alfabético:** Por orden del alfabeto (a, b, c...)
- **Personalizado:** Según una función que defines

---

## 🔢 1. Ordenar NÚMEROS

### Números en Array

```js
const numeros = [5, 2, 8, 1, 9, 3];

// ❌ INCORRECTO: sort() sin comparador
numeros.sort();
console.log(numeros); // [1, 2, 3, 5, 8, 9] ✅ Parece correcto

const numeros2 = [10, 5, 40, 25, 100];
numeros2.sort();
console.log(numeros2); // [10, 100, 25, 40, 5] ❌ ORDEN ALFABÉTICO!

// ✅ CORRECTO: Ascendente (menor a mayor)
const ascendente = [10, 5, 40, 25, 100];
ascendente.sort((a, b) => a - b);
console.log(ascendente); // [5, 10, 25, 40, 100] ✅

// ✅ CORRECTO: Descendente (mayor a menor)
const descendente = [10, 5, 40, 25, 100];
descendente.sort((a, b) => b - a);
console.log(descendente); // [100, 40, 25, 10, 5] ✅

// ⚠️ IMPORTANTE: sort() modifica el array original
const original = [3, 1, 2];
const ordenado = original.sort((a, b) => a - b);
console.log(original); // [1, 2, 3] - ¡Modificado!

// ✅ Para NO modificar el original
const sinModificar = [3, 1, 2];
const copiaOrdenada = [...sinModificar].sort((a, b) => a - b);
console.log(sinModificar);   // [3, 1, 2] - Original intacto
console.log(copiaOrdenada);  // [1, 2, 3] - Copia ordenada

// O usa toSorted() (ES2023)
const conToSorted = [3, 1, 2].toSorted((a, b) => a - b);
console.log(conToSorted); // [1, 2, 3] - No modifica original
```

**💡 Cómo funciona el comparador:**

```js
 Si devuelve < 0: a va antes que b
 Si devuelve > 0: b va antes que a
 Si devuelve 0: mantiene orden original

 Ascendente: a - b
 Si a=2, b=5 → 2-5=-3 (negativo) → a va antes ✅
 Si a=5, b=2 → 5-2=3 (positivo) → b va antes ✅

 Descendente: b - a
 Si a=2, b=5 → 5-2=3 (positivo) → b va antes ✅
 Si a=5, b=2 → 2-5=-3 (negativo) → a va antes ✅
```

---

### Números con decimales

```js
const decimales = [3.14, 2.71, 1.41, 0.5, 2.718];

// Ascendente
decimales.sort((a, b) => a - b);
console.log(decimales); // [0.5, 1.41, 2.71, 2.718, 3.14]

// Descendente
decimales.sort((a, b) => b - a);
console.log(decimales); // [3.14, 2.718, 2.71, 1.41, 0.5]
```

---

### Números negativos

```js
const conNegativos = [-5, 10, -3, 0, 8, -1, 3];

// Ascendente
conNegativos.sort((a, b) => a - b);
console.log(conNegativos); // [-5, -3, -1, 0, 3, 8, 10]

// Descendente
conNegativos.sort((a, b) => b - a);
console.log(conNegativos); // [10, 8, 3, 0, -1, -3, -5]
```

---

### Números en Set

```js
const numeros = new Set([5, 2, 8, 1, 9, 3]);

// ❌ Set NO tiene método sort()
// numeros.sort(); // Error

// ✅ Convertir a Array, ordenar, y volver a Set
const ordenado = new Set([...numeros].sort((a, b) => a - b));
console.log([...ordenado]); // [1, 2, 3, 5, 8, 9]

// O crear función reutilizable
function ordenarSet(set, comparador = (a, b) => a - b) {
    return new Set([...set].sort(comparador));
}

const ascendente = ordenarSet(numeros);
const descendente = ordenarSet(numeros, (a, b) => b - a);

console.log([...ascendente]);   // [1, 2, 3, 5, 8, 9]
console.log([...descendente]);  // [9, 8, 5, 3, 2, 1]
```

---

## 🔤 2. Ordenar STRINGS (Texto)

### Strings en Array (Orden alfabético simple)

```js
const frutas = ["plátano", "manzana", "uva", "pera"];

// Ascendente (A-Z)
frutas.sort();
console.log(frutas); // ["manzana", "pera", "plátano", "uva"]

// Descendente (Z-A)
frutas.sort((a, b) => b.localeCompare(a));
console.log(frutas); // ["uva", "plátano", "pera", "manzana"]

// O simplemente reverse después de sort
frutas.sort().reverse();
console.log(frutas); // ["uva", "plátano", "pera", "manzana"]

// ⚠️ Mayúsculas van ANTES que minúsculas (orden ASCII)
const letras = ["b", "A", "c", "B", "a"];
letras.sort();
console.log(letras); // ["A", "B", "a", "b", "c"] - Mayúsculas primero

// ✅ Ignorar mayúsculas/minúsculas
letras.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(letras); // ["A", "a", "B", "b", "c"]
```

---

### Strings con acentos y caracteres especiales

```js
const palabras = ["árbol", "casa", "ñandú", "barco", "ángel"];

// ❌ sort() simple NO respeta orden español
palabras.sort();
console.log(palabras); // ["barco", "casa", "ángel", "árbol", "ñandú"] ❌

// ✅ localeCompare() respeta idioma
palabras.sort((a, b) => a.localeCompare(b, "es"));
console.log(palabras); // ["ángel", "árbol", "barco", "casa", "ñandú"] ✅

// Diferentes idiomas
const aleman = ["Äpfel", "Österreich", "Zürich", "Berlin"];
aleman.sort((a, b) => a.localeCompare(b, "de"));
console.log(aleman); // Orden correcto en alemán

// Opciones avanzadas de localeCompare
const nombres = ["José", "jose", "JOSÉ"];
nombres.sort((a, b) => a.localeCompare(b, "es", {
    sensitivity: "base" // Ignora acentos y mayúsculas
}));
console.log(nombres); // ["José", "jose", "JOSÉ"] - Mantiene orden
```

---

### Strings por longitud

```js
const palabras = ["hola", "mundo", "javascript", "js", "programación"];

// Ascendente (más corta a más larga)
palabras.sort((a, b) => a.length - b.length);
console.log(palabras); // ["js", "hola", "mundo", "javascript", "programación"]

// Descendente (más larga a más corta)
palabras.sort((a, b) => b.length - a.length);
console.log(palabras); // ["programación", "javascript", "mundo", "hola", "js"]

// Por longitud, y alfabéticamente si son iguales
palabras.sort((a, b) => {
    if (a.length !== b.length) {
        return a.length - b.length;
    }
    return a.localeCompare(b);
});
```

---

### Ordenar caracteres dentro de un String

```js
const texto = "javascript";

// Convertir a array, ordenar, y volver a string
const ordenado = texto.split("").sort().join("");
console.log(ordenado); // "aacijprstv"

// Descendente
const desc = texto.split("").sort((a, b) => b.localeCompare(a)).join("");
console.log(desc); // "vtsrpjicaa"

// Función reutilizable
function ordenarCaracteres(str, ascendente = true) {
    const chars = str.split("").sort();
    return ascendente ? chars.join("") : chars.reverse().join("");
}

console.log(ordenarCaracteres("hola")); // "ahlo"
console.log(ordenarCaracteres("hola", false)); // "olha"
```

---

### Strings en Set

```js
const palabras = new Set(["zebra", "manzana", "perro", "gato"]);

// Convertir a array, ordenar, volver a Set
const ordenado = new Set([...palabras].sort());
console.log([...ordenado]); // ["gato", "manzana", "perro", "zebra"]

// Con localeCompare
const conAcentos = new Set(["árbol", "casa", "ñandú"]);
const ordenadoES = new Set(
    [...conAcentos].sort((a, b) => a.localeCompare(b, "es"))
);
console.log([...ordenadoES]); // ["árbol", "casa", "ñandú"]
```

---

## 🗺️ 3. Ordenar MAP

### Por claves

```js
const mapa = new Map([
    ["c", 3],
    ["a", 1],
    ["b", 2]
]);

// Ordenar por claves (alfabéticamente)
const porClaves = new Map(
    [...mapa.entries()].sort((a, b) => a[0].localeCompare(b[0]))
);

console.log([...porClaves]);
// [["a", 1], ["b", 2], ["c", 3]]

// Con claves numéricas
const numeros = new Map([
    [3, "tres"],
    [1, "uno"],
    [2, "dos"]
]);

const ordenadoNum = new Map(
    [...numeros.entries()].sort((a, b) => a[0] - b[0])
);

console.log([...ordenadoNum]);
// [[1, "uno"], [2, "dos"], [3, "tres"]]
```

---

### Por valores

```js
const mapa = new Map([
    ["Ana", 25],
    ["Juan", 30],
    ["María", 22]
]);

// Ordenar por valores (edades)
const porValores = new Map(
    [...mapa.entries()].sort((a, b) => a[1] - b[1])
);

console.log([...porValores]);
// [["María", 22], ["Ana", 25], ["Juan", 30]]

// Descendente
const descendente = new Map(
    [...mapa.entries()].sort((a, b) => b[1] - a[1])
);

console.log([...descendente]);
// [["Juan", 30], ["Ana", 25], ["María", 22]]
```

---

### Función reutilizable para Map

```js
function ordenarMap(mapa, porClave = true, ascendente = true) {
    const pares = [...mapa.entries()];
    
    pares.sort((a, b) => {
        const valorA = porClave ? a[0] : a[1];
        const valorB = porClave ? b[0] : b[1];
        
        let comparacion;
        if (typeof valorA === "string") {
            comparacion = valorA.localeCompare(valorB);
        } else {
            comparacion = valorA - valorB;
        }
        
        return ascendente ? comparacion : -comparacion;
    });
    
    return new Map(pares);
}

const datos = new Map([
    ["z", 10],
    ["a", 30],
    ["m", 20]
]);

console.log([...ordenarMap(datos, true, true)]);   // Por clave ascendente
console.log([...ordenarMap(datos, false, true)]);  // Por valor ascendente
console.log([...ordenarMap(datos, false, false)]); // Por valor descendente
```

---

## 🎯 4. Ordenar SET (indirectamente)

```js
// Set no tiene orden modificable directamente
// Siempre mantiene el orden de inserción

const numeros = new Set([5, 2, 8, 1, 9]);

// Para "ordenar" un Set: convertir a array, ordenar, crear nuevo Set
const ordenado = new Set([...numeros].sort((a, b) => a - b));
console.log([...ordenado]); // [1, 2, 5, 8, 9]

// Con strings
const palabras = new Set(["zebra", "manzana", "gato"]);
const ordenadoAZ = new Set([...palabras].sort());
console.log([...ordenadoAZ]); // ["gato", "manzana", "zebra"]

// Función genérica
function ordenarSet(set, comparador) {
    return new Set([...set].sort(comparador));
}

const nums = new Set([5, 2, 8, 1]);
console.log([...ordenarSet(nums, (a, b) => a - b)]); // [1, 2, 5, 8]
console.log([...ordenarSet(nums, (a, b) => b - a)]); // [8, 5, 2, 1]
```

---

## 📦 5. Ordenar OBJETOS en Arrays

### Por una propiedad numérica

```js
const personas = [
    {nombre: "Ana", edad: 25},
    {nombre: "Juan", edad: 30},
    {nombre: "María", edad: 22}
];

// Por edad ascendente
personas.sort((a, b) => a.edad - b.edad);
console.log(personas);
// [{nombre: "María", edad: 22}, {nombre: "Ana", edad: 25}, {nombre: "Juan", edad: 30}]

// Por edad descendente
personas.sort((a, b) => b.edad - a.edad);
console.log(personas);
// [{nombre: "Juan", edad: 30}, {nombre: "Ana", edad: 25}, {nombre: "María", edad: 22}]
```

---

### Por una propiedad string

```js
const productos = [
    {nombre: "Laptop", precio: 1000},
    {nombre: "Mouse", precio: 20},
    {nombre: "Teclado", precio: 50}
];

// Por nombre (alfabéticamente)
productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
console.log(productos);
// [{nombre: "Laptop", ...}, {nombre: "Mouse", ...}, {nombre: "Teclado", ...}]

// Con acentos
const libros = [
    {titulo: "Ángel caído"},
    {titulo: "Barco pirata"},
    {titulo: "Árbol mágico"}
];

libros.sort((a, b) => a.titulo.localeCompare(b.titulo, "es"));
console.log(libros);
// [{titulo: "Ángel caído"}, {titulo: "Árbol mágico"}, {titulo: "Barco pirata"}]
```

---

### Por múltiples criterios

```js
const estudiantes = [
    {nombre: "Ana", nota: 85, edad: 20},
    {nombre: "Juan", nota: 85, edad: 22},
    {nombre: "María", nota: 90, edad: 20},
    {nombre: "Pedro", nota: 85, edad: 20}
];

// Primero por nota (descendente), luego por nombre (ascendente)
estudiantes.sort((a, b) => {
    // Primero comparar notas
    if (a.nota !== b.nota) {
        return b.nota - a.nota; // Descendente
    }
    // Si notas iguales, comparar nombres
    return a.nombre.localeCompare(b.nombre);
});

console.log(estudiantes);
// María (90), Ana (85), Juan (85), Pedro (85)

// Primero por nota, luego por edad, luego por nombre
estudiantes.sort((a, b) => {
    if (a.nota !== b.nota) return b.nota - a.nota;
    if (a.edad !== b.edad) return a.edad - b.edad;
    return a.nombre.localeCompare(b.nombre);
});

console.log(estudiantes);
// María (90, 20), Ana (85, 20), Pedro (85, 20), Juan (85, 22)
```

---

### Por propiedad booleana

```js
const tareas = [
    {nombre: "Comprar", completada: false},
    {nombre: "Leer", completada: true},
    {nombre: "Cocinar", completada: false},
    {nombre: "Estudiar", completada: true}
];

// Completadas primero
tareas.sort((a, b) => {
    if (a.completada === b.completada) return 0;
    return a.completada ? -1 : 1;
});

// O más simple con conversión a número
tareas.sort((a, b) => b.completada - a.completada);
console.log(tareas);
// [{nombre: "Leer", completada: true}, {nombre: "Estudiar", completada: true}, ...]

// Pendientes primero
tareas.sort((a, b) => a.completada - b.completada);
```

---

### Por fecha

```js
const eventos = [
    {nombre: "Reunión", fecha: new Date("2025-03-15")},
    {nombre: "Conferencia", fecha: new Date("2025-01-10")},
    {nombre: "Taller", fecha: new Date("2025-02-20")}
];

// Ascendente (más antigua primero)
eventos.sort((a, b) => a.fecha - b.fecha);
console.log(eventos);
// Conferencia (2025-01-10), Taller (2025-02-20), Reunión (2025-03-15)

// Descendente (más reciente primero)
eventos.sort((a, b) => b.fecha - a.fecha);
console.log(eventos);
// Reunión (2025-03-15), Taller (2025-02-20), Conferencia (2025-01-10)

// Con strings de fecha
const conStrings = [
    {fecha: "2025-03-15"},
    {fecha: "2025-01-10"},
    {fecha: "2025-02-20"}
];

conStrings.sort((a, b) => a.fecha.localeCompare(b.fecha));
// Funciona porque el formato YYYY-MM-DD se ordena correctamente
```

---

### Por propiedad anidada

```js
const usuarios = [
    {nombre: "Ana", perfil: {puntos: 150}},
    {nombre: "Juan", perfil: {puntos: 200}},
    {nombre: "María", perfil: {puntos: 175}}
];

// Por puntos
usuarios.sort((a, b) => b.perfil.puntos - a.perfil.puntos);
console.log(usuarios);
// Juan (200), María (175), Ana (150)

// Con propiedades muy anidadas
const datos = [
    {info: {estadisticas: {total: 100}}},
    {info: {estadisticas: {total: 50}}},
    {info: {estadisticas: {total: 150}}}
];

datos.sort((a, b) => a.info.estadisticas.total - b.info.estadisticas.total);
```

---

## 🔧 6. Funciones de Ordenamiento Reutilizables

### Comparador genérico por propiedad

```js
function compararPor(propiedad, ascendente = true) {
    return function(a, b) {
        const valorA = a[propiedad];
        const valorB = b[propiedad];
        
        let comparacion;
        if (typeof valorA === "string") {
            comparacion = valorA.localeCompare(valorB);
        } else if (valorA instanceof Date) {
            comparacion = valorA - valorB;
        } else {
            comparacion = valorA - valorB;
        }
        
        return ascendente ? comparacion : -comparacion;
    };
}

// Uso
const productos = [
    {nombre: "Laptop", precio: 1000},
    {nombre: "Mouse", precio: 20},
    {nombre: "Teclado", precio: 50}
];

productos.sort(compararPor("precio")); // Ascendente por precio
productos.sort(compararPor("nombre")); // Ascendente por nombre
productos.sort(compararPor("precio", false)); // Descendente por precio
```

---

### Ordenamiento múltiple

```js
function ordenarPorMultiples(...criterios) {
    return function(a, b) {
        for (const {propiedad, ascendente = true} of criterios) {
            const valorA = a[propiedad];
            const valorB = b[propiedad];
            
            if (valorA === valorB) continue;
            
            let comparacion;
            if (typeof valorA === "string") {
                comparacion = valorA.localeCompare(valorB);
            } else {
                comparacion = valorA - valorB;
            }
            
            return ascendente ? comparacion : -comparacion;
        }
        return 0;
    };
}

// Uso
const estudiantes = [
    {nombre: "Ana", nota: 85, edad: 20},
    {nombre: "Juan", nota: 85, edad: 22},
    {nombre: "María", nota: 90, edad: 20}
];

estudiantes.sort(ordenarPorMultiples(
    {propiedad: "nota", ascendente: false},
    {propiedad: "edad", ascendente: true},
    {propiedad: "nombre", ascendente: true}
));
```

---

## 🎨 7. Casos Especiales

### Ordenar por valores personalizados

```js
const prioridades = {
    "urgente": 1,
    "alta": 2,
    "media": 3,
    "baja": 4
};

const tareas = [
    {nombre: "Tarea 1", prioridad: "media"},
    {nombre: "Tarea 2", prioridad: "urgente"},
    {nombre: "Tarea 3", prioridad: "baja"},
    {nombre: "Tarea 4", prioridad: "alta"}
];

tareas.sort((a, b) => {
    return prioridades[a.prioridad] - prioridades[b.prioridad];
});

console.log(tareas);
// urgente, alta, media, baja
```

---

### Ordenar mezclando números y strings

```js
const mixto = ["10", 5, "40", 25, "100", 3];

// Convertir todo a números
mixto.sort((a, b) => Number(a) - Number(b));
console.log(mixto); // [3, 5, "10", 25, "40", "100"]

// O separar por tipo
const soloNumeros = mixto.filter(x => typeof x === "number").sort((a, b) => a - b);
const soloStrings = mixto.filter(x => typeof x === "string").sort((a, b) => Number(a) - Number(b));
const ordenado = [...soloNumeros, ...soloStrings];
```

---

### Ordenar aleatoriamente (shuffle)

```js
const array = [1, 2, 3, 4, 5];

// ⚠️ NO es perfectamente aleatorio
array.sort(() => Math.random() - 0.5);

// ✅ Mejor algoritmo (Fisher-Yates)
function shuffle(array) {
    const resultado = [...array];
    for (let i = resultado.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [resultado[i], resultado[j]] = [resultado[j], resultado[i]];
    }
    return resultado;
}

console.log(shuffle([1, 2, 3, 4, 5]));
```

---

### Ordenar con valores null/undefined

```js
const conNulos = [3, null, 1, undefined, 5, null, 2];

// Nulos/undefined al final
conNulos.sort((a, b) => {
    if (a == null) return 1;  // a al final
    if (b == null) return -1; // b al final
    return a - b;
});
console.log(conNulos); // [1, 2, 3, 5, null, undefined, null]

// O filtrar primero
const sinNulos = conNulos.filter(x => x != null).sort((a, b) => a - b);
console.log(sinNulos); // [1, 2, 3, 5]
```

---

## 📊 8. Comparación de Métodos

|Estructura|Tiene sort()|Modifica Original|Alternativa Inmutable|
|---|---|---|---|
|Array|✅ Sí|✅ Sí|`[...arr].sort()` o `toSorted()`|
|String|❌ No|-|`str.split("").sort().join("")`|
|Set|❌ No|-|`new Set([...set].sort())`|
|Map|❌ No|-|`new Map([...map].sort())`|
|Object|❌ No|-|Convertir entries, ordenar, recrear|

---

## 💡 Tips y Mejores Prácticas

### 1. Siempre usa comparador con números

```js
// ❌ MAL
[10, 5, 40].sort(); // [10, 40, 5]

// ✅ BIEN
[10, 5, 40].sort((a, b) => a - b); // [5, 10, 40]
```

---

### 2. No modifiques el original si no es necesario

```js
// ❌ Modifica original
const nums = [3, 1, 2];
nums.sort((a, b) => a - b);

// ✅ Crea copia
const ordenado = [...nums].sort((a, b) => a - b);

// ✅ O usa toSorted()
const ordenado2 = nums.toSorted((a, b) => a - b);
```

---

### 3. Usa localeCompare para strings

```js
// ❌ Puede fallar con acentos
["ñ", "n", "o"].sort(); // ["n", "o", "ñ"] ❌

// ✅ Respeta idioma
["ñ", "n", "o"].sort((a, b) => a.localeCompare(b, "es")); // ["n", "ñ", "o"] ✅
```

---

### 4. Cachea propiedades en ordenamientos complejos

```js
// ❌ Ineficiente: calcula toUpperCase() muchas veces
arr.sort((a, b) => a.nombre.toUpperCase().localeCompare(b.nombre.toUpperCase()));

// ✅ Más eficiente: cachea el cálculo
const conCache = arr.map(item => ({
    original: item,
    cacheado: item.nombre.toUpperCase()
}));

conCache.sort((a, b) => a.cacheado.localeCompare(b.cacheado));

const resultado = conCache.map(item => item.original);
```

---

## 🎯 Resumen Rápido

```js
// NÚMEROS
[3, 1, 2].sort((a, b) => a - b);        // Ascendente
[3, 1, 2].sort((a, b) => b - a);        // Descendente

// STRINGS
["c", "a", "b"].sort();                 // A-Z
["c", "a", "b"].sort().reverse();       // Z-A
arr.sort((a, b) => a.localeCompare(b, "es")); // Con acentos

// OBJETOS
arr.sort((a, b) => a.edad - b.edad);    // Por propiedad numérica
arr.sort((a, b) => a.nombre.localeCompare(b.nombre)); // Por propiedad string

// SET/MAP (convertir a array)
new Set([...set].sort((a, b) => a - b));
new Map([...map].sort((a, b) => a[0] - b[0]));

// NO MODIFICAR ORIGINAL
[...arr].sort() o arr.toSorted()
```