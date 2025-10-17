# 📘 Guía Completa de Arrays en JavaScript

## 📌 Conceptos Fundamentales

### ¿Qué es un Array?

Un **array** es una estructura de datos que almacena una **lista ordenada** de elementos. Puede contener valores de cualquier tipo (números, strings, objetos, incluso otros arrays).

```js
let numeros = [1, 2, 3, 4, 5];
let mixto = [1, "texto", true, null, {nombre: "Juan"}];
let vacio = [];
```

### 🔑 Características importantes:

- **Indexación:** Los elementos empiezan en índice 0
- **Dinámicos:** Pueden crecer o reducirse
- **Mutables:** La mayoría de métodos modifican el array original (¡cuidado!)
- **Heterogéneos:** Pueden mezclar tipos de datos

```js
let frutas = ["manzana", "pera", "plátano"];
console.log(frutas[0]);        // "manzana"
console.log(frutas[2]);        // "plátano"
console.log(frutas.length);    // 3
```

---

## 📏 1. Propiedad Fundamental

### `length`

**Devuelve:** `Number` - Cantidad de elementos en el array  
**Descripción:** Propiedad que indica el tamaño del array

```js
let frutas = ["manzana", "pera", "plátano"];
console.log(frutas.length); // 3

let vacio = [];
console.log(vacio.length); // 0

// ⚠️ Puedes modificar length para truncar el array
let nums = [1, 2, 3, 4, 5];
nums.length = 3;
console.log(nums); // [1, 2, 3] (se eliminaron 4 y 5)

// Crear array vacío de tamaño N
let espacios = new Array(5);
console.log(espacios.length); // 5
console.log(espacios); // [empty × 5]
```

---

## 🔍 2. Métodos de Búsqueda (MUY USADOS)

### `includes(elemento, desde)`

**Devuelve:** `Boolean` - true si el elemento existe  
**Parámetros:**

- `elemento` (any): lo que buscas
- `desde` (Number, opcional): índice desde donde buscar  
    **⚠️ Modifica el original:** NO

```js
let frutas = ["manzana", "pera", "plátano", "pera"];
console.log(frutas.includes("pera"));      // true
console.log(frutas.includes("uva"));       // false
console.log(frutas.includes("pera", 2));   // true (desde índice 2)

// Uso práctico: validar existencia
let permitidos = ["admin", "editor", "viewer"];
let rol = "admin";
if (permitidos.includes(rol)) {
    console.log("Acceso concedido");
}

// ⚠️ No funciona bien con objetos (compara referencias)
let obj = {id: 1};
let lista = [obj];
console.log(lista.includes({id: 1}));  // false (diferente referencia)
console.log(lista.includes(obj));      // true (misma referencia)
```

---

### `indexOf(elemento, desde)` / `lastIndexOf(elemento, desde)`

**Devuelve:** `Number` - Índice del elemento o -1 si no existe  
**Parámetros:**

- `elemento` (any): lo que buscas
- `desde` (Number, opcional): índice de inicio  
    **⚠️ Modifica el original:** NO

```js
let colores = ["rojo", "verde", "azul", "verde"];
console.log(colores.indexOf("verde"));          // 1 (primera aparición)
console.log(colores.lastIndexOf("verde"));      // 3 (última aparición)
console.log(colores.indexOf("negro"));          // -1 (no existe)
console.log(colores.indexOf("verde", 2));       // 3 (busca desde índice 2)

// Uso práctico: verificar si existe (antiguo, mejor usa includes)
if (colores.indexOf("rojo") !== -1) {
    console.log("Encontrado");
}

// Encontrar todas las posiciones de un elemento
let texto = ["a", "b", "a", "c", "a"];
let indices = [];
let idx = texto.indexOf("a");
while (idx !== -1) {
    indices.push(idx);
    idx = texto.indexOf("a", idx + 1);
}
console.log(indices); // [0, 2, 4]
```

---

### `find(callback)` / `findIndex(callback)`

**Devuelve:**

- `find()`: Elemento encontrado o `undefined`
- `findIndex()`: `Number` - Índice o -1  
    **Parámetros:** `callback(elemento, indice, array)` - función de prueba  
    **⚠️ Modifica el original:** NO

```js
let numeros = [5, 12, 8, 130, 44];

// find() devuelve el PRIMER elemento que cumple la condición
let encontrado = numeros.find(n => n > 10);
console.log(encontrado); // 12

let noEncontrado = numeros.find(n => n > 200);
console.log(noEncontrado); // undefined

// findIndex() devuelve el ÍNDICE
let indice = numeros.findIndex(n => n > 10);
console.log(indice); // 1 (posición de 12)

// Uso práctico: buscar objetos en arrays
let usuarios = [
    {id: 1, nombre: "Ana"},
    {id: 2, nombre: "Juan"},
    {id: 3, nombre: "María"}
];

let usuario = usuarios.find(u => u.id === 2);
console.log(usuario); // {id: 2, nombre: "Juan"}

// Callback completo con todos los parámetros
let resultado = numeros.find((elemento, indice, arrayCompleto) => {
    console.log(`Revisando ${elemento} en índice ${indice}`);
    return elemento > 10;
});
```

---

### `findLast()` / `findLastIndex()` 🆕

**Devuelve:** Último elemento/índice que cumple la condición  
**Parámetros:** `callback(elemento, indice, array)`  
**⚠️ Modifica el original:** NO

```js
let numeros = [5, 12, 8, 130, 44];

// Busca desde el FINAL hacia el inicio
let ultimo = numeros.findLast(n => n > 10);
console.log(ultimo); // 44 (último elemento > 10)

let ultimoIndice = numeros.findLastIndex(n => n > 10);
console.log(ultimoIndice); // 4
```

---

## ➕ 3. Métodos de Modificación (MUY USADOS)

### `push(...elementos)` / `pop()`

**Devuelve:**

- `push()`: `Number` - Nueva longitud del array
- `pop()`: Elemento eliminado o `undefined`  
    **Parámetros:** `push()` acepta N elementos  
    **⚠️ Modifica el original:** SÍ

```js
let numeros = [1, 2, 3];

// push() añade al FINAL
let nuevaLongitud = numeros.push(4);
console.log(nuevaLongitud); // 4
console.log(numeros);       // [1, 2, 3, 4]

// Añadir múltiples elementos
numeros.push(5, 6, 7);
console.log(numeros); // [1, 2, 3, 4, 5, 6, 7]

// pop() elimina del FINAL
let ultimo = numeros.pop();
console.log(ultimo);  // 7
console.log(numeros); // [1, 2, 3, 4, 5, 6]

// Uso práctico: implementar una pila (stack)
let pila = [];
pila.push("plato1");
pila.push("plato2");
pila.push("plato3");
console.log(pila.pop()); // "plato3" (último en entrar, primero en salir)
```

---

### `unshift(...elementos)` / `shift()`

**Devuelve:**

- `unshift()`: `Number` - Nueva longitud
- `shift()`: Elemento eliminado o `undefined`  
    **Parámetros:** `unshift()` acepta N elementos  
    **⚠️ Modifica el original:** SÍ

```js
let letras = ["b", "c"];

// unshift() añade al INICIO
let nuevaLongitud = letras.unshift("a");
console.log(nuevaLongitud); // 3
console.log(letras);        // ["a", "b", "c"]

// Añadir múltiples
letras.unshift("x", "y");
console.log(letras); // ["x", "y", "a", "b", "c"]

// shift() elimina del INICIO
let primero = letras.shift();
console.log(primero); // "x"
console.log(letras);  // ["y", "a", "b", "c"]

// ⚠️ Menos eficiente que push/pop (reindexar todo el array)

// Uso práctico: implementar una cola (queue)
let cola = [];
cola.push("persona1"); // Entra al final
cola.push("persona2");
cola.push("persona3");
console.log(cola.shift()); // "persona1" (primero en entrar, primero en salir)
```

---

### `splice(inicio, cantidad, ...elementos)`

**Devuelve:** `Array` - Elementos eliminados  
**Parámetros:**

- `inicio` (Number): índice donde empezar
- `cantidad` (Number): cuántos elementos eliminar
- `...elementos` (opcional): elementos a insertar  
    **⚠️ Modifica el original:** SÍ

```js
let meses = ["Enero", "Febrero", "Abril", "Mayo"];

// Insertar sin eliminar
meses.splice(2, 0, "Marzo");
console.log(meses); // ["Enero", "Febrero", "Marzo", "Abril", "Mayo"]

// Eliminar elementos
let eliminados = meses.splice(3, 2); // Desde índice 3, elimina 2
console.log(eliminados); // ["Abril", "Mayo"]
console.log(meses);      // ["Enero", "Febrero", "Marzo"]

// Reemplazar elementos
meses.splice(1, 1, "Feb");
console.log(meses); // ["Enero", "Feb", "Marzo"]

// Insertar múltiples
meses.splice(3, 0, "Abril", "Mayo", "Junio");
console.log(meses); // ["Enero", "Feb", "Marzo", "Abril", "Mayo", "Junio"]

// Eliminar desde un índice hasta el final
let nums = [1, 2, 3, 4, 5];
nums.splice(2); // Sin segundo parámetro = elimina todo desde índice 2
console.log(nums); // [1, 2]

// Con índices negativos
let letras = ["a", "b", "c", "d"];
letras.splice(-2, 1); // Desde penúltimo, elimina 1
console.log(letras); // ["a", "b", "d"]
```

---

## 🔄 4. Métodos de Transformación (MUY USADOS)

### `map(callback)`

**Devuelve:** `Array` - Nuevo array transformado  
**Parámetros:** `callback(elemento, indice, array)` - función de transformación  
**⚠️ Modifica el original:** NO

```js
let numeros = [1, 2, 3, 4];

// Transforma cada elemento
let dobles = numeros.map(n => n * 2);
console.log(dobles);  // [2, 4, 6, 8]
console.log(numeros); // [1, 2, 3, 4] (original intacto)

// Con objetos
let usuarios = [
    {nombre: "Ana", edad: 25},
    {nombre: "Juan", edad: 30}
];

let nombres = usuarios.map(u => u.nombre);
console.log(nombres); // ["Ana", "Juan"]

// Callback completo
let conIndice = numeros.map((num, i) => `${i}: ${num}`);
console.log(conIndice); // ["0: 1", "1: 2", "2: 3", "3: 4"]

// Transformar a objetos
let ids = [1, 2, 3];
let objetos = ids.map(id => ({id: id, activo: true}));
console.log(objetos); // [{id: 1, activo: true}, ...]

// ⚠️ Siempre devuelve array del mismo tamaño
// Si no retornas nada, pone undefined
let resultado = [1, 2, 3].map(n => {
    if (n > 1) return n * 2;
});
console.log(resultado); // [undefined, 4, 6]
```

---

### `filter(callback)`

**Devuelve:** `Array` - Nuevo array con elementos filtrados  
**Parámetros:** `callback(elemento, indice, array)` - función de prueba  
**⚠️ Modifica el original:** NO

```js
let edades = [12, 18, 25, 15, 30];

// Filtra elementos que cumplen la condición
let mayores = edades.filter(e => e >= 18);
console.log(mayores); // [18, 25, 30]

let menores = edades.filter(e => e < 18);
console.log(menores); // [12, 15]

// Con objetos
let productos = [
    {nombre: "Laptop", precio: 1000, stock: 5},
    {nombre: "Mouse", precio: 20, stock: 0},
    {nombre: "Teclado", precio: 50, stock: 10}
];

let disponibles = productos.filter(p => p.stock > 0);
console.log(disponibles); // Laptop y Teclado

// Filtros complejos
let caros = productos.filter(p => p.precio > 30 && p.stock > 0);

// Eliminar duplicados (uso avanzado)
let nums = [1, 2, 2, 3, 4, 4, 5];
let unicos = nums.filter((n, i, arr) => arr.indexOf(n) === i);
console.log(unicos); // [1, 2, 3, 4, 5]

// Eliminar valores falsy
let mixto = [0, 1, false, 2, "", 3, null, undefined, 4];
let verdaderos = mixto.filter(Boolean);
console.log(verdaderos); // [1, 2, 3, 4]
```

---

### `reduce(callback, valorInicial)`

**Devuelve:** `any` - Valor acumulado (puede ser cualquier tipo)  
**Parámetros:**

- `callback(acumulador, elemento, indice, array)` - función reductora
- `valorInicial` (opcional): valor inicial del acumulador  
    **⚠️ Modifica el original:** NO

```js
let numeros = [1, 2, 3, 4];

// Suma de todos los elementos
let suma = numeros.reduce((acum, n) => acum + n, 0);
console.log(suma); // 10

// Sin valor inicial (usa el primer elemento)
let producto = numeros.reduce((acum, n) => acum * n);
console.log(producto); // 24

// Encontrar el máximo
let max = numeros.reduce((max, n) => n > max ? n : max);
console.log(max); // 4

// Aplanar array de arrays
let anidado = [[1, 2], [3, 4], [5, 6]];
let plano = anidado.reduce((acum, arr) => acum.concat(arr), []);
console.log(plano); // [1, 2, 3, 4, 5, 6]

// Contar ocurrencias
let frutas = ["manzana", "pera", "manzana", "plátano", "pera", "manzana"];
let contador = frutas.reduce((acum, fruta) => {
    acum[fruta] = (acum[fruta] || 0) + 1;
    return acum;
}, {});
console.log(contador); // {manzana: 3, pera: 2, plátano: 1}

// Agrupar por propiedad
let personas = [
    {nombre: "Ana", edad: 25},
    {nombre: "Juan", edad: 30},
    {nombre: "María", edad: 25}
];

let porEdad = personas.reduce((grupos, p) => {
    let edad = p.edad;
    if (!grupos[edad]) grupos[edad] = [];
    grupos[edad].push(p);
    return grupos;
}, {});
console.log(porEdad);
// {25: [{nombre: "Ana", edad: 25}, {nombre: "María", edad: 25}], 30: [...]}

// ⚠️ Si no das valor inicial y el array está vacío, da error
// [].reduce((a, b) => a + b); // ❌ TypeError
[].reduce((a, b) => a + b, 0); // ✅ 0
```

---

### `forEach(callback)`

**Devuelve:** `undefined` (no devuelve nada)  
**Parámetros:** `callback(elemento, indice, array)`  
**⚠️ Modifica el original:** NO (pero puedes modificar objetos dentro)

```js
let numeros = [1, 2, 3];

// Ejecuta función por cada elemento
numeros.forEach(n => console.log(n * 2));
// 2
// 4
// 6

// Con índice
let frutas = ["manzana", "pera", "plátano"];
frutas.forEach((fruta, i) => {
    console.log(`${i}: ${fruta}`);
});
// 0: manzana
// 1: pera
// 2: plátano

// Modificar objetos (¡cuidado!)
let usuarios = [{id: 1, activo: false}, {id: 2, activo: false}];
usuarios.forEach(u => u.activo = true);
console.log(usuarios); // Todos activos ahora

// ⚠️ No puedes usar break o continue
// ⚠️ No puedes retornar un valor
let resultado = numeros.forEach(n => n * 2);
console.log(resultado); // undefined

// Si necesitas retornar, usa map()
let dobles = numeros.map(n => n * 2); // ✅ Mejor
```

---

### `sort(callback)`

**Devuelve:** `Array` - El mismo array ordenado  
**Parámetros:** `callback(a, b)` (opcional) - función de comparación  
**⚠️ Modifica el original:** SÍ

```js
// Sin callback: ordena como strings
let numeros = [10, 5, 40, 25, 100];
numeros.sort();
console.log(numeros); // [10, 100, 25, 40, 5] ❌ Orden alfabético!

// Con callback para números
numeros.sort((a, b) => a - b); // Ascendente
console.log(numeros); // [5, 10, 25, 40, 100] ✅

numeros.sort((a, b) => b - a); // Descendente
console.log(numeros); // [100, 40, 25, 10, 5]

// Strings (orden alfabético)
let letras = ["c", "a", "b"];
letras.sort();
console.log(letras); // ["a", "b", "c"]

// Strings con acentos
let palabras = ["árbol", "casa", "barco"];
palabras.sort((a, b) => a.localeCompare(b, "es"));
console.log(palabras); // ["árbol", "barco", "casa"]

// Objetos por propiedad
let personas = [
    {nombre: "Juan", edad: 30},
    {nombre: "Ana", edad: 25},
    {nombre: "María", edad: 28}
];

personas.sort((a, b) => a.edad - b.edad);
console.log(personas); // Ordenado por edad

personas.sort((a, b) => a.nombre.localeCompare(b.nombre));
console.log(personas); // Ordenado por nombre

// Cómo funciona el callback:
// Si devuelve < 0: a va antes que b
// Si devuelve > 0: b va antes que a
// Si devuelve 0: mantiene orden original
```

