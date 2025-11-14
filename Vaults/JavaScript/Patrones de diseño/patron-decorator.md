# Patrón Decorator (Decorador)

## ¿Qué es?
El patrón Decorator permite añadir funcionalidades a objetos colocando estos objetos dentro de objetos envolventes especiales (wrappers) que contienen estas funcionalidades. Permite agregar comportamientos sin modificar el código original.

## ¿Cuándo usarlo?
- Cuando necesitas agregar responsabilidades a objetos de forma dinámica
- Cuando quieres extender funcionalidad pero la herencia no es práctica o posible
- Cuando necesitas poder añadir o quitar responsabilidades en tiempo de ejecución
- Cuando tienes muchas combinaciones posibles de funcionalidades
- Cuando quieres evitar la explosión de subclases

## ¿Cómo aplicarlo?
1. Define una interfaz común para el componente base y los decoradores
2. Crea la clase componente base con la funcionalidad básica
3. Crea clases decoradoras que envuelven el componente
4. Los decoradores implementan la misma interfaz y delegan trabajo al componente envuelto
5. Los decoradores añaden su funcionalidad antes/después de delegar
6. Los decoradores se pueden apilar unos sobre otros

## Ejemplo en JavaScript

```javascript
// ========== INTERFAZ BASE ==========

// Interfaz común para café básico y decoradores
class Cafe {
  // Método para obtener la descripción del café
  obtenerDescripcion() {
    return 'Café'; // Descripción base
  }

  // Método para obtener el costo del café
  obtenerCosto() {
    return 2.0; // Costo base en euros
  }
}

// ========== COMPONENTES CONCRETOS ==========

// Café Espresso - Componente base concreto
class Espresso extends Cafe {
  // Sobrescribe el método de descripción
  obtenerDescripcion() {
    return 'Espresso'; // Descripción específica
  }

  // Sobrescribe el método de costo
  obtenerCosto() {
    return 2.5; // Costo específico del espresso
  }
}

// Café Americano - Otro componente base concreto
class Americano extends Cafe {
  // Sobrescribe el método de descripción
  obtenerDescripcion() {
    return 'Café Americano'; // Descripción específica
  }

  // Sobrescribe el método de costo
  obtenerCosto() {
    return 2.0; // Costo específico del americano
  }
}

// Café Cappuccino - Otro componente base concreto
class Cappuccino extends Cafe {
  // Sobrescribe el método de descripción
  obtenerDescripcion() {
    return 'Cappuccino'; // Descripción específica
  }

  // Sobrescribe el método de costo
  obtenerCosto() {
    return 3.0; // Costo específico del cappuccino
  }
}

// ========== DECORADOR BASE ==========

// Clase base para todos los decoradores
class DecoradorCafe extends Cafe {
  // Constructor que recibe el café a decorar
  constructor(cafe) {
    super(); // Llama al constructor padre
    this.cafe = cafe; // Guarda referencia al café que está decorando
  }

  // Delega la descripción al café envuelto
  obtenerDescripcion() {
    return this.cafe.obtenerDescripcion(); // Llama al método del café envuelto
  }

  // Delega el costo al café envuelto
  obtenerCosto() {
    return this.cafe.obtenerCosto(); // Llama al método del café envuelto
  }
}

// ========== DECORADORES CONCRETOS ==========

// Decorador: Añade leche
class ConLeche extends DecoradorCafe {
  // Constructor que recibe el café a decorar
  constructor(cafe) {
    super(cafe); // Llama al constructor del decorador base
  }

  // AÑADE funcionalidad: Modifica la descripción
  obtenerDescripcion() {
    // Obtiene la descripción del café envuelto y añade "con Leche"
    return this.cafe.obtenerDescripcion() + ', con Leche';
  }

  // AÑADE funcionalidad: Modifica el costo
  obtenerCosto() {
    // Obtiene el costo del café envuelto y añade el costo de la leche
    return this.cafe.obtenerCosto() + 0.5;
  }
}

// Decorador: Añade chocolate
class ConChocolate extends DecoradorCafe {
  // Constructor que recibe el café a decorar
  constructor(cafe) {
    super(cafe); // Llama al constructor del decorador base
  }

  // AÑADE funcionalidad: Modifica la descripción
  obtenerDescripcion() {
    // Obtiene la descripción del café envuelto y añade "con Chocolate"
    return this.cafe.obtenerDescripcion() + ', con Chocolate';
  }

  // AÑADE funcionalidad: Modifica el costo
  obtenerCosto() {
    // Obtiene el costo del café envuelto y añade el costo del chocolate
    return this.cafe.obtenerCosto() + 0.7;
  }
}

// Decorador: Añade crema batida
class ConCremaBatida extends DecoradorCafe {
  // Constructor que recibe el café a decorar
  constructor(cafe) {
    super(cafe); // Llama al constructor del decorador base
  }

  // AÑADE funcionalidad: Modifica la descripción
  obtenerDescripcion() {
    // Obtiene la descripción del café envuelto y añade "con Crema Batida"
    return this.cafe.obtenerDescripcion() + ', con Crema Batida';
  }

  // AÑADE funcionalidad: Modifica el costo
  obtenerCosto() {
    // Obtiene el costo del café envuelto y añade el costo de la crema
    return this.cafe.obtenerCosto() + 0.6;
  }
}

// Decorador: Añade caramelo
class ConCaramelo extends DecoradorCafe {
  // Constructor que recibe el café a decorar
  constructor(cafe) {
    super(cafe); // Llama al constructor del decorador base
  }

  // AÑADE funcionalidad: Modifica la descripción
  obtenerDescripcion() {
    // Obtiene la descripción del café envuelto y añade "con Caramelo"
    return this.cafe.obtenerDescripcion() + ', con Caramelo';
  }

  // AÑADE funcionalidad: Modifica el costo
  obtenerCosto() {
    // Obtiene el costo del café envuelto y añade el costo del caramelo
    return this.cafe.obtenerCosto() + 0.4;
  }
}

// Decorador: Doble de café (shot extra)
class ShotExtra extends DecoradorCafe {
  // Constructor que recibe el café a decorar
  constructor(cafe) {
    super(cafe); // Llama al constructor del decorador base
  }

  // AÑADE funcionalidad: Modifica la descripción
  obtenerDescripcion() {
    // Obtiene la descripción del café envuelto y añade "Shot Extra"
    return this.cafe.obtenerDescripcion() + ', Shot Extra';
  }

  // AÑADE funcionalidad: Modifica el costo
  obtenerCosto() {
    // Obtiene el costo del café envuelto y añade el costo del shot extra
    return this.cafe.obtenerCosto() + 0.8;
  }
}

// ========== FUNCIÓN AUXILIAR ==========

// Función para mostrar el pedido de forma formateada
function mostrarPedido(cafe, numeroPedido) {
  console.log(`\n=== Pedido #${numeroPedido} ===`); // Muestra número de pedido
  console.log(`Descripción: ${cafe.obtenerDescripcion()}`); // Muestra descripción completa
  console.log(`Costo total: ${cafe.obtenerCosto().toFixed(2)}€`); // Muestra costo con 2 decimales
}

// ========== USO DEL PATRÓN ==========

console.log('=== CAFETERÍA - SISTEMA DE PEDIDOS ===');

// Pedido 1: Café simple sin decoradores
const pedido1 = new Espresso(); // Crea un espresso básico
mostrarPedido(pedido1, 1); // Muestra el pedido

// Pedido 2: Café con un decorador
const pedido2 = new ConLeche(new Americano()); // Crea un americano y lo decora con leche
mostrarPedido(pedido2, 2); // Muestra el pedido

// Pedido 3: Café con múltiples decoradores (apilados)
const pedido3 = new ConCremaBatida( // Decorador externo: crema batida
  new ConChocolate( // Decorador medio: chocolate
    new ConLeche( // Decorador interno: leche
      new Cappuccino() // Componente base: cappuccino
    )
  )
);
mostrarPedido(pedido3, 3); // Muestra el pedido

// Pedido 4: Café muy personalizado con muchos decoradores
const pedido4 = new ConCaramelo( // Añade caramelo
  new ShotExtra( // Añade shot extra
    new ConCremaBatida( // Añade crema batida
      new ConChocolate( // Añade chocolate
        new ConLeche( // Añade leche
          new Espresso() // Base: espresso
        )
      )
    )
  )
);
mostrarPedido(pedido4, 4); // Muestra el pedido

// Pedido 5: Mismo café con decoradores en diferente orden
const pedido5 = new ConLeche( // Primero leche
  new ConLeche( // Doble leche
    new ShotExtra( // Luego shot extra
      new Cappuccino() // Base: cappuccino
    )
  )
);
mostrarPedido(pedido5, 5); // Muestra el pedido

console.log('\n=== Ventajas del Patrón ===');
console.log('✓ No necesitamos crear una clase para cada combinación posible');
console.log('✓ Podemos añadir/quitar ingredientes dinámicamente');
console.log('✓ Podemos combinar decoradores en cualquier orden');
console.log('✓ Cada decorador tiene una sola responsabilidad');
console.log('✓ Fácil añadir nuevos ingredientes sin modificar código existente');

// Ejemplo de creación dinámica basada en preferencias del usuario
console.log('\n=== Creación Dinámica ===');

// Función que crea un café basado en preferencias
function crearCafePersonalizado(base, ingredientes) {
  let cafe = base; // Comienza con el café base

  // Itera sobre los ingredientes solicitados
  ingredientes.forEach(ingrediente => {
    // Aplica el decorador correspondiente según el ingrediente
    switch(ingrediente) {
      case 'leche':
        cafe = new ConLeche(cafe); // Envuelve con leche
        break;
      case 'chocolate':
        cafe = new ConChocolate(cafe); // Envuelve con chocolate
        break;
      case 'crema':
        cafe = new ConCremaBatida(cafe); // Envuelve con crema
        break;
      case 'caramelo':
        cafe = new ConCaramelo(cafe); // Envuelve con caramelo
        break;
      case 'extra':
        cafe = new ShotExtra(cafe); // Envuelve con shot extra
        break;
    }
  });

  return cafe; // Retorna el café completamente decorado
}

// Crear café personalizado para un cliente
const pedidoCliente = crearCafePersonalizado(
  new Espresso(), // Café base
  ['leche', 'chocolate', 'crema'] // Ingredientes solicitados
);
mostrarPedido(pedidoCliente, 6); // Muestra el pedido
```

## Ventajas
- Más flexible que la herencia para extender funcionalidad
- Puedes añadir o quitar responsabilidades en tiempo de ejecución
- Puedes combinar varios decoradores para crear diferentes comportamientos
- Principio de responsabilidad única: cada decorador tiene una única función
- Principio abierto/cerrado: puedes añadir nuevos decoradores sin modificar código existente
- Evita la explosión de subclases

## Desventajas
- Puede resultar en muchas clases pequeñas en el sistema
- Es difícil eliminar un decorador específico del wrapper stack
- El orden de aplicación de decoradores puede importar
- La configuración inicial del stack puede ser compleja
