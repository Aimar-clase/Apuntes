# 🔄 Conversión de tipos (Casting) en JavaScript

> En JavaScript los valores pueden convertirse de forma **explícita** (manual) o **implícita** (automática).
> 
> Afecta a tipos primitivos (`String`, `Number`, `Boolean`, etc.) y a estructuras complejas (`Array`, `Object`, `Set`, `Map`...).

---

## 🧩 Tipos primitivos básicos

|Tipo|Ejemplo|
|---|---|
|`String`|`"Hola"`|
|`Number`|`42`, `3.14`, `NaN`|
|`Boolean`|`true`, `false`|
|`Null`|`null`|
|`Undefined`|`undefined`|
|`Symbol`|`Symbol("id")`|
|`BigInt`|`123456789n`|

---

## 🔢 Conversión a Number

### 🔹 Explícita

```js
Number("42")       // 42
parseInt("42px")   // 42
parseFloat("3.14m")// 3.14
+"123"             // 123
```

### 🔹 Implícita

```js
"6" * "7"   // 42
"6" - 2     // 4
"6" / "2"   // 3
```

### 🔹 Boolean / Null / Undefined

```js
Number(true)      // 1
Number(false)     // 0
Number(null)      // 0
Number(undefined) // NaN
```

### ⚠️ Casos especiales

```js
Number("abc")   // NaN
parseInt("0x10")// 16 (hex)
```

---

## 🔤 Conversión a String

### 🔹 Explícita

```js
String(123)        // "123"
(123).toString()   // "123"
true.toString()    // "true"
null + ""          // "null"
```

### 🔹 Implícita (concatenación)

```js
"Valor: " + 7      // "Valor: 7"
[1,2,3] + ""        // "1,2,3"
```

---

## ✅ Conversión a Boolean

> Solo los valores “falsy” se convierten a `false`.

|Falsy|Truthy|
|---|---|
|`0`, `-0`|`1`, `-5`, `"0"`|
|`""`|`"texto"`|
|`null`, `undefined`|`[]`, `{}`|
|`NaN`|`function(){}`|

### Ejemplos

```js
Boolean("")     // false
Boolean("hey")  // true
!!0             // false
!!"0"           // true
```

---

## 🧱 Conversión entre estructuras

### 🔹 Array ⇄ String

```js
[1,2,3].toString()   // "1,2,3"
["a","b"].join("-")  // "a-b"

"hola".split("")     // ["h","o","l","a"]
"1,2,3".split(",")   // ["1","2","3"]
```

### 🔹 Array ⇄ Number

```js
Number([5])      // 5
Number([1,2])    // NaN
Array.from(String(123)) // ["1","2","3"]
```

### 🔹 Object ⇄ JSON

```js
JSON.stringify({a:1,b:2})  // '{"a":1,"b":2}'
JSON.parse('{"a":1}')      // {a:1}
```

### 🔹 String ⇄ ArrayBuffer (UTF-8)

```js
const encoder = new TextEncoder();
encoder.encode("Hola"); // Uint8Array([...])

const decoder = new TextDecoder();
decoder.decode(new Uint8Array([72,111,108,97])); // "Hola"
```

---

## 🧩 Conversión a Object

### 🔹 Primitivos → Objetos envoltorio

```js
new String("hola")   // objeto String
new Number(42)       // objeto Number
new Boolean(true)    // objeto Boolean
```

⚠️ Evítalos: `typeof new String("a")` → `"object"`.

---

## 🔗 Casting con estructuras de datos

### 🔹 Array ⇄ Set

```js
new Set([1,2,2,3])       // Set(3) {1,2,3}
[...new Set([1,2,2,3])]  // [1,2,3]
Array.from(new Set(["a","b"])) // ["a","b"]
```

### 🔹 Set ⇄ Array

```js
const s = new Set([1,2,3]);
[...s]; // [1,2,3]
```

### 🔹 Array ⇄ Map

```js
new Map([["a",1],["b",2]]); // Map { "a" => 1, "b" => 2 }
Array.from(new Map([["x",10],["y",20]])); // [["x",10],["y",20]]
```

### 🔹 Object ⇄ Map

```js
const obj = {a:1, b:2};
const map = new Map(Object.entries(obj)); // Map { "a" => 1, "b" => 2 }
Object.fromEntries(map);                  // {a:1, b:2}
```

### 🔹 Map ⇄ JSON

```js
const map = new Map([["x",1],["y",2]]);
JSON.stringify(Object.fromEntries(map));  // '{"x":1,"y":2}'
new Map(Object.entries(JSON.parse('{"x":1,"y":2}')));
```

### 🔹 Set ⇄ JSON

```js
const set = new Set([1,2,3]);
JSON.stringify([...set]);  // "[1,2,3]"
new Set(JSON.parse("[1,2,3]"));
```

---

## 🧠 Coerción implícita (automática)

> JS convierte tipos según el contexto.

|Contexto|Conversión|
|---|---|
|`+` con string|→ `String`|
|`-`, `*`, `/`, `%`|→ `Number`|
|`if`, `while`, `? :`|→ `Boolean`|
|Comparaciones `==`|Reglas especiales|

```js
"5" + 1  // "51"
"5" - 1  // 4
if ("") console.log("no"); // no entra
```

---

## 🚫 Comparaciones seguras

> Usa `===` y `!==` para evitar coerciones indeseadas.

```js
0 == false        // true  (coerción)
0 === false       // false (seguro)
null == undefined // true
null === undefined// false
```

---

## ⚡ Conversiones rápidas y prácticas

|Conversión|Método|Ejemplo|
|---|---|---|
|String → Number|`Number()`|`Number("3.5")`|
|Number → String|`String()`|`String(3.5)`|
|Boolean → Number|`Number()`|`Number(true)`|
|Number → Boolean|`!!num`|`!!1`|
|Array → String|`.join()`|`[1,2].join(",")`|
|String → Array|`.split()`|`"a,b".split(",")`|
|Object → JSON|`JSON.stringify()`|`JSON.stringify(obj)`|
|JSON → Object|`JSON.parse()`|`JSON.parse(json)`|
|Set → Array|`Array.from()`|`Array.from(set)`|
|Array → Set|`new Set()`|`new Set(arr)`|
|Map → Object|`Object.fromEntries()`|`Object.fromEntries(map)`|
|Object → Map|`new Map(Object.entries())`|—|

---

## 🧾 Trucos comunes

```js
+str          // String → Number
!!valor       // a Boolean
str + ""      // a String

Number.isNaN(x)
Number.isFinite(x)

parseFloat(input.value) || 0
```

---

## 📚 Resumen rápido

```js
String(123)        // "123"
Number("456")      // 456
Boolean("")        // false
"7" + 3            // "73"
"7" - 3            // 4
[1,2].toString()   // "1,2"
"1,2".split(",")   // ["1","2"]
!!0                // false
JSON.parse('{"a":1}') // {a:1}
new Set([1,1,2])   // {1,2}
Object.fromEntries(new Map([["x",10]])) // {x:10}
```