---

### `reverse()`

**Devuelve:** `Array` - El mismo array invertido  
**Parámetros:** Ninguno  
**⚠️ Modifica el original:** SÍ

```js
let numeros = [1, 2, 3, 4, 5];
numeros.reverse();
console.log(numeros); // [5, 4, 3, 2, 1]

// Uso común: ordenar descendente
let nums = [3, 1, 4, 1, 5];
nums.sort((a, b) => a - b).reverse();
console.log(nums); // [5, 4, 3, 1, 1]

// O mejor: sort descendente directo
nums.sort((a, b) => b - a);
```

---

## ✂️ 5. Métodos de Extracción

### `slice(inicio, fin)`

**Devuelve:** `Array` - Copia de una porción  
**Parámetros:**

- `inicio` (Number): índice inicial (inclusivo)
- `fin` (Number, opcional): índice final (exclusivo)  
    **⚠️ Modifica el original:** NO

```js
let animales = ["perro", "gato", "conejo", "pez", "loro"];

// Extrae desde inicio hasta fin-1
let algunos = animales.slice(1, 3);
console.log(algunos);  // ["gato", "conejo"]
console.log(animales); // Original intacto

// Desde un índice hasta el final
let ultimos = animales.slice(2);
console.log(ultimos); // ["conejo", "pez", "loro"]

// Con índices negativos
console.log(animales.slice(-2));      // ["pez", "loro"]
console.log(animales.slice(-4, -1));  // ["gato", "conejo", "pez"]

// Copiar todo el array
let copia = animales.slice();
console.log(copia); // ["perro", "gato", "conejo", "pez", "loro"]

// ⚠️ Es copia superficial (objetos se copian por referencia)
let arr = [{id: 1}, {id: 2}];
let copia2 = arr.slice();
copia2[0].id = 99;
console.log(arr[0].id); // 99 (también cambió el original!)
```

---

### `at(indice)`

**Devuelve:** Elemento en esa posición o `undefined`  
**Parámetros:** `indice` (Number) - acepta negativos  
**⚠️ Modifica el original:** NO

```js
let letras = ["a", "b", "c", "d"];

console.log(letras.at(0));   // "a"
console.log(letras.at(2));   // "c"
console.log(letras.at(-1));  // "d" (último)
console.log(letras.at(-2));  // "c" (penúltimo)
console.log(letras.at(10));  // undefined

// Ventaja sobre notación de corchetes
console.log(letras[letras.length - 1]); // "d" (antiguo)
console.log(letras.at(-1));             // "d" (moderno, más legible)
```

---

## 🔗 6. Métodos de Combinación

### `concat(...arrays)`

**Devuelve:** `Array` - Nuevo array combinado  
**Parámetros:** N arrays o valores  
**⚠️ Modifica el original:** NO

```js
let a = [1, 2];
let b = [3, 4];
let c = [5, 6];

let combinado = a.concat(b);
console.log(combinado); // [1, 2, 3, 4]
console.log(a);         // [1, 2] (original intacto)

// Múltiples arrays
let todos = a.concat(b, c);
console.log(todos); // [1, 2, 3, 4, 5, 6]

// Mezclar arrays y valores
let mixto = a.concat(10, b, 20);
console.log(mixto); // [1, 2, 10, 3, 4, 20]

// Alternativa moderna con spread operator
let spread = [...a, ...b, ...c];
console.log(spread); // [1, 2, 3, 4, 5, 6]
```

---

### `join(separador)`

**Devuelve:** `String` - Cadena con elementos unidos  
**Parámetros:** `separador` (String, opcional) - default: ","  
**⚠️ Modifica el original:** NO

```js
let palabras = ["Hola", "mundo", "JavaScript"];

console.log(palabras.join());      // "Hola,mundo,JavaScript"
console.log(palabras.join(" "));   // "Hola mundo JavaScript"
console.log(palabras.join("-"));   // "Hola-mundo-JavaScript"
console.log(palabras.join(""));    // "HolamundoJavaScript"

// Uso práctico: crear URLs
let ruta = ["usuario", "perfil", "configuracion"];
let url = "/" + ruta.join("/");
console.log(url); // "/usuario/perfil/configuracion"

// Crear tabla visual
let fila = ["Ana", "25", "España"];
console.log("| " + fila.join(" | ") + " |");
// | Ana | 25 | España |

// ⚠️ Convierte elementos a string automáticamente
let mixto = [1, null, undefined, true, {x: 1}];
console.log(mixto.join(", "));
// "1, , , true, [object Object]"
```

---

## 🔢 7. Métodos de Verificación

### `some(callback)`

**Devuelve:** `Boolean` - true si ALGÚN elemento cumple  
**Parámetros:** `callback(elemento, indice, array)`  
**⚠️ Modifica el original:** NO

```js
let edades = [12, 16, 18, 15];

// ¿Hay algún mayor de edad?
console.log(edades.some(e => e >= 18)); // true

// ¿Hay algún menor de 10?
console.log(edades.some(e => e < 10)); // false

// Con objetos
let usuarios = [
    {nombre: "Ana", premium: false},
    {nombre: "Juan", premium: true}
];

let hayPremium = usuarios.some(u => u.premium);
console.log(hayPremium); // true

// Se detiene en la primera coincidencia (eficiente)
let nums = [1, 2, 3, 4, 5];
let resultado = nums.some(n => {
    console.log(`Revisando ${n}`);
    return n > 3;
});
// Revisando 1
// Revisando 2
// Revisando 3
// Revisando 4
console.log(resultado); // true (se detuvo en 4)
```

---

### `every(callback)`

**Devuelve:** `Boolean` - true si TODOS los elementos cumplen  
**Parámetros:** `callback(elemento, indice, array)`  
**⚠️ Modifica el original:** NO

```js
let edades = [18, 22, 25, 30];

// ¿Todos son mayores de edad?
console.log(edades.every(e => e >= 18)); // true

// ¿Todos son mayores de 20?
console.log(edades.every(e => e >= 20)); // false

// Validar formulario
let campos = [
    {nombre: "email", valido: true},
    {nombre: "password", valido: true},
    {nombre: "telefono", valido: false}
];

let formularioValido = campos.every(c => c.valido);
console.log(formularioValido); // false

// Se detiene en la primera que falla
let nums = [2, 4, 6, 7, 8];
let todosPares = nums.every(n => {
    console.log(`Revisando ${n}`);
    return n % 2 === 0;
});
// Revisando 2
// Revisando 4
// Revisando 6
// Revisando 7
console.log(todosPares); // false (se detuvo en 7)
```

---

## 📊 8. Métodos de Aplanamiento

### `flat(profundidad)`

**Devuelve:** `Array` - Nuevo array aplanado  
**Parámetros:** `profundidad` (Number, opcional) - niveles a aplanar (default: 1)  
**⚠️ Modifica el original:** NO

```js
let anidado = [1, [2, 3], [4, [5, 6]]];

// Aplanar 1 nivel (default)
console.log(anidado.flat());
// [1, 2, 3, 4, [5, 6]]

// Aplanar 2 niveles
console.log(anidado.flat(2));
// [1, 2, 3, 4, 5, 6]

// Aplanar todo (Infinity)
let muyAnidado = [1, [2, [3, [4, [5]]]]];
console.log(muyAnidado.flat(Infinity));
// [1, 2, 3, 4, 5]

// Eliminar huecos vacíos
let conHuecos = [1, 2, , , 3];
console.log(conHuecos.flat());
// [1, 2, 3]
```

---

### `flatMap(callback)`

**Devuelve:** `Array` - Nuevo array mapeado y aplanado (1 nivel)  
**Parámetros:** `callback(elemento, indice, array)`  
**⚠️ Modifica el original:** NO

```js
// Equivale a map().flat()
let numeros = [1, 2, 3];

// Con map() + flat()
let resultado1 = numeros.map(n => [n, n * 2]).flat();
console.log(resultado1); // [1, 2, 2, 4, 3, 6]

// Con flatMap() (más eficiente)
let resultado2 = numeros.flatMap(n => [n, n * 2]);
console.log(resultado2); // [1, 2, 2, 4, 3, 6]

// Uso práctico: dividir strings en palabras
let frases = ["hola mundo", "adiós amigos"];
let palabras = frases.flatMap(f => f.split(" "));
console.log(palabras); // ["hola", "mundo", "adiós", "amigos"]

// Filtrar y mapear en un paso
let nums = [1, 2, 3, 4];
let resultado = nums.flatMap(n => n % 2 === 0 ? [n * 2] : []);
console.log(resultado); // [4, 8] (solo pares multiplicados)

// ⚠️ Solo aplana 1 nivel
let anidado = [1, 2, 3].flatMap(n => [[n, n * 2]]);
console.log(anidado); // [[1, 2], [2, 4], [3, 6]]
```

---

## 🆕 9. Métodos Inmutables Modernos (ES2023)

### `toSorted(callback)`

**Devuelve:** `Array` - Nuevo array ordenado  
**Parámetros:** `callback(a, b)` (opcional)  
**⚠️ Modifica el original:** NO (versión inmutable de `sort()`)

```js
let numeros = [3, 1, 4, 1, 5];

// sort() modifica el original
let original = [3, 1, 4, 1, 5];
let ordenado1 = original.sort((a, b) => a - b);
console.log(original);  // [1, 1, 3, 4, 5] ❌ Modificado!
console.log(ordenado1); // [1, 1, 3, 4, 5]

// toSorted() NO modifica el original
let original2 = [3, 1, 4, 1, 5];
let ordenado2 = original2.toSorted((a, b) => a - b);
console.log(original2);  // [3, 1, 4, 1, 5] ✅ Intacto!
console.log(ordenado2);  // [1, 1, 3, 4, 5]
```

---

### `toReversed()`

**Devuelve:** `Array` - Nuevo array invertido  
**Parámetros:** Ninguno  
**⚠️ Modifica el original:** NO

```js
let letras = ["a", "b", "c", "d"];

// reverse() modifica el original
let original = ["a", "b", "c", "d"];
let invertido1 = original.reverse();
console.log(original);   // ["d", "c", "b", "a"] ❌ Modificado!

// toReversed() NO modifica el original
let original2 = ["a", "b", "c", "d"];
let invertido2 = original2.toReversed();
console.log(original2);  // ["a", "b", "c", "d"] ✅ Intacto!
console.log(invertido2); // ["d", "c", "b", "a"]
```

---

### `toSpliced(inicio, cantidad, ...elementos)`

**Devuelve:** `Array` - Nuevo array con cambios  
**Parámetros:** Igual que `splice()`  
**⚠️ Modifica el original:** NO

```js
let meses = ["Enero", "Febrero", "Abril"];

// splice() modifica el original
let original = ["Enero", "Febrero", "Abril"];
let resultado1 = original.splice(2, 0, "Marzo");
console.log(original);   // ["Enero", "Febrero", "Marzo", "Abril"] ❌ Modificado!
console.log(resultado1); // [] (devuelve eliminados)

// toSpliced() NO modifica el original
let original2 = ["Enero", "Febrero", "Abril"];
let resultado2 = original2.toSpliced(2, 0, "Marzo");
console.log(original2);  // ["Enero", "Febrero", "Abril"] ✅ Intacto!
console.log(resultado2); // ["Enero", "Febrero", "Marzo", "Abril"]
```

---

### `with(indice, valor)`

**Devuelve:** `Array` - Nuevo array con un elemento cambiado  
**Parámetros:**

- `indice` (Number): posición a cambiar
- `valor` (any): nuevo valor  
    **⚠️ Modifica el original:** NO

```js
let colores = ["rojo", "verde", "azul"];

// Forma antigua (modifica original)
colores[1] = "amarillo";
console.log(colores); // ["rojo", "amarillo", "azul"] ❌

// with() NO modifica el original
let colores2 = ["rojo", "verde", "azul"];
let nuevos = colores2.with(1, "amarillo");
console.log(colores2); // ["rojo", "verde", "azul"] ✅ Intacto!
console.log(nuevos);   // ["rojo", "amarillo", "azul"]

// Con índices negativos
let nums = [1, 2, 3, 4, 5];
let cambiado = nums.with(-1, 99);
console.log(cambiado); // [1, 2, 3, 4, 99]
```

---

## 🔧 10. Métodos Estáticos (de la clase Array)

### `Array.isArray(valor)`

**Devuelve:** `Boolean` - true si es un array  
**Parámetros:** `valor` (any)  
**Tipo:** Método estático

```js
console.log(Array.isArray([1, 2, 3]));        // true
console.log(Array.isArray([]));               // true
console.log(Array.isArray("texto"));          // false
console.log(Array.isArray({length: 0}));      // false
console.log(Array.isArray(null));             // false
console.log(Array.isArray(undefined));        // false

// Uso práctico: validar parámetros
function procesarLista(datos) {
    if (!Array.isArray(datos)) {
        throw new Error("Se esperaba un array");
    }
    return datos.map(x => x * 2);
}
```

---

### `Array.from(iterable, mapFn)`

**Devuelve:** `Array` - Nuevo array creado desde iterable  
**Parámetros:**

- `iterable` (any): objeto iterable o array-like
- `mapFn` (Function, opcional): función de mapeo  
    **Tipo:** Método estático

```js
// Desde string
console.log(Array.from("hola")); // ["h", "o", "l", "a"]

// Desde Set
let conjunto = new Set([1, 2, 2, 3]);
console.log(Array.from(conjunto)); // [1, 2, 3]

// Desde NodeList (DOM)
// let divs = document.querySelectorAll('div');
// let arrayDivs = Array.from(divs);

// Con función de mapeo
console.log(Array.from([1, 2, 3], x => x * 2)); // [2, 4, 6]

// Crear array de secuencia
console.log(Array.from({length: 5}, (_, i) => i)); // [0, 1, 2, 3, 4]

// Crear array de N elementos con valor
console.log(Array.from({length: 3}, () => 0)); // [0, 0, 0]

// Desde argumentos de función
function sumar() {
    let args = Array.from(arguments);
    return args.reduce((a, b) => a + b, 0);
}
console.log(sumar(1, 2, 3, 4)); // 10
```

---

### `Array.of(...elementos)`

**Devuelve:** `Array` - Nuevo array con los elementos dados  
**Parámetros:** N elementos  
**Tipo:** Método estático

```js
// Crea array con los elementos dados
console.log(Array.of(1, 2, 3));    // [1, 2, 3]
console.log(Array.of(5));          // [5]
console.log(Array.of());           // []

// ⚠️ Diferencia con constructor Array()
console.log(new Array(3));         // [empty × 3] (3 slots vacíos)
console.log(Array.of(3));          // [3] (array con el número 3)

console.log(new Array(1, 2, 3));   // [1, 2, 3]
console.log(Array.of(1, 2, 3));    // [1, 2, 3]

// Uso: cuando quieres crear un array con un solo número
let tamano = 5;
let array1 = new Array(tamano);  // [empty × 5]
let array2 = Array.of(tamano);   // [5]
```

---

## 📊 11. Métodos de Iteración Avanzados

### `keys()` / `values()` / `entries()`

**Devuelve:** `Iterator` - Iterador de índices/valores/pares  
**Parámetros:** Ninguno  
**⚠️ Modifica el original:** NO

```js
let frutas = ["manzana", "pera", "plátano"];

// keys() - iterador de índices
for (let indice of frutas.keys()) {
    console.log(indice); // 0, 1, 2
}

// values() - iterador de valores
for (let fruta of frutas.values()) {
    console.log(fruta); // "manzana", "pera", "plátano"
}

// entries() - iterador de pares [índice, valor]
for (let [i, fruta] of frutas.entries()) {
    console.log(`${i}: ${fruta}`);
}
// 0: manzana
// 1: pera
// 2: plátano

// Convertir a array
console.log([...frutas.keys()]);    // [0, 1, 2]
console.log([...frutas.values()]);  // ["manzana", "pera", "plátano"]
console.log([...frutas.entries()]); // [[0, "manzana"], [1, "pera"], [2, "plátano"]]
```

---

### `reduceRight(callback, valorInicial)`

**Devuelve:** `any` - Valor acumulado  
**Parámetros:** Igual que `reduce()` pero de derecha a izquierda  
**⚠️ Modifica el original:** NO

```js
let numeros = [1, 2, 3, 4];

// reduce() va de izquierda a derecha
let resultado1 = numeros.reduce((acum, n) => {
    console.log(`${acum} - ${n}`);
    return acum - n;
}, 10);
// 10 - 1 = 9
// 9 - 2 = 7
// 7 - 3 = 4
// 4 - 4 = 0
console.log(resultado1); // 0

// reduceRight() va de derecha a izquierda
let resultado2 = numeros.reduceRight((acum, n) => {
    console.log(`${acum} - ${n}`);
    return acum - n;
}, 10);
// 10 - 4 = 6
// 6 - 3 = 3
// 3 - 2 = 1
// 1 - 1 = 0
console.log(resultado2); // 0

// Uso práctico: componer funciones
let funciones = [
    x => x + 1,
    x => x * 2,
    x => x - 3
];

let componer = funciones.reduceRight((f, g) => x => f(g(x)));
console.log(componer(5)); // ((5 - 3) * 2) + 1 = 5
```

---

## 🎯 Resumen de Tipos de Retorno

|Método|Devuelve|Modifica Original|
|---|---|---|
|`push()`, `unshift()`|`Number` (longitud)|✅ SÍ|
|`pop()`, `shift()`|Elemento eliminado|✅ SÍ|
|`splice()`|`Array` (eliminados)|✅ SÍ|
|`sort()`, `reverse()`|`Array` (el mismo)|✅ SÍ|
|`map()`, `filter()`, `slice()`|`Array` (nuevo)|❌ NO|
|`reduce()`, `reduceRight()`|`any`|❌ NO|
|`find()`|Elemento o `undefined`|❌ NO|
|`findIndex()`, `indexOf()`|`Number` (-1 si no encuentra)|❌ NO|
|`includes()`, `some()`, `every()`|`Boolean`|❌ NO|
|`forEach()`|`undefined`|❌ NO|
|`join()`|`String`|❌ NO|
|`flat()`, `flatMap()`|`Array` (nuevo)|❌ NO|
|`toSorted()`, `toReversed()`, `toSpliced()`, `with()`|`Array` (nuevo)|❌ NO|
|`keys()`, `values()`, `entries()`|`Iterator`|❌ NO|
|`Array.isArray()`|`Boolean`|-|
|`Array.from()`, `Array.of()`|`Array`|-|

---

## 💡 Métodos Mutables vs Inmutables

### 🔴 MUTABLES (modifican el original):

```js
let arr = [1, 2, 3];

arr.push(4);        // [1, 2, 3, 4]
arr.pop();          // [1, 2, 3]
arr.shift();        // [2, 3]
arr.unshift(0);     // [0, 2, 3]
arr.splice(1, 1);   // [0, 3]
arr.sort();         // [0, 3]
arr.reverse();      // [3, 0]
arr.fill(5);        // [5, 5]
```

### 🟢 INMUTABLES (devuelven nuevo array):

```js
let arr = [1, 2, 3];

arr.map(x => x * 2);      // [2, 4, 6]
arr.filter(x => x > 1);   // [2, 3]
arr.slice(0, 2);          // [1, 2]
arr.concat([4, 5]);       // [1, 2, 3, 4, 5]
arr.flat();               // [1, 2, 3]
arr.toSorted();           // [1, 2, 3]
arr.toReversed();         // [3, 2, 1]
arr.with(0, 99);          // [99, 2, 3]

console.log(arr); // [1, 2, 3] (siempre igual)
```

---

## 🎓 Patrones Comunes y Mejores Prácticas

### 1. Encadenar métodos (method chaining)

```js
let resultado = [1, 2, 3, 4, 5, 6]
    .filter(n => n % 2 === 0)  // [2, 4, 6]
    .map(n => n * 2)           // [4, 8, 12]
    .reduce((a, b) => a + b);  // 24

console.log(resultado); // 24
```

### 2. Eliminar duplicados

```js
// Con Set (más eficiente)
let nums = [1, 2, 2, 3, 4, 4, 5];
let unicos = [...new Set(nums)];
console.log(unicos); // [1, 2, 3, 4, 5]

// Con filter
let unicos2 = nums.filter((n, i, arr) => arr.indexOf(n) === i);

// Objetos por propiedad
let usuarios = [
    {id: 1, nombre: "Ana"},
    {id: 2, nombre: "Juan"},
    {id: 1, nombre: "Ana"}
];
let unicosObj = [...new Map(usuarios.map(u => [u.id, u])).values()];
```

### 3. Agrupar elementos

```js
let personas = [
    {nombre: "Ana", edad: 25},
    {nombre: "Juan", edad: 30},
    {nombre: "María", edad: 25}
];

let porEdad = personas.reduce((grupos, p) => {
    (grupos[p.edad] = grupos[p.edad] || []).push(p);
    return grupos;
}, {});

console.log(porEdad);
// {25: [{nombre: "Ana"...}, {nombre: "María"...}], 30: [{nombre: "Juan"...}]}
```

### 4. Ordenar por múltiples criterios

```js
let productos = [
    {nombre: "Laptop", precio: 1000, stock: 5},
    {nombre: "Mouse", precio: 20, stock: 0},
    {nombre: "Teclado", precio: 50, stock: 0},
    {nombre: "Monitor", precio: 300, stock: 3}
];

// Primero por stock, luego por precio
productos.sort((a, b) => {
    if (a.stock !== b.stock) return b.stock - a.stock;
    return a.precio - b.precio;
});
```

### 5. Encontrar mínimo/máximo

```js
let numeros = [5, 2, 8, 1, 9];

// Con Math
let max = Math.max(...numeros);
let min = Math.min(...numeros);

// Con reduce
let max2 = numeros.reduce((a, b) => a > b ? a : b);
let min2 = numeros.reduce((a, b) => a < b ? a : b);
```

### 6. Partir array en chunks

```js
function chunk(arr, size) {
    return arr.reduce((chunks, item, i) => {
        if (i % size === 0) chunks.push([]);
        chunks[chunks.length - 1].push(item);
        return chunks;
    }, []);
}

let nums = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(chunk(nums, 3)); // [[1,2,3], [4,5,6], [7,8]]
```

### 7. Crear rango de números

```js
// Rango simple
let rango = Array.from({length: 10}, (_, i) => i);
console.log(rango); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// Rango con inicio y fin
function range(inicio, fin) {
    return Array.from({length: fin - inicio + 1}, (_, i) => inicio + i);
}
console.log(range(5, 10)); // [5, 6, 7, 8, 9, 10]
```

### 8. Shuffle (mezclar aleatoriamente)

```js
function shuffle(arr) {
    return arr
        .map(x => ({valor: x, orden: Math.random()}))
        .sort((a, b) => a.orden - b.orden)
        .map(x => x.valor);
}

let cartas = [1, 2, 3, 4, 5];
console.log(shuffle(cartas)); // Orden aleatorio
```

---

## 🚨 Errores Comunes

### 1. Modificar array mientras lo iteras

```js
let nums = [1, 2, 3, 4, 5];

// ❌ MAL: modifica mientras itera
nums.forEach((n, i) => {
    if (n % 2 === 0) nums.splice(i, 1);
});
// Resultado impredecible

// ✅ BIEN: usa filter
let impares = nums.filter(n => n % 2 !== 0);
```

### 2. Olvidar que sort() modifica el original

```js
let nums = [3, 1, 2];

// ❌ Modifica original sin querer
let ordenado = nums.sort();
console.log(nums); // [1, 2, 3] ¡Modificado!

// ✅ Copia primero
let ordenado2 = [...nums].sort();
// O usa toSorted()
let ordenado3 = nums.toSorted();
```

### 3. sort() sin comparador en números

```js
let nums = [10, 5, 40, 25, 100];

// ❌ Ordena como strings
nums.sort();
console.log(nums); // [10, 100, 25, 40, 5]

// ✅ Usa comparador
nums.sort((a, b) => a - b);
console.log(nums); // [5, 10, 25, 40, 100]
```

### 4. Confundir forEach con map

```js
let nums = [1, 2, 3];

// ❌ forEach no devuelve array
let dobles = nums.forEach(n => n * 2);
console.log(dobles); // undefined

// ✅ Usa map
let dobles2 = nums.map(n => n * 2);
console.log(dobles2); // [2, 4, 6]
```

### 5. Copias superficiales

```js
let arr = [{id: 1}, {id: 2}];

// ❌ Copia superficial (objetos comparten referencia)
let copia = arr.slice();
copia[0].id = 99;
console.log(arr[0].id); // 99 ¡También cambió!

// ✅ Copia profunda
let copiaReal = JSON.parse(JSON.stringify(arr));
// O con structuredClone()
let copiaReal2 = structuredClone(arr);
```

### 6. Usar reduce sin valor inicial

```js
let vacio = [];

// ❌ Error si array vacío
// vacio.reduce((a, b) => a + b); // TypeError

// ✅ Siempre pon valor inicial
vacio.reduce((a, b) => a + b, 0); // 0
```

---

## 🔗 Conversiones Útiles

### Array ↔ String

```js
// Array → String
let arr = ["h", "o", "l", "a"];
console.log(arr.join(""));        // "hola"

// String → Array
let str = "hola";
console.log(str.split(""));       // ["h", "o", "l", "a"]
console.log([...str]);            // ["h", "o", "l", "a"]
console.log(Array.from(str));     // ["h", "o", "l", "a"]
```

### Array ↔ Set

```js
// Array → Set (elimina duplicados)
let arr = [1, 2, 2, 3];
let set = new Set(arr);
console.log(set); // Set {1, 2, 3}

// Set → Array
let arr2 = [...set];
console.log(arr2); // [1, 2, 3]
```

### Array ↔ Object

```js
// Array de pares → Object
let pares = [["a", 1], ["b", 2]];
let obj = Object.fromEntries(pares);
console.log(obj); // {a: 1, b: 2}

// Object → Array de pares
let obj2 = {a: 1, b: 2};
let pares2 = Object.entries(obj2);
console.log(pares2); // [["a", 1], ["b", 2]]
```

---

## 📚 Recursos y Referencias

- **MDN Web Docs:** Documentación oficial más completa
- **Array Explorer:** Herramienta interactiva para encontrar métodos
- **Can I Use:** Compatibilidad de métodos modernos en navegadores

---

## 🎯 Orden de Métodos por Uso (Más → Menos Común)

1. **push()**, **pop()** - Añadir/quitar al final
2. **map()** - Transformar elementos
3. **filter()** - Filtrar elementos
4. **includes()** - Verificar existencia
5. **forEach()** - Iterar sin retorno
6. **find()**, **findIndex()** - Buscar elemento/índice
7. **reduce()** - Acumular valor
8. **slice()** - Extraer porción
9. **splice()** - Modificar array
10. **concat()** - Combinar arrays
11. **join()** - Unir en string
12. **sort()** - Ordenar
13. **some()**, **every()** - Verificar condiciones
14. **indexOf()** - Buscar índice
15. **reverse()** - Invertir
16. **flat()**, **flatMap()** - Aplanar
17. **unshift()**, **shift()** - Añadir/quitar al inicio
18. **at()** - Acceder por índice
19. **Array.from()**, **Array.isArray()** - Crear/verificar
20. **Métodos inmutables modernos** - toSorted(), toReversed(), etc.