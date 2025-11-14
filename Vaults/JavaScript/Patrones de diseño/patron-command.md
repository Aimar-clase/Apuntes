# Patrón Command (Comando)

## ¿Qué es?
El patrón Command convierte una solicitud en un objeto independiente que contiene toda la información sobre la solicitud. Esta transformación permite parametrizar métodos con diferentes solicitudes, retrasar o poner en cola la ejecución de una solicitud y soportar operaciones reversibles (undo).

## ¿Cuándo usarlo?
- Cuando quieres parametrizar objetos con operaciones
- Cuando quieres poner operaciones en cola, programarlas o ejecutarlas remotamente
- Cuando quieres implementar operaciones reversibles (undo/redo)
- Cuando quieres mantener un historial de comandos ejecutados
- Cuando quieres desacoplar el objeto que invoca la operación del que sabe cómo realizarla
- Para implementar sistemas de transacciones

## ¿Cómo aplicarlo?
1. Declara una interfaz Command con un método `ejecutar()`
2. Crea clases comando concretas que implementen la interfaz
3. Los comandos encapsulan una solicitud y guardan referencia al receptor
4. El invoker (invocador) dispara comandos en lugar de enviar solicitudes directamente
5. El cliente crea y configura comandos concretos
6. Opcionalmente, implementa `deshacer()` para operaciones reversibles

## Ejemplo en JavaScript

```javascript
// ========== INTERFAZ COMANDO ==========

// Interfaz base para todos los comandos
class Comando {
  // Método para ejecutar el comando
  ejecutar() {
    throw new Error('Este método debe ser implementado');
  }

  // Método para deshacer el comando (opcional)
  deshacer() {
    throw new Error('Este método debe ser implementado');
  }
}

// ========== RECEPTORES ==========

// Receptor 1: Editor de Texto
class EditorTexto {
  // Constructor que inicializa el contenido
  constructor() {
    this.contenido = ''; // Contenido del editor
    this.seleccion = ''; // Texto seleccionado
    this.portapapeles = ''; // Contenido del portapapeles
  }

  // Método para escribir texto
  escribir(texto) {
    this.contenido += texto; // Añade el texto al contenido
    console.log(`[Editor] Texto escrito: "${texto}"`);
    console.log(`[Editor] Contenido actual: "${this.contenido}"`);
  }

  // Método para borrar texto
  borrar(cantidad) {
    const textoEliminado = this.contenido.slice(-cantidad); // Guarda el texto que se va a borrar
    this.contenido = this.contenido.slice(0, -cantidad); // Elimina los últimos n caracteres
    console.log(`[Editor] Borrados ${cantidad} caracteres`);
    console.log(`[Editor] Contenido actual: "${this.contenido}"`);
    return textoEliminado; // Retorna el texto eliminado (para undo)
  }

  // Método para seleccionar texto
  seleccionar(inicio, fin) {
    this.seleccion = this.contenido.substring(inicio, fin); // Extrae el texto seleccionado
    console.log(`[Editor] Texto seleccionado: "${this.seleccion}"`);
  }

  // Método para copiar al portapapeles
  copiar() {
    this.portapapeles = this.seleccion; // Copia la selección al portapapeles
    console.log(`[Editor] Copiado al portapapeles: "${this.portapapeles}"`);
  }

  // Método para pegar desde el portapapeles
  pegar() {
    this.contenido += this.portapapeles; // Añade el contenido del portapapeles
    console.log(`[Editor] Pegado desde portapapeles: "${this.portapapeles}"`);
    console.log(`[Editor] Contenido actual: "${this.contenido}"`);
  }

  // Método para obtener el contenido actual
  obtenerContenido() {
    return this.contenido; // Retorna el contenido
  }
}

// ========== COMANDOS CONCRETOS ==========

// Comando: Escribir Texto
class ComandoEscribir extends Comando {
  // Constructor que recibe el receptor y el texto a escribir
  constructor(editor, texto) {
    super(); // Llama al constructor padre
    this.editor = editor; // Referencia al editor (receptor)
    this.texto = texto; // Texto a escribir
  }

  // Ejecuta el comando de escribir
  ejecutar() {
    this.editor.escribir(this.texto); // Delega al receptor
  }

  // Deshace el comando de escribir
  deshacer() {
    // Para deshacer, borra la cantidad de caracteres que se escribieron
    this.editor.borrar(this.texto.length);
    console.log(`[Comando] Deshecho: escritura de "${this.texto}"`);
  }
}

// Comando: Borrar Texto
class ComandoBorrar extends Comando {
  // Constructor que recibe el receptor y la cantidad a borrar
  constructor(editor, cantidad) {
    super(); // Llama al constructor padre
    this.editor = editor; // Referencia al editor
    this.cantidad = cantidad; // Cantidad de caracteres a borrar
    this.textoBorrado = ''; // Guarda el texto borrado (para undo)
  }

  // Ejecuta el comando de borrar
  ejecutar() {
    // Guarda el texto borrado para poder deshacerlo
    this.textoBorrado = this.editor.borrar(this.cantidad);
  }

  // Deshace el comando de borrar
  deshacer() {
    // Para deshacer, vuelve a escribir el texto que se borró
    this.editor.escribir(this.textoBorrado);
    console.log(`[Comando] Deshecho: borrado, restaurado "${this.textoBorrado}"`);
  }
}

// Comando: Copiar
class ComandoCopiar extends Comando {
  // Constructor que recibe el receptor, inicio y fin de selección
  constructor(editor, inicio, fin) {
    super(); // Llama al constructor padre
    this.editor = editor; // Referencia al editor
    this.inicio = inicio; // Posición inicial
    this.fin = fin; // Posición final
  }

  // Ejecuta el comando de copiar
  ejecutar() {
    this.editor.seleccionar(this.inicio, this.fin); // Selecciona el texto
    this.editor.copiar(); // Copia al portapapeles
  }

  // Copiar no necesita deshacer (no modifica el contenido)
  deshacer() {
    console.log('[Comando] Copiar no requiere deshacer');
  }
}

// Comando: Pegar
class ComandoPegar extends Comando {
  // Constructor que recibe el receptor
  constructor(editor) {
    super(); // Llama al constructor padre
    this.editor = editor; // Referencia al editor
    this.textoPegado = ''; // Guarda qué se pegó (para undo)
  }

  // Ejecuta el comando de pegar
  ejecutar() {
    // Guarda el texto del portapapeles antes de pegar
    this.textoPegado = this.editor.portapapeles;
    this.editor.pegar(); // Delega al receptor
  }

  // Deshace el comando de pegar
  deshacer() {
    // Para deshacer, borra lo que se pegó
    this.editor.borrar(this.textoPegado.length);
    console.log(`[Comando] Deshecho: pegado de "${this.textoPegado}"`);
  }
}

// Comando Macro: Ejecuta múltiples comandos
class ComandoMacro extends Comando {
  // Constructor que recibe una lista de comandos
  constructor(comandos = []) {
    super(); // Llama al constructor padre
    this.comandos = comandos; // Array de comandos
  }

  // Agrega un comando a la macro
  agregarComando(comando) {
    this.comandos.push(comando); // Añade al array
    return this; // Permite encadenamiento
  }

  // Ejecuta todos los comandos en secuencia
  ejecutar() {
    console.log('\n[Macro] Ejecutando macro con múltiples comandos...');
    this.comandos.forEach((comando, index) => {
      console.log(`  → Comando ${index + 1}:`);
      comando.ejecutar(); // Ejecuta cada comando
    });
    console.log('[Macro] Macro completada\n');
  }

  // Deshace todos los comandos en orden inverso
  deshacer() {
    console.log('\n[Macro] Deshaciendo macro...');
    // Recorre los comandos en orden inverso
    for (let i = this.comandos.length - 1; i >= 0; i--) {
      console.log(`  → Deshaciendo comando ${i + 1}:`);
      this.comandos[i].deshacer(); // Deshace cada comando
    }
    console.log('[Macro] Macro deshecha\n');
  }
}

// ========== INVOCADOR ==========

// Invocador: Gestor de Comandos con soporte de Undo/Redo
class GestorComandos {
  // Constructor que inicializa los historiales
  constructor() {
    this.historialComandos = []; // Comandos ejecutados
    this.historialDeshacer = []; // Comandos deshechos (para redo)
  }

  // Ejecuta un comando y lo añade al historial
  ejecutarComando(comando) {
    // Verifica que sea un comando válido
    if (!(comando instanceof Comando)) {
      throw new Error('Debe ser una instancia de Comando');
    }

    comando.ejecutar(); // Ejecuta el comando

    // Añade al historial de comandos
    this.historialComandos.push(comando);

    // Limpiar el historial de redo cuando se ejecuta un nuevo comando
    this.historialDeshacer = [];

    console.log(`[Gestor] Comando ejecutado (Historial: ${this.historialComandos.length})\n`);
  }

  // Deshace el último comando
  deshacer() {
    // Verifica que haya comandos para deshacer
    if (this.historialComandos.length === 0) {
      console.log('[Gestor] No hay comandos para deshacer\n');
      return;
    }

    // Obtiene el último comando del historial
    const comando = this.historialComandos.pop();

    console.log('[Gestor] Deshaciendo último comando...');
    comando.deshacer(); // Deshace el comando

    // Mueve el comando al historial de deshacer (para redo)
    this.historialDeshacer.push(comando);

    console.log(`[Gestor] Comando deshecho (Historial: ${this.historialComandos.length})\n`);
  }

  // Rehace el último comando deshecho
  rehacer() {
    // Verifica que haya comandos para rehacer
    if (this.historialDeshacer.length === 0) {
      console.log('[Gestor] No hay comandos para rehacer\n');
      return;
    }

    // Obtiene el último comando deshecho
    const comando = this.historialDeshacer.pop();

    console.log('[Gestor] Rehaciendo comando...');
    comando.ejecutar(); // Vuelve a ejecutar el comando

    // Mueve el comando de vuelta al historial principal
    this.historialComandos.push(comando);

    console.log(`[Gestor] Comando rehecho (Historial: ${this.historialComandos.length})\n`);
  }

  // Muestra el historial de comandos
  mostrarHistorial() {
    console.log('\n=== HISTORIAL DE COMANDOS ===');

    if (this.historialComandos.length === 0) {
      console.log('(Vacío)');
    } else {
      this.historialComandos.forEach((comando, index) => {
        console.log(`${index + 1}. ${comando.constructor.name}`);
      });
    }

    console.log(`\nTotal: ${this.historialComandos.length} comandos\n`);
  }
}

// ========== USO DEL PATRÓN ==========

console.log('=== EDITOR DE TEXTO CON COMANDOS ===\n');

// Crear el receptor (editor)
const editor = new EditorTexto();

// Crear el invocador (gestor de comandos)
const gestor = new GestorComandos();

// ========== ESCENARIO 1: Escribir y deshacer ==========
console.log('--- ESCENARIO 1: Escribir texto ---');

const cmd1 = new ComandoEscribir(editor, 'Hola ');
const cmd2 = new ComandoEscribir(editor, 'mundo');

gestor.ejecutarComando(cmd1); // Ejecuta: escribe "Hola "
gestor.ejecutarComando(cmd2); // Ejecuta: escribe "mundo"

console.log('--- Deshaciendo último comando ---');
gestor.deshacer(); // Deshace: elimina "mundo"

console.log('--- Rehaciendo comando ---');
gestor.rehacer(); // Rehace: vuelve a escribir "mundo"

// ========== ESCENARIO 2: Copiar y pegar ==========
console.log('\n--- ESCENARIO 2: Copiar y pegar ---');

const cmd3 = new ComandoCopiar(editor, 0, 5); // Copia "Hola "
gestor.ejecutarComando(cmd3);

const cmd4 = new ComandoPegar(editor); // Pega "Hola "
gestor.ejecutarComando(cmd4);

// ========== ESCENARIO 3: Borrar ==========
console.log('--- ESCENARIO 3: Borrar texto ---');

const cmd5 = new ComandoBorrar(editor, 5); // Borra 5 caracteres
gestor.ejecutarComando(cmd5);

console.log('--- Deshaciendo borrado ---');
gestor.deshacer(); // Deshace: restaura los 5 caracteres

// ========== ESCENARIO 4: Comando Macro ==========
console.log('--- ESCENARIO 4: Comando Macro ---');

// Crear una macro que hace múltiples operaciones
const macro = new ComandoMacro();
macro
  .agregarComando(new ComandoEscribir(editor, '!'))
  .agregarComando(new ComandoEscribir(editor, '!'))
  .agregarComando(new ComandoEscribir(editor, '!'));

gestor.ejecutarComando(macro); // Ejecuta la macro

console.log('--- Deshaciendo macro ---');
gestor.deshacer(); // Deshace toda la macro

// Mostrar historial
gestor.mostrarHistorial();

// ========== ESCENARIO 5: Múltiples Undo ==========
console.log('--- ESCENARIO 5: Múltiples deshacer ---');

gestor.ejecutarComando(new ComandoEscribir(editor, ' JavaScript'));
gestor.ejecutarComando(new ComandoEscribir(editor, ' es'));
gestor.ejecutarComando(new ComandoEscribir(editor, ' genial'));

console.log(`\nContenido antes de deshacer: "${editor.obtenerContenido()}"`);

// Deshacer los últimos 3 comandos
gestor.deshacer();
gestor.deshacer();
gestor.deshacer();

console.log(`Contenido después de deshacer: "${editor.obtenerContenido()}"`);

// Mostrar historial final
gestor.mostrarHistorial();

console.log('\n=== VENTAJAS DEL PATRÓN COMMAND ===');
console.log('✓ Desacopla el objeto que invoca de quien ejecuta');
console.log('✓ Puedes crear nuevos comandos sin cambiar código existente');
console.log('✓ Puedes implementar undo/redo fácilmente');
console.log('✓ Puedes ensamblar comandos complejos desde simples (macros)');
console.log('✓ Principio abierto/cerrado');
console.log('✓ Puedes poner comandos en cola para ejecución diferida');
console.log('✓ Historial de operaciones automático');
```

