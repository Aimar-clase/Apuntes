# 🔢 Ejercicio: Números Primos

## 🎯 Objetivo
Crear una función que determine si un número es primo o no.

---

## 🤔 ¿Qué es un número primo?

Un **número primo** es un número natural mayor que 1 que solo es divisible por **1 y por sí mismo**.

### ✅ Ejemplos de números primos
- **2** (divisible solo por 1 y 2)
- **3** (divisible solo por 1 y 3)
- **5** (divisible solo por 1 y 5)
- **7** (divisible solo por 1 y 7)
- **11, 13, 17, 19, 23...**

### ❌ Números NO primos
- **1** (por definición, no se considera primo)
- **4** (divisible por 1, 2, 4)
- **6** (divisible por 1, 2, 3, 6)
- **8** (divisible por 1, 2, 4, 8)
- **9** (divisible por 1, 3, 9)

---

## 💡 Lógica del algoritmo

### 📋 Pasos para verificar si un número es primo:

1. **Si el número es menor o igual a 1** → NO es primo
2. **Si el número es 2** → SÍ es primo (único número primo par)
3. **Si el número es par** → NO es primo
4. **Para los demás números:**
   - Dividir el número entre todos los números desde 2 hasta la raíz cuadrada del número
   - Si alguna división es exacta (resto 0) → NO es primo
   - Si ninguna división es exacta → SÍ es primo

### 🧮 ¿Por qué hasta la raíz cuadrada?

Si un número `n` tiene un divisor mayor que `√n`, entonces también tiene un divisor menor que `√n`.

**Ejemplo con 36:**
- √36 = 6
- Divisores: 1, 2, 3, 4, 6, 9, 12, 18, 36
- Solo necesitamos comprobar hasta 6, porque:
  - 2 × 18 = 36 (si encontramos 2, no necesitamos buscar 18)
  - 3 × 12 = 36 (si encontramos 3, no necesitamos buscar 12)

---

## 💻 Solución básica
```javascript
function esPrimo(numero) {
    // 1. Números menores o iguales a 1 no son primos
    if (numero <= 1) {
        return false;
    }
    
    // 2. El 2 es primo
    if (numero === 2) {
        return true;
    }
    
    // 3. Números pares no son primos
    if (numero % 2 === 0) {
        return false;
    }
    
    // 4. Comprobar divisibilidad desde 3 hasta √numero
    for (let i = 3; i <= Math.sqrt(numero); i += 2) {
        if (numero % i === 0) {
            return false; // Encontró un divisor
        }
    }
    
    return true; // No encontró divisores, es primo
}

// Pruebas
console.log(esPrimo(1));   // false
console.log(esPrimo(2));   // true
console.log(esPrimo(17));  // true
console.log(esPrimo(20));  // false
console.log(esPrimo(97));  // true
```

---

## 🎨 Versión con interfaz HTML

### 📄 HTML
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verificador de Números Primos</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 500px;
            margin: 50px auto;
            padding: 20px;
            text-align: center;
        }
        input {
            padding: 10px;
            font-size: 18px;
            width: 200px;
            margin: 10px;
        }
        button {
            padding: 10px 20px;
            font-size: 18px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        #resultado {
            margin-top: 20px;
            padding: 20px;
            border-radius: 10px;
            font-size: 20px;
            font-weight: bold;
        }
        .primo {
            background-color: #d4edda;
            color: #155724;
        }
        .no-primo {
            background-color: #f8d7da;
            color: #721c24;
        }
    </style>
</head>
<body>
    <h1>🔢 Verificador de Números Primos</h1>
    
    <input type="number" id="numero" placeholder="Introduce un número">
    <button id="verificar">Verificar</button>
    
    <div id="resultado"></div>

    <script src="primos.js"></script>
</body>
</html>
```

### 💻 JavaScript (primos.js)
```javascript
let inputNumero = document.getElementById("numero");
let btnVerificar = document.getElementById("verificar");
let resultado = document.getElementById("resultado");

function esPrimo(numero) {
    if (numero <= 1) return false;
    if (numero === 2) return true;
    if (numero % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(numero); i += 2) {
        if (numero % i === 0) {
            return false;
        }
    }
    return true;
}

btnVerificar.addEventListener("click", function() {
    let numero = parseInt(inputNumero.value);
    
    // Validación
    if (isNaN(numero)) {
        resultado.textContent = "⚠️ Por favor, introduce un número válido";
        resultado.className = "";
        return;
    }
    
    // Verificar si es primo
    if (esPrimo(numero)) {
        resultado.textContent = `✅ ${numero} SÍ es un número primo`;
        resultado.className = "primo";
    } else {
        resultado.textContent = `❌ ${numero} NO es un número primo`;
        resultado.className = "no-primo";
    }
});

// Permitir verificar con Enter
inputNumero.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        btnVerificar.click();
    }
});
```

---

## 🚀 Mejoras adicionales

### 🎯 Versión 1: Mostrar todos los primos hasta N
```javascript
function primosHastaN(n) {
    let primos = [];
    
    for (let i = 2; i <= n; i++) {
        if (esPrimo(i)) {
            primos.push(i);
        }
    }
    
    return primos;
}

console.log(primosHastaN(20));
// [2, 3, 5, 7, 11, 13, 17, 19]
```

### 🎯 Versión 2: Encontrar los primeros N números primos
```javascript
function primerosNPrimos(n) {
    let primos = [];
    let numero = 2;
    
    while (primos.length < n) {
        if (esPrimo(numero)) {
            primos.push(numero);
        }
        numero++;
    }
    
    return primos;
}

console.log(primerosNPrimos(10));
// [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

### 🎯 Versión 3: Mostrar los divisores de un número
```javascript
function obtenerDivisores(numero) {
    let divisores = [];
    
    for (let i = 1; i <= numero; i++) {
        if (numero % i === 0) {
            divisores.push(i);
        }
    }
    
    return divisores;
}

console.log(obtenerDivisores(12)); // [1, 2, 3, 4, 6, 12]
console.log(obtenerDivisores(17)); // [1, 17] → Es primo
```

---

## 🧪 Casos de prueba

| Número | ¿Es primo? | Razón |
|--------|------------|-------|
| 1 | ❌ No | Por definición |
| 2 | ✅ Sí | Único primo par |
| 3 | ✅ Sí | Solo divisible por 1 y 3 |
| 4 | ❌ No | Divisible por 2 |
| 7 | ✅ Sí | Solo divisible por 1 y 7 |
| 15 | ❌ No | Divisible por 3 y 5 |
| 17 | ✅ Sí | Solo divisible por 1 y 17 |
| 100 | ❌ No | Divisible por 2, 4, 5, 10... |
| 97 | ✅ Sí | Solo divisible por 1 y 97 |

---

## 💡 Conceptos clave

> [!info] 📝 Operador módulo (%)
> El operador `%` devuelve el **resto** de una división. Si `numero % i === 0`, significa que `i` divide exactamente a `numero`.

> [!tip] 🚀 Optimización
> Comprobar solo hasta `Math.sqrt(numero)` reduce drásticamente el tiempo de ejecución para números grandes.

> [!warning] ⚠️ Números grandes
> Para números muy grandes (millones), este algoritmo puede ser lento. Existen algoritmos más avanzados como la Criba de Eratóstenes.

---

## 🎓 Ejercicios propuestos

1. **🔢 Rango de primos:** Crea una función que muestre todos los números primos entre dos números dados
2. **🎯 Contador:** Cuenta cuántos números primos hay entre 1 y 1000
3. **🔄 Factorización:** Descompón un número en sus factores primos (ej: 12 = 2² × 3)
4. **🎨 Lista visual:** Crea una página que muestre los primeros 100 números y resalte los primos con color
5. **⚡ Suma de primos:** Calcula la suma de todos los números primos menores que 100

---

## 🔗 Enlaces útiles

- 📚 [Números primos - Wikipedia](https://es.wikipedia.org/wiki/N%C3%BAmero_primo)
- 📚 [Criba de Eratóstenes](https://es.wikipedia.org/wiki/Criba_de_Erat%C3%B3stenes)
- 📖 [[JavaScript Básico]]
- 📖 [[Bucles en JavaScript]]

---

**📅 Fecha de creación:** 2025-10-31  
**🏷️ Tags:** #javascript #algoritmos #primos #matematicas #ejercicios