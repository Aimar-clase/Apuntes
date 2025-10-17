# 🗺️ Guía Completa de Map en JavaScript

## 📌 Conceptos Fundamentales

### ¿Qué es un Map?

Un **Map** es una colección de **pares clave-valor** donde:

- Las claves pueden ser de **cualquier tipo** (objetos, funciones, primitivos)
- Mantiene el **orden de inserción**
- Optimizado para operaciones frecuentes de agregar/eliminar

```js
// Crear un Map vacío
const mapa = new Map();

// Crear con valores iniciales
const mapaInicial = new Map([
    ["nombre", "Ana"],
    ["edad", 25],
    [1, "uno"],
    [true, "verdadero"]
]);

console.log(mapaInicial);
// Map(4) { 'nombre' => 'Ana', 'edad' => 25, 1 => 'uno', true => 'verdadero' }
```

### 🔑 Características importantes:

- **Claves únicas:** Cada clave solo puede aparecer una vez
- **Cualquier tipo de clave:** No solo strings como en objetos
- **Orden garantizado:** Mantiene el orden de inserción
- **Mejor rendimiento:** Para operaciones frecuentes de agregar/eliminar

---

## 🆚 Map vs Object: ¿Cuándo usar cada uno?

### Usa **Map** cuando:

✅ Necesitas claves que no sean strings (objetos, números, etc.)  
✅ El orden de inserción es importante  
✅ Necesitas saber el tamaño fácilmente (`.size`)  
✅ Hay muchas operaciones de agregar/eliminar  
✅ Necesitas iterar frecuentemente sobre pares clave-valor

### Usa **Object** cuando:

✅ Solo necesitas claves string/symbol  
✅ Necesitas trabajar con JSON  
✅ Quieres usar notación de punto (`obj.propiedad`)  
✅ El objeto tiene métodos y lógica de negocio  
✅ Es un objeto de configuración o estructura de datos simple

```js
// ❌ Object con claves no-string
const obj = {};
obj[{id: 1}] = "valor";
console.log(Object.keys(obj)); // ['[object Object]'] - se convierte a string

// ✅ Map con claves no-string
const map = new Map();
map.set({id: 1}, "valor");
console.log([...map.keys()]); // [{id: 1}] - mantiene el objeto
```

---

## 📏 1. Propiedad Fundamental

### `size`

**Devuelve:** `Number` - Cantidad de pares clave-valor  
**Descripción:** Propiedad de solo lectura que indica el tamaño del Map

```js
const mapa = new Map([["a", 1], ["b", 2], ["c", 3]]);

console.log(mapa.size); // 3

mapa.set("d", 4);
console.log(mapa.size); // 4

mapa.delete("a");
console.log(mapa.size); // 3

mapa.clear();
console.log(mapa.size); // 0

// ⚠️ Es propiedad, NO método (sin paréntesis)
console.log(mapa.size);   // ✅ Correcto
// console.log(mapa.size()); // ❌ Error: not a function
```

**💡 Diferencia con Object:**

```js
// Object: hay que contar manualmente
const obj = {a: 1, b: 2, c: 3};
console.log(Object.keys(obj).length); // 3 (ineficiente)

// Map: propiedad directa
const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
console.log(map.size); // 3 (eficiente)
```

---

## ➕ 2. Métodos de Modificación (MUY USADOS)

### `set(clave, valor)`

**Devuelve:** `Map` - El mismo Map (permite encadenamiento)  
**Parámetros:**

- `clave` (any): La clave (puede ser cualquier tipo)
- `valor` (any): El valor asociado  
    **⚠️ Modifica el original:** SÍ

```js
const mapa = new Map();

// Agregar elementos
mapa.set("nombre", "Ana");
mapa.set("edad", 25);
mapa.set("activo", true);

console.log(mapa);
// Map(3) { 'nombre' => 'Ana', 'edad' => 25, 'activo' => true }

// Claves de cualquier tipo
mapa.set(1, "número como clave");
mapa.set(true, "boolean como clave");
mapa.set({id: 1}, "objeto como clave");
mapa.set([1, 2], "array como clave");

// Si la clave existe, REEMPLAZA el valor
mapa.set("nombre", "Juan");
console.log(mapa.get("nombre")); // "Juan"

// Encadenamiento (devuelve el mismo Map)
mapa
    .set("pais", "España")
    .set("ciudad", "Madrid")
    .set("cp", 28001);

console.log(mapa.size); // Muchos elementos ahora

// ⚠️ Claves objeto se comparan por referencia
const obj1 = {id: 1};
const obj2 = {id: 1};

mapa.set(obj1, "valor1");
mapa.set(obj2, "valor2"); // ¡Crea entrada diferente!

console.log(mapa.get(obj1)); // "valor1"
console.log(mapa.get(obj2)); // "valor2"
console.log(mapa.size); // 2 entradas distintas
```