## Ejemplo Adicional: Control Remoto

```javascript
// Receptores
class Luz {
  encender() { console.log('💡 Luz encendida'); }
  apagar() { console.log('💡 Luz apagada'); }
}

class Television {
  encender() { console.log('📺 TV encendida'); }
  apagar() { console.log('📺 TV apagada'); }
  cambiarCanal(canal) { console.log(`📺 Canal: ${canal}`); }
}

// Comandos
class ComandoEncenderLuz extends Comando {
  constructor(luz) {
    super();
    this.luz = luz;
  }
  ejecutar() { this.luz.encender(); }
  deshacer() { this.luz.apagar(); }
}

class ComandoEncenderTV extends Comando {
  constructor(tv) {
    super();
    this.tv = tv;
  }
  ejecutar() { this.tv.encender(); }
  deshacer() { this.tv.apagar(); }
}

// Control Remoto (Invocador)
class ControlRemoto {
  constructor() {
    this.botones = {}; // Mapeo de botones a comandos
  }

  asignarBoton(numero, comando) {
    this.botones[numero] = comando; // Asigna comando a botón
  }

  presionarBoton(numero) {
    if (this.botones[numero]) {
      this.botones[numero].ejecutar(); // Ejecuta el comando del botón
    }
  }
}

// Uso
const luz = new Luz();
const tv = new Television();
const control = new ControlRemoto();

control.asignarBoton(1, new ComandoEncenderLuz(luz));
control.asignarBoton(2, new ComandoEncenderTV(tv));

control.presionarBoton(1); // Enciende luz
control.presionarBoton(2); // Enciende TV
```

## Ventajas
- Principio de responsabilidad única: desacopla invocación de ejecución
- Principio abierto/cerrado: nuevos comandos sin modificar código existente
- Puedes implementar undo/redo fácilmente
- Puedes implementar ejecución diferida de operaciones
- Puedes ensamblar comandos complejos desde simples
- Facilita el logging y auditoría de operaciones

## Desventajas
- El código puede volverse más complicado con muchas clases de comando
- Puede ser excesivo para operaciones simples
- Aumenta el número de clases en el sistema
