# 🎯 Guía Completa de Set en JavaScript

## 📌 Conceptos Fundamentales

### ¿Qué es un Set?

Un **Set** es una colección de **valores únicos** donde:

- **No hay duplicados:** Cada valor solo puede aparecer una vez
- **Cualquier tipo de valor:** Números, strings, objetos, etc.
- **Mantiene el orden de inserción**
- **Optimizado** para verificar existencia

```js
// Crear un Set vacío
const conjunto = new Set();

// Crear con valores iniciales
const numeros = new Set([1, 2, 3, 4, 5]);
console.log(numeros); // Set(5) {1, 2, 3, 4, 5}

// Los duplicados se eliminan automáticamente
const conDuplicados = new Set([1, 2, 2, 3, 3, 3, 4]);
console.log(conDuplicados); // Set(4) {1, 2, 3, 4}
```

### 🔑 Características importantes:

- **Valores únicos:** Automáticamente elimina duplicados
- **Sin claves:** Solo valores (a diferencia de Map)
- **Orden garantizado:** Mantiene orden de inserción
- **Búsqueda rápida:** Verificar existencia es O(1)

---

## 🆚 Set vs Array: ¿Cuándo usar cada uno?

### Usa **Set** cuando:

✅ Necesitas **valores únicos** (sin duplicados)  
✅ Verificar existencia es frecuente (`has()` es O(1))  
✅ Agregar/eliminar elementos es frecuente  
✅ No necesitas índices numéricos  
✅ El orden de inserción es importante

### Usa **Array** cuando:

✅ Permites duplicados  
✅ Necesitas acceso por índice (`arr[0]`)  
✅ Necesitas métodos como `map()`, `filter()`, `reduce()`  
✅ El orden es manipulable (sort, reverse, etc.)  
✅ Trabajas con JSON (arrays son nativos en JSON)

```js
// ❌ Array ineficiente para verificar existencia
const arr = [1, 2, 3, 4, 5];
console.log(arr.includes(3)); // O(n) - recorre todo

// ✅ Set eficiente para verificar existencia
const set = new Set([1, 2, 3, 4, 5]);
console.log(set.has(3)); // O(1) - acceso directo
```

---

## 📏 1. Propiedad Fundamental

### `size`

**Devuelve:** `Number` - Cantidad de valores únicos  
**Descripción:** Propiedad de solo lectura que indica el tamaño del Set

```js
const frutas = new Set(["manzana", "pera", "plátano"]);
console.log(frutas.size); // 3

frutas.add("uva");
console.log(frutas.size); // 4

// Duplicados NO incrementan el tamaño
frutas.add("manzana");
console.log(frutas.size); // 4 (sigue siendo 4)

frutas.delete("pera");
console.log(frutas.size); // 3

frutas.clear();
console.log(frutas.size); // 0

// ⚠️ Es propiedad, NO método
console.log(frutas.size);   // ✅ Correcto
// console.log(frutas.size()); // ❌ Error
```

**💡 Diferencia con Array:**

```js
// Array puede tener duplicados
const arr = [1, 1, 2, 2, 3, 3];
console.log(arr.length); // 6

// Set elimina duplicados
const set = new Set([1, 1, 2, 2, 3, 3]);
console.log(set.size); // 3
```

---

## ➕ 2. Métodos de Modificación (MUY USADOS)

### `add(valor)`

**Devuelve:** `Set` - El mismo Set (permite encadenamiento)  
**Parámetros:** `valor` (any) - El valor a agregar  
**⚠️ Modifica el original:** SÍ

```js
const numeros = new Set();

// Agregar elementos
numeros.add(1);
numeros.add(2);
numeros.add(3);
console.log(numeros); // Set(3) {1, 2, 3}

// Intentar agregar duplicado (se ignora)
numeros.add(2);
console.log(numeros); // Set(3) {1, 2, 3} (no cambia)

// Agregar diferentes tipos
const mixto = new Set();
mixto.add(1);
mixto.add("1");
mixto.add(true);
mixto.add(null);
mixto.add(undefined);
mixto.add({id: 1});
console.log(mixto.size); // 6 (todos son diferentes)

// Encadenamiento
numeros
    .add(4)
    .add(5)
    .add(6);
console.log(numeros); // Set(6) {1, 2, 3, 4, 5, 6}

// ⚠️ Objetos se comparan por referencia
const obj1 = {id: 1};
const obj2 = {id: 1};

const objetos = new Set();
objetos.add(obj1);
objetos.add(obj2); // Se agrega (diferente referencia)
console.log(objetos.size); // 2

objetos.add(obj1); // NO se agrega (misma referencia)
console.log(objetos.size); // 2

// ⚠️ NaN se trata como único valor
const especial = new Set();
especial.add(NaN);
especial.add(NaN); // Se ignora
console.log(especial.size); // 1

// +0 y -0 se consideran iguales
especial.add(0);
especial.add(-0); // Se ignora
console.log(especial.size); // 2 (NaN y 0)
```

**💡 Uso práctico: Eliminar duplicados de array**

```js
const array = [1, 2, 2, 3, 4, 4, 5];
const unicos = [...new Set(array)];
console.log(unicos); // [1, 2, 3, 4, 5]

// Más legible como función
function eliminarDuplicados(arr) {
    return [...new Set(arr)];
}

console.log(eliminarDuplicados([1, 1, 2, 3, 3])); // [1, 2, 3]
```

---

### `delete(valor)`

**Devuelve:** `Boolean` - true si se eliminó, false si no existía  
**Parámetros:** `valor` (any) - El valor a eliminar  
**⚠️ Modifica el original:** SÍ

```js
const colores = new Set(["rojo", "verde", "azul"]);

// Eliminar valor existente
let eliminado = colores.delete("verde");
console.log(eliminado); // true
console.log(colores.size); // 2
console.log(colores.has("verde")); // false

// Intentar eliminar valor inexistente
eliminado = colores.delete("amarillo");
console.log(eliminado); // false
console.log(colores.size); // 2 (no cambia)

// Con objetos (por referencia)
const obj = {id: 1};
const objetos = new Set([obj]);

objetos.delete({id: 1}); // false (diferente referencia)
console.log(objetos.size); // 1 (no se eliminó)

objetos.delete(obj); // true (misma referencia)
console.log(objetos.size); // 0 (eliminado)

// Uso práctico: eliminar si existe
if (colores.delete("rojo")) {
    console.log("Color eliminado");
} else {
    console.log("Color no existía");
}

// Eliminar múltiples valores
const numeros = new Set([1, 2, 3, 4, 5]);
[2, 4].forEach(n => numeros.delete(n));
console.log([...numeros]); // [1, 3, 5]
```

---

### `clear()`

**Devuelve:** `undefined`  
**Parámetros:** Ninguno  
**⚠️ Modifica el original:** SÍ

```js
const letras = new Set(["a", "b", "c", "d"]);
console.log(letras.size); // 4

letras.clear();

console.log(letras.size); // 0
console.log(letras.has("a")); // false
console.log([...letras]); // []

// El Set sigue existiendo, solo está vacío
letras.add("x");
console.log(letras.size); // 1

// Uso práctico: resetear colección
const visitados = new Set();
// ... se agregan URLs visitadas ...
visitados.clear(); // Resetear historial
```

---

## 🔍 3. Métodos de Verificación (MUY USADOS)

### `has(valor)`

**Devuelve:** `Boolean` - true si el valor existe  
**Parámetros:** `valor` (any) - El valor a verificar  
**⚠️ Modifica el original:** NO

```js
const numeros = new Set([1, 2, 3, 4, 5]);

// Verificar existencia
console.log(numeros.has(3)); // true
console.log(numeros.has(10)); // false

// Con diferentes tipos
const mixto = new Set([1, "1", true, null]);
console.log(mixto.has(1));     // true
console.log(mixto.has("1"));   // true
console.log(mixto.has(true));  // true
console.log(mixto.has(null));  // true

// ⚠️ Con objetos (por referencia)
const obj = {id: 1};
const objetos = new Set([obj]);

console.log(objetos.has(obj));     // true
console.log(objetos.has({id: 1})); // false (diferente objeto)

// NaN
const especial = new Set([NaN]);
console.log(especial.has(NaN)); // true (funciona correctamente)

// Uso práctico: validar permisos
const permisos = new Set(["leer", "escribir", "eliminar"]);

function tienePermiso(accion) {
    return permisos.has(accion);
}

console.log(tienePermiso("leer"));     // true
console.log(tienePermiso("ejecutar")); // false

// Verificar múltiples valores
const requeridos = ["admin", "editor"];
const roles = new Set(["admin", "viewer"]);

const tieneAcceso = requeridos.some(r => roles.has(r));
console.log(tieneAcceso); // true (tiene "admin")
```

**💡 Ventaja de rendimiento sobre Array:**

```js
const arr = Array.from({length: 10000}, (_, i) => i);
const set = new Set(arr);

// Array.includes() - O(n) - lento
console.time("array");
arr.includes(9999);
console.timeEnd("array"); // ~0.05ms

// Set.has() - O(1) - rápido
console.time("set");
set.has(9999);
console.timeEnd("set"); // ~0.001ms
```

---