**💡 Uso práctico: Cachear resultados**

```js
const cache = new Map();

function calcularCostoso(n) {
    if (cache.has(n)) {
        return cache.get(n);
    }
    
    const resultado = n * n; // Cálculo costoso
    cache.set(n, resultado);
    return resultado;
}

console.log(calcularCostoso(5)); // Calcula: 25
console.log(calcularCostoso(5)); // Desde cache: 25
```

---

### `delete(clave)`

**Devuelve:** `Boolean` - true si se eliminó, false si no existía  
**Parámetros:** `clave` (any) - La clave a eliminar  
**⚠️ Modifica el original:** SÍ

```js
const mapa = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3]
]);

// Eliminar elemento existente
let eliminado = mapa.delete("b");
console.log(eliminado); // true
console.log(mapa.size); // 2
console.log(mapa.has("b")); // false

// Intentar eliminar elemento inexistente
eliminado = mapa.delete("z");
console.log(eliminado); // false
console.log(mapa.size); // 2 (no cambió)

// Con claves objeto (por referencia)
const obj = {id: 1};
mapa.set(obj, "valor");

mapa.delete({id: 1}); // ❌ false (diferente referencia)
mapa.delete(obj);      // ✅ true (misma referencia)

// Uso práctico: eliminar si existe
if (mapa.delete("a")) {
    console.log("Elemento eliminado");
} else {
    console.log("Elemento no existía");
}
```

---

### `clear()`

**Devuelve:** `undefined`  
**Parámetros:** Ninguno  
**⚠️ Modifica el original:** SÍ

```js
const mapa = new Map([
    ["uno", 1],
    ["dos", 2],
    ["tres", 3]
]);

console.log(mapa.size); // 3

mapa.clear();

console.log(mapa.size); // 0
console.log(mapa.has("uno")); // false
console.log([...mapa]); // []

// El Map sigue existiendo, solo está vacío
mapa.set("nuevo", 100);
console.log(mapa.size); // 1

// Uso práctico: resetear cache
const cache = new Map();
// ... se llena de datos ...
cache.clear(); // Vaciar cache de golpe
```

---

## 🔍 3. Métodos de Acceso (MUY USADOS)

### `get(clave)`

**Devuelve:** `any` - El valor asociado o `undefined` si no existe  
**Parámetros:** `clave` (any) - La clave a buscar  
**⚠️ Modifica el original:** NO

```js
const mapa = new Map([
    ["nombre", "Ana"],
    ["edad", 25],
    ["activo", true]
]);

// Obtener valores existentes
console.log(mapa.get("nombre")); // "Ana"
console.log(mapa.get("edad"));   // 25
console.log(mapa.get("activo")); // true

// Clave inexistente
console.log(mapa.get("ciudad")); // undefined

// Con claves de diferentes tipos
mapa.set(1, "número");
mapa.set(true, "boolean");

console.log(mapa.get(1));    // "número"
console.log(mapa.get(true)); // "boolean"
console.log(mapa.get("1"));  // undefined (string ≠ number)

// Con objetos (por referencia)
const obj = {id: 1};
mapa.set(obj, "valor");

console.log(mapa.get(obj));      // "valor"
console.log(mapa.get({id: 1}));  // undefined (diferente objeto)

// Valor por defecto si no existe
const valor = mapa.get("inexistente") || "valor por defecto";
console.log(valor); // "valor por defecto"

// Uso práctico: acceso seguro con encadenamiento opcional
console.log(mapa.get("ciudad")?.toUpperCase()); // undefined (sin error)
```

---

### `has(clave)`

**Devuelve:** `Boolean` - true si la clave existe  
**Parámetros:** `clave` (any) - La clave a verificar  
**⚠️ Modifica el original:** NO

```js
const mapa = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3]
]);

// Verificar existencia
console.log(mapa.has("a")); // true
console.log(mapa.has("z")); // false

// Funciona con cualquier tipo de clave
mapa.set(0, "cero");
mapa.set(false, "falso");
mapa.set(null, "nulo");

console.log(mapa.has(0));     // true
console.log(mapa.has(false)); // true
console.log(mapa.has(null));  // true

// ⚠️ Con objetos usa referencia
const obj = {id: 1};
mapa.set(obj, "valor");

console.log(mapa.has(obj));     // true
console.log(mapa.has({id: 1})); // false (diferente objeto)

// Uso práctico: verificar antes de acceder
if (mapa.has("nombre")) {
    console.log(mapa.get("nombre").toUpperCase());
} else {
    console.log("Nombre no encontrado");
}

// Patrón get-or-set
if (!mapa.has("contador")) {
    mapa.set("contador", 0);
}
mapa.set("contador", mapa.get("contador") + 1);
```

**💡 Diferencia con Object:**

