# Patrón Observer (Observador)

## ¿Qué es?
El patrón Observer define una dependencia uno-a-muchos entre objetos, de modo que cuando un objeto (sujeto) cambia su estado, todos sus dependientes (observadores) son notificados y actualizados automáticamente.

## ¿Cuándo usarlo?
- Cuando cambios en un objeto requieren cambiar otros objetos
- Cuando no sabes cuántos objetos necesitan ser actualizados
- Cuando quieres notificar a múltiples objetos sin acoplarlos fuertemente
- Para implementar sistemas de eventos o suscripciones
- Ejemplos: sistemas de notificaciones, patrones publish-subscribe, event listeners, actualizaciones en tiempo real

## ¿Cómo aplicarlo?
1. Define una interfaz Observer con método `actualizar()`
2. Crea una clase Subject (Observable) que mantiene lista de observers
3. Subject tiene métodos para agregar, eliminar y notificar observers
4. Cuando cambia el estado del Subject, notifica a todos los observers
5. Los observers implementan la lógica de qué hacer cuando son notificados

## Ejemplo en JavaScript

```javascript
// ========== INTERFAZ OBSERVER ==========

// Interfaz base para todos los observadores
class Observer {
  // Método que será llamado cuando el sujeto cambie
  actualizar(datos) {
    throw new Error('Este método debe ser implementado');
  }
}

// ========== SUBJECT (OBSERVABLE) ==========

// Clase que mantiene el estado y notifica a los observadores
class SujetoObservable {
  // Constructor que inicializa la lista de observadores
  constructor() {
    this.observadores = []; // Array de observadores suscritos
  }

  // Método para agregar un observador a la lista
  suscribir(observador) {
    // Verifica que el observador tenga el método actualizar
    if (typeof observador.actualizar !== 'function') {
      throw new Error('El observador debe tener un método actualizar()');
    }

    this.observadores.push(observador); // Agrega el observador a la lista
    console.log(`✓ Observador suscrito (Total: ${this.observadores.length})`);
    return this; // Retorna 'this' para permitir encadenamiento
  }

  // Método para eliminar un observador de la lista
  desuscribir(observador) {
    // Encuentra el índice del observador
    const indice = this.observadores.indexOf(observador);

    // Si lo encuentra, lo elimina
    if (indice !== -1) {
      this.observadores.splice(indice, 1); // Elimina el observador
      console.log(`✓ Observador desuscrito (Total: ${this.observadores.length})`);
    }

    return this; // Retorna 'this' para permitir encadenamiento
  }

  // Método para notificar a todos los observadores
  notificar(datos) {
    console.log(`\n[Notificando a ${this.observadores.length} observadores...]`);

    // Itera sobre todos los observadores y los actualiza
    this.observadores.forEach((observador, indice) => {
      console.log(`  → Notificando observador #${indice + 1}`);
      observador.actualizar(datos); // Llama al método actualizar de cada observador
    });

    console.log('[Notificación completada]\n');
  }
}

// ========== SUBJECT CONCRETO: ESTACIÓN METEOROLÓGICA ==========

// Clase concreta que extiende SujetoObservable
class EstacionMeteorologica extends SujetoObservable {
  // Constructor que inicializa los datos meteorológicos
  constructor() {
    super(); // Llama al constructor padre
    this.temperatura = 0; // Temperatura en grados Celsius
    this.humedad = 0; // Humedad en porcentaje
    this.presion = 0; // Presión atmosférica en hPa
  }

  // Método para obtener las mediciones actuales
  obtenerMediciones() {
    return {
      temperatura: this.temperatura, // Retorna temperatura
      humedad: this.humedad, // Retorna humedad
      presion: this.presion // Retorna presión
    };
  }

  // Método que establece nuevas mediciones y notifica a los observadores
  establecerMediciones(temperatura, humedad, presion) {
    console.log('=== NUEVAS MEDICIONES ===');
    console.log(`Temperatura: ${temperatura}°C`);
    console.log(`Humedad: ${humedad}%`);
    console.log(`Presión: ${presion} hPa`);

    // Actualiza los valores
    this.temperatura = temperatura;
    this.humedad = humedad;
    this.presion = presion;

    // Notifica a todos los observadores del cambio
    this.notificar(this.obtenerMediciones());
  }
}

// ========== OBSERVERS CONCRETOS ==========

// Observer 1: Display de Condiciones Actuales
class DisplayCondicionesActuales extends Observer {
  // Constructor que recibe nombre del display
  constructor(nombre = 'Display Condiciones') {
    super(); // Llama al constructor padre
    this.nombre = nombre; // Nombre del display
  }

  // Implementa el método actualizar
  actualizar(datos) {
    console.log(`\n[${this.nombre}] Actualizando...`);
    console.log(`  🌡️  Temperatura: ${datos.temperatura}°C`);
    console.log(`  💧 Humedad: ${datos.humedad}%`);
    console.log(`  📊 Presión: ${datos.presion} hPa`);
  }
}

// Observer 2: Display de Estadísticas
class DisplayEstadisticas extends Observer {
  // Constructor que inicializa estadísticas
  constructor() {
    super(); // Llama al constructor padre
    this.temperaturas = []; // Historial de temperaturas
    this.nombre = 'Display Estadísticas';
  }

  // Implementa el método actualizar
  actualizar(datos) {
    // Agrega la nueva temperatura al historial
    this.temperaturas.push(datos.temperatura);

    // Calcula estadísticas
    const max = Math.max(...this.temperaturas); // Temperatura máxima
    const min = Math.min(...this.temperaturas); // Temperatura mínima
    const promedio = this.temperaturas.reduce((a, b) => a + b, 0) / this.temperaturas.length; // Promedio

    console.log(`\n[${this.nombre}] Actualizando...`);
    console.log(`  📈 Temperatura máxima: ${max.toFixed(1)}°C`);
    console.log(`  📉 Temperatura mínima: ${min.toFixed(1)}°C`);
    console.log(`  📊 Temperatura promedio: ${promedio.toFixed(1)}°C`);
    console.log(`  📝 Total de mediciones: ${this.temperaturas.length}`);
  }
}

// Observer 3: Sistema de Alertas
class SistemaAlertas extends Observer {
  // Constructor que define umbrales de alerta
  constructor() {
    super(); // Llama al constructor padre
    this.nombre = 'Sistema de Alertas';
    this.umbralTemperaturaAlta = 35; // Temperatura alta (°C)
    this.umbralTemperaturaBaja = 0; // Temperatura baja (°C)
    this.umbralHumedadAlta = 80; // Humedad alta (%)
  }

  // Implementa el método actualizar
  actualizar(datos) {
    console.log(`\n[${this.nombre}] Verificando condiciones...`);

    const alertas = []; // Array para almacenar alertas

    // Verifica temperatura alta
    if (datos.temperatura > this.umbralTemperaturaAlta) {
      alertas.push(`⚠️  ALERTA: Temperatura muy alta (${datos.temperatura}°C)`);
    }

    // Verifica temperatura baja
    if (datos.temperatura < this.umbralTemperaturaBaja) {
      alertas.push(`⚠️  ALERTA: Riesgo de heladas (${datos.temperatura}°C)`);
    }

    // Verifica humedad alta
    if (datos.humedad > this.umbralHumedadAlta) {
      alertas.push(`⚠️  ALERTA: Humedad muy alta (${datos.humedad}%)`);
    }

    // Muestra alertas o mensaje de condiciones normales
    if (alertas.length > 0) {
      alertas.forEach(alerta => console.log(`  ${alerta}`));
    } else {
      console.log(`  ✓ Condiciones normales`);
    }
  }
}

// Observer 4: Registro en Base de Datos (simulado)
class RegistroBaseDatos extends Observer {
  // Constructor que inicializa el registro
  constructor() {
    super(); // Llama al constructor padre
    this.nombre = 'Registro BD';
    this.registros = []; // Simula registros en BD
  }

  // Implementa el método actualizar
  actualizar(datos) {
    // Crea un registro con timestamp
    const registro = {
      ...datos, // Copia todos los datos
      timestamp: new Date().toISOString() // Añade marca de tiempo
    };

    // Guarda el registro (simulado)
    this.registros.push(registro);

    console.log(`\n[${this.nombre}] Guardando en base de datos...`);
    console.log(`  💾 Registro guardado (Total: ${this.registros.length})`);
  }

  // Método adicional para obtener todos los registros
  obtenerRegistros() {
    return this.registros; // Retorna todos los registros
  }
}

// Observer 5: Notificador por Email (simulado)
class NotificadorEmail extends Observer {
  // Constructor que recibe email del destinatario
  constructor(email) {
    super(); // Llama al constructor padre
    this.nombre = 'Notificador Email';
    this.email = email; // Email del usuario
    this.umbralCambio = 5; // Solo notifica si hay cambio significativo
    this.ultimaTemperatura = null; // Última temperatura notificada
  }

  // Implementa el método actualizar
  actualizar(datos) {
    // Solo envía email si hay cambio significativo
    if (this.ultimaTemperatura === null ||
        Math.abs(datos.temperatura - this.ultimaTemperatura) >= this.umbralCambio) {

      console.log(`\n[${this.nombre}] Enviando email...`);
      console.log(`  📧 Para: ${this.email}`);
      console.log(`  📝 Asunto: Cambio significativo en temperatura`);
      console.log(`  📄 Mensaje: La temperatura cambió a ${datos.temperatura}°C`);

      this.ultimaTemperatura = datos.temperatura; // Actualiza última temperatura
    } else {
      console.log(`\n[${this.nombre}] Cambio no significativo, no se envía email`);
    }
  }
}

// ========== USO DEL PATRÓN ==========

console.log('=== SISTEMA DE MONITOREO METEOROLÓGICO ===\n');

// Crear el sujeto observable (estación meteorológica)
const estacion = new EstacionMeteorologica();

// Crear observadores
const displayActual = new DisplayCondicionesActuales();
const displayStats = new DisplayEstadisticas();
const alertas = new SistemaAlertas();
const baseDatos = new RegistroBaseDatos();
const notificadorEmail = new NotificadorEmail('usuario@example.com');

// Suscribir observadores a la estación
console.log('--- Suscribiendo observadores ---');
estacion
  .suscribir(displayActual)
  .suscribir(displayStats)
  .suscribir(alertas)
  .suscribir(baseDatos)
  .suscribir(notificadorEmail);

// Simular cambios en las mediciones
console.log('\n--- Medición 1 ---');
estacion.establecerMediciones(22, 65, 1013);

console.log('\n\n--- Medición 2 ---');
estacion.establecerMediciones(25, 70, 1012);

console.log('\n\n--- Medición 3 (Temperatura alta) ---');
estacion.establecerMediciones(38, 85, 1008);

console.log('\n\n--- Medición 4 ---');
estacion.establecerMediciones(18, 60, 1015);

// Desuscribir un observador
console.log('\n--- Desuscribiendo notificador de email ---');
estacion.desuscribir(notificadorEmail);

console.log('\n--- Medición 5 (sin notificador email) ---');
estacion.establecerMediciones(20, 68, 1014);

// Mostrar registros guardados
console.log('\n=== REGISTROS EN BASE DE DATOS ===');
console.log(baseDatos.obtenerRegistros());

console.log('\n=== VENTAJAS DEL PATRÓN OBSERVER ===');
console.log('✓ Desacoplamiento entre sujeto y observadores');
console.log('✓ Puedes agregar/eliminar observadores en tiempo de ejecución');
console.log('✓ El sujeto no necesita conocer los detalles de los observadores');
console.log('✓ Fácil añadir nuevos observadores sin modificar el sujeto');
console.log('✓ Principio abierto/cerrado');
```

## Ejemplo Adicional: Sistema de Notificaciones

```javascript
// Sistema simple de notificaciones
class CanalNoticias extends SujetoObservable {
  constructor(nombre) {
    super();
    this.nombre = nombre; // Nombre del canal
  }

  publicarNoticia(noticia) {
    console.log(`\n📰 [${this.nombre}] Nueva noticia publicada:`);
    console.log(`"${noticia}"`);
    this.notificar({canal: this.nombre, noticia: noticia}); // Notifica a suscriptores
  }
}

class Suscriptor extends Observer {
  constructor(nombre) {
    super();
    this.nombre = nombre; // Nombre del suscriptor
  }

  actualizar(datos) {
    console.log(`  → ${this.nombre} recibió: "${datos.noticia}"`);
  }
}

// Uso
const canalDeportes = new CanalNoticias('Deportes');
const usuario1 = new Suscriptor('Juan');
const usuario2 = new Suscriptor('María');

canalDeportes.suscribir(usuario1).suscribir(usuario2);
canalDeportes.publicarNoticia('¡El equipo local ganó el campeonato!');
```

## Ventajas
- Principio abierto/cerrado: puedes añadir nuevos observadores sin modificar el sujeto
- Establece relaciones entre objetos en tiempo de ejecución
- Desacoplamiento entre emisor y receptores
- Implementa comunicación broadcast
- Fácil de extender y mantener

## Desventajas
- Los observadores son notificados en orden aleatorio
- Puede causar actualizaciones en cascada inesperadas
- Posibles problemas de rendimiento con muchos observadores
- Puede ser difícil debuggear el flujo de notificaciones
- Memory leaks si no se desuscriben correctamente los observadores
