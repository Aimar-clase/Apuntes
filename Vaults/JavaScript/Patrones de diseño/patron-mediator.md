# Patrón Mediator (Mediador)

## ¿Qué es?
El patrón Mediator define un objeto que encapsula cómo interactúan un conjunto de objetos. Promueve el acoplamiento débil al evitar que los objetos se refieran entre sí explícitamente, permitiendo variar su interacción independientemente.

## ¿Cuándo usarlo?
- Cuando tienes un conjunto de objetos que se comunican de formas complejas y mal definidas
- Cuando quieres reutilizar un objeto pero es difícil porque se comunica con muchos otros
- Cuando el comportamiento está distribuido entre varias clases y quieres centralizarlo
- Cuando las dependencias entre objetos son difíciles de entender
- Ejemplos: sistemas de chat, controladores de interfaz, torres de control de aeropuertos

## ¿Cómo aplicarlo?
1. Identifica un grupo de clases fuertemente acopladas
2. Crea una clase mediador que centralice las comunicaciones
3. Los componentes guardan referencia solo al mediador
4. Los componentes notifican al mediador cuando algo sucede
5. El mediador conoce todos los componentes y coordina sus interacciones
6. Los componentes no se conocen entre sí directamente

## Ejemplo en JavaScript

```javascript
// ========== MEDIADOR ==========

// Interfaz base para mediadores
class Mediador {
  // Método para notificar eventos al mediador
  notificar(emisor, evento, datos) {
    throw new Error('Este método debe ser implementado');
  }
}

// Mediador concreto: Sistema de Chat
class MediadorChat extends Mediador {
  // Constructor que inicializa la lista de usuarios
  constructor() {
    super(); // Llama al constructor padre
    this.usuarios = []; // Array de usuarios en el chat
    this.historialMensajes = []; // Historial de todos los mensajes
  }

  // Método para registrar un usuario en el chat
  registrarUsuario(usuario) {
    this.usuarios.push(usuario); // Añade usuario a la lista
    usuario.mediador = this; // Establece la referencia al mediador en el usuario

    console.log(`[Sistema] ${usuario.nombre} se unió al chat`);

    // Notifica a todos los usuarios que alguien se unió
    this.usuarios.forEach(u => {
      if (u !== usuario) { // No notifica al mismo usuario
        u.recibirNotificacion(`${usuario.nombre} se unió al chat`);
      }
    });
  }

  // Método para eliminar un usuario del chat
  eliminarUsuario(usuario) {
    // Encuentra el índice del usuario
    const indice = this.usuarios.indexOf(usuario);

    // Si lo encuentra, lo elimina
    if (indice !== -1) {
      this.usuarios.splice(indice, 1); // Elimina de la lista
      usuario.mediador = null; // Elimina la referencia al mediador

      console.log(`[Sistema] ${usuario.nombre} abandonó el chat`);

      // Notifica a los usuarios restantes
      this.usuarios.forEach(u => {
        u.recibirNotificacion(`${usuario.nombre} abandonó el chat`);
      });
    }
  }

  // MÉTODO CLAVE: Maneja la comunicación entre usuarios
  notificar(emisor, evento, datos) {
    // Registra el mensaje en el historial
    this.historialMensajes.push({
      emisor: emisor.nombre,
      evento: evento,
      datos: datos,
      timestamp: new Date().toISOString()
    });

    // Maneja diferentes tipos de eventos
    switch(evento) {
      case 'mensaje_publico':
        // Envía mensaje a todos excepto al emisor
        this.enviarMensajePublico(emisor, datos);
        break;

      case 'mensaje_privado':
        // Envía mensaje a un usuario específico
        this.enviarMensajePrivado(emisor, datos.receptor, datos.mensaje);
        break;

      case 'escribiendo':
        // Notifica que el usuario está escribiendo
        this.notificarEscribiendo(emisor);
        break;

      case 'reaccion':
        // Envía una reacción a todos
        this.enviarReaccion(emisor, datos);
        break;

      default:
        console.log(`[Sistema] Evento desconocido: ${evento}`);
    }
  }

  // Envía un mensaje público a todos los usuarios
  enviarMensajePublico(emisor, mensaje) {
    console.log(`\n💬 [${emisor.nombre}] ${mensaje}`);

    // Envía a todos los usuarios excepto al emisor
    this.usuarios.forEach(usuario => {
      if (usuario !== emisor) { // No envía al que lo envió
        usuario.recibirMensaje(emisor.nombre, mensaje);
      }
    });
  }

  // Envía un mensaje privado a un usuario específico
  enviarMensajePrivado(emisor, nombreReceptor, mensaje) {
    // Busca el receptor por nombre
    const receptor = this.usuarios.find(u => u.nombre === nombreReceptor);

    // Verifica que el receptor existe
    if (!receptor) {
      emisor.recibirNotificacion(`Usuario ${nombreReceptor} no encontrado`);
      return;
    }

    // Verifica que no se envíe mensaje a sí mismo
    if (receptor === emisor) {
      emisor.recibirNotificacion('No puedes enviarte mensajes a ti mismo');
      return;
    }

    console.log(`\n🔒 [${emisor.nombre} → ${nombreReceptor}] ${mensaje}`);

    // Envía el mensaje privado solo al receptor
    receptor.recibirMensajePrivado(emisor.nombre, mensaje);

    // Confirma al emisor que se envió
    emisor.recibirNotificacion(`Mensaje privado enviado a ${nombreReceptor}`);
  }

  // Notifica que un usuario está escribiendo
  notificarEscribiendo(emisor) {
    console.log(`\n✏️  ${emisor.nombre} está escribiendo...`);

    // Notifica a todos excepto al emisor
    this.usuarios.forEach(usuario => {
      if (usuario !== emisor) {
        usuario.recibirNotificacion(`${emisor.nombre} está escribiendo...`);
      }
    });
  }

  // Envía una reacción (emoji) a todos
  enviarReaccion(emisor, emoji) {
    console.log(`\n${emoji} Reacción de ${emisor.nombre}`);

    // Envía a todos excepto al emisor
    this.usuarios.forEach(usuario => {
      if (usuario !== emisor) {
        usuario.recibirNotificacion(`${emisor.nombre} reaccionó con ${emoji}`);
      }
    });
  }

  // Método para obtener el historial de mensajes
  obtenerHistorial() {
    return this.historialMensajes; // Retorna el historial completo
  }

  // Método para obtener la lista de usuarios activos
  obtenerUsuariosActivos() {
    return this.usuarios.map(u => u.nombre); // Retorna array de nombres
  }
}

// ========== COMPONENTES (COLEGAS) ==========

// Clase base para componentes que usan el mediador
class Usuario {
  // Constructor que recibe el nombre del usuario
  constructor(nombre) {
    this.nombre = nombre; // Nombre del usuario
    this.mediador = null; // Referencia al mediador (se establece al registrar)
  }

  // Método para enviar mensaje público
  enviarMensaje(mensaje) {
    // Verifica que esté conectado a un mediador
    if (!this.mediador) {
      console.log(`[${this.nombre}] Error: No conectado al chat`);
      return;
    }

    // Notifica al mediador sobre el mensaje público
    this.mediador.notificar(this, 'mensaje_publico', mensaje);
  }

  // Método para enviar mensaje privado
  enviarMensajePrivado(nombreReceptor, mensaje) {
    // Verifica que esté conectado a un mediador
    if (!this.mediador) {
      console.log(`[${this.nombre}] Error: No conectado al chat`);
      return;
    }

    // Notifica al mediador sobre el mensaje privado
    this.mediador.notificar(this, 'mensaje_privado', {
      receptor: nombreReceptor,
      mensaje: mensaje
    });
  }

  // Método para indicar que está escribiendo
  estaEscribiendo() {
    // Verifica que esté conectado a un mediador
    if (!this.mediador) {
      return;
    }

    // Notifica al mediador que está escribiendo
    this.mediador.notificar(this, 'escribiendo', null);
  }

  // Método para enviar una reacción
  reaccionar(emoji) {
    // Verifica que esté conectado a un mediador
    if (!this.mediador) {
      return;
    }

    // Notifica al mediador sobre la reacción
    this.mediador.notificar(this, 'reaccion', emoji);
  }

  // Método llamado cuando recibe un mensaje público
  recibirMensaje(emisor, mensaje) {
    console.log(`  ← [${this.nombre}] recibió de ${emisor}: "${mensaje}"`);
  }

  // Método llamado cuando recibe un mensaje privado
  recibirMensajePrivado(emisor, mensaje) {
    console.log(`  ← [${this.nombre}] recibió mensaje privado de ${emisor}: "${mensaje}"`);
  }

  // Método llamado cuando recibe una notificación del sistema
  recibirNotificacion(notificacion) {
    console.log(`  ℹ️  [${this.nombre}] ${notificacion}`);
  }
}

// Tipos específicos de usuarios (extensiones opcionales)

// Usuario Premium con funcionalidades extra
class UsuarioPremium extends Usuario {
  // Constructor que llama al padre
  constructor(nombre) {
    super(nombre); // Llama al constructor padre
    this.badge = '⭐'; // Badge de premium
  }

  // Sobrescribe el método para incluir el badge
  enviarMensaje(mensaje) {
    // Añade el badge al nombre en los mensajes
    const mensajeConBadge = mensaje; // El mensaje se mantiene igual
    super.enviarMensaje(mensajeConBadge); // Llama al método padre

    // Muestra el badge en el log
    console.log(`  ${this.badge} Usuario Premium`);
  }
}

// Usuario Moderador con permisos especiales
class UsuarioModerador extends Usuario {
  // Constructor que llama al padre
  constructor(nombre) {
    super(nombre); // Llama al constructor padre
    this.badge = '🛡️'; // Badge de moderador
  }

  // Método especial para silenciar usuarios (requiere acceso al mediador)
  silenciarUsuario(nombreUsuario) {
    console.log(`\n${this.badge} [${this.nombre}] Moderador silenciando a ${nombreUsuario}`);

    // El mediador manejaría esta acción
    if (this.mediador) {
      this.mediador.notificar(this, 'silenciar', nombreUsuario);
    }
  }
}

// ========== USO DEL PATRÓN ==========

console.log('=== SISTEMA DE CHAT (Patrón Mediator) ===\n');

// Crear el mediador (sala de chat)
const chatMediador = new MediadorChat();

// Crear usuarios
const alice = new Usuario('Alice');
const bob = new Usuario('Bob');
const charlie = new UsuarioPremium('Charlie');
const diana = new UsuarioModerador('Diana');

// Registrar usuarios en el chat (esto establece la conexión con el mediador)
console.log('--- Usuarios uniéndose al chat ---\n');
chatMediador.registrarUsuario(alice);
chatMediador.registrarUsuario(bob);
chatMediador.registrarUsuario(charlie);
chatMediador.registrarUsuario(diana);

// ========== ESCENARIO 1: Mensajes públicos ==========
console.log('\n\n--- ESCENARIO 1: Mensajes públicos ---');

alice.enviarMensaje('¡Hola a todos!'); // Alice envía mensaje público
bob.enviarMensaje('Hola Alice, ¿cómo estás?'); // Bob responde
charlie.enviarMensaje('¡Saludos!'); // Charlie también saluda

// ========== ESCENARIO 2: Usuario escribiendo ==========
console.log('\n\n--- ESCENARIO 2: Notificación de escritura ---');

alice.estaEscribiendo(); // Alice notifica que está escribiendo

// ========== ESCENARIO 3: Mensajes privados ==========
console.log('\n\n--- ESCENARIO 3: Mensajes privados ---');

alice.enviarMensajePrivado('Bob', 'Oye Bob, ¿tienes un momento?'); // Mensaje privado
bob.enviarMensajePrivado('Alice', 'Claro, dime'); // Respuesta privada

// Intento de mensaje a usuario inexistente
alice.enviarMensajePrivado('Eve', 'Hola Eve'); // Error: usuario no existe

// ========== ESCENARIO 4: Reacciones ==========
console.log('\n\n--- ESCENARIO 4: Reacciones ---');

charlie.reaccionar('👍'); // Charlie reacciona con pulgar arriba
diana.reaccionar('❤️'); // Diana reacciona con corazón

// ========== ESCENARIO 5: Usuario abandona el chat ==========
console.log('\n\n--- ESCENARIO 5: Usuario abandona ---');

chatMediador.eliminarUsuario(bob); // Bob abandona el chat

// Alice intenta enviar mensaje después de que Bob se fue
alice.enviarMensaje('¿Alguien sabe dónde está Bob?');

// ========== ESCENARIO 6: Ver usuarios activos ==========
console.log('\n\n--- ESCENARIO 6: Usuarios activos ---');

const usuariosActivos = chatMediador.obtenerUsuariosActivos();
console.log(`Usuarios activos: ${usuariosActivos.join(', ')}`);

// ========== ESCENARIO 7: Ver historial ==========
console.log('\n\n--- ESCENARIO 7: Historial de mensajes ---');

const historial = chatMediador.obtenerHistorial();
console.log(`\nTotal de eventos: ${historial.length}`);
historial.slice(0, 5).forEach((evento, index) => {
  console.log(`${index + 1}. [${evento.emisor}] ${evento.evento}: ${JSON.stringify(evento.datos)}`);
});

console.log('\n\n=== VENTAJAS DEL PATRÓN MEDIATOR ===');
console.log('✓ Los componentes no se conocen directamente (bajo acoplamiento)');
console.log('✓ Centraliza la lógica de comunicación en un solo lugar');
console.log('✓ Fácil añadir nuevos componentes sin modificar los existentes');
console.log('✓ Simplifica las relaciones entre objetos (de N² a N)');
console.log('✓ Reutilización de componentes facilitada');
console.log('✓ Principio de responsabilidad única');

console.log('\n=== SIN MEDIATOR (Antipatrón) ===');
console.log('❌ Cada usuario tendría referencias a todos los demás');
console.log('❌ Lógica de comunicación duplicada en cada clase');
console.log('❌ Alto acoplamiento entre componentes');
console.log('❌ Difícil mantener y extender');
```

## Ejemplo Adicional: Formulario con Validación

```javascript
// Mediador para coordinar controles de formulario
class MediadorFormulario extends Mediador {
  constructor() {
    super();
    this.controles = {}; // Mapa de controles del formulario
  }

  registrarControl(nombre, control) {
    this.controles[nombre] = control; // Registra un control
    control.mediador = this; // Establece referencia al mediador
  }

  notificar(emisor, evento, datos) {
    // Coordina la interacción entre controles
    if (evento === 'cambio_pais') {
      // Cuando cambia el país, actualiza las ciudades disponibles
      const ciudades = this.obtenerCiudadesPorPais(datos);
      this.controles['ciudad'].actualizarOpciones(ciudades);
    }

    if (evento === 'cambio_tipo_envio') {
      // Cuando cambia el tipo de envío, muestra/oculta dirección
      const mostrarDireccion = datos === 'domicilio';
      this.controles['direccion'].establecerVisible(mostrarDireccion);
    }
  }

  obtenerCiudadesPorPais(pais) {
    const mapaCiudades = {
      'España': ['Madrid', 'Barcelona', 'Valencia'],
      'Francia': ['París', 'Lyon', 'Marsella'],
      'Italia': ['Roma', 'Milán', 'Nápoles']
    };
    return mapaCiudades[pais] || [];
  }
}

// Control de formulario
class ControlFormulario {
  constructor(nombre) {
    this.nombre = nombre;
    this.mediador = null;
    this.valor = '';
  }

  cambiar(nuevoValor, evento) {
    this.valor = nuevoValor;
    if (this.mediador) {
      this.mediador.notificar(this, evento, nuevoValor);
    }
  }

  actualizarOpciones(opciones) {
    console.log(`[${this.nombre}] Opciones actualizadas:`, opciones);
  }

  establecerVisible(visible) {
    console.log(`[${this.nombre}] ${visible ? 'Mostrado' : 'Ocultado'}`);
  }
}

// Uso
const formulario = new MediadorFormulario();
const selectPais = new ControlFormulario('pais');
const selectCiudad = new ControlFormulario('ciudad');
const selectTipoEnvio = new ControlFormulario('tipo_envio');
const inputDireccion = new ControlFormulario('direccion');

formulario.registrarControl('pais', selectPais);
formulario.registrarControl('ciudad', selectCiudad);
formulario.registrarControl('tipo_envio', selectTipoEnvio);
formulario.registrarControl('direccion', inputDireccion);

selectPais.cambiar('España', 'cambio_pais');
selectTipoEnvio.cambiar('domicilio', 'cambio_tipo_envio');
```

## Ventajas
- Reduce el acoplamiento entre componentes que se comunican
- Centraliza el control y facilita el mantenimiento
- Simplifica protocolos de comunicación entre objetos
- Puedes reutilizar componentes individuales más fácilmente
- Principio de responsabilidad única: comunicación en un solo lugar
- Más fácil entender y modificar las interacciones

## Desventajas
- El mediador puede convertirse en un objeto Dios (God Object)
- Puede volverse demasiado complejo si maneja demasiada lógica
- A veces es más simple permitir comunicación directa
- Puede introducir un punto único de fallo