## 🔄 4. Métodos de Iteración (MUY USADOS)

### `forEach(callback, thisArg)`

**Devuelve:** `undefined`  
**Parámetros:**

- `callback(valor, valorDuplicado, set)` - función a ejecutar
- `thisArg` (opcional) - valor de `this`  
    **⚠️ Modifica el original:** NO

```js
const frutas = new Set(["manzana", "pera", "plátano"]);

// Iterar sobre todos los valores
frutas.forEach(fruta => {
    console.log(fruta);
});
// manzana
// pera
// plátano

// ⚠️ Set NO tiene claves, ambos parámetros son el mismo valor
frutas.forEach((valor, valorDuplicado, conjunto) => {
    console.log(valor === valorDuplicado); // true
    console.log(`Valor: ${valor}, Tamaño: ${conjunto.size}`);
});

// Esto es por compatibilidad con Map
// Map.forEach((valor, clave, mapa) => ...)
// Set.forEach((valor, valor, set) => ...)

// Uso práctico: transformar valores
const numeros = new Set([1, 2, 3]);
const dobles = new Set();

numeros.forEach(n => {
    dobles.add(n * 2);
});

console.log([...dobles]); // [2, 4, 6]
```

---

### `for...of` (Recomendado)

**Sintaxis:** `for (const valor of set)`  
**Descripción:** Itera sobre valores directamente

```js
const colores = new Set(["rojo", "verde", "azul"]);

// Iterar sobre valores
for (const color of colores) {
    console.log(color);
}
// rojo
// verde
// azul

// Uso práctico: buscar con break
for (const color of colores) {
    if (color.startsWith("v")) {
        console.log(`Encontrado: ${color}`);
        break; // Puedes salir (no con forEach)
    }
}

// Filtrar valores
const filtrados = new Set();
for (const color of colores) {
    if (color.length > 4) {
        filtrados.add(color);
    }
}
console.log([...filtrados]); // ["verde"]

// Con destructuring de arrays (si son arrays)
const pares = new Set([[1, "a"], [2, "b"], [3, "c"]]);
for (const [num, letra] of pares) {
    console.log(`${num}: ${letra}`);
}
```

---

### `values()` / `keys()` (Son idénticos en Set)

**Devuelve:** `Iterator` - Iterador de valores  
**Parámetros:** Ninguno  
**⚠️ Modifica el original:** NO

```js
const numeros = new Set([1, 2, 3, 4, 5]);

// values() devuelve iterador
const iterador = numeros.values();
console.log(iterador.next()); // {value: 1, done: false}
console.log(iterador.next()); // {value: 2, done: false}

// Iterar con for...of
for (const num of numeros.values()) {
    console.log(num);
}
// 1, 2, 3, 4, 5

// keys() es exactamente igual (por compatibilidad con Map)
for (const num of numeros.keys()) {
    console.log(num); // Mismo resultado
}

// Convertir a array
const array1 = [...numeros.values()];
console.log(array1); // [1, 2, 3, 4, 5]

const array2 = Array.from(numeros.values());
console.log(array2); // [1, 2, 3, 4, 5]

// ⚠️ keys() y values() son IDÉNTICOS en Set
console.log([...numeros.keys()]);   // [1, 2, 3, 4, 5]
console.log([...numeros.values()]); // [1, 2, 3, 4, 5]
```

---

### `entries()`

**Devuelve:** `Iterator` - Iterador de pares [valor, valor]  
**Parámetros:** Ninguno  
**⚠️ Modifica el original:** NO

```js
const letras = new Set(["a", "b", "c"]);

// entries() devuelve pares [valor, valor]
const entradas = letras.entries();
console.log(entradas.next()); // {value: ['a', 'a'], done: false}

// ⚠️ Ambos valores son iguales (por compatibilidad con Map)
for (const [valor1, valor2] of letras.entries()) {
    console.log(valor1 === valor2); // true
    console.log(`[${valor1}, ${valor2}]`);
}
// [a, a]
// [b, b]
// [c, c]

// Convertir a array de pares
const pares = [...letras.entries()];
console.log(pares); // [['a', 'a'], ['b', 'b'], ['c', 'c']]

// Uso práctico: raramente usado en Set
// Más útil en Map donde [clave, valor] son diferentes
```

---

## 🔄 5. Conversiones (MUY ÚTIL)

### Set ↔ Array

```js
// Array → Set (elimina duplicados)
const array = [1, 2, 2, 3, 4, 4, 5];
const set = new Set(array);
console.log(set); // Set(5) {1, 2, 3, 4, 5}

// Set → Array
const set2 = new Set([1, 2, 3]);

// Con spread operator
const arr1 = [...set2];
console.log(arr1); // [1, 2, 3]

// Con Array.from()
const arr2 = Array.from(set2);
console.log(arr2); // [1, 2, 3]

// Una línea: eliminar duplicados
const sinDuplicados = [...new Set([1, 1, 2, 3, 3])];
console.log(sinDuplicados); // [1, 2, 3]
```

---

### Set ↔ String

```js
// String → Set (caracteres únicos)
const texto = "hello world";
const caracteres = new Set(texto);
console.log(caracteres); // Set(8) {'h', 'e', 'l', 'o', ' ', 'w', 'r', 'd'}

// Contar caracteres únicos
console.log(caracteres.size); // 8

// Set → String
const letras = new Set(["h", "o", "l", "a"]);
const palabra = [...letras].join("");
console.log(palabra); // "hola"

// Uso práctico: eliminar letras duplicadas
const textoDuplicado = "programacion";
const unicoLetras = [...new Set(textoDuplicado)].join("");
console.log(unicoLetras); // "progamci"
```

---

### Set ↔ Object

```js
// No hay conversión directa, pero puedes iterar

// Set → Object (como claves)
const set = new Set(["a", "b", "c"]);
const obj = {};
set.forEach(valor => {
    obj[valor] = true; // o cualquier valor
});
console.log(obj); // {a: true, b: true, c: true}

// Object keys → Set
const objeto = {a: 1, b: 2, c: 3};
const claves = new Set(Object.keys(objeto));
console.log(claves); // Set(3) {'a', 'b', 'c'}

const valores = new Set(Object.values(objeto));
console.log(valores); // Set(3) {1, 2, 3}
```

---

## 🎓 Operaciones de Conjuntos (Teoría de Conjuntos)

### Unión (A ∪ B)

```js
const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);

// Unión: todos los elementos de ambos
const union = new Set([...setA, ...setB]);
console.log(union); // Set(5) {1, 2, 3, 4, 5}

// Función reutilizable
function union(setA, setB) {
    return new Set([...setA, ...setB]);
}

console.log(union(setA, setB)); // Set(5) {1, 2, 3, 4, 5}
```

---

### Intersección (A ∩ B)

```js
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Intersección: elementos que están en ambos
const interseccion = new Set(
    [...setA].filter(x => setB.has(x))
);
console.log(interseccion); // Set(2) {3, 4}

// Función reutilizable
function interseccion(setA, setB) {
    return new Set([...setA].filter(x => setB.has(x)));
}

console.log(interseccion(setA, setB)); // Set(2) {3, 4}

// Optimización: iterar sobre el más pequeño
function interseccionOptimizada(setA, setB) {
    const [menor, mayor] = setA.size < setB.size 
        ? [setA, setB] 
        : [setB, setA];
    return new Set([...menor].filter(x => mayor.has(x)));
}
```

---

### Diferencia (A - B)

```js
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Diferencia: elementos en A que NO están en B
const diferencia = new Set(
    [...setA].filter(x => !setB.has(x))
);
console.log(diferencia); // Set(2) {1, 2}

// Función reutilizable
function diferencia(setA, setB) {
    return new Set([...setA].filter(x => !setB.has(x)));
}

console.log(diferencia(setA, setB)); // Set(2) {1, 2}
console.log(diferencia(setB, setA)); // Set(2) {5, 6}
```

---

### Diferencia Simétrica (A △ B)

```js
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Diferencia simétrica: elementos que están en A o B, pero NO en ambos
const diferenciaSimetrica = new Set([
    ...[...setA].filter(x => !setB.has(x)),
    ...[...setB].filter(x => !setA.has(x))
]);
console.log(diferenciaSimetrica); // Set(4) {1, 2, 5, 6}

// Función reutilizable
function diferenciaSimetrica(setA, setB) {
    const enANoEnB = [...setA].filter(x => !setB.has(x));
    const enBNoEnA = [...setB].filter(x => !setA.has(x));
    return new Set([...enANoEnB, ...enBNoEnA]);
}

console.log(diferenciaSimetrica(setA, setB)); // Set(4) {1, 2, 5, 6}
```

---

### Subconjunto (A ⊆ B)

```js
const setA = new Set([1, 2]);
const setB = new Set([1, 2, 3, 4]);

// Es A subconjunto de B?
const esSubconjunto = [...setA].every(x => setB.has(x));
console.log(esSubconjunto); // true

// Función reutilizable
function esSubconjunto(setA, setB) {
    return [...setA].every(x => setB.has(x));
}

console.log(esSubconjunto(setA, setB)); // true
console.log(esSubconjunto(setB, setA)); // false

// Subconjunto propio (A ⊂ B): A ⊆ B y A ≠ B
function esSubconjuntoPropio(setA, setB) {
    return setA.size < setB.size && esSubconjunto(setA, setB);
}

console.log(esSubconjuntoPropio(setA, setB)); // true
```

---

### Superconjunto (A ⊇ B)

```js
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([1, 2]);

// Es A superconjunto de B?
const esSuperconjunto = [...setB].every(x => setA.has(x));
console.log(esSuperconjunto); // true

// Función reutilizable
function esSuperconjunto(setA, setB) {
    return esSubconjunto(setB, setA);
}

console.log(esSuperconjunto(setA, setB)); // true
```

---

## 🎓 Patrones Comunes y Casos de Uso

### 1. Eliminar duplicados de array

```js
const numeros = [1, 2, 2, 3, 4, 4, 5, 5, 5];
const unicos = [...new Set(numeros)];
console.log(unicos); // [1, 2, 3, 4, 5]

// Con objetos (comparando por propiedad)
const personas = [
    {id: 1, nombre: "Ana"},
    {id: 2, nombre: "Juan"},
    {id: 1, nombre: "Ana"} // Duplicado
];

const uniqueById = [...new Map(
    personas.map(p => [p.id, p])
).values()];

console.log(uniqueById);
// [{id: 1, nombre: "Ana"}, {id: 2, nombre: "Juan"}]
```

---

### 2. Validar valores únicos

```js
function tieneValoresUnicos(array) {
    return array.length === new Set(array).size;
}

console.log(tieneValoresUnicos([1, 2, 3, 4]));    // true
console.log(tieneValoresUnicos([1, 2, 2, 3]));    // false

// Uso práctico: validar username único
const usuariosRegistrados = new Set(["admin", "user1", "user2"]);

function esUsernameDisponible(username) {
    return !usuariosRegistrados.has(username);
}

console.log(esUsernameDisponible("user3")); // true
console.log(esUsernameDisponible("admin")); // false
```

---

### 3. Tracking de elementos visitados/procesados

```js
const visitados = new Set();

function navegar(pagina) {
    if (visitados.has(pagina)) {
        console.log(`Ya visitaste: ${pagina}`);
        return;
    }
    
    visitados.add(pagina);
    console.log(`Primera visita a: ${pagina}`);
}

navegar("/home");     // Primera visita
navegar("/about");    // Primera visita
navegar("/home");     // Ya visitaste

// Historial sin duplicados
console.log([...visitados]); // ["/home", "/about"]
```

---

### 4. Tags/etiquetas únicas

```js
const articulo = {
    titulo: "JavaScript avanzado",
    tags: new Set(["javascript", "programación", "web"])
};

// Agregar tag
articulo.tags.add("frontend");
articulo.tags.add("javascript"); // Ignorado (duplicado)

// Verificar tag
if (articulo.tags.has("javascript")) {
    console.log("Es un artículo de JavaScript");
}

// Listar todos los tags
console.log([...articulo.tags]);
// ["javascript", "programación", "web", "frontend"]
```

---

### 5. Filtrar array por valores permitidos

```js
const valoresPermitidos = new Set(["admin", "editor", "viewer"]);
const roles = ["admin", "hacker", "editor", "spam", "viewer"];

const rolesFiltrados = roles.filter(r => valoresPermitidos.has(r));
console.log(rolesFiltrados); // ["admin", "editor", "viewer"]

// Función reutilizable
function filtrarPorLista(array, permitidos) {
    const set = new Set(permitidos);
    return array.filter(item => set.has(item));
}

console.log(filtrarPorLista(
    [1, 2, 3, 4, 5, 6],
    [2, 4, 6]
)); // [2, 4, 6]
```

---

### 6. Encontrar elementos comunes entre arrays

```js
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const array3 = [4, 5, 6, 7, 8];

// Intersección de múltiples arrays
function interseccionMultiple(...arrays) {
    if (arrays.length === 0) return [];
    
    let resultado = new Set(arrays[0]);
    
    for (let i = 1; i < arrays.length; i++) {
        const setActual = new Set(arrays[i]);
        resultado = new Set(
            [...resultado].filter(x => setActual.has(x))
        );
    }
    
    return [...resultado];
}

console.log(interseccionMultiple(array1, array2, array3)); // [4, 5]
```

---

### 7. Caracteres únicos en string

```js
function caracteresUnicos(str) {
    return new Set(str).size === str.length;
}

console.log(caracteresUnicos("abcd"));    // true
console.log(caracteresUnicos("hello"));   // false (l se repite)

// Contar caracteres únicos
function contarCaracteresUnicos(str) {
    return new Set(str).size;
}

console.log(contarCaracteresUnicos("hello world")); // 8
```

