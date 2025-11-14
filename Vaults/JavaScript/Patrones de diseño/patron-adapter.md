# Patrón Adapter (Adaptador)

## ¿Qué es?
El patrón Adapter permite que objetos con interfaces incompatibles puedan colaborar. Actúa como un puente entre dos interfaces, convirtiendo la interfaz de una clase en otra interfaz que el cliente espera.

## ¿Cuándo usarlo?
- Cuando quieres usar una clase existente pero su interfaz no es compatible con el resto de tu código
- Cuando quieres reutilizar varias subclases que carecen de funcionalidad común que no puede añadirse a la superclase
- Cuando necesitas integrar código de terceros con tu aplicación
- Cuando trabajas con APIs legacy y quieres usar código moderno
- Cuando necesitas crear una capa de abstracción entre tu código y servicios externos

## ¿Cómo aplicarlo?
1. Identifica las dos interfaces incompatibles
2. Crea una clase adaptador que implemente la interfaz esperada por el cliente
3. El adaptador internamente usa (o hereda) la clase adaptada
4. El adaptador traduce las llamadas del cliente a llamadas de la clase adaptada
5. El cliente usa el adaptador sin saber de la existencia de la clase adaptada

## Ejemplo en JavaScript

```javascript
// ========== SISTEMA ANTIGUO (Legacy) ==========

// Sistema de pago antiguo con interfaz diferente
class PasarelaPagoAntigua {
  // Constructor que inicializa la conexión
  constructor() {
    this.conectado = false; // Estado de la conexión
  }

  // Método para conectar al sistema antiguo
  conectar() {
    this.conectado = true; // Marca como conectado
    console.log('Conectado a la pasarela de pago antigua'); // Log de conexión
  }

  // Método con nombre antiguo para procesar pago
  enviarPago(cantidad, numeroTarjeta, codigoSeguridad) {
    // Verifica que esté conectado
    if (!this.conectado) {
      throw new Error('Debe conectar primero'); // Lanza error si no está conectado
    }

    // Simula procesamiento del pago
    console.log(`[Sistema Antiguo] Procesando pago de ${cantidad}€`);
    console.log(`[Sistema Antiguo] Tarjeta: ${numeroTarjeta}`);
    console.log(`[Sistema Antiguo] CVV: ${codigoSeguridad}`);

    // Simula respuesta del sistema antiguo
    return {
      codigoRespuesta: '00', // Código de éxito
      mensaje: 'Transacción aprobada', // Mensaje descriptivo
      idTransaccion: Math.random().toString(36).substr(2, 9) // ID aleatorio
    };
  }
}

// ========== SISTEMA NUEVO (Interfaz esperada) ==========

// Interfaz moderna que nuestro sistema espera
class IPasarelaPago {
  // Método estándar para procesar pagos (interfaz esperada)
  procesarPago(datosPago) {
    throw new Error('Este método debe ser implementado'); // Método abstracto
  }

  // Método estándar para verificar estado
  verificarEstado() {
    throw new Error('Este método debe ser implementado'); // Método abstracto
  }
}

// Implementación moderna de pasarela de pago
class PasarelaPagoModerna extends IPasarelaPago {
  // Método moderno para procesar pagos
  procesarPago(datosPago) {
    // Valida que los datos tengan la estructura esperada
    if (!datosPago.monto || !datosPago.tarjeta) {
      throw new Error('Datos de pago incompletos'); // Valida datos
    }

    // Procesa el pago con la interfaz moderna
    console.log(`[Sistema Moderno] Procesando pago de ${datosPago.monto}€`);
    console.log(`[Sistema Moderno] Tarjeta: ${datosPago.tarjeta.numero}`);

    // Retorna respuesta en formato moderno
    return {
      exitoso: true, // Booleano de éxito
      transaccionId: Math.random().toString(36).substr(2, 9), // ID
      mensaje: 'Pago procesado correctamente' // Mensaje
    };
  }

  // Método para verificar el estado del servicio
  verificarEstado() {
    return {disponible: true}; // Retorna el estado
  }
}

// ========== ADAPTADOR ==========

// Adaptador que hace compatible el sistema antiguo con la interfaz moderna
class AdaptadorPagoAntiguo extends IPasarelaPago {
  // Constructor que recibe la instancia del sistema antiguo
  constructor(pasarelaAntigua) {
    super(); // Llama al constructor de la clase padre
    this.pasarelaAntigua = pasarelaAntigua; // Guarda referencia al sistema antiguo
    this.pasarelaAntigua.conectar(); // Conecta automáticamente al sistema antiguo
  }

  // ADAPTACIÓN: Implementa la interfaz moderna usando el sistema antiguo
  procesarPago(datosPago) {
    // Traduce los datos del formato moderno al formato antiguo
    console.log('[Adaptador] Convirtiendo datos al formato antiguo...');

    // Extrae los datos necesarios del objeto moderno
    const cantidad = datosPago.monto; // Extrae el monto
    const numeroTarjeta = datosPago.tarjeta.numero; // Extrae número de tarjeta
    const cvv = datosPago.tarjeta.cvv; // Extrae CVV

    // Llama al método antiguo con los parámetros convertidos
    const respuestaAntigua = this.pasarelaAntigua.enviarPago(
      cantidad, // Pasa el monto
      numeroTarjeta, // Pasa el número de tarjeta
      cvv // Pasa el CVV
    );

    // Traduce la respuesta del formato antiguo al formato moderno
    console.log('[Adaptador] Convirtiendo respuesta al formato moderno...');
    return {
      exitoso: respuestaAntigua.codigoRespuesta === '00', // Convierte código a booleano
      transaccionId: respuestaAntigua.idTransaccion, // Mantiene el ID
      mensaje: respuestaAntigua.mensaje // Mantiene el mensaje
    };
  }

  // Adapta el método de verificación de estado
  verificarEstado() {
    // El sistema antiguo no tiene este método, así que lo simulamos
    return {
      disponible: this.pasarelaAntigua.conectado // Usa el estado de conexión
    };
  }
}

// ========== CLIENTE ==========

// Clase que procesa pedidos sin importar qué pasarela se use
class ProcesadorPedidos {
  // Constructor que recibe cualquier pasarela compatible con IPasarelaPago
  constructor(pasarelaPago) {
    this.pasarelaPago = pasarelaPago; // Guarda la pasarela (puede ser moderna o adaptada)
  }

  // Método para procesar un pedido
  procesarPedido(datosPedido) {
    console.log(`\n=== Procesando Pedido #${datosPedido.id} ===`);

    // Verifica que el servicio esté disponible
    const estado = this.pasarelaPago.verificarEstado();
    if (!estado.disponible) {
      throw new Error('El servicio de pagos no está disponible'); // Error si no disponible
    }

    // Prepara los datos de pago en formato moderno
    const datosPago = {
      monto: datosPedido.total, // Total del pedido
      tarjeta: datosPedido.metodoPago // Datos de la tarjeta
    };

    // Procesa el pago usando la interfaz estándar
    const resultado = this.pasarelaPago.procesarPago(datosPago);

    // Muestra el resultado
    if (resultado.exitoso) {
      console.log(`✓ Pedido aprobado. ID Transacción: ${resultado.transaccionId}`);
    } else {
      console.log(`✗ Pedido rechazado: ${resultado.mensaje}`);
    }

    return resultado; // Retorna el resultado
  }
}

// ========== USO DEL PATRÓN ==========

console.log('=== USO CON SISTEMA MODERNO ===');
// Usar el sistema moderno directamente
const pasarelaModerna = new PasarelaPagoModerna(); // Crea pasarela moderna
const procesador1 = new ProcesadorPedidos(pasarelaModerna); // Crea procesador

// Procesa un pedido con el sistema moderno
procesador1.procesarPedido({
  id: 'PED-001', // ID del pedido
  total: 99.99, // Total a pagar
  metodoPago: { // Datos de pago
    numero: '4532-1234-5678-9010', // Número de tarjeta
    cvv: '123' // Código de seguridad
  }
});

console.log('\n=== USO CON SISTEMA ANTIGUO (ADAPTADO) ===');
// Usar el sistema antiguo a través del adaptador
const sistemaAntiguo = new PasarelaPagoAntigua(); // Crea instancia del sistema antiguo
const adaptador = new AdaptadorPagoAntiguo(sistemaAntiguo); // Crea el adaptador
const procesador2 = new ProcesadorPedidos(adaptador); // Crea procesador con adaptador

// Procesa un pedido con el sistema antiguo (mediante el adaptador)
// El cliente usa exactamente el mismo código que antes
procesador2.procesarPedido({
  id: 'PED-002', // ID del pedido
  total: 149.99, // Total a pagar
  metodoPago: { // Datos de pago (mismo formato)
    numero: '5425-2334-3010-9903', // Número de tarjeta
    cvv: '456' // Código de seguridad
  }
});

console.log('\n=== Ventaja: El cliente no sabe qué sistema está usando ===');
// El procesador de pedidos funciona igual con ambos sistemas
// No necesita cambios en su código para trabajar con el sistema antiguo
```

## Ventajas
- Principio de responsabilidad única: separas la conversión de interfaz de la lógica de negocio
- Principio abierto/cerrado: puedes introducir nuevos adaptadores sin romper código existente
- Puedes reutilizar código existente incompatible
- Facilita la integración de código legacy
- Desacopla el cliente de la implementación concreta

## Desventajas
- La complejidad general del código aumenta al introducir nuevas interfaces y clases
- A veces es más simple cambiar la clase de servicio para que coincida con el resto del código
