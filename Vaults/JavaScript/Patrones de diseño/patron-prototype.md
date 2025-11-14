# Patrón Prototype (Prototipo)

## ¿Qué es?
El patrón Prototype permite copiar objetos existentes sin que el código dependa de sus clases. Delega el proceso de clonación a los propios objetos que están siendo clonados.

## ¿Cuándo usarlo?
- Cuando tu código no debe depender de las clases concretas de objetos que necesitas copiar
- Cuando quieres reducir el número de subclases que solo difieren en la forma de inicializar sus objetos
- Cuando la creación de un objeto es costosa (en tiempo o recursos)
- Cuando necesitas copiar objetos sin conocer sus tipos concretos
- Cuando quieres evitar constructores complejos

## ¿Cómo aplicarlo?
1. Declara una interfaz común con un método `clone()`
2. Las clases concretas implementan el método `clone()`
3. El método `clone()` crea una copia del objeto actual
4. Puedes mantener un registro de prototipos predefinidos
5. El cliente clona prototipos en lugar de crear objetos nuevos

## Ejemplo en JavaScript

```javascript
// Clase base que define el método de clonación
class Personaje {
  // Constructor que inicializa las propiedades básicas del personaje
  constructor(nombre, nivel, vida, mana) {
    this.nombre = nombre; // Nombre del personaje
    this.nivel = nivel; // Nivel del personaje
    this.vida = vida; // Puntos de vida
    this.mana = mana; // Puntos de mana
    this.habilidades = []; // Array de habilidades
    this.equipamiento = {}; // Objeto con el equipamiento
  }

  // Método para agregar una habilidad al personaje
  agregarHabilidad(habilidad) {
    this.habilidades.push(habilidad); // Añade la habilidad al array
    return this; // Retorna 'this' para permitir encadenamiento
  }

  // Método para equipar un item
  equipar(tipo, item) {
    this.equipamiento[tipo] = item; // Asigna el item al tipo de equipamiento
    return this; // Retorna 'this' para permitir encadenamiento
  }

  // MÉTODO CLAVE: Clone - crea una copia del objeto
  clone() {
    // Crea una nueva instancia con los mismos valores básicos
    const clonado = new this.constructor(
      this.nombre, // Copia el nombre
      this.nivel, // Copia el nivel
      this.vida, // Copia los puntos de vida
      this.mana // Copia los puntos de mana
    );

    // Copia profunda del array de habilidades
    // Usamos map para crear un nuevo array con copias de los objetos
    clonado.habilidades = this.habilidades.map(hab => ({...hab}));

    // Copia profunda del equipamiento
    // Usamos Object.assign para crear un nuevo objeto con las mismas propiedades
    clonado.equipamiento = Object.assign({}, this.equipamiento);

    return clonado; // Retorna el objeto clonado
  }

  // Método para mostrar información del personaje
  mostrarInfo() {
    // Construye una cadena con la información del personaje
    let info = `\n=== ${this.nombre} ===\n`;
    info += `Nivel: ${this.nivel}\n`; // Muestra el nivel
    info += `Vida: ${this.vida} | Mana: ${this.mana}\n`; // Muestra vida y mana

    // Muestra las habilidades si existen
    if (this.habilidades.length > 0) {
      info += `Habilidades: ${this.habilidades.map(h => h.nombre).join(', ')}\n`;
    }

    // Muestra el equipamiento si existe
    if (Object.keys(this.equipamiento).length > 0) {
      info += `Equipamiento: ${JSON.stringify(this.equipamiento)}\n`;
    }

    return info; // Retorna la cadena de información
  }
}

// Subclase: Guerrero
class Guerrero extends Personaje {
  // Constructor que llama al constructor padre con valores específicos
  constructor(nombre) {
    super(nombre, 1, 150, 50); // Llama al constructor padre
    this.clase = 'Guerrero'; // Define la clase del personaje
    this.fuerza = 20; // Atributo específico del guerrero
  }

  // Sobrescribe el método clone para incluir propiedades específicas
  clone() {
    const clonado = super.clone(); // Llama al método clone del padre
    clonado.clase = this.clase; // Copia la clase
    clonado.fuerza = this.fuerza; // Copia la fuerza
    return clonado; // Retorna el objeto clonado completo
  }
}

// Subclase: Mago
class Mago extends Personaje {
  // Constructor que llama al constructor padre con valores específicos
  constructor(nombre) {
    super(nombre, 1, 80, 200); // Llama al constructor padre
    this.clase = 'Mago'; // Define la clase del personaje
    this.inteligencia = 25; // Atributo específico del mago
  }

  // Sobrescribe el método clone para incluir propiedades específicas
  clone() {
    const clonado = super.clone(); // Llama al método clone del padre
    clonado.clase = this.clase; // Copia la clase
    clonado.inteligencia = this.inteligencia; // Copia la inteligencia
    return clonado; // Retorna el objeto clonado completo
  }
}

// Subclase: Arquero
class Arquero extends Personaje {
  // Constructor que llama al constructor padre con valores específicos
  constructor(nombre) {
    super(nombre, 1, 100, 100); // Llama al constructor padre
    this.clase = 'Arquero'; // Define la clase del personaje
    this.agilidad = 22; // Atributo específico del arquero
  }

  // Sobrescribe el método clone para incluir propiedades específicas
  clone() {
    const clonado = super.clone(); // Llama al método clone del padre
    clonado.clase = this.clase; // Copia la clase
    clonado.agilidad = this.agilidad; // Copia la agilidad
    return clonado; // Retorna el objeto clonado completo
  }
}

// Registro de Prototipos: almacena prototipos predefinidos
class RegistroPersonajes {
  // Constructor que inicializa el registro vacío
  constructor() {
    this.prototipos = {}; // Objeto para almacenar los prototipos
  }

  // Método para registrar un prototipo con un identificador
  registrar(id, prototipo) {
    this.prototipos[id] = prototipo; // Guarda el prototipo en el registro
  }

  // Método para obtener una copia de un prototipo registrado
  obtener(id) {
    // Busca el prototipo en el registro
    const prototipo = this.prototipos[id];

    // Si no existe, lanza un error
    if (!prototipo) {
      throw new Error(`Prototipo ${id} no encontrado`);
    }

    return prototipo.clone(); // Retorna una copia del prototipo
  }
}

// ========== USO DEL PATRÓN ==========

console.log('=== Creación de Prototipos Base ===');

// Crear prototipos base configurados
const guerreroBase = new Guerrero('Plantilla Guerrero'); // Crea un guerrero base
guerreroBase // Configura el guerrero base
  .agregarHabilidad({nombre: 'Golpe Poderoso', daño: 50}) // Añade habilidad
  .agregarHabilidad({nombre: 'Escudo Defensivo', defensa: 30}) // Añade habilidad
  .equipar('arma', 'Espada de Hierro') // Equipa arma
  .equipar('armadura', 'Armadura de Placas'); // Equipa armadura

const magoBase = new Mago('Plantilla Mago'); // Crea un mago base
magoBase // Configura el mago base
  .agregarHabilidad({nombre: 'Bola de Fuego', daño: 80}) // Añade habilidad
  .agregarHabilidad({nombre: 'Escudo Mágico', defensa: 20}) // Añade habilidad
  .equipar('arma', 'Varita Mágica') // Equipa arma
  .equipar('armadura', 'Túnica Encantada'); // Equipa armadura

console.log('=== Registro de Prototipos ===');
// Crear registro y guardar prototipos
const registro = new RegistroPersonajes(); // Crea el registro
registro.registrar('guerrero-inicial', guerreroBase); // Registra guerrero base
registro.registrar('mago-inicial', magoBase); // Registra mago base

console.log('=== Clonación de Personajes ===');

// Obtener copias de los prototipos (clonación)
const jugador1 = registro.obtener('guerrero-inicial'); // Clona el guerrero
jugador1.nombre = 'Arthas'; // Cambia el nombre del clon
jugador1.nivel = 5; // Cambia el nivel del clon

const jugador2 = registro.obtener('mago-inicial'); // Clona el mago
jugador2.nombre = 'Merlin'; // Cambia el nombre del clon
jugador2.nivel = 7; // Cambia el nivel del clon
jugador2.agregarHabilidad({nombre: 'Teletransporte', costo: 50}); // Añade habilidad

const jugador3 = registro.obtener('guerrero-inicial'); // Clona otro guerrero
jugador3.nombre = 'Conan'; // Cambia el nombre del clon
jugador3.equipar('arma', 'Hacha de Batalla'); // Cambia el arma del clon

// Mostrar información de todos los personajes
console.log(guerreroBase.mostrarInfo()); // Muestra el prototipo original
console.log(jugador1.mostrarInfo()); // Muestra el primer clon
console.log(magoBase.mostrarInfo()); // Muestra el prototipo original
console.log(jugador2.mostrarInfo()); // Muestra el segundo clon
console.log(jugador3.mostrarInfo()); // Muestra el tercer clon

console.log('=== Verificación de Independencia ===');
// Los cambios en los clones no afectan a los prototipos
console.log('¿jugador1 es el mismo objeto que guerreroBase?', jugador1 === guerreroBase); // false
console.log('¿jugador3 es el mismo objeto que guerreroBase?', jugador3 === guerreroBase); // false
console.log('¿jugador1 es el mismo objeto que jugador3?', jugador1 === jugador3); // false
```

## Ventajas
- Puedes clonar objetos sin acoplarte a sus clases concretas
- Puedes deshacerte de código de inicialización repetido
- Produces objetos complejos más convenientemente
- Alternativa a la herencia cuando trabajas con configuraciones predefinidas
- Mejor rendimiento cuando la creación de objetos es costosa

## Desventajas
- Clonar objetos complejos con referencias circulares puede ser complicado
- Puede ser difícil implementar la clonación profunda correctamente
- En JavaScript, a veces el spread operator ({...obj}) es suficiente