```js
// Object: puede ser confuso con valores falsy
const obj = {nombre: undefined, edad: 0};
console.log(obj.nombre !== undefined); // false ❌
console.log("nombre" in obj);          // true ✅

// Map: has() siempre es claro
const map = new Map([["nombre", undefined], ["edad", 0]]);
console.log(map.has("nombre")); // true ✅
console.log(map.has("edad"));   // true ✅
```

---

## 🔄 4. Métodos de Iteración (MUY USADOS)

### `forEach(callback, thisArg)`

**Devuelve:** `undefined`  
**Parámetros:**

- `callback(valor, clave, map)` - función a ejecutar por cada par
- `thisArg` (opcional) - valor de `this` en el callback  
    **⚠️ Modifica el original:** NO (pero puedes modificar valores)

```js
const mapa = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3]
]);

// Iterar sobre todos los pares
mapa.forEach((valor, clave) => {
    console.log(`${clave}: ${valor}`);
});
// a: 1
// b: 2
// c: 3

// Callback completo con el Map
mapa.forEach((valor, clave, mapaCompleto) => {
    console.log(`En ${clave}, total elementos: ${mapaCompleto.size}`);
});

// ⚠️ Orden de parámetros: valor, clave (diferente a Object)
// En Object.entries() es [clave, valor]
// En Map.forEach() es (valor, clave)

// Modificar valores durante iteración
const numeros = new Map([["a", 1], ["b", 2], ["c", 3]]);
numeros.forEach((valor, clave) => {
    numeros.set(clave, valor * 2);
});
console.log([...numeros.values()]); // [2, 4, 6]

// Con thisArg
const multiplicador = {
    factor: 10,
    multiplicar: function(mapa) {
        mapa.forEach(function(valor, clave) {
            console.log(valor * this.factor);
        }, this); // Pasar 'this' como segundo argumento
    }
};
multiplicador.multiplicar(mapa);

// O con arrow function (hereda this automáticamente)
const obj = {
    factor: 10,
    multiplicar(mapa) {
        mapa.forEach((valor, clave) => {
            console.log(valor * this.factor); // this funciona sin thisArg
        });
    }
};
```

---

### `for...of` (Recomendado)

**Sintaxis:** `for (const [clave, valor] of mapa)`  
**Descripción:** Itera sobre pares [clave, valor] directamente

```js
const mapa = new Map([
    ["nombre", "Ana"],
    ["edad", 25],
    ["ciudad", "Madrid"]
]);

// Destructurar directamente
for (const [clave, valor] of mapa) {
    console.log(`${clave}: ${valor}`);
}
// nombre: Ana
// edad: 25
// ciudad: Madrid

// Sin destructurar (menos común)
for (const par of mapa) {
    console.log(par); // Array [clave, valor]
}

// Uso práctico: búsqueda con break
for (const [clave, valor] of mapa) {
    if (valor === 25) {
        console.log(`Encontrado en: ${clave}`);
        break; // Puedes salir (no se puede con forEach)
    }
}

// Filtrar mientras iteras
const resultado = new Map();
for (const [clave, valor] of mapa) {
    if (typeof valor === "number") {
        resultado.set(clave, valor);
    }
}
console.log(resultado); // Map(1) { 'edad' => 25 }
```

---

### `keys()`

**Devuelve:** `Iterator` - Iterador de claves  
**Parámetros:** Ninguno  
**⚠️ Modifica el original:** NO

```js
const mapa = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3]
]);

// Obtener iterador de claves
const claves = mapa.keys();
console.log(claves); // [Map Iterator] { 'a', 'b', 'c' }

// Iterar con for...of
for (const clave of mapa.keys()) {
    console.log(clave);
}
// a
// b
// c

// Convertir a array
const arrayClaves = [...mapa.keys()];
console.log(arrayClaves); // ['a', 'b', 'c']

// También con Array.from()
const arrayClaves2 = Array.from(mapa.keys());
console.log(arrayClaves2); // ['a', 'b', 'c']

// Uso práctico: verificar múltiples claves
const clavesRequeridas = ["nombre", "edad"];
const datos = new Map([["nombre", "Ana"], ["edad", 25], ["ciudad", "Madrid"]]);

const todasExisten = clavesRequeridas.every(c => datos.has(c));
console.log(todasExisten); // true

// Obtener solo las claves como array
const soloClavesString = [...mapa.keys()].filter(k => typeof k === "string");
```

---

### `values()`

**Devuelve:** `Iterator` - Iterador de valores  
**Parámetros:** Ninguno  
**⚠️ Modifica el original:** NO

