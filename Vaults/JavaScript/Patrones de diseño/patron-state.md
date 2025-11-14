# Patrón State (Estado)

## ¿Qué es?
El patrón State permite que un objeto altere su comportamiento cuando su estado interno cambia. El objeto parecerá cambiar de clase. Encapsula estados en objetos separados y delega el comportamiento al objeto estado actual.

## ¿Cuándo usarlo?
- Cuando un objeto se comporta de manera diferente según su estado
- Cuando tienes múltiples condicionales (if-else, switch) basados en el estado del objeto
- Cuando el comportamiento de un objeto depende de su estado y debe cambiar en tiempo de ejecución
- Cuando las transiciones de estado son complejas
- Ejemplos: máquinas de estados, conexiones de red, reproductores de medios, semáforos

## ¿Cómo aplicarlo?
1. Identifica todos los posibles estados del objeto
2. Crea una interfaz Estado con métodos para cada acción posible
3. Crea clases Estado concretas que implementen el comportamiento específico de cada estado
4. La clase Contexto mantiene una referencia al estado actual
5. El Contexto delega las peticiones al objeto estado actual
6. Los estados pueden cambiar el estado del contexto

## Ejemplo en JavaScript

```javascript
// ========== INTERFAZ ESTADO ==========

// Clase base para todos los estados
class Estado {
  // Constructor que recibe referencia al contexto
  constructor(reproductor) {
    this.reproductor = reproductor; // Referencia al contexto (reproductor)
  }

  // Métodos que deben ser implementados por estados concretos
  reproducir() {
    throw new Error('Este método debe ser implementado');
  }

  pausar() {
    throw new Error('Este método debe ser implementado');
  }

  detener() {
    throw new Error('Este método debe ser implementado');
  }

  siguiente() {
    throw new Error('Este método debe ser implementado');
  }

  anterior() {
    throw new Error('Este método debe ser implementado');
  }
}

// ========== ESTADOS CONCRETOS ==========

// Estado: Detenido
class EstadoDetenido extends Estado {
  // Implementa reproducir: cambia a estado Reproduciendo
  reproducir() {
    console.log('▶️  Iniciando reproducción...');
    this.reproductor.iniciarReproduccion(); // Lógica en el contexto
    this.reproductor.cambiarEstado(this.reproductor.estadoReproduciendo); // Cambia estado
  }

  // Pausar no hace nada si ya está detenido
  pausar() {
    console.log('⚠️  Ya está detenido, no se puede pausar');
  }

  // Detener no hace nada si ya está detenido
  detener() {
    console.log('⚠️  Ya está detenido');
  }

  // Siguiente canción: puede cambiar canción aunque esté detenido
  siguiente() {
    console.log('⏭️  Siguiente canción (detenido)');
    this.reproductor.siguienteCancion(); // Cambia canción pero sigue detenido
  }

  // Canción anterior: puede cambiar canción aunque esté detenido
  anterior() {
    console.log('⏮️  Canción anterior (detenido)');
    this.reproductor.cancionAnterior(); // Cambia canción pero sigue detenido
  }

  // Método para obtener el nombre del estado
  obtenerNombre() {
    return 'Detenido'; // Nombre del estado
  }
}

// Estado: Reproduciendo
class EstadoReproduciendo extends Estado {
  // Reproducir no hace nada si ya está reproduciendo
  reproducir() {
    console.log('⚠️  Ya está reproduciendo');
  }

  // Implementa pausar: cambia a estado Pausado
  pausar() {
    console.log('⏸️  Pausando reproducción...');
    this.reproductor.pausarReproduccion(); // Lógica en el contexto
    this.reproductor.cambiarEstado(this.reproductor.estadoPausado); // Cambia estado
  }

  // Implementa detener: cambia a estado Detenido
  detener() {
    console.log('⏹️  Deteniendo reproducción...');
    this.reproductor.detenerReproduccion(); // Lógica en el contexto
    this.reproductor.cambiarEstado(this.reproductor.estadoDetenido); // Cambia estado
  }

  // Siguiente canción: detiene, cambia canción y sigue reproduciendo
  siguiente() {
    console.log('⏭️  Siguiente canción');
    this.reproductor.detenerReproduccion(); // Detiene la actual
    this.reproductor.siguienteCancion(); // Cambia a la siguiente
    this.reproductor.iniciarReproduccion(); // Reproduce la nueva
    // Permanece en estado Reproduciendo
  }

  // Canción anterior: similar a siguiente
  anterior() {
    console.log('⏮️  Canción anterior');
    this.reproductor.detenerReproduccion(); // Detiene la actual
    this.reproductor.cancionAnterior(); // Cambia a la anterior
    this.reproductor.iniciarReproduccion(); // Reproduce la nueva
    // Permanece en estado Reproduciendo
  }

  // Método para obtener el nombre del estado
  obtenerNombre() {
    return 'Reproduciendo'; // Nombre del estado
  }
}

// Estado: Pausado
class EstadoPausado extends Estado {
  // Implementa reproducir: reanuda y cambia a estado Reproduciendo
  reproducir() {
    console.log('▶️  Reanudando reproducción...');
    this.reproductor.reanudarReproduccion(); // Lógica en el contexto
    this.reproductor.cambiarEstado(this.reproductor.estadoReproduciendo); // Cambia estado
  }

  // Pausar no hace nada si ya está pausado
  pausar() {
    console.log('⚠️  Ya está pausado');
  }

  // Implementa detener: cambia a estado Detenido
  detener() {
    console.log('⏹️  Deteniendo desde pausa...');
    this.reproductor.detenerReproduccion(); // Lógica en el contexto
    this.reproductor.cambiarEstado(this.reproductor.estadoDetenido); // Cambia estado
  }

  // Siguiente canción: cambia canción y queda pausado
  siguiente() {
    console.log('⏭️  Siguiente canción (pausado)');
    this.reproductor.siguienteCancion(); // Cambia canción
    // Permanece en estado Pausado
  }

  // Canción anterior: cambia canción y queda pausado
  anterior() {
    console.log('⏮️  Canción anterior (pausado)');
    this.reproductor.cancionAnterior(); // Cambia canción
    // Permanece en estado Pausado
  }

  // Método para obtener el nombre del estado
  obtenerNombre() {
    return 'Pausado'; // Nombre del estado
  }
}

// Estado: Bloqueado (ejemplo de estado adicional)
class EstadoBloqueado extends Estado {
  // En estado bloqueado, ninguna acción está permitida
  reproducir() {
    console.log('🔒 Reproductor bloqueado. Desbloquea primero.');
  }

  pausar() {
    console.log('🔒 Reproductor bloqueado. Desbloquea primero.');
  }

  detener() {
    console.log('🔒 Reproductor bloqueado. Desbloquea primero.');
  }

  siguiente() {
    console.log('🔒 Reproductor bloqueado. Desbloquea primero.');
  }

  anterior() {
    console.log('🔒 Reproductor bloqueado. Desbloquea primero.');
  }

  // Método especial para desbloquear
  desbloquear() {
    console.log('🔓 Desbloqueando reproductor...');
    this.reproductor.cambiarEstado(this.reproductor.estadoDetenido); // Vuelve a detenido
  }

  // Método para obtener el nombre del estado
  obtenerNombre() {
    return 'Bloqueado'; // Nombre del estado
  }
}

// ========== CONTEXTO ==========

// Clase principal que mantiene el estado actual
class ReproductorMusica {
  // Constructor que inicializa el reproductor
  constructor() {
    // Crea instancias de todos los estados posibles
    this.estadoDetenido = new EstadoDetenido(this);
    this.estadoReproduciendo = new EstadoReproduciendo(this);
    this.estadoPausado = new EstadoPausado(this);
    this.estadoBloqueado = new EstadoBloqueado(this);

    // Estado inicial: Detenido
    this.estadoActual = this.estadoDetenido;

    // Lista de reproducción
    this.playlist = [
      'Canción 1 - Bohemian Rhapsody',
      'Canción 2 - Stairway to Heaven',
      'Canción 3 - Hotel California',
      'Canción 4 - Imagine',
      'Canción 5 - Sweet Child O\' Mine'
    ];

    this.indiceActual = 0; // Índice de la canción actual
    this.posicionReproduccion = 0; // Posición en segundos
  }

  // Método para cambiar el estado actual
  cambiarEstado(nuevoEstado) {
    console.log(`[Estado] ${this.estadoActual.obtenerNombre()} → ${nuevoEstado.obtenerNombre()}`);
    this.estadoActual = nuevoEstado; // Actualiza el estado actual
  }

  // MÉTODOS PÚBLICOS: Delegan al estado actual
  // Estos son los métodos que el cliente usa

  reproducir() {
    this.estadoActual.reproducir(); // Delega al estado actual
  }

  pausar() {
    this.estadoActual.pausar(); // Delega al estado actual
  }

  detener() {
    this.estadoActual.detener(); // Delega al estado actual
  }

  siguiente() {
    this.estadoActual.siguiente(); // Delega al estado actual
  }

  anterior() {
    this.estadoActual.anterior(); // Delega al estado actual
  }

  bloquear() {
    console.log('🔒 Bloqueando reproductor...');
    this.cambiarEstado(this.estadoBloqueado); // Cambia a estado bloqueado
  }

  desbloquear() {
    if (this.estadoActual === this.estadoBloqueado) {
      this.estadoActual.desbloquear(); // Llama al método desbloquear del estado
    }
  }

  // MÉTODOS INTERNOS: Lógica real del reproductor
  // Estos métodos son llamados por los estados

  iniciarReproduccion() {
    console.log(`🎵 Reproduciendo: ${this.playlist[this.indiceActual]}`);
    console.log(`   Desde posición: ${this.posicionReproduccion}s`);
  }

  pausarReproduccion() {
    this.posicionReproduccion += 30; // Simula que pasaron 30 segundos
    console.log(`⏸️  Pausado en: ${this.posicionReproduccion}s`);
  }

  reanudarReproduccion() {
    console.log(`▶️  Reanudando: ${this.playlist[this.indiceActual]}`);
    console.log(`   Desde posición: ${this.posicionReproduccion}s`);
  }

  detenerReproduccion() {
    this.posicionReproduccion = 0; // Reinicia la posición
    console.log(`⏹️  Detenido: ${this.playlist[this.indiceActual]}`);
  }

  siguienteCancion() {
    // Avanza al siguiente índice (con wraparound)
    this.indiceActual = (this.indiceActual + 1) % this.playlist.length;
    this.posicionReproduccion = 0; // Reinicia posición
    console.log(`   Nueva canción: ${this.playlist[this.indiceActual]}`);
  }

  cancionAnterior() {
    // Retrocede al índice anterior (con wraparound)
    this.indiceActual = (this.indiceActual - 1 + this.playlist.length) % this.playlist.length;
    this.posicionReproduccion = 0; // Reinicia posición
    console.log(`   Nueva canción: ${this.playlist[this.indiceActual]}`);
  }

  // Método para obtener información del estado actual
  obtenerEstado() {
    return {
      estado: this.estadoActual.obtenerNombre(), // Nombre del estado
      cancion: this.playlist[this.indiceActual], // Canción actual
      posicion: this.posicionReproduccion, // Posición en la canción
      indice: this.indiceActual + 1, // Número de canción
      total: this.playlist.length // Total de canciones
    };
  }

  // Método para mostrar el estado actual
  mostrarEstado() {
    const info = this.obtenerEstado();
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📱 REPRODUCTOR DE MÚSICA`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`Estado: ${info.estado}`);
    console.log(`Canción: ${info.cancion}`);
    console.log(`Posición: ${info.posicion}s`);
    console.log(`Pista: ${info.indice}/${info.total}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  }
}

// ========== USO DEL PATRÓN ==========

console.log('=== REPRODUCTOR DE MÚSICA (Patrón State) ===\n');

// Crear el reproductor
const reproductor = new ReproductorMusica();

// Mostrar estado inicial
reproductor.mostrarEstado();

// ========== ESCENARIO 1: Secuencia normal de uso ==========
console.log('--- ESCENARIO 1: Uso normal ---\n');

reproductor.reproducir(); // Detenido → Reproduciendo
reproductor.mostrarEstado();

reproductor.pausar(); // Reproduciendo → Pausado
reproductor.mostrarEstado();

reproductor.reproducir(); // Pausado → Reproduciendo (reanuda)
reproductor.mostrarEstado();

reproductor.detener(); // Reproduciendo → Detenido
reproductor.mostrarEstado();

// ========== ESCENARIO 2: Acciones inválidas ==========
console.log('\n--- ESCENARIO 2: Acciones inválidas ---\n');

reproductor.pausar(); // Ya está detenido, no hace nada
reproductor.detener(); // Ya está detenido, no hace nada

// ========== ESCENARIO 3: Navegación por canciones ==========
console.log('\n--- ESCENARIO 3: Navegación ---\n');

reproductor.reproducir(); // Inicia reproducción
reproductor.siguiente(); // Cambia a siguiente canción (sigue reproduciendo)
reproductor.siguiente(); // Otra siguiente
reproductor.mostrarEstado();

reproductor.anterior(); // Vuelve a la anterior
reproductor.mostrarEstado();

// ========== ESCENARIO 4: Navegación en pausa ==========
console.log('\n--- ESCENARIO 4: Navegación en pausa ---\n');

reproductor.pausar(); // Pausa
reproductor.siguiente(); // Siguiente en pausa (no reproduce)
reproductor.anterior(); // Anterior en pausa
reproductor.mostrarEstado();

reproductor.reproducir(); // Reanuda en la canción actual
reproductor.mostrarEstado();

// ========== ESCENARIO 5: Bloquear/Desbloquear ==========
console.log('\n--- ESCENARIO 5: Bloqueo ---\n');

reproductor.bloquear(); // Bloquea el reproductor
reproductor.mostrarEstado();

// Intenta varias acciones (todas bloqueadas)
reproductor.reproducir(); // Bloqueado
reproductor.pausar(); // Bloqueado
reproductor.siguiente(); // Bloqueado

reproductor.desbloquear(); // Desbloquea
reproductor.mostrarEstado();

reproductor.reproducir(); // Ahora sí funciona
reproductor.mostrarEstado();

console.log('\n=== VENTAJAS DEL PATRÓN STATE ===');
console.log('✓ Elimina grandes bloques de condicionales (if-else, switch)');
console.log('✓ Cada estado está en su propia clase (responsabilidad única)');
console.log('✓ Fácil añadir nuevos estados sin modificar estados existentes');
console.log('✓ El comportamiento específico del estado está encapsulado');
console.log('✓ Transiciones de estado explícitas y fáciles de entender');
console.log('✓ Código más organizado y mantenible');

console.log('\n=== SIN STATE (Antipatrón) ===');
console.log('❌ Método reproducir() con múltiples if(estado === ...)');
console.log('❌ Lógica de estado esparcida por toda la clase');
console.log('❌ Difícil de entender y mantener');
console.log('❌ Propenso a errores al agregar nuevos estados');
console.log('❌ Viola el principio abierto/cerrado');
```

## Ejemplo Adicional: Conexión de Red

```javascript
// Estados de una conexión
class EstadoConexion {
  constructor(conexion) {
    this.conexion = conexion;
  }
}

class Desconectado extends EstadoConexion {
  conectar() {
    console.log('Conectando...');
    this.conexion.cambiarEstado(this.conexion.conectando);
  }
  enviarDatos() {
    console.log('Error: No conectado');
  }
}

class Conectando extends EstadoConexion {
  conectar() {
    console.log('Ya está conectando...');
  }
  enviarDatos() {
    console.log('Error: Esperando conexión');
  }
  conexionExitosa() {
    console.log('Conexión establecida');
    this.conexion.cambiarEstado(this.conexion.conectado);
  }
  conexionFallida() {
    console.log('Conexión fallida');
    this.conexion.cambiarEstado(this.conexion.desconectado);
  }
}

class Conectado extends EstadoConexion {
  conectar() {
    console.log('Ya está conectado');
  }
  enviarDatos(datos) {
    console.log(`Enviando: ${datos}`);
  }
  desconectar() {
    console.log('Desconectando...');
    this.conexion.cambiarEstado(this.conexion.desconectado);
  }
}

class Conexion {
  constructor() {
    this.desconectado = new Desconectado(this);
    this.conectando = new Conectando(this);
    this.conectado = new Conectado(this);
    this.estado = this.desconectado;
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }

  conectar() { this.estado.conectar(); }
  enviarDatos(datos) { this.estado.enviarDatos(datos); }
  desconectar() { this.estado.desconectar(); }
  conexionExitosa() { this.estado.conexionExitosa(); }
  conexionFallida() { this.estado.conexionFallida(); }
}

// Uso
const conn = new Conexion();
conn.enviarDatos('test'); // Error: No conectado
conn.conectar(); // Conectando...
conn.conexionExitosa(); // Conexión establecida
conn.enviarDatos('Hola'); // Enviando: Hola
conn.desconectar(); // Desconectando...
```

## Ventajas
- Principio de responsabilidad única: organiza código relacionado con estados particulares
- Principio abierto/cerrado: introduce nuevos estados sin cambiar clases de estado existentes o el contexto
- Simplifica el código del contexto eliminando condicionales voluminosos
- Las transiciones de estado son explícitas
- Los objetos estado pueden compartirse si no tienen campos de instancia

## Desventajas
- Puede ser excesivo si hay pocos estados o raramente cambian
- Aumenta el número de clases
- Puede ser difícil seguir el flujo si hay muchos estados
- Requiere más código inicial que usar simples condicionales