---

### 8. Implementar blacklist/whitelist

```js
class Filtro {
    constructor() {
        this.blacklist = new Set();
        this.whitelist = new Set();
    }
    
    agregarABlacklist(valor) {
        this.blacklist.add(valor);
    }
    
    agregarAWhitelist(valor) {
        this.whitelist.add(valor);
    }
    
    esPermitido(valor) {
        if (this.blacklist.has(valor)) return false;
        if (this.whitelist.size === 0) return true;
        return this.whitelist.has(valor);
    }
}

const filtro = new Filtro();
filtro.agregarABlacklist("spam");
filtro.agregarABlacklist("hack");

console.log(filtro.esPermitido("usuario")); // true
console.log(filtro.esPermitido("spam"));    // false

filtro.agregarAWhitelist("admin");
filtro.agregarAWhitelist("editor");

console.log(filtro.esPermitido("viewer"));  // false (no en whitelist)
console.log(filtro.esPermitido("admin"));   // true
```

---

## 🚨 Errores Comunes

### 1. Intentar acceder por índice

```js
const numeros = new Set([1, 2, 3, 4, 5]);

// ❌ Set NO tiene índices
console.log(numeros[0]);     // undefined
console.log(numeros.get(0)); // TypeError: get is not a function

// ✅ Convertir a array primero
const arr = [...numeros];
console.log(arr[0]); // 1

// O usar iterador
const primero = numeros.values().next().value;
console.log(primero); // 1
```

---

### 2. Esperar que objetos se comparen por valor

```js
const objetos = new Set();

// ❌ Cada objeto es único (por referencia)
objetos.add({id: 1});
objetos.add({id: 1}); // Se agrega (diferente referencia)
console.log(objetos.size); // 2

// ✅ Usar la misma referencia
const obj = {id: 1};
objetos.add(obj);
objetos.add(obj); // NO se agrega (misma referencia)

// ✅ O comparar por serialización
const objetosJSON = new Set();
const agregar = (obj) => objetosJSON.add(JSON.stringify(obj));

agregar({id: 1});
agregar({id: 1}); // Se ignora
console.log(objetosJSON.size); // 1
```

---

### 3. Modificar valores mientras se itera

```js
const numeros = new Set([1, 2, 3, 4, 5]);

// ⚠️ Modificar durante iteración puede causar problemas
for (const num of numeros) {
    if (num % 2 === 0) {
        numeros.delete(num); // Modificando durante iteración
    }
}
// Puede funcionar, pero no es garantizado

// ✅ Mejor: recopilar primero
const aEliminar = [];
for (const num of numeros) {
    if (num % 2 === 0) {
        aEliminar.push(num);
    }
}
aEliminar.forEach(n => numeros.delete(n));

// ✅ O crear nuevo Set
const impares = new Set([...numeros].filter(n => n % 2 !== 0));
```

---

### 4. Confundir size con length

```js
const set = new Set([1, 2, 3]);

// ❌ Set NO tiene length
console.log(set.length); // undefined

// ✅ Usa size
console.log(set.size); // 3

// Comparar con Array
const arr = [1, 2, 3];
console.log(arr.length); // 3 (propiedad)
console.log(set.size);   // 3 (propiedad)
```

---

### 5. Olvidar que size es propiedad, no método

```js
const set = new Set([1, 2, 3]);

// ❌ Error común
// console.log(set.size()); // TypeError: size is not a function

// ✅ Correcto
console.log(set.size); // 3
```

---

### 6. Intentar usar métodos de Array

```js
const set = new Set([1, 2, 3, 4, 5]);

// ❌ Set NO tiene estos métodos
// set.map(x => x * 2);     // TypeError
// set.filter(x => x > 2);  // TypeError
// set.reduce((a, b) => a + b); // TypeError

// ✅ Convertir a array primero
const dobles = [...set].map(x => x * 2);
const mayores = [...set].filter(x => x > 2);
const suma = [...set].reduce((a, b) => a + b, 0);

console.log(dobles);  // [2, 4, 6, 8, 10]
console.log(mayores); // [3, 4, 5]
console.log(suma);    // 15
```

---

## 🎯 Comparación Detallada: Set vs Array vs Map

|Característica|Set|Array|Map|
|---|---|---|---|
|Valores únicos|✅ Sí|❌ No|N/A (tiene pares)|
|Acceso por índice|❌ No|✅ Sí|❌ No|
|Orden garantizado|✅ Sí|✅ Sí|✅ Sí|
|Duplicados|❌ No|✅ Sí|❌ Claves únicas|
|Verificar existencia|✅ O(1) `.has()`|⚠️ O(n) `.includes()`|✅ O(1) `.has()`|
|Agregar elemento|✅ O(1) `.add()`|⚠️ O(1) `.push()`|✅ O(1) `.set()`|
|Eliminar elemento|✅ O(1) `.delete()`|⚠️ O(n) `.splice()`|✅ O(1) `.delete()`|
|Tamaño|✅ `.size`|✅ `.length`|✅ `.size`|
|Métodos funcionales|❌ No|✅ Sí (map, filter)|❌ No|
|JSON nativo|❌ No|✅ Sí|❌ No|
|Mejor para|Valores únicos|Listas ordenadas|Pares clave-valor|

---

## 💡 Cuándo usar Set

### ✅ Usa Set cuando:

1. **Necesitas valores únicos automáticamente**

```js
const emails = new Set();
emails.add("user@example.com");
emails.add("user@example.com"); // Ignorado
```

2. **Verificar existencia es frecuente**

```js
const permitidos = new Set(["admin", "editor"]);
if (permitidos.has(rol)) { /* O(1) */ }
```

3. **Agregar/eliminar elementos es frecuente**

```js
const activos = new Set();
activos.add(usuario);
activos.delete(usuario); // Ambos O(1)
```

4. **Necesitas operaciones de conjuntos**

```js
const union = new Set([...setA, ...setB]);
const interseccion = new Set([...setA].filter(x => setB.has(x)));
```

5. **El orden de inserción es importante pero NO necesitas índices**

```js
const orden = new Set();
orden.add("primero");
orden.add("segundo");
// Mantiene orden pero sin arr[0], arr[1]
```

### ❌ NO uses Set cuando:

1. **Necesitas duplicados**

```js
// ❌ Set elimina duplicados
const set = new Set([1, 1, 2, 2]); // Set(2) {1, 2}

// ✅ Array permite duplicados
const arr = [1, 1, 2, 2]; // [1, 1, 2, 2]
```

2. **Necesitas acceso por índice**

```js
// ❌ Set no tiene índices
// set[0] no funciona

// ✅ Array tiene índices
arr[0] // Funciona
```

3. **Necesitas métodos como map, filter, reduce**

```js
// ❌ Set no tiene estos métodos directamente
// set.map(x => x * 2) // Error

// ✅ Array los tiene
arr.map(x => x * 2)
```

4. **Trabajas con JSON**

```js
// ❌ Set no se serializa bien
JSON.stringify(new Set([1, 2, 3])); // "{}"

// ✅ Array funciona perfecto
JSON.stringify([1, 2, 3]); // "[1,2,3]"
```

5. **Necesitas pares clave-valor**

```js
// ❌ Set solo tiene valores
const set = new Set();
set.add("clave"); // Solo el valor

// ✅ Usa Map para pares
const map = new Map();
map.set("clave", "valor");
```

---

## 🎯 Resumen de Métodos y Propiedades

|Método/Propiedad|Devuelve|Modifica|Uso|
|---|---|---|---|
|`add(valor)`|`Set`|✅ Sí|Agregar valor|
|`delete(valor)`|`Boolean`|✅ Sí|Eliminar valor|
|`has(valor)`|`Boolean`|❌ No|Verificar existencia|
|`clear()`|`undefined`|✅ Sí|Vaciar Set|
|`size`|`Number`|-|Tamaño|
|`values()`|`Iterator`|❌ No|Iterar valores|
|`keys()`|`Iterator`|❌ No|Igual que values()|
|`entries()`|`Iterator`|❌ No|Pares [valor, valor]|
|`forEach(cb)`|`undefined`|❌ No|Iterar con callback|

---

## 📊 Complejidad (Big O)

|Operación|Complejidad|Nota|
|---|---|---|
|`add()`|O(1) promedio|Muy eficiente|
|`delete()`|O(1) promedio|Muy eficiente|
|`has()`|O(1) promedio|Búsqueda rápida|
|`clear()`|O(1)|Limpieza rápida|
|Iteración|O(n)|Recorrer todos|
|`size`|O(1)|Acceso inmediato|

**Comparación con Array:**

- `Array.includes()`: O(n) vs `Set.has()`: O(1)
- `Array.splice()`: O(n) vs `Set.delete()`: O(1)

---

## 🔗 Métodos Útiles Combinados

### Crear Set con transformación

```js
// Crear Set de números al cuadrado
const numeros = [1, 2, 3, 4, 5];
const cuadrados = new Set(numeros.map(n => n ** 2));
console.log(cuadrados); // Set(5) {1, 4, 9, 16, 25}

// Crear Set de iniciales
const nombres = ["Ana", "Antonio", "Beatriz", "Carlos"];
const iniciales = new Set(nombres.map(n => n[0]));
console.log(iniciales); // Set(3) {'A', 'B', 'C'}
```

---

### Convertir Set y aplicar operaciones

```js
const numeros = new Set([1, 2, 3, 4, 5]);

// Filtrar y volver a Set
const pares = new Set([...numeros].filter(n => n % 2 === 0));
console.log(pares); // Set(2) {2, 4}

// Mapear y volver a Set
const dobles = new Set([...numeros].map(n => n * 2));
console.log(dobles); // Set(5) {2, 4, 6, 8, 10}

// Reducir (no vuelve a Set)
const suma = [...numeros].reduce((a, b) => a + b, 0);
console.log(suma); // 15
```

---

### Combinar operaciones de conjuntos

```js
const A = new Set([1, 2, 3, 4]);
const B = new Set([3, 4, 5, 6]);
const C = new Set([5, 6, 7, 8]);

// (A ∪ B) ∩ C
const union_AB = new Set([...A, ...B]);
const resultado = new Set([...union_AB].filter(x => C.has(x)));
console.log(resultado); // Set(2) {5, 6}

// A - (B ∩ C)
const interseccion_BC = new Set([...B].filter(x => C.has(x)));
const resultado2 = new Set([...A].filter(x => !interseccion_BC.has(x)));
console.log(resultado2); // Set(4) {1, 2, 3, 4}
```

---

## 🎓 Tips y Mejores Prácticas

### 1. Usar Set para validaciones rápidas

```js
// ❌ Array ineficiente
const ROLES_VALIDOS = ["admin", "editor", "viewer"];
function esRolValido(rol) {
    return ROLES_VALIDOS.includes(rol); // O(n)
}

// ✅ Set eficiente
const ROLES_VALIDOS_SET = new Set(["admin", "editor", "viewer"]);
function esRolValidoSet(rol) {
    return ROLES_VALIDOS_SET.has(rol); // O(1)
}
```

---

### 2. Encadenar add() para inicialización

```js
const permisos = new Set()
    .add("leer")
    .add("escribir")
    .add("eliminar");

console.log(permisos.size); // 3
```

---

### 3. Clonar Set

```js
const original = new Set([1, 2, 3]);

// Copia superficial
const copia = new Set(original);

// También funciona con spread
const copia2 = new Set([...original]);

// Modificar copia no afecta original
copia.add(4);
console.log(original.size); // 3
console.log(copia.size);    // 4
```

---

### 4. Verificar si Set está vacío

```js
const set = new Set();

// ❌ Menos claro
if (set.size === 0) { }

// ✅ Más claro
if (set.size > 0) {
    console.log("Set tiene elementos");
}

// Helper function
const isEmpty = (set) => set.size === 0;
console.log(isEmpty(set)); // true
```

---

### 5. Convertir Set a array ordenado

```js
const desordenado = new Set([5, 2, 8, 1, 9]);

const ordenado = [...desordenado].sort((a, b) => a - b);
console.log(ordenado); // [1, 2, 5, 8, 9]

// O crear nuevo Set ordenado
const setOrdenado = new Set(ordenado);
console.log([...setOrdenado]); // [1, 2, 5, 8, 9]
```

---

## 📚 Recursos Adicionales

- **MDN Web Docs - Set:** Documentación oficial completa
- **JavaScript.info - Set:** Tutorial con ejemplos interactivos
- **Can I Use - Set:** Compatibilidad navegadores (100% modernos)

---

## 🏆 Orden de Uso (Más → Menos Común)

1. **add()** - Agregar valores
2. **has()** - Verificar existencia
3. **delete()** - Eliminar valores
4. **size** - Obtener tamaño
5. **for...of** - Iterar sobre valores
6. **Conversión a Array** - `[...set]`
7. **values()** - Obtener iterador
8. **clear()** - Vaciar Set
9. **forEach()** - Iterar con callback
10. **Operaciones de conjuntos** - unión, intersección, etc.

---

## 💭 Conclusión

**Set** es perfecto cuando:

- ✅ Necesitas **valores únicos** automáticamente
- ✅ **Verificar existencia** es frecuente (O(1))
- ✅ **Agregar/eliminar** elementos es común
- ✅ El **orden** importa pero NO necesitas índices
- ✅ Trabajas con **operaciones de conjuntos**

Para listas con duplicados o cuando necesitas métodos funcionales (map, filter), usa **Array**. Para pares clave-valor, usa **Map**. Pero cuando necesitas una colección de valores únicos con búsqueda rápida, **Set es la mejor opción** en JavaScript.