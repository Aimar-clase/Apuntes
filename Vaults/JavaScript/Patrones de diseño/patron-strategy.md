# Patrón Strategy (Estrategia)

## ¿Qué es?
El patrón Strategy define una familia de algoritmos, encapsula cada uno de ellos y los hace intercambiables. Permite que el algoritmo varíe independientemente de los clientes que lo utilizan.

## ¿Cuándo usarlo?
- Cuando tienes muchas clases similares que solo difieren en su comportamiento
- Cuando necesitas usar diferentes variantes de un algoritmo
- Cuando quieres evitar múltiples condicionales (if-else, switch) para seleccionar comportamiento
- Cuando un algoritmo usa datos que los clientes no deberían conocer
- Cuando una clase define muchos comportamientos y aparecen como múltiples sentencias condicionales

## ¿Cómo aplicarlo?
1. Identifica un algoritmo propenso a cambios frecuentes
2. Define una interfaz común para todas las variantes del algoritmo
3. Crea clases concretas que implementen diferentes variantes del algoritmo
4. La clase contexto mantiene una referencia a una estrategia
5. El contexto delega el trabajo al objeto estrategia
6. El cliente puede cambiar la estrategia en tiempo de ejecución

## Ejemplo en JavaScript

```javascript
// ========== INTERFAZ ESTRATEGIA ==========

// Interfaz base para todas las estrategias de pago
class EstrategiaPago {
  // Método que debe ser implementado por cada estrategia
  pagar(cantidad) {
    throw new Error('Este método debe ser implementado');
  }

  // Método para validar si el pago es posible
  validar() {
    throw new Error('Este método debe ser implementado');
  }
}

// ========== ESTRATEGIAS CONCRETAS ==========

// Estrategia 1: Pago con Tarjeta de Crédito
class PagoTarjetaCredito extends EstrategiaPago {
  // Constructor que recibe datos de la tarjeta
  constructor(numeroTarjeta, nombreTitular, cvv, fechaExpiracion) {
    super(); // Llama al constructor padre
    this.numeroTarjeta = numeroTarjeta; // Número de tarjeta
    this.nombreTitular = nombreTitular; // Nombre del titular
    this.cvv = cvv; // Código de seguridad
    this.fechaExpiracion = fechaExpiracion; // Fecha de expiración
  }

  // Implementa validación específica de tarjeta
  validar() {
    console.log('[Validando Tarjeta de Crédito]');

    // Valida que el número tenga 16 dígitos
    if (this.numeroTarjeta.replace(/\s/g, '').length !== 16) {
      throw new Error('Número de tarjeta inválido');
    }

    // Valida que el CVV tenga 3 dígitos
    if (this.cvv.length !== 3) {
      throw new Error('CVV inválido');
    }

    console.log('✓ Tarjeta válida');
    return true; // Retorna true si es válida
  }

  // Implementa el pago con tarjeta de crédito
  pagar(cantidad) {
    this.validar(); // Valida antes de procesar

    console.log('\n=== PROCESANDO PAGO CON TARJETA ===');
    console.log(`Titular: ${this.nombreTitular}`);
    console.log(`Tarjeta: **** **** **** ${this.numeroTarjeta.slice(-4)}`); // Muestra solo últimos 4 dígitos
    console.log(`Monto: ${cantidad}€`);
    console.log('Conectando con el banco...');
    console.log('Verificando fondos...');
    console.log('✓ Pago aprobado');
    console.log(`Cargo de ${cantidad}€ realizado exitosamente\n`);

    return true; // Retorna éxito
  }
}

// Estrategia 2: Pago con PayPal
class PagoPayPal extends EstrategiaPago {
  // Constructor que recibe credenciales de PayPal
  constructor(email, password) {
    super(); // Llama al constructor padre
    this.email = email; // Email de la cuenta
    this.password = password; // Contraseña
  }

  // Implementa validación específica de PayPal
  validar() {
    console.log('[Validando cuenta PayPal]');

    // Valida formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      throw new Error('Email inválido');
    }

    // Valida que haya contraseña
    if (!this.password) {
      throw new Error('Contraseña requerida');
    }

    console.log('✓ Credenciales válidas');
    return true; // Retorna true si es válida
  }

  // Implementa el pago con PayPal
  pagar(cantidad) {
    this.validar(); // Valida antes de procesar

    console.log('\n=== PROCESANDO PAGO CON PAYPAL ===');
    console.log(`Cuenta: ${this.email}`);
    console.log(`Monto: ${cantidad}€`);
    console.log('Conectando con PayPal...');
    console.log('Autenticando usuario...');
    console.log('Verificando saldo...');
    console.log('✓ Pago procesado por PayPal');
    console.log(`${cantidad}€ deducidos de tu cuenta PayPal\n`);

    return true; // Retorna éxito
  }
}

// Estrategia 3: Pago con Criptomonedas
class PagoCripto extends EstrategiaPago {
  // Constructor que recibe dirección de wallet y tipo de crypto
  constructor(direccionWallet, tipoCripto = 'Bitcoin') {
    super(); // Llama al constructor padre
    this.direccionWallet = direccionWallet; // Dirección del wallet
    this.tipoCripto = tipoCripto; // Tipo de criptomoneda
  }

  // Implementa validación específica de cripto
  validar() {
    console.log(`[Validando wallet ${this.tipoCripto}]`);

    // Valida longitud de dirección (simplificado)
    if (this.direccionWallet.length < 26) {
      throw new Error('Dirección de wallet inválida');
    }

    console.log('✓ Wallet válido');
    return true; // Retorna true si es válida
  }

  // Implementa el pago con criptomonedas
  pagar(cantidad) {
    this.validar(); // Valida antes de procesar

    // Calcula cantidad en cripto (tasa ficticia)
    const tasaConversion = this.tipoCripto === 'Bitcoin' ? 0.000025 : 0.0005;
    const cantidadCripto = (cantidad * tasaConversion).toFixed(8);

    console.log('\n=== PROCESANDO PAGO CON CRIPTOMONEDAS ===');
    console.log(`Criptomoneda: ${this.tipoCripto}`);
    console.log(`Wallet: ${this.direccionWallet.slice(0, 8)}...${this.direccionWallet.slice(-8)}`);
    console.log(`Monto: ${cantidad}€ (${cantidadCripto} ${this.tipoCripto})`);
    console.log('Conectando a blockchain...');
    console.log('Creando transacción...');
    console.log('Esperando confirmaciones...');
    console.log('✓ Transacción confirmada en blockchain');
    console.log(`${cantidadCripto} ${this.tipoCripto} transferidos\n`);

    return true; // Retorna éxito
  }
}

// Estrategia 4: Pago en Efectivo (contra entrega)
class PagoEfectivo extends EstrategiaPago {
  // Constructor que recibe dirección de entrega
  constructor(direccionEntrega) {
    super(); // Llama al constructor padre
    this.direccionEntrega = direccionEntrega; // Dirección para entrega
  }

  // Implementa validación para pago en efectivo
  validar() {
    console.log('[Validando dirección de entrega]');

    // Valida que haya dirección
    if (!this.direccionEntrega || this.direccionEntrega.length < 10) {
      throw new Error('Dirección de entrega inválida');
    }

    console.log('✓ Dirección válida');
    return true; // Retorna true si es válida
  }

  // Implementa el pago en efectivo
  pagar(cantidad) {
    this.validar(); // Valida antes de procesar

    console.log('\n=== PAGO CONTRA ENTREGA ===');
    console.log(`Dirección: ${this.direccionEntrega}`);
    console.log(`Monto a pagar: ${cantidad}€`);
    console.log('Se requiere pago en efectivo al recibir el pedido');
    console.log('✓ Pedido preparado para entrega');
    console.log('El repartidor cobrará el importe en efectivo\n');

    return true; // Retorna éxito
  }
}

// ========== CONTEXTO ==========

// Clase que usa una estrategia de pago
class CarritoCompra {
  // Constructor que inicializa el carrito vacío
  constructor() {
    this.productos = []; // Array de productos
    this.estrategiaPago = null; // Estrategia actual (ninguna por defecto)
  }

  // Método para agregar producto al carrito
  agregarProducto(nombre, precio) {
    this.productos.push({nombre, precio}); // Agrega producto
    console.log(`✓ Producto "${nombre}" agregado al carrito (${precio}€)`);
    return this; // Retorna 'this' para encadenamiento
  }

  // Método para calcular el total del carrito
  calcularTotal() {
    // Suma los precios de todos los productos
    return this.productos.reduce((total, producto) => {
      return total + producto.precio; // Suma el precio de cada producto
    }, 0); // Comienza en 0
  }

  // Método para establecer la estrategia de pago
  establecerEstrategiaPago(estrategia) {
    // Verifica que la estrategia sea válida
    if (!(estrategia instanceof EstrategiaPago)) {
      throw new Error('Estrategia de pago inválida');
    }

    this.estrategiaPago = estrategia; // Establece la estrategia
    console.log(`\n✓ Método de pago configurado: ${estrategia.constructor.name}\n`);
    return this; // Retorna 'this' para encadenamiento
  }

  // Método para procesar el pago (delega a la estrategia)
  procesarPago() {
    // Verifica que haya productos en el carrito
    if (this.productos.length === 0) {
      throw new Error('El carrito está vacío');
    }

    // Verifica que se haya establecido una estrategia de pago
    if (!this.estrategiaPago) {
      throw new Error('Debe seleccionar un método de pago');
    }

    // Calcula el total
    const total = this.calcularTotal();

    console.log('=== RESUMEN DE COMPRA ===');
    console.log('Productos:');
    this.productos.forEach((prod, index) => {
      console.log(`  ${index + 1}. ${prod.nombre} - ${prod.precio}€`); // Lista productos
    });
    console.log(`TOTAL: ${total}€\n`);

    // DELEGA el procesamiento del pago a la estrategia actual
    return this.estrategiaPago.pagar(total);
  }

  // Método para mostrar el contenido del carrito
  mostrarCarrito() {
    console.log('\n=== CARRITO DE COMPRAS ===');

    if (this.productos.length === 0) {
      console.log('El carrito está vacío');
      return;
    }

    this.productos.forEach((prod, index) => {
      console.log(`${index + 1}. ${prod.nombre} - ${prod.precio}€`);
    });

    console.log(`\nTOTAL: ${this.calcularTotal()}€\n`);
  }
}

// ========== USO DEL PATRÓN ==========

console.log('=== TIENDA ONLINE - SISTEMA DE PAGOS ===\n');

// Crear carrito de compras
const carrito = new CarritoCompra();

// Agregar productos al carrito
console.log('--- Agregando productos ---');
carrito
  .agregarProducto('Laptop', 999)
  .agregarProducto('Mouse', 25)
  .agregarProducto('Teclado', 75);

// Mostrar carrito
carrito.mostrarCarrito();

// ========== ESCENARIO 1: Pago con Tarjeta ==========
console.log('\n========== ESCENARIO 1: Pago con Tarjeta ==========');

// Crear estrategia de pago con tarjeta
const pagoTarjeta = new PagoTarjetaCredito(
  '4532 1234 5678 9010', // Número de tarjeta
  'Juan Pérez', // Titular
  '123', // CVV
  '12/25' // Expiración
);

// Establecer estrategia y procesar pago
carrito.establecerEstrategiaPago(pagoTarjeta);
carrito.procesarPago();

// ========== ESCENARIO 2: Cambiar a PayPal ==========
console.log('\n========== ESCENARIO 2: Cambiar a PayPal ==========');

// Crear nueva estrategia de pago (PayPal)
const pagoPayPal = new PagoPayPal(
  'juan@example.com', // Email
  'password123' // Contraseña
);

// Cambiar estrategia en tiempo de ejecución
carrito.establecerEstrategiaPago(pagoPayPal);
carrito.procesarPago();

// ========== ESCENARIO 3: Pago con Criptomonedas ==========
console.log('\n========== ESCENARIO 3: Pago con Bitcoin ==========');

// Crear estrategia de pago con cripto
const pagoBitcoin = new PagoCripto(
  '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', // Wallet Bitcoin
  'Bitcoin' // Tipo de cripto
);

carrito.establecerEstrategiaPago(pagoBitcoin);
carrito.procesarPago();

// ========== ESCENARIO 4: Pago en Efectivo ==========
console.log('\n========== ESCENARIO 4: Pago Contra Entrega ==========');

// Crear estrategia de pago en efectivo
const pagoEfectivo = new PagoEfectivo('Calle Principal 123, Madrid');

carrito.establecerEstrategiaPago(pagoEfectivo);
carrito.procesarPago();

// ========== VENTAJAS DEMOSTRADAS ==========
console.log('\n=== VENTAJAS DEL PATRÓN STRATEGY ===');
console.log('✓ Puedes cambiar el algoritmo de pago en tiempo de ejecución');
console.log('✓ Aíslas los detalles de implementación de cada método de pago');
console.log('✓ Reemplazas herencia con composición');
console.log('✓ Principio abierto/cerrado: nuevos métodos de pago sin cambiar código');
console.log('✓ Evitas múltiples if-else para seleccionar método de pago');
console.log('✓ Cada estrategia es fácil de probar independientemente');

console.log('\n=== SIN STRATEGY (Antipatrón) ===');
console.log('❌ Tendrías un método procesarPago con múltiples if-else');
console.log('❌ Difícil añadir nuevos métodos de pago');
console.log('❌ Código acoplado y difícil de mantener');
console.log('❌ Viola el principio abierto/cerrado');
```

## Ejemplo Adicional: Estrategias de Ordenamiento

```javascript
// Estrategias de ordenamiento
class EstrategiaOrdenamiento {
  ordenar(array) {
    throw new Error('Método debe ser implementado');
  }
}

class OrdenamientoBurbuja extends EstrategiaOrdenamiento {
  ordenar(array) {
    console.log('Ordenando con Bubble Sort...');
    const arr = [...array]; // Copia el array
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
        }
      }
    }
    return arr; // Retorna array ordenado
  }
}

class OrdenamientoRapido extends EstrategiaOrdenamiento {
  ordenar(array) {
    console.log('Ordenando con Quick Sort...');
    if (array.length <= 1) return array;

    const pivote = array[0];
    const menores = array.slice(1).filter(x => x <= pivote);
    const mayores = array.slice(1).filter(x => x > pivote);

    return [...this.ordenar(menores), pivote, ...this.ordenar(mayores)];
  }
}

class Ordenador {
  constructor(estrategia) {
    this.estrategia = estrategia; // Estrategia de ordenamiento
  }

  establecerEstrategia(estrategia) {
    this.estrategia = estrategia; // Cambia la estrategia
  }

  ordenar(array) {
    return this.estrategia.ordenar(array); // Delega a la estrategia
  }
}

// Uso
const datos = [5, 2, 9, 1, 7, 6];
const ordenador = new Ordenador(new OrdenamientoBurbuja());
console.log(ordenador.ordenar(datos));

ordenador.establecerEstrategia(new OrdenamientoRapido());
console.log(ordenador.ordenar(datos));
```

## Ventajas
- Puedes intercambiar algoritmos usados dentro de un objeto en tiempo de ejecución
- Puedes aislar los detalles de implementación de un algoritmo
- Puedes reemplazar herencia con composición
- Principio abierto/cerrado: puedes introducir nuevas estrategias sin cambiar el contexto
- Elimina sentencias condicionales complejas

## Desventajas
- Si solo tienes un par de algoritmos que raramente cambian, no hay razón para complicar el programa
- Los clientes deben conocer las diferencias entre estrategias para seleccionar la apropiada
- Muchos lenguajes modernos tienen soporte funcional que permite implementar diferentes versiones de un algoritmo sin crear clases extra
