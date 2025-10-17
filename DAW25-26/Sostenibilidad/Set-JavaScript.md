# 🧩 Set en JavaScript

El objeto **`Set`** en JavaScript es una **colección de valores únicos**.  
No permite duplicados y mantiene los elementos **en el orden en que se insertaron**.

Se usa cuando necesitas almacenar una lista sin elementos repetidos o cuando quieres realizar operaciones matemáticas de conjuntos (como unión, intersección o diferencia).

---

## 🔹 Crear un Set

```js
const conjunto = new Set();

conjunto.add(1);
conjunto.add(2);
conjunto.add(2); // duplicado, se ignora

console.log(conjunto); // Set(2) { 1, 2 }
```

También puedes crearlo directamente a partir de un array:

```js
const numeros = new Set([1, 2, 3, 3, 4]);
console.log(numeros); // Set(4) { 1, 2, 3, 4 }
```

---

## 🔹 Propiedades principales

| Propiedad | Descripción | Ejemplo |
|------------|--------------|----------|
| `size` | Devuelve el número de elementos en el Set | `conjunto.size` → `2` |

---

## 🔹 Métodos principales de `Set`

### 1. `add(valor)`
Agrega un nuevo elemento al Set.  
Si el valor ya existe, **no lo añade**.

```js
const frutas = new Set();
frutas.add("🍎");
frutas.add("🍌");
frutas.add("🍎"); // ignorado

console.log(frutas); // Set(2) { "🍎", "🍌" }
```

---

### 2. `delete(valor)`
Elimina un elemento del Set.  
Devuelve `true` si se eliminó correctamente, `false` si no existía.

```js
const numeros = new Set([1, 2, 3]);
numeros.delete(2);
console.log(numeros); // Set(2) { 1, 3 }
```

---

### 3. `has(valor)`
Comprueba si un elemento está en el Set.

```js
const letras = new Set(["a", "b", "c"]);
console.log(letras.has("a")); // true
console.log(letras.has("z")); // false
```

---

### 4. `clear()`
Elimina **todos** los elementos del Set.

```js
const datos = new Set([10, 20, 30]);
datos.clear();
console.log(datos.size); // 0
```

---

### 5. `forEach(callback)`
Ejecuta una función para cada valor del Set.

```js
const colores = new Set(["rojo", "verde", "azul"]);

colores.forEach(color => {
  console.log(color);
});
// rojo
// verde
// azul
```

---

### 6. Iteración con `for...of`
Puedes recorrer un Set con un bucle `for...of` fácilmente.

```js
const animales = new Set(["🐶", "🐱", "🐰"]);

for (const animal of animales) {
  console.log(animal);
}
// 🐶
// 🐱
// 🐰
```

---

## 🔹 Convertir entre Set y Array

### 🧩 De Array → Set
```js
const array = [1, 2, 2, 3];
const conjunto = new Set(array);
console.log(conjunto); // Set(3) { 1, 2, 3 }
```

### 🧩 De Set → Array
```js
const conjunto = new Set([1, 2, 3]);
const array = [...conjunto];
console.log(array); // [1, 2, 3]
```

---

## 🔹 Ejemplo práctico: eliminar duplicados de un array

```js
const numeros = [1, 2, 2, 3, 4, 4];
const sinDuplicados = [...new Set(numeros)];

console.log(sinDuplicados); // [1, 2, 3, 4]
```

---

## 🔹 Operaciones avanzadas de conjuntos

### 1. **Unión**
Combina los elementos de dos conjuntos, sin duplicados.

```js
const a = new Set([1, 2, 3]);
const b = new Set([3, 4, 5]);

const union = new Set([...a, ...b]);
console.log(union); // Set(5) { 1, 2, 3, 4, 5 }
```

---

### 2. **Intersección**
Elementos que están en ambos conjuntos.

```js
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

const interseccion = new Set([...a].filter(x => b.has(x)));
console.log(interseccion); // Set(2) { 2, 3 }
```

---

### 3. **Diferencia**
Elementos que están en `a` pero no en `b`.

```js
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

const diferencia = new Set([...a].filter(x => !b.has(x)));
console.log(diferencia); // Set(1) { 1 }
```

---

## 🔹 Resumen general

| Método / Propiedad | Descripción |
|---------------------|-------------|
| `add(valor)` | Añade un valor único |
| `delete(valor)` | Elimina un valor |
| `has(valor)` | Comprueba si existe |
| `clear()` | Borra todos los valores |
| `size` | Devuelve el tamaño |
| `forEach()` | Itera sobre los valores |
| `[...set]` | Convierte a array |

---

## 🧠 Conclusión

El objeto **`Set`** es ideal para:
- Evitar valores duplicados.
- Manejar colecciones pequeñas de datos únicos.
- Realizar operaciones matemáticas de conjuntos.
- Convertir rápidamente arrays con duplicados a listas únicas.
