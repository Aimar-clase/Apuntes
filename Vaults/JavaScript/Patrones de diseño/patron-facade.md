# Patrón Facade (Fachada)

## ¿Qué es?
El patrón Facade proporciona una interfaz simplificada a un sistema complejo de clases, biblioteca o framework. Oculta la complejidad del sistema y proporciona una interfaz más simple al cliente.

## ¿Cuándo usarlo?
- Cuando necesitas una interfaz simple para un subsistema complejo
- Cuando quieres estructurar un sistema en capas
- Cuando hay muchas dependencias entre clientes y clases de implementación
- Cuando quieres desacoplar subsistemas entre sí
- Cuando trabajas con librerías o APIs complejas
- Cuando quieres proporcionar un punto de entrada único a un subsistema

## ¿Cómo aplicarlo?
1. Identifica el subsistema complejo que quieres simplificar
2. Crea una clase facade que encapsule la lógica compleja
3. La facade delega el trabajo a los objetos del subsistema
4. El cliente solo interactúa con la facade, no con el subsistema directamente
5. La facade puede tener métodos convenientes para operaciones comunes

## Ejemplo en JavaScript

```javascript
// ========== SUBSISTEMA COMPLEJO: CINE EN CASA ==========

// Clase: Reproductor de Blu-ray
class ReproductorBluRay {
  // Enciende el reproductor
  encender() {
    console.log('[Reproductor] Encendiendo...'); // Log de operación
  }

  // Apaga el reproductor
  apagar() {
    console.log('[Reproductor] Apagando...'); // Log de operación
  }

  // Abre la bandeja del disco
  abrirBandeja() {
    console.log('[Reproductor] Abriendo bandeja...'); // Log de operación
  }

  // Cierra la bandeja del disco
  cerrarBandeja() {
    console.log('[Reproductor] Cerrando bandeja...'); // Log de operación
  }

  // Reproduce el contenido
  reproducir() {
    console.log('[Reproductor] Reproduciendo película...'); // Log de operación
  }

  // Pausa la reproducción
  pausar() {
    console.log('[Reproductor] Pausado'); // Log de operación
  }

  // Detiene la reproducción
  detener() {
    console.log('[Reproductor] Deteniendo...'); // Log de operación
  }
}

// Clase: Proyector
class Proyector {
  // Enciende el proyector
  encender() {
    console.log('[Proyector] Encendiendo proyector...'); // Log de operación
  }

  // Apaga el proyector
  apagar() {
    console.log('[Proyector] Apagando proyector...'); // Log de operación
  }

  // Configura el modo de imagen
  configurarModoAncho() {
    console.log('[Proyector] Configurando modo panorámico 16:9'); // Log de operación
  }

  // Ajusta el enfoque
  ajustarEnfoque() {
    console.log('[Proyector] Ajustando enfoque...'); // Log de operación
  }

  // Selecciona la fuente de entrada
  seleccionarEntrada(fuente) {
    console.log(`[Proyector] Seleccionando entrada: ${fuente}`); // Log de operación
  }
}

// Clase: Sistema de sonido
class SistemaSonido {
  // Enciende el sistema de sonido
  encender() {
    console.log('[Sistema Sonido] Encendiendo...'); // Log de operación
  }

  // Apaga el sistema de sonido
  apagar() {
    console.log('[Sistema Sonido] Apagando...'); // Log de operación
  }

  // Configura el sonido surround
  configurarSurround() {
    console.log('[Sistema Sonido] Configurando sonido 5.1 surround'); // Log de operación
  }

  // Ajusta el volumen
  establecerVolumen(nivel) {
    console.log(`[Sistema Sonido] Volumen establecido a ${nivel}`); // Log de operación
  }

  // Selecciona la entrada de audio
  seleccionarEntrada(fuente) {
    console.log(`[Sistema Sonido] Entrada de audio: ${fuente}`); // Log de operación
  }
}

// Clase: Luces inteligentes
class LucesInteligentes {
  // Enciende las luces
  encender() {
    console.log('[Luces] Encendiendo luces...'); // Log de operación
  }

  // Apaga las luces
  apagar() {
    console.log('[Luces] Apagando luces...'); // Log de operación
  }

  // Atenúa las luces
  atenuar(porcentaje) {
    console.log(`[Luces] Atenuando luces al ${porcentaje}%`); // Log de operación
  }

  // Establece un color
  establecerColor(color) {
    console.log(`[Luces] Color establecido a ${color}`); // Log de operación
  }
}

// Clase: Pantalla motorizada
class PantallaMotorizada {
  // Baja la pantalla
  bajar() {
    console.log('[Pantalla] Bajando pantalla...'); // Log de operación
  }

  // Sube la pantalla
  subir() {
    console.log('[Pantalla] Subiendo pantalla...'); // Log de operación
  }
}

// Clase: Control de climatización
class Climatizacion {
  // Enciende el aire acondicionado
  encender() {
    console.log('[Climatización] Activando...'); // Log de operación
  }

  // Apaga el aire acondicionado
  apagar() {
    console.log('[Climatización] Desactivando...'); // Log de operación
  }

  // Establece la temperatura
  establecerTemperatura(temp) {
    console.log(`[Climatización] Temperatura establecida a ${temp}°C`); // Log de operación
  }
}

// ========== FACADE: INTERFAZ SIMPLIFICADA ==========

// Facade que simplifica todo el sistema de cine en casa
class CineEnCasaFacade {
  // Constructor que inicializa todos los componentes del subsistema
  constructor() {
    // Crea instancias de todos los componentes
    this.reproductor = new ReproductorBluRay(); // Componente de reproducción
    this.proyector = new Proyector(); // Componente de proyección
    this.sonido = new SistemaSonido(); // Componente de audio
    this.luces = new LucesInteligentes(); // Componente de iluminación
    this.pantalla = new PantallaMotorizada(); // Componente de pantalla
    this.clima = new Climatizacion(); // Componente de clima
  }

  // MÉTODO SIMPLIFICADO: Ver película
  // Encapsula múltiples pasos complejos en una sola llamada
  verPelicula() {
    console.log('\n=== INICIANDO MODO PELÍCULA ===\n');

    // Paso 1: Preparar ambiente
    this.luces.encender(); // Enciende las luces
    this.luces.atenuar(10); // Las atenúa al 10%
    this.luces.establecerColor('azul tenue'); // Establece color ambiental

    // Paso 2: Preparar temperatura
    this.clima.encender(); // Enciende climatización
    this.clima.establecerTemperatura(22); // Temperatura confortable

    // Paso 3: Preparar pantalla
    this.pantalla.bajar(); // Baja la pantalla

    // Paso 4: Configurar proyector
    this.proyector.encender(); // Enciende el proyector
    this.proyector.seleccionarEntrada('HDMI-1'); // Selecciona la entrada correcta
    this.proyector.configurarModoAncho(); // Configura formato panorámico
    this.proyector.ajustarEnfoque(); // Ajusta el enfoque

    // Paso 5: Configurar audio
    this.sonido.encender(); // Enciende el sistema de sonido
    this.sonido.seleccionarEntrada('Blu-ray'); // Selecciona fuente de audio
    this.sonido.configurarSurround(); // Activa sonido envolvente
    this.sonido.establecerVolumen(8); // Volumen moderado

    // Paso 6: Iniciar reproducción
    this.reproductor.encender(); // Enciende el reproductor
    this.reproductor.abrirBandeja(); // Abre para insertar disco
    console.log('[Usuario] Insertando disco...'); // Acción del usuario
    this.reproductor.cerrarBandeja(); // Cierra la bandeja
    this.reproductor.reproducir(); // Comienza reproducción

    console.log('\n✓ SISTEMA LISTO - Disfruta la película\n');
  }

  // MÉTODO SIMPLIFICADO: Pausar película
  pausarPelicula() {
    console.log('\n=== PAUSANDO PELÍCULA ===\n');

    this.reproductor.pausar(); // Pausa la reproducción
    this.luces.atenuar(30); // Sube un poco las luces para ver

    console.log('\n✓ PELÍCULA PAUSADA\n');
  }

  // MÉTODO SIMPLIFICADO: Reanudar película
  reanudarPelicula() {
    console.log('\n=== REANUDANDO PELÍCULA ===\n');

    this.luces.atenuar(10); // Vuelve a atenuar las luces
    this.reproductor.reproducir(); // Continúa reproducción

    console.log('\n✓ PELÍCULA REANUDADA\n');
  }

  // MÉTODO SIMPLIFICADO: Terminar película
  terminarPelicula() {
    console.log('\n=== TERMINANDO SESIÓN ===\n');

    // Detener reproducción
    this.reproductor.detener(); // Detiene reproducción
    this.reproductor.abrirBandeja(); // Abre para retirar disco
    this.reproductor.apagar(); // Apaga el reproductor

    // Apagar audio y video
    this.sonido.apagar(); // Apaga sistema de sonido
    this.proyector.apagar(); // Apaga proyector

    // Restaurar ambiente
    this.pantalla.subir(); // Sube la pantalla
    this.luces.atenuar(100); // Enciende luces completamente
    this.luces.establecerColor('blanco'); // Restaura color normal
    this.clima.apagar(); // Apaga climatización

    console.log('\n✓ SISTEMA APAGADO - Hasta pronto\n');
  }

  // MÉTODO SIMPLIFICADO: Modo gaming
  modoGaming() {
    console.log('\n=== INICIANDO MODO GAMING ===\n');

    // Configuración específica para videojuegos
    this.luces.encender(); // Enciende luces
    this.luces.establecerColor('rojo'); // Color gaming
    this.luces.atenuar(20); // Intensidad media

    this.pantalla.bajar(); // Baja pantalla

    this.proyector.encender(); // Enciende proyector
    this.proyector.seleccionarEntrada('HDMI-2'); // Entrada de consola
    this.proyector.configurarModoAncho(); // Formato panorámico

    this.sonido.encender(); // Enciende audio
    this.sonido.seleccionarEntrada('Console'); // Fuente de consola
    this.sonido.configurarSurround(); // Sonido envolvente
    this.sonido.establecerVolumen(10); // Volumen alto para gaming

    console.log('\n✓ LISTO PARA JUGAR\n');
  }

  // MÉTODO SIMPLIFICADO: Modo música
  modoMusica() {
    console.log('\n=== INICIANDO MODO MÚSICA ===\n');

    // Solo usa sistema de sonido y luces
    this.luces.encender(); // Enciende luces
    this.luces.establecerColor('multicolor'); // Efecto fiesta
    this.luces.atenuar(50); // Intensidad media

    this.sonido.encender(); // Enciende sistema de sonido
    this.sonido.seleccionarEntrada('Streaming'); // Fuente de música
    this.sonido.establecerVolumen(7); // Volumen moderado

    console.log('\n✓ LISTO PARA ESCUCHAR MÚSICA\n');
  }
}

// ========== USO DEL PATRÓN ==========

console.log('=== SISTEMA DE CINE EN CASA ===');

// Crear la facade (interfaz simple)
const cine = new CineEnCasaFacade();

// USO SIN FACADE (Complejo - así tendría que hacerlo el cliente)
console.log('\n--- SIN FACADE (Forma complicada) ---');
console.log('El usuario tendría que hacer 20+ operaciones para ver una película...\n');

// USO CON FACADE (Simple - una sola línea)
console.log('--- CON FACADE (Forma simple) ---');

// Ver una película con un solo método
cine.verPelicula();

// Simular interacción del usuario
setTimeout(() => {
  // Usuario pausa la película
  cine.pausarPelicula();

  setTimeout(() => {
    // Usuario reanuda la película
    cine.reanudarPelicula();

    setTimeout(() => {
      // Usuario termina de ver la película
      cine.terminarPelicula();

      // Cambiar a modo gaming
      setTimeout(() => {
        cine.modoGaming();
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

console.log('\n=== Ventajas del Facade ===');
console.log('✓ El cliente no necesita conocer el subsistema complejo');
console.log('✓ Una sola línea de código en lugar de 20+');
console.log('✓ Si cambia el subsistema, solo se modifica el Facade');
console.log('✓ Reduce acoplamiento entre cliente y subsistema');
console.log('✓ Facilita el uso del sistema');
```

## Ventajas
- Simplifica la interfaz de un subsistema complejo
- Reduce el acoplamiento entre cliente y subsistema
- Facilita el uso y la comprensión del sistema
- Puedes cambiar el subsistema sin afectar al cliente
- Proporciona un punto de entrada único y claro
- Hace el código más legible y mantenible

## Desventajas
- La facade puede convertirse en un objeto Dios (God Object) acoplado a todas las clases
- Puede ocultar demasiado y limitar la flexibilidad
- No elimina la complejidad, solo la encapsula
- Si necesitas funcionalidad específica, puede que tengas que acceder al subsistema directamente
