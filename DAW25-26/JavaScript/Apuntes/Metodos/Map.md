# 🗺️ Map en JavaScript

  

El objeto **`Map`** en JavaScript es una **colección de pares clave-valor** donde **las claves pueden ser de cualquier tipo** (no solo strings como en los objetos normales).  

Mantiene el **orden de inserción** y permite acceder, agregar o eliminar elementos fácilmente.

  

---

  

## 🔹 Crear un Map

  

```js

const mapa = new Map();

  

mapa.set("nombre", "Ana");

mapa.set("edad", 25);

  

console.log(mapa);

// Map(2) { 'nombre' => 'Ana', 'edad' => 25 }

```

  

También puedes crear un `Map` a partir de un array de pares clave-valor:

  

```js

const mapa = new Map([

  ["nombre", "Luis"],

  ["edad", 30]

]);

  

console.log(mapa.get("nombre")); // Luis

```

  

---

  

## 🔹 Propiedades principales

  

| Propiedad | Descripción | Ejemplo |

|------------|--------------|----------|

| `size` | Devuelve el número de elementos en el Map | `mapa.size` → `2` |

  

---

  

## 🔹 Métodos principales de `Map`

  

### 1. `set(clave, valor)`

Agrega o actualiza un elemento en el Map.

  

```js

const mapa = new Map();

mapa.set("color", "azul");

mapa.set("tamaño", "grande");

  

console.log(mapa);

// Map(2) { 'color' => 'azul', 'tamaño' => 'grande' }


mapa.set("nombre", ["Aimar", "Adrián", "David"]);

console.log(mapa.get("nombre"));
// ["Aimar", "Adrián", "David"]


```

  

Si la clave ya existe, su valor se reemplaza:

  

```js

mapa.set("color", "rojo");

console.log(mapa.get("color")); // rojo

```

  

---

  

### 2. `get(clave)`

Obtiene el valor asociado a una clave.

  

```js

const mapa = new Map([["nombre", "Ana"], ["edad", 22]]);

console.log(mapa.get("nombre")); // Ana

console.log(mapa.get("ciudad")); // undefined

```

  

---

  

### 3. `has(clave)`

Comprueba si una clave existe en el Map.

  

```js

const mapa = new Map([["a", 1], ["b", 2]]);

console.log(mapa.has("a")); // true

console.log(mapa.has("z")); // false

```

  

---

  

### 4. `delete(clave)`

Elimina un elemento por su clave.  

Devuelve `true` si se eliminó correctamente, `false` si no existía.

  

```js

const mapa = new Map([["x", 10], ["y", 20]]);

mapa.delete("x");

console.log(mapa); // Map(1) { 'y' => 20 }

```

  

---

  

### 5. `clear()`

Elimina **todos** los elementos del Map.

  

```js

const mapa = new Map([["uno", 1], ["dos", 2]]);

mapa.clear();

console.log(mapa.size); // 0

```

  

---

  

## 🔹 Iterar sobre un Map

  

### 1. `forEach(callback)`

```js

const mapa = new Map([["a", 1], ["b", 2], ["c", 3]]);

  

mapa.forEach((valor, clave) => {

  console.log(clave, valor);

});

// a 1

// b 2

// c 3

```

  

### 2. `for...of`

```js

const mapa = new Map([["nombre", "Ana"], ["edad", 25]]);

  

for (const [clave, valor] of mapa) {

  console.log(`${clave}: ${valor}`);

}

// nombre: Ana

// edad: 25

```

  

---

  

## 🔹 Métodos de iteración avanzados

  

| Método | Descripción | Ejemplo |

|---------|--------------|----------|

| `mapa.keys()` | Devuelve un iterador con todas las claves | `[...mapa.keys()]` |

| `mapa.values()` | Devuelve un iterador con todos los valores | `[...mapa.values()]` |

| `mapa.entries()` | Devuelve un iterador con pares `[clave, valor]` | `[...mapa.entries()]` |

  

```js

const mapa = new Map([["a", 10], ["b", 20]]);

  

console.log([...mapa.keys()]);   // ['a', 'b']

console.log([...mapa.values()]); // [10, 20]

console.log([...mapa.entries()]); // [['a', 10], ['b', 20]]

```

  

---

  

## 🔹 Comparación entre `Map` y `Object`

  

| Característica | `Map` | `Object` |

|-----------------|-------|-----------|

| Claves pueden ser de cualquier tipo | ✅ Sí | ❌ Solo strings o símbolos |

| Mantiene orden de inserción | ✅ Sí | ❌ No garantizado |

| Se puede obtener el tamaño fácilmente | ✅ `.size` | ❌ Hay que contar manualmente |

| Iteración directa | ✅ Sí (`for...of`) | ❌ Se necesita `Object.keys()` o similar |

| Mejor rendimiento con muchas inserciones | ✅ | ❌ |

  

---

  

## 🔹 Convertir entre `Map` y `Array`

  

### 🧩 De Array → Map

```js

const array = [["nombre", "Ana"], ["edad", 25]];

const mapa = new Map(array);

  

console.log(mapa.get("nombre")); // Ana

```

  

### 🧩 De Map → Array

```js

const mapa = new Map([["x", 1], ["y", 2]]);

const array = [...mapa];

console.log(array); // [['x', 1], ['y', 2]]

```

  

### 🧩 Solo claves o valores

```js

console.log([...mapa.keys()]);   // ['x', 'y']

console.log([...mapa.values()]); // [1, 2]

```

  

---

  

## 🔹 Ejemplo práctico: contar ocurrencias de elementos

  

```js

const palabras = ["hola", "mundo", "hola", "js"];

const contador = new Map();

  

for (const palabra of palabras) {

  contador.set(palabra, (contador.get(palabra) || 0) + 1);

}

  

console.log(contador);

// Map(3) { 'hola' => 2, 'mundo' => 1, 'js' => 1 }

```

  

---

  

## 🔹 Resumen general

  

| Método / Propiedad | Descripción |

|---------------------|-------------|

| `set(clave, valor)` | Agrega o actualiza un par |

| `get(clave)` | Obtiene el valor de una clave |

| `has(clave)` | Comprueba si existe una clave |

| `delete(clave)` | Elimina un par clave-valor |

| `clear()` | Vacía el Map |

| `size` | Devuelve el número de elementos |

| `keys()` | Iterador de claves |

| `values()` | Iterador de valores |

| `entries()` | Iterador de pares |

| `forEach()` | Itera sobre todos los pares |

  

---

  

## 🧠 Conclusión

  

El objeto **`Map`** es ideal cuando:

- Necesitas claves que no sean solo strings.

- Quieres preservar el orden de inserción.

- Trabajas con pares clave-valor dinámicos.

- Buscas un rendimiento mejor que los objetos tradicionales en operaciones frecuentes de inserción y búsqueda.