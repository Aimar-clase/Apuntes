# Patrón Factory Method (Método de Fábrica)

## ¿Qué es?
El patrón Factory Method define una interfaz para crear objetos, pero permite que las subclases decidan qué clase instanciar. Delega la creación de objetos a métodos especializados.

## ¿Cuándo usarlo?
- Cuando no sabes de antemano los tipos exactos y dependencias de los objetos con los que tu código debería trabajar
- Cuando quieres proporcionar a los usuarios una forma de extender componentes internos
- Cuando quieres ahorrar recursos del sistema reutilizando objetos existentes en lugar de reconstruirlos
- Cuando la creación de objetos es compleja o depende de lógica condicional

## ¿Cómo aplicarlo?
1. Define una interfaz común para todos los productos
2. Crea clases concretas que implementen esa interfaz
3. Crea un método factory que retorne objetos basándose en parámetros
4. El cliente usa el factory sin conocer las clases concretas

## Ejemplo en JavaScript

```javascript
// Interfaz común para todos los vehículos (clase base)
class Vehiculo {
  // Constructor que recibe el tipo de vehículo
  constructor(tipo) {
    this.tipo = tipo; // Guarda el tipo de vehículo
  }

  // Método que debe ser implementado por las subclases
  conducir() {
    throw new Error('Este método debe ser implementado');
  }
}

// Clase concreta: Coche
class Coche extends Vehiculo {
  // Constructor que llama al constructor padre
  constructor() {
    super('Coche'); // Llama al constructor de Vehiculo con el tipo 'Coche'
    this.ruedas = 4; // Propiedad específica de Coche
  }

  // Implementación específica del método conducir
  conducir() {
    return `Conduciendo un ${this.tipo} con ${this.ruedas} ruedas por la carretera`;
  }
}

// Clase concreta: Moto
class Moto extends Vehiculo {
  // Constructor que llama al constructor padre
  constructor() {
    super('Moto'); // Llama al constructor de Vehiculo con el tipo 'Moto'
    this.ruedas = 2; // Propiedad específica de Moto
  }

  // Implementación específica del método conducir
  conducir() {
    return `Conduciendo una ${this.tipo} con ${this.ruedas} ruedas haciendo zigzag`;
  }
}

// Clase concreta: Camión
class Camion extends Vehiculo {
  // Constructor que llama al constructor padre
  constructor() {
    super('Camión'); // Llama al constructor de Vehiculo con el tipo 'Camión'
    this.ruedas = 8; // Propiedad específica de Camión
    this.carga = 1000; // Capacidad de carga en kg
  }

  // Implementación específica del método conducir
  conducir() {
    return `Conduciendo un ${this.tipo} con ${this.ruedas} ruedas, carga máxima: ${this.carga}kg`;
  }
}

// FACTORY: Clase que crea los vehículos
class VehiculoFactory {
  // Método estático que actúa como factory
  static crearVehiculo(tipo) {
    // Switch para determinar qué tipo de vehículo crear
    switch(tipo.toLowerCase()) {
      case 'coche':
        return new Coche(); // Retorna una instancia de Coche
      case 'moto':
        return new Moto(); // Retorna una instancia de Moto
      case 'camion':
        return new Camion(); // Retorna una instancia de Camión
      default:
        // Si el tipo no es válido, lanza un error
        throw new Error(`Tipo de vehículo ${tipo} no reconocido`);
    }
  }
}

// ========== USO DEL PATRÓN ==========

// Crear diferentes vehículos usando el factory
const miCoche = VehiculoFactory.crearVehiculo('coche'); // Crea un coche
console.log(miCoche.conducir()); // "Conduciendo un Coche con 4 ruedas por la carretera"

const miMoto = VehiculoFactory.crearVehiculo('moto'); // Crea una moto
console.log(miMoto.conducir()); // "Conduciendo una Moto con 2 ruedas haciendo zigzag"

const miCamion = VehiculoFactory.crearVehiculo('camion'); // Crea un camión
console.log(miCamion.conducir()); // "Conduciendo un Camión con 8 ruedas, carga máxima: 1000kg"

// El cliente no necesita conocer las clases concretas
// Solo interactúa con el factory y la interfaz común (Vehiculo)
```

## Ventajas
- Evita el acoplamiento entre el creador y los productos concretos
- Principio de responsabilidad única: código de creación en un solo lugar
- Principio abierto/cerrado: puedes agregar nuevos tipos sin romper código existente
- Mayor flexibilidad y facilidad de mantenimiento

## Desventajas
- El código puede volverse más complicado con muchas subclases
- Puede ser excesivo para casos simples
