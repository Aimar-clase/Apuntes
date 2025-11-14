# Patrón Builder (Constructor)

## ¿Qué es?
El patrón Builder permite construir objetos complejos paso a paso. Separa la construcción de un objeto complejo de su representación, permitiendo usar el mismo proceso de construcción para crear diferentes representaciones.

## ¿Cuándo usarlo?
- Cuando un objeto requiere muchos parámetros en el constructor (más de 3-4)
- Cuando quieres crear diferentes representaciones del mismo objeto
- Cuando la construcción del objeto es compleja y tiene múltiples pasos
- Cuando quieres hacer el código más legible evitando constructores con muchos parámetros
- Cuando algunos parámetros son opcionales

## ¿Cómo aplicarlo?
1. Define la clase del objeto complejo que quieres construir
2. Crea una clase Builder con métodos para configurar cada propiedad
3. Cada método del Builder retorna `this` para permitir encadenamiento
4. Incluye un método `build()` que retorna el objeto final
5. El cliente usa el Builder para construir el objeto paso a paso

## Ejemplo en JavaScript

```javascript
// Clase del producto complejo que queremos construir
class Computadora {
  // Constructor que inicializa todas las propiedades como undefined
  constructor() {
    this.cpu = undefined; // Procesador
    this.ram = undefined; // Memoria RAM
    this.almacenamiento = undefined; // Disco duro/SSD
    this.tarjetaGrafica = undefined; // GPU (opcional)
    this.sistemaOperativo = undefined; // OS
    this.teclado = undefined; // Teclado (opcional)
    this.raton = undefined; // Ratón (opcional)
  }

  // Método para mostrar las especificaciones de la computadora
  mostrarEspecificaciones() {
    // Construye una cadena con todas las especificaciones
    let specs = `\n=== Especificaciones de la Computadora ===\n`;
    specs += `CPU: ${this.cpu}\n`; // Muestra el procesador
    specs += `RAM: ${this.ram}GB\n`; // Muestra la memoria RAM
    specs += `Almacenamiento: ${this.almacenamiento}\n`; // Muestra el almacenamiento

    // Solo muestra la tarjeta gráfica si está definida
    if (this.tarjetaGrafica) {
      specs += `Tarjeta Gráfica: ${this.tarjetaGrafica}\n`;
    }

    specs += `Sistema Operativo: ${this.sistemaOperativo}\n`; // Muestra el OS

    // Solo muestra el teclado si está definido
    if (this.teclado) {
      specs += `Teclado: ${this.teclado}\n`;
    }

    // Solo muestra el ratón si está definido
    if (this.raton) {
      specs += `Ratón: ${this.raton}\n`;
    }

    return specs; // Retorna la cadena con las especificaciones
  }
}

// BUILDER: Clase que construye la computadora paso a paso
class ComputadoraBuilder {
  // Constructor que crea una nueva instancia de Computadora
  constructor() {
    this.computadora = new Computadora(); // Inicializa el objeto que se va a construir
  }

  // Método para configurar el CPU
  setCPU(cpu) {
    this.computadora.cpu = cpu; // Asigna el CPU a la computadora
    return this; // Retorna 'this' para permitir encadenamiento de métodos
  }

  // Método para configurar la RAM
  setRAM(ram) {
    this.computadora.ram = ram; // Asigna la RAM a la computadora
    return this; // Retorna 'this' para permitir encadenamiento
  }

  // Método para configurar el almacenamiento
  setAlmacenamiento(almacenamiento) {
    this.computadora.almacenamiento = almacenamiento; // Asigna el almacenamiento
    return this; // Retorna 'this' para permitir encadenamiento
  }

  // Método para configurar la tarjeta gráfica (opcional)
  setTarjetaGrafica(tarjetaGrafica) {
    this.computadora.tarjetaGrafica = tarjetaGrafica; // Asigna la GPU
    return this; // Retorna 'this' para permitir encadenamiento
  }

  // Método para configurar el sistema operativo
  setSistemaOperativo(so) {
    this.computadora.sistemaOperativo = so; // Asigna el sistema operativo
    return this; // Retorna 'this' para permitir encadenamiento
  }

  // Método para configurar el teclado (opcional)
  setTeclado(teclado) {
    this.computadora.teclado = teclado; // Asigna el teclado
    return this; // Retorna 'this' para permitir encadenamiento
  }

  // Método para configurar el ratón (opcional)
  setRaton(raton) {
    this.computadora.raton = raton; // Asigna el ratón
    return this; // Retorna 'this' para permitir encadenamiento
  }

  // Método final que retorna la computadora construida
  build() {
    // Validación: verifica que los componentes obligatorios estén configurados
    if (!this.computadora.cpu || !this.computadora.ram ||
        !this.computadora.almacenamiento || !this.computadora.sistemaOperativo) {
      throw new Error('Faltan componentes obligatorios (CPU, RAM, Almacenamiento, SO)');
    }
    return this.computadora; // Retorna el objeto computadora completo
  }
}

// Director (opcional): clase que define configuraciones predefinidas
class ComputadoraDirector {
  // Método estático para construir una computadora para gaming
  static construirGaming() {
    return new ComputadoraBuilder() // Crea un nuevo builder
      .setCPU('Intel i9-13900K') // Configura un CPU de alto rendimiento
      .setRAM(32) // Configura 32GB de RAM
      .setAlmacenamiento('2TB NVMe SSD') // Configura almacenamiento rápido
      .setTarjetaGrafica('NVIDIA RTX 4090') // Configura una GPU potente
      .setSistemaOperativo('Windows 11 Pro') // Configura el SO
      .setTeclado('Mecánico RGB') // Configura teclado gaming
      .setRaton('Gaming 16000 DPI') // Configura ratón gaming
      .build(); // Construye y retorna la computadora
  }

  // Método estático para construir una computadora de oficina
  static construirOficina() {
    return new ComputadoraBuilder() // Crea un nuevo builder
      .setCPU('Intel i5-12400') // Configura un CPU de gama media
      .setRAM(16) // Configura 16GB de RAM
      .setAlmacenamiento('512GB SSD') // Configura almacenamiento moderado
      .setSistemaOperativo('Windows 11 Home') // Configura el SO
      .setTeclado('Estándar') // Configura teclado básico
      .setRaton('Óptico estándar') // Configura ratón básico
      .build(); // Construye y retorna la computadora
  }
}

// ========== USO DEL PATRÓN ==========

// Construcción manual usando el Builder
console.log('=== Construcción Manual ===');
const computadoraPersonalizada = new ComputadoraBuilder() // Crea un nuevo builder
  .setCPU('AMD Ryzen 9 7950X') // Configura el CPU
  .setRAM(64) // Configura la RAM
  .setAlmacenamiento('4TB SSD + 8TB HDD') // Configura el almacenamiento
  .setTarjetaGrafica('AMD Radeon RX 7900 XTX') // Configura la GPU
  .setSistemaOperativo('Linux Ubuntu 22.04') // Configura el SO
  .build(); // Construye el objeto final

console.log(computadoraPersonalizada.mostrarEspecificaciones()); // Muestra las specs

// Construcción usando el Director (configuraciones predefinidas)
console.log('\n=== Construcción con Director (Gaming) ===');
const pcGaming = ComputadoraDirector.construirGaming(); // Usa configuración predefinida
console.log(pcGaming.mostrarEspecificaciones()); // Muestra las specs

console.log('\n=== Construcción con Director (Oficina) ===');
const pcOficina = ComputadoraDirector.construirOficina(); // Usa configuración predefinida
console.log(pcOficina.mostrarEspecificaciones()); // Muestra las specs

// Ejemplo de construcción mínima (solo componentes obligatorios)
console.log('\n=== Construcción Mínima ===');
const pcBasica = new ComputadoraBuilder() // Crea un nuevo builder
  .setCPU('Intel i3-12100') // Componente obligatorio
  .setRAM(8) // Componente obligatorio
  .setAlmacenamiento('256GB SSD') // Componente obligatorio
  .setSistemaOperativo('Windows 11 Home') // Componente obligatorio
  .build(); // Construye con lo mínimo necesario

console.log(pcBasica.mostrarEspecificaciones()); // Muestra las specs
```

## Ventajas
- Permite construir objetos paso a paso
- Puedes reutilizar el mismo código de construcción para diferentes representaciones
- Principio de responsabilidad única: separa la construcción de la representación
- Código más legible y mantenible
- Facilita la validación de parámetros antes de crear el objeto

## Desventajas
- La complejidad general del código aumenta
- Requiere crear múltiples clases nuevas
- Puede ser excesivo para objetos simples