```js
const mapa = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3]
]);

// Obtener iterador de valores
const valores = mapa.values();
console.log(valores); // [Map Iterator] { 1, 2, 3 }

// Iterar con for...of
for (const valor of mapa.values()) {
    console.log(valor);
}
// 1
// 2
// 3

// Convertir a array
const arrayValores = [...mapa.values()];
console.log(arrayValores); // [1, 2, 3]

// Uso práctico: sumar todos los valores
const numeros = new Map([["a", 10], ["b", 20], ["c", 30]]);
const suma = [...numeros.values()].reduce((a, b) => a + b, 0);
console.log(suma); // 60

// Encontrar valor máximo
const max = Math.max(...numeros.values());
console.log(max); // 30

// Filtrar valores
const mayoresQue15 = [...numeros.values()].filter(v => v > 15);
console.log(mayoresQue15); // [20, 30]

// ⚠️ Los valores pueden repetirse (las claves no)
const conDuplicados = new Map([["a", 1], ["b", 1], ["c", 2]]);
console.log([...conDuplicados.values()]); // [1, 1, 2]
```

---

### `entries()`

**Devuelve:** `Iterator` - Iterador de pares [clave, valor]  
**Parámetros:** Ninguno  
**⚠️ Modifica el original:** NO

```js
const mapa = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3]
]);

// Obtener iterador de pares
const entradas = mapa.entries();
console.log(entradas); // [Map Iterator] { ['a', 1], ['b', 2], ['c', 3] }

// Iterar con for...of
for (const [clave, valor] of mapa.entries()) {
    console.log(`${clave} => ${valor}`);
}
// a => 1
// b => 2
// c => 3

// Convertir a array de pares
const arrayPares = [...mapa.entries()];
console.log(arrayPares); // [['a', 1], ['b', 2], ['c', 3]]

// ⚠️ entries() es equivalente a iterar el Map directamente
for (const par of mapa) {
    console.log(par); // Mismo resultado que mapa.entries()
}

// Uso práctico: convertir a Object
const objeto = Object.fromEntries(mapa.entries());
console.log(objeto); // {a: 1, b: 2, c: 3}

// O más corto
const objeto2 = Object.fromEntries(mapa);
console.log(objeto2); // {a: 1, b: 2, c: 3}

// Filtrar y crear nuevo Map
const filtrado = new Map(
    [...mapa.entries()].filter(([k, v]) => v > 1)
);
console.log(filtrado); // Map(2) { 'b' => 2, 'c' => 3 }
```

---

## 🔄 5. Conversiones (MUY ÚTIL)

### Map ↔ Array

```js
// Array de pares → Map
const array = [["a", 1], ["b", 2], ["c", 3]];
const mapa = new Map(array);
console.log(mapa); // Map(3) { 'a' => 1, 'b' => 2, 'c' => 3 }

// Map → Array de pares
const mapa2 = new Map([["x", 10], ["y", 20]]);
const arrayPares = [...mapa2];
console.log(arrayPares); // [['x', 10], ['y', 20]]

// También con Array.from()
const arrayPares2 = Array.from(mapa2);
console.log(arrayPares2); // [['x', 10], ['y', 20]]

// Solo claves o valores
const soloClaves = [...mapa2.keys()];     // ['x', 'y']
const soloValores = [...mapa2.values()];  // [10, 20]
```

---

### Map ↔ Object

```js
// Object → Map
const objeto = {a: 1, b: 2, c: 3};
const mapa = new Map(Object.entries(objeto));
console.log(mapa); // Map(3) { 'a' => 1, 'b' => 2, 'c' => 3 }

// Map → Object
const mapa2 = new Map([["x", 10], ["y", 20]]);
const objeto2 = Object.fromEntries(mapa2);
console.log(objeto2); // {x: 10, y: 20}

// ⚠️ Object solo acepta claves string/symbol
const mapaConObjetos = new Map([
    [{id: 1}, "valor1"],
    [true, "valor2"]
]);
const objIncorrecto = Object.fromEntries(mapaConObjetos);
console.log(objIncorrecto);
// {'[object Object]': 'valor1', 'true': 'valor2'} - se convierten a string
```

---

### Map ↔ JSON

```js
// Map → JSON
const mapa = new Map([["nombre", "Ana"], ["edad", 25]]);

// Convertir a array y luego a JSON
const json = JSON.stringify([...mapa]);
console.log(json); // '[["nombre","Ana"],["edad",25]]'

// O convertir a object y luego a JSON (solo claves string)
const json2 = JSON.stringify(Object.fromEntries(mapa));
console.log(json2); // '{"nombre":"Ana","edad":25}'

// JSON → Map
const jsonString = '[["nombre","Ana"],["edad",25]]';
const mapaDesdeJson = new Map(JSON.parse(jsonString));
console.log(mapaDesdeJson); // Map(2) { 'nombre' => 'Ana', 'edad' => 25 }

// Desde JSON object
const jsonObj = '{"nombre":"Ana","edad":25}';
const mapaDesdeObj = new Map(Object.entries(JSON.parse(jsonObj)));
console.log(mapaDesdeObj); // Map(2) { 'nombre' => 'Ana', 'edad' => 25 }
```

---

## 🎓 Patrones Comunes y Casos de Uso

### 1. Contar ocurrencias

```js
const palabras = ["hola", "mundo", "hola", "js", "mundo", "hola"];
const contador = new Map();

for (const palabra of palabras) {
    contador.set(palabra, (contador.get(palabra) || 0) + 1);
}

console.log(contador);
// Map(3) { 'hola' => 3, 'mundo' => 2, 'js' => 1 }

// Obtener la palabra más frecuente
let maxCount = 0;
let palabraMasFrecuente = "";

for (const [palabra, count] of contador) {
    if (count > maxCount) {
        maxCount = count;
        palabraMasFrecuente = palabra;
    }
}

console.log(`"${palabraMasFrecuente}" aparece ${maxCount} veces`);
```

---

### 2. Cachear resultados de funciones

```js
const cache = new Map();

function fibonacci(n) {
    if (n <= 1) return n;
    
    if (cache.has(n)) {
        return cache.get(n);
    }
    
    const resultado = fibonacci(n - 1) + fibonacci(n - 2);
    cache.set(n, resultado);
    return resultado;
}

console.log(fibonacci(10)); // 55 (calcula y cachea)
console.log(fibonacci(10)); // 55 (desde cache)
console.log(cache.size);    // Múltiples valores cacheados
```

---

### 3. Agrupar elementos por propiedad

```js
const personas = [
    {nombre: "Ana", edad: 25},
    {nombre: "Juan", edad: 30},
    {nombre: "María", edad: 25},
    {nombre: "Pedro", edad: 30}
];

const porEdad = new Map();

for (const persona of personas) {
    if (!porEdad.has(persona.edad)) {
        porEdad.set(persona.edad, []);
    }
    porEdad.get(persona.edad).push(persona);
}

console.log(porEdad);
// Map(2) {
//   25 => [{nombre: "Ana", edad: 25}, {nombre: "María", edad: 25}],
//   30 => [{nombre: "Juan", edad: 30}, {nombre: "Pedro", edad: 30}]
// }
```

---

### 4. Usar objetos como claves (muy potente)

```js
const usuarioPermisos = new Map();

const usuario1 = {id: 1, nombre: "Ana"};
const usuario2 = {id: 2, nombre: "Juan"};

usuarioPermisos.set(usuario1, ["leer", "escribir"]);
usuarioPermisos.set(usuario2, ["leer"]);

console.log(usuarioPermisos.get(usuario1)); // ['leer', 'escribir']
console.log(usuarioPermisos.get(usuario2)); // ['leer']

// Uso práctico: asociar metadata a DOM elements
const elementoMetadata = new Map();

// const boton = document.querySelector('button');
// elementoMetadata.set(boton, {clicks: 0, ultimoClick: null});
```

---

### 5. Implementar un LRU Cache (Least Recently Used)

```js
class LRUCache {
    constructor(capacidad) {
        this.capacidad = capacidad;
        this.cache = new Map();
    }
    
    get(clave) {
        if (!this.cache.has(clave)) return null;
        
        // Mover al final (más reciente)
        const valor = this.cache.get(clave);
        this.cache.delete(clave);
        this.cache.set(clave, valor);
        return valor;
    }
    
    set(clave, valor) {
        // Si existe, eliminar para reinsertar al final
        if (this.cache.has(clave)) {
            this.cache.delete(clave);
        }
        
        // Si está lleno, eliminar el más antiguo (primero)
        if (this.cache.size >= this.capacidad) {
            const primeraClave = this.cache.keys().next().value;
            this.cache.delete(primeraClave);
        }
        
        this.cache.set(clave, valor);
    }
}

const cache = new LRUCache(3);
cache.set("a", 1);
cache.set("b", 2);
cache.set("c", 3);
console.log([...cache.cache.keys()]); // ['a', 'b', 'c']

cache.set("d", 4); // 'a' se elimina (LRU)
console.log([...cache.cache.keys()]); // ['b', 'c', 'd']

cache.get("b"); // 'b' se mueve al final
console.log([...cache.cache.keys()]); // ['c', 'd', 'b']
```

---

### 6. Invertir Map (claves ↔ valores)

```js
const original = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3]
]);

const invertido = new Map(
    [...original].map(([k, v]) => [v, k])
);

console.log(invertido);
// Map(3) { 1 => 'a', 2 => 'b', 3 => 'c' }

// ⚠️ Si hay valores duplicados, solo mantiene el último
const conDuplicados = new Map([["a", 1], ["b", 1], ["c", 2]]);
const invertido2 = new Map([...conDuplicados].map(([k, v]) => [v, k]));
console.log(invertido2); // Map(2) { 1 => 'b', 2 => 'c' } - 'a' se perdió
```

---

### 7. Merge (fusionar) Maps

```js
const map1 = new Map([["a", 1], ["b", 2]]);
const map2 = new Map([["b", 3], ["c", 4]]);

// Fusionar (map2 sobrescribe map1)
const fusionado = new Map([...map1, ...map2]);
console.log(fusionado); // Map(3) { 'a' => 1, 'b' => 3, 'c' => 4 }

// Fusionar sin sobrescribir
const sinSobrescribir = new Map([...map2, ...map1]);
console.log(sinSobrescribir); // Map(3) { 'b' => 2, 'c' => 4, 'a' => 1 }

// Fusionar sumando valores
const map3 = new Map([["a", 1], ["b", 2]]);
const map4 = new Map([["b", 3], ["c", 4]]);
const sumado = new Map(map3);

for (const [clave, valor] of map4) {
    sumado.set(clave, (sumado.get(clave) || 0) + valor);
}
console.log(sumado); // Map(3) { 'a' => 1, 'b' => 5, 'c' => 4 }
```

---

### 8. Filtrar Map

```js
const numeros = new Map([
    ["a", 10],
    ["b", 25],
    ["c", 30],
    ["d", 15]
]);

// Filtrar por valor
const mayoresQue20 = new Map(
    [...numeros].filter(([k, v]) => v > 20)
);
console.log(mayoresQue20); // Map(2) { 'b' => 25, 'c' => 30 }

// Filtrar por clave
const soloAyB = new Map(
    [...numeros].filter(([k, v]) => k === "a" || k === "b")
);
console.log(soloAyB); // Map(2) { 'a' => 10, 'b' => 25 }

// Función reutilizable
function filtrarMap(mapa, predicado) {
    return new Map([...mapa].filter(predicado));
}

const resultado = filtrarMap(numeros, ([k, v]) => v % 2 === 0);
console.log(resultado); // Map(2) { 'a' => 10, 'c' => 30 }
```

---

### 9. Transformar Map (como map() en arrays)

```js
const numeros = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3]
]);

// Transformar valores
const duplicados = new Map(
    [...numeros].map(([k, v]) => [k, v * 2])
);
console.log(duplicados); // Map(3) { 'a' => 2, 'b' => 4, 'c' => 6 }

// Transformar claves y valores
const transformado = new Map(
    [...numeros].map(([k, v]) => [k.toUpperCase(), v * 10])
);
console.log(transformado); // Map(3) { 'A' => 10, 'B' => 20, 'C' => 30 }

// Función reutilizable
function mapearMap(mapa, transformador) {
    return new Map([...mapa].map(transformador));
}

const resultado = mapearMap(numeros, ([k, v]) => [k, v ** 2]);
console.log(resultado); // Map(3) { 'a' => 1, 'b' => 4, 'c' => 9 }
```

---

## 🚨 Errores Comunes

### 1. Intentar usar notación de objeto

```js
const mapa = new Map();

// ❌ NO funciona
mapa.nombre = "Ana";
console.log(mapa.nombre); // "Ana" (pero NO está en el Map)
console.log(mapa.size);   // 0 (no se agregó al Map)

// ✅ Forma correcta
mapa.set("nombre", "Ana");
console.log(mapa.get("nombre")); // "Ana"
console.log(mapa.size);          // 1
```

---

### 2. Comparar objetos como claves

```js
const mapa = new Map();

// ❌ Diferentes referencias
mapa.set({id: 1}, "valor1");
console.log(mapa.get({id: 1})); // undefined (objeto diferente)

// ✅ Guardar referencia
const clave = {id: 1};
mapa.set(clave, "valor1");
console.log(mapa.get(clave)); // "valor1"

// Solución: usar JSON.stringify si necesitas comparar por contenido
const mapaJSON = new Map();
mapaJSON.set(JSON.stringify({id: 1}), "valor1");
console.log(mapaJSON.get(JSON.stringify({id: 1}))); // "valor1"
```

---

### 3. Olvidar que forEach tiene orden (valor, clave)

```js
const mapa = new Map([["a", 1], ["b", 2]]);

// ❌ Confundir el orden
mapa.forEach((clave, valor) => {
    console.log(`${clave}: ${valor}`);
});
// 1: a
// 2: b
// ¡Al revés!

// ✅ Orden correcto (valor, clave)
mapa.forEach((valor, clave) => {
    console.log(`${clave}: ${valor}`);
});
// a: 1
// b: 2

// 💡 Mejor usa for...of (más intuitivo)
for (const [clave, valor] of mapa) {
    console.log(`${clave}: ${valor}`);
}
```

---

### 4. Modificar Map durante iteración

```js
const mapa = new Map([["a", 1], ["b", 2], ["c", 3]]);

// ⚠️ Puede causar comportamiento inesperado
for (const [clave, valor] of mapa) {
    if (valor % 2 === 0) {
        mapa.delete(clave); // Modificando durante iteración
    }
}
// Funciona en este caso, pero no es garantizado en todos los casos

// ✅ Mejor: recopilar primero, luego modificar
const aEliminar = [];
for (const [clave, valor] of mapa) {
    if (valor % 2 === 0) {
        aEliminar.push(clave);
    }
}
aEliminar.forEach(k => mapa.delete(k));

// O crear nuevo Map
const filtrado = new Map([...mapa].filter(([k, v]) => v % 2 !== 0));
```

---

### 5. No verificar existencia antes de get()

```js
const mapa = new Map([["nombre", "Ana"]]);

// ❌ Puede dar undefined inesperado
const edad = mapa.get("edad");
console.log(edad + 1); // NaN (undefined + 1)

// ✅ Verificar primero
if (mapa.has("edad")) {
    console.log(mapa.get("edad") + 1);
} else {
    console.log("Edad no disponible");
}

// O usar valor por defecto
const edad2 = mapa.get("edad") || 18;
console.log(edad2); // 18

// Nullish coalescing (más seguro)
const edad3 = mapa.get("edad") ?? 18;
console.log(edad3); // 18
```

---

### 6. Confundir size (propiedad) con método

```js
const mapa = new Map([["a", 1], ["b", 2]]);

// ❌ Error común
// console.log(mapa.size()); // TypeError: size is not a function

// ✅ Es propiedad, no método
console.log(mapa.size); // 2

// Comparar con Array
const arr = [1, 2, 3];
console.log(arr.length); // 3 (también es propiedad)
```

---

## 🎯 Comparación Detallada: Map vs Object vs Array

|Característica|Map|Object|Array|
|---|---|---|---|
|Tipo de claves|Cualquiera|String/Symbol|Number (índices)|
|Orden garantizado|✅ Sí|⚠️ Parcial (strings sí)|✅ Sí|
|Tamaño fácil|✅ `.size`|❌ Manual|✅ `.length`|
|Iterable directo|✅ Sí|❌ No (necesita Object.entries)|✅ Sí|
|Mejor para búsquedas|✅ O(1) promedio|✅ O(1) promedio|❌ O(n)|
|JSON nativo|❌ No|✅ Sí|✅ Sí|
|Prototipos|❌ No|⚠️ Sí (puede causar conflictos)|⚠️ Sí|
|Rendimiento add/delete|✅ Excelente|⚠️ Bueno|⚠️ Depende (splice es lento)|

---

## 💡 Cuándo usar Map

### ✅ Usa Map cuando:

1. **Necesitas claves que no sean strings**

```js
const contadorPorObjeto = new Map();
const obj1 = {id: 1};
const obj2 = {id: 2};
contadorPorObjeto.set(obj1, 10);
contadorPorObjeto.set(obj2, 20);
```

2. **El orden de inserción importa**

```js
const historial = new Map();
historial.set("accion1", Date.now());
historial.set("accion2", Date.now());
// Mantiene el orden exacto
```

3. **Necesitas agregar/eliminar elementos frecuentemente**

```js
const cache = new Map();
// Agregar y eliminar es muy eficiente en Map
cache.set(clave, valor);
cache.delete(clave);
```

4. **Necesitas conocer el tamaño fácilmente**

```js
const usuarios = new Map();
console.log(usuarios.size); // Inmediato y eficiente
```

5. **Trabajas con pares clave-valor puros (sin métodos)**

```js
const configuracion = new Map([
    ["tema", "oscuro"],
    ["idioma", "es"],
    ["notificaciones", true]
]);
```

### ❌ NO uses Map cuando:

1. **Necesitas serializar a JSON directamente**

```js
// ❌ Map no funciona directamente con JSON
const mapa = new Map([["a", 1]]);
JSON.stringify(mapa); // "{}" (vacío)

// ✅ Objeto funciona directamente
const obj = {a: 1};
JSON.stringify(obj); // '{"a":1}'
```

2. **Solo tienes claves string/symbol simples**

```js
// ❌ Sobrecargado para esto
const map = new Map([["nombre", "Ana"]]);

// ✅ Object es más simple
const obj = {nombre: "Ana"};
```

3. **Necesitas acceso con notación de punto**

```js
// ❌ No funciona
// map.nombre

// ✅ Funciona con objetos
obj.nombre
```

4. **La estructura tiene métodos y lógica**

```js
// ✅ Clase/objeto con métodos
class Usuario {
    constructor(nombre) {
        this.nombre = nombre;
    }
    saludar() {
        return `Hola, ${this.nombre}`;
    }
}
```

---

## 🎯 Resumen de Métodos y Propiedades

|Método/Propiedad|Devuelve|Modifica|Uso|
|---|---|---|---|
|`set(k, v)`|`Map`|✅ Sí|Agregar/actualizar|
|`get(k)`|`any` o `undefined`|❌ No|Obtener valor|
|`has(k)`|`Boolean`|❌ No|Verificar existencia|
|`delete(k)`|`Boolean`|✅ Sí|Eliminar elemento|
|`clear()`|`undefined`|✅ Sí|Vaciar Map|
|`size`|`Number`|-|Tamaño|
|`keys()`|`Iterator`|❌ No|Iterar claves|
|`values()`|`Iterator`|❌ No|Iterar valores|
|`entries()`|`Iterator`|❌ No|Iterar pares|
|`forEach(cb)`|`undefined`|❌ No|Iterar con callback|

---

## 📊 Complejidad (Big O)

|Operación|Complejidad|Nota|
|---|---|---|
|`set()`|O(1) promedio|Muy eficiente|
|`get()`|O(1) promedio|Acceso rápido|
|`has()`|O(1) promedio|Verificación rápida|
|`delete()`|O(1) promedio|Eliminación eficiente|
|`clear()`|O(1)|Vaciar rápido|
|Iteración|O(n)|Recorrer todos|

---

## 🔗 Métodos Útiles Combinados

### Convertir Map a diferentes formatos

```js
const mapa = new Map([
    ["nombre", "Ana"],
    ["edad", 25],
    ["ciudad", "Madrid"]
]);

// A array de pares
const pares = [...mapa]; // [['nombre', 'Ana'], ['edad', 25], ...]

// A array de claves
const claves = [...mapa.keys()]; // ['nombre', 'edad', 'ciudad']

// A array de valores
const valores = [...mapa.values()]; // ['Ana', 25, 'Madrid']

// A objeto
const objeto = Object.fromEntries(mapa); // {nombre: 'Ana', edad: 25, ...}

// A JSON
const json = JSON.stringify(Object.fromEntries(mapa));

// A string descriptivo
const string = [...mapa]
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');
console.log(string); // "nombre: Ana, edad: 25, ciudad: Madrid"
```

---

## 🎓 Tips y Mejores Prácticas

### 1. Usar Map para implementar Set de objetos

```js
// Set no funciona bien con objetos (compara por referencia)
const objetosUnicos = new Map();

function agregarUnico(obj) {
    const clave = JSON.stringify(obj);
    if (!objetosUnicos.has(clave)) {
        objetosUnicos.set(clave, obj);
        return true;
    }
    return false;
}

agregarUnico({id: 1, nombre: "Ana"});
agregarUnico({id: 1, nombre: "Ana"}); // No se agrega (duplicado)
agregarUnico({id: 2, nombre: "Juan"}); // Se agrega

console.log(objetosUnicos.size); // 2
```

### 2. Encadenar operaciones con set()

```js
const config = new Map()
    .set("tema", "oscuro")
    .set("idioma", "es")
    .set("notificaciones", true)
    .set("volumen", 80);

console.log(config.size); // 4
```

### 3. Implementar valor por defecto al obtener

```js
function getOrDefault(mapa, clave, valorDefault) {
    return mapa.has(clave) ? mapa.get(clave) : valorDefault;
}

const config = new Map([["tema", "oscuro"]]);
console.log(getOrDefault(config, "idioma", "es")); // "es"
```

### 4. Clonar Map

```js
const original = new Map([["a", 1], ["b", 2]]);

// Copia superficial
const copia = new Map(original);

// Copia profunda (si los valores son objetos)
const copiaProf = new Map(
    [...original].map(([k, v]) => [k, structuredClone(v)])
);
```

### 5. Verificar si Map está vacío

```js
const mapa = new Map();

// ❌ Menos claro
if (mapa.size === 0) { }

// ✅ Más claro
if (mapa.size > 0) {
    console.log("Map tiene elementos");
}

// O crear helper
const isEmpty = (map) => map.size === 0;
console.log(isEmpty(mapa)); // true
```

---

## 📚 Recursos Adicionales

- **MDN Web Docs - Map:** Documentación oficial completa
- **JavaScript.info - Map:** Tutorial detallado con ejemplos
- **Can I Use - Map:** Compatibilidad en navegadores (100% en modernos)

---

## 🏆 Orden de Uso (Más → Menos Común)

1. **set()** - Agregar/actualizar elementos
2. **get()** - Obtener valores
3. **has()** - Verificar existencia
4. **for...of** - Iterar sobre el Map
5. **size** - Obtener tamaño
6. **delete()** - Eliminar elementos
7. **keys()**, **values()**, **entries()** - Obtener iteradores
8. **forEach()** - Iterar con callback
9. **clear()** - Vaciar el Map
10. **Conversiones** (a Array, Object, JSON)

---

## 💭 Conclusión

**Map** es una estructura de datos poderosa cuando:

- ✅ Necesitas flexibilidad en las claves
- ✅ El orden importa
- ✅ Rendimiento es crítico para add/delete
- ✅ Trabajas con pares clave-valor puros

Para casos simples con claves string, un **Object** puede ser suficiente. Para listas ordenadas sin claves, usa **Array**. Pero cuando necesitas las características específicas de Map, no hay mejor opción en JavaScript.