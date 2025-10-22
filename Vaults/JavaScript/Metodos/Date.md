# Objeto Date en JavaScript

## ¿Qué es Date?

`Date` es un objeto de JavaScript que permite trabajar con fechas y horas. Se ajusta automáticamente a la zona horaria del usuario.

---

## Crear una fecha

### Fecha actual
```javascript
let ahora = new Date();
// Captura la fecha y hora actual del sistema
```

### Fecha específica
```javascript
let fecha = new Date(2025, 0, 15); // 15 de enero de 2025
// IMPORTANTE: Los meses van de 0 (enero) a 11 (diciembre)

let fechaCompleta = new Date(2025, 0, 15, 14, 30, 0);
// Año, mes, día, hora, minutos, segundos
```

### Desde un string
```javascript
let fecha = new Date("2025-01-15");
let fecha2 = new Date("January 15, 2025 14:30:00");
```

---

## Obtener información de una fecha

### Métodos básicos
```javascript
let fecha = new Date();

// Fecha
fecha.getFullYear();    // Año completo: 2025
fecha.getMonth();       // Mes (0-11): 0 = enero, 11 = diciembre
fecha.getDate();        // Día del mes (1-31)
fecha.getDay();         // Día de la semana (0-6): 0 = domingo, 6 = sábado

// Hora
fecha.getHours();       // Horas (0-23)
fecha.getMinutes();     // Minutos (0-59)
fecha.getSeconds();     // Segundos (0-59)
fecha.getMilliseconds(); // Milisegundos (0-999)

// Timestamp
fecha.getTime();        // Milisegundos desde 1 enero 1970
```

### Ejemplo práctico
```javascript
let ahora = new Date();
let dia = ahora.getDate();
let mes = ahora.getMonth() + 1; // +1 porque los meses empiezan en 0
let año = ahora.getFullYear();

console.log(`${dia}/${mes}/${año}`); // 22/10/2025
```

---

## Formatear fechas

### toLocaleString() - Fecha y hora local
```javascript
let fecha = new Date();
fecha.toLocaleString(); 
// "22/10/2025, 14:30:45" (formato según país del usuario)
```

### toLocaleDateString() - Solo fecha
```javascript
let fecha = new Date();
fecha.toLocaleDateString();
// "22/10/2025"
```

### toLocaleTimeString() - Solo hora
```javascript
let fecha = new Date();
fecha.toLocaleTimeString();
// "14:30:45"
```

### Personalizar formato
```javascript
let fecha = new Date();
let opciones = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
};
fecha.toLocaleDateString('es-ES', opciones);
// "miércoles, 22 de octubre de 2025"
```

---

## Modificar fechas
```javascript
let fecha = new Date();

fecha.setFullYear(2026);    // Cambiar año
fecha.setMonth(5);          // Cambiar mes (0-11)
fecha.setDate(15);          // Cambiar día
fecha.setHours(10);         // Cambiar hora
fecha.setMinutes(30);       // Cambiar minutos
fecha.setSeconds(0);        // Cambiar segundos
```

---

## Operaciones con fechas

### Sumar/restar días
```javascript
let hoy = new Date();
let mañana = new Date();
mañana.setDate(hoy.getDate() + 1); // Sumar 1 día

let ayer = new Date();
ayer.setDate(hoy.getDate() - 1); // Restar 1 día
```

### Diferencia entre fechas
```javascript
let fecha1 = new Date("2025-01-01");
let fecha2 = new Date("2025-01-15");

let diferencia = fecha2 - fecha1; // Resultado en milisegundos
let diasDiferencia = diferencia / (1000 * 60 * 60 * 24);
console.log(diasDiferencia); // 14 días
```

---

## Casos de uso comunes

### Mostrar fecha actual formateada
```javascript
let ahora = new Date();
let dia = ahora.getDate().toString().padStart(2, '0');
let mes = (ahora.getMonth() + 1).toString().padStart(2, '0');
let año = ahora.getFullYear();
let hora = ahora.getHours().toString().padStart(2, '0');
let minutos = ahora.getMinutes().toString().padStart(2, '0');

console.log(`${dia}/${mes}/${año} ${hora}:${minutos}`);
// "22/10/2025 14:30"
```

### Validar si una fecha es futura
```javascript
let fechaEvento = new Date("2026-12-25");
let hoy = new Date();

if (fechaEvento > hoy) {
    console.log("El evento es en el futuro");
} else {
    console.log("El evento ya pasó");
}
```

### Calcular edad
```javascript
function calcularEdad(fechaNacimiento) {
    let hoy = new Date();
    let nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    let mes = hoy.getMonth() - nacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    
    return edad;
}

console.log(calcularEdad("2000-05-15")); // Edad calculada
```

---

## Tips importantes

> [!warning] Meses empiezan en 0
> En JavaScript, los meses van de **0 (enero) a 11 (diciembre)**. Siempre suma 1 al mostrar el mes.

> [!tip] Zona horaria
> `Date` usa la zona horaria local del usuario. Para trabajar con UTC usa `getUTCFullYear()`, `getUTCMonth()`, etc.

> [!info] Comparar fechas
> Puedes comparar fechas directamente con `>`, `<`, `===` ya que internamente se comparan los timestamps.

---

## Métodos útiles rápidos

| Método | Descripción |
|--------|-------------|
| `Date.now()` | Timestamp actual en milisegundos |
| `toISOString()` | Formato ISO: "2025-10-22T14:30:00.000Z" |
| `toString()` | String legible: "Wed Oct 22 2025 14:30:00" |
| `valueOf()` | Igual que `getTime()` |

---

## Ejemplos prácticos para proyectos

### Historial con fecha
```javascript
let fecha = new Date();
let registro = fecha.toLocaleString() + " - Usuario realizó una acción";
console.log(registro);
// "22/10/2025, 14:30:45 - Usuario realizó una acción"
```

### Temporizador cuenta atrás
```javascript
function cuentaAtras(fechaObjetivo) {
    let ahora = new Date();
    let objetivo = new Date(fechaObjetivo);
    let diferencia = objetivo - ahora;
    
    let dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    let horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `Faltan ${dias} días y ${horas} horas`;
}

console.log(cuentaAtras("2025-12-31"));
```

---

## Enlaces útiles

- [MDN - Date](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [[JavaScript Básico]]
- [[DOM Manipulation]]

---

**Fecha de creación:** 2025-10-22
**Tags:** #javascript #date #fechas #tiempo