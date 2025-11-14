# Patrón Composite (Compuesto)

## ¿Qué es?
El patrón Composite permite componer objetos en estructuras de árbol para representar jerarquías parte-todo. Permite a los clientes tratar objetos individuales y composiciones de objetos de manera uniforme.

## ¿Cuándo usarlo?
- Cuando necesitas implementar una estructura de árbol de objetos
- Cuando quieres que los clientes traten objetos individuales y compuestos de la misma manera
- Cuando tienes una jerarquía de objetos con relaciones parte-todo
- Cuando la estructura puede tener cualquier nivel de complejidad
- Ejemplos: sistemas de archivos, interfaces gráficas (UI), menús, organizaciones empresariales

## ¿Cómo aplicarlo?
1. Define una interfaz común (Component) para objetos simples y compuestos
2. Crea clases Leaf (hojas) que representen objetos terminales sin hijos
3. Crea clases Composite que puedan contener otros componentes (hojas o compuestos)
4. El Composite delega el trabajo a sus componentes hijos
5. El cliente trabaja con todos los objetos a través de la interfaz Component

## Ejemplo en JavaScript

```javascript
// ========== COMPONENTE BASE ==========

// Clase abstracta que define la interfaz común
class ComponenteArchivo {
  // Constructor que recibe el nombre del componente
  constructor(nombre) {
    this.nombre = nombre; // Nombre del archivo o carpeta
  }

  // Método para obtener el nombre
  obtenerNombre() {
    return this.nombre; // Retorna el nombre
  }

  // Método abstracto para obtener tamaño (debe ser implementado)
  obtenerTamaño() {
    throw new Error('Este método debe ser implementado');
  }

  // Método abstracto para mostrar estructura (debe ser implementado)
  mostrar(indentacion = '') {
    throw new Error('Este método debe ser implementado');
  }

  // Métodos para composites (las hojas no los implementan)
  agregar(componente) {
    throw new Error('No se puede agregar a este componente');
  }

  eliminar(componente) {
    throw new Error('No se puede eliminar de este componente');
  }

  obtenerHijos() {
    throw new Error('Este componente no tiene hijos');
  }
}

// ========== HOJAS (LEAF) - Objetos terminales ==========

// Clase Archivo - Representa un archivo individual (hoja del árbol)
class Archivo extends ComponenteArchivo {
  // Constructor que recibe nombre y tamaño del archivo
  constructor(nombre, tamaño) {
    super(nombre); // Llama al constructor padre con el nombre
    this.tamaño = tamaño; // Tamaño del archivo en KB
  }

  // Implementa el método para obtener el tamaño
  obtenerTamaño() {
    return this.tamaño; // Retorna el tamaño del archivo
  }

  // Implementa el método para mostrar el archivo
  mostrar(indentacion = '') {
    // Muestra el archivo con indentación y su tamaño
    console.log(`${indentacion}📄 ${this.nombre} (${this.tamaño} KB)`);
  }
}

// ========== COMPOSITE - Contenedores que pueden tener hijos ==========

// Clase Carpeta - Representa una carpeta que puede contener archivos y otras carpetas
class Carpeta extends ComponenteArchivo {
  // Constructor que recibe el nombre de la carpeta
  constructor(nombre) {
    super(nombre); // Llama al constructor padre con el nombre
    this.hijos = []; // Array para almacenar los componentes hijos
  }

  // Método para agregar un componente hijo (archivo u otra carpeta)
  agregar(componente) {
    this.hijos.push(componente); // Añade el componente al array de hijos
    return this; // Retorna 'this' para permitir encadenamiento
  }

  // Método para eliminar un componente hijo
  eliminar(componente) {
    // Encuentra el índice del componente en el array
    const indice = this.hijos.indexOf(componente);

    // Si lo encuentra, lo elimina
    if (indice !== -1) {
      this.hijos.splice(indice, 1); // Elimina el componente
    }

    return this; // Retorna 'this' para permitir encadenamiento
  }

  // Método para obtener todos los hijos
  obtenerHijos() {
    return this.hijos; // Retorna el array de hijos
  }

  // Implementa el método para obtener el tamaño total
  obtenerTamaño() {
    // Suma el tamaño de todos los hijos recursivamente
    return this.hijos.reduce((total, hijo) => {
      return total + hijo.obtenerTamaño(); // Llama a obtenerTamaño de cada hijo
    }, 0); // Comienza en 0
  }

  // Implementa el método para mostrar la estructura completa
  mostrar(indentacion = '') {
    // Muestra la carpeta con su nombre y tamaño total
    console.log(`${indentacion}📁 ${this.nombre}/ (${this.obtenerTamaño()} KB total)`);

    // Muestra recursivamente todos los hijos con mayor indentación
    this.hijos.forEach(hijo => {
      hijo.mostrar(indentacion + '  '); // Añade 2 espacios de indentación
    });
  }

  // Método adicional para buscar archivos por nombre
  buscar(nombreBuscado) {
    const resultados = []; // Array para almacenar resultados

    // Si esta carpeta coincide con el nombre buscado, se agrega
    if (this.nombre.includes(nombreBuscado)) {
      resultados.push(this);
    }

    // Busca recursivamente en todos los hijos
    this.hijos.forEach(hijo => {
      // Si el hijo es una carpeta, busca recursivamente
      if (hijo instanceof Carpeta) {
        resultados.push(...hijo.buscar(nombreBuscado));
      }
      // Si el hijo es un archivo y coincide, lo agrega
      else if (hijo.nombre.includes(nombreBuscado)) {
        resultados.push(hijo);
      }
    });

    return resultados; // Retorna todos los resultados encontrados
  }

  // Método para contar archivos y carpetas
  obtenerEstadisticas() {
    let stats = {
      archivos: 0, // Contador de archivos
      carpetas: 0, // Contador de carpetas
      tamaño: this.obtenerTamaño() // Tamaño total
    };

    // Recorre todos los hijos
    this.hijos.forEach(hijo => {
      if (hijo instanceof Carpeta) {
        stats.carpetas++; // Incrementa contador de carpetas
        // Obtiene estadísticas recursivas de la subcarpeta
        const subStats = hijo.obtenerEstadisticas();
        stats.archivos += subStats.archivos; // Suma archivos
        stats.carpetas += subStats.carpetas; // Suma subcarpetas
      } else {
        stats.archivos++; // Incrementa contador de archivos
      }
    });

    return stats; // Retorna las estadísticas
  }
}

// ========== USO DEL PATRÓN ==========

console.log('=== SISTEMA DE ARCHIVOS (Patrón Composite) ===\n');

// Crear archivos individuales (HOJAS)
const archivo1 = new Archivo('documento.txt', 50); // Archivo de texto
const archivo2 = new Archivo('foto.jpg', 2048); // Imagen
const archivo3 = new Archivo('musica.mp3', 5120); // Audio
const archivo4 = new Archivo('video.mp4', 10240); // Video
const archivo5 = new Archivo('presentacion.pptx', 3072); // Presentación
const archivo6 = new Archivo('hoja_calculo.xlsx', 1024); // Hoja de cálculo
const archivo7 = new Archivo('codigo.js', 15); // Código fuente
const archivo8 = new Archivo('readme.md', 8); // Documentación

// Crear carpetas (COMPOSITES)
const carpetaDocumentos = new Carpeta('Documentos'); // Carpeta principal
const carpetaImagenes = new Carpeta('Imagenes'); // Subcarpeta
const carpetaMultimedia = new Carpeta('Multimedia'); // Subcarpeta
const carpetaTrabajo = new Carpeta('Trabajo'); // Subcarpeta
const carpetaProyecto = new Carpeta('Proyecto'); // Sub-subcarpeta

// Construir la jerarquía (estructura de árbol)
console.log('--- Construyendo estructura de carpetas ---\n');

// Agregar archivos a carpeta Imágenes
carpetaImagenes.agregar(archivo2); // Agrega foto.jpg

// Agregar archivos a carpeta Multimedia
carpetaMultimedia
  .agregar(archivo3) // Agrega musica.mp3
  .agregar(archivo4); // Agrega video.mp4 (encadenamiento)

// Construir carpeta Proyecto (dentro de Trabajo)
carpetaProyecto
  .agregar(archivo7) // Agrega codigo.js
  .agregar(archivo8); // Agrega readme.md

// Agregar archivos y subcarpetas a carpeta Trabajo
carpetaTrabajo
  .agregar(archivo5) // Agrega presentacion.pptx
  .agregar(archivo6) // Agrega hoja_calculo.xlsx
  .agregar(carpetaProyecto); // Agrega carpeta Proyecto (composite dentro de composite)

// Construir carpeta raíz Documentos
carpetaDocumentos
  .agregar(archivo1) // Agrega documento.txt directamente
  .agregar(carpetaImagenes) // Agrega carpeta Imagenes
  .agregar(carpetaMultimedia) // Agrega carpeta Multimedia
  .agregar(carpetaTrabajo); // Agrega carpeta Trabajo

// Mostrar la estructura completa del árbol
console.log('=== ESTRUCTURA DEL SISTEMA DE ARCHIVOS ===\n');
carpetaDocumentos.mostrar(); // Muestra toda la jerarquía recursivamente

// Obtener tamaño total (operación uniforme en composite)
console.log(`\n=== TAMAÑO TOTAL ===`);
console.log(`Tamaño total: ${carpetaDocumentos.obtenerTamaño()} KB`);

// Obtener estadísticas completas
console.log(`\n=== ESTADÍSTICAS ===`);
const stats = carpetaDocumentos.obtenerEstadisticas();
console.log(`Total de archivos: ${stats.archivos}`);
console.log(`Total de carpetas: ${stats.carpetas}`);
console.log(`Tamaño total: ${stats.tamaño} KB`);

// Buscar archivos por nombre
console.log(`\n=== BUSCAR ARCHIVOS ===`);
const resultados = carpetaDocumentos.buscar('readme');
console.log(`\nResultados de búsqueda para "readme":`);
resultados.forEach(resultado => {
  console.log(`  - Encontrado: ${resultado.nombre}`);
});

// Demostrar que se puede operar sobre cualquier nivel
console.log(`\n=== OPERACIÓN EN SUBNIVEL ===`);
console.log(`\nTamaño de carpeta "Trabajo": ${carpetaTrabajo.obtenerTamaño()} KB`);
carpetaTrabajo.mostrar(); // Muestra solo la subcarpeta Trabajo

// Modificar la estructura (agregar nuevo archivo)
console.log(`\n=== MODIFICAR ESTRUCTURA ===`);
const archivoNuevo = new Archivo('notas.txt', 25);
carpetaTrabajo.agregar(archivoNuevo); // Agrega archivo a subcarpeta
console.log(`\nDespués de agregar notas.txt a Trabajo:`);
carpetaTrabajo.mostrar();

// Eliminar un archivo
console.log(`\n=== ELIMINAR ARCHIVO ===`);
carpetaTrabajo.eliminar(archivo6); // Elimina hoja_calculo.xlsx
console.log(`\nDespués de eliminar hoja_calculo.xlsx:`);
carpetaTrabajo.mostrar();

// Ventajas demostradas
console.log(`\n=== VENTAJAS DEL PATRÓN COMPOSITE ===`);
console.log('✓ Tratas archivos y carpetas de forma uniforme');
console.log('✓ Puedes crear jerarquías de cualquier profundidad');
console.log('✓ Fácil agregar nuevos tipos de componentes');
console.log('✓ El cliente no necesita saber si trabaja con hoja o composite');
console.log('✓ Operaciones recursivas son transparentes (ej: obtenerTamaño)');
```

## Ejemplo 2: Menú de Restaurante

```javascript
// ========== COMPONENTE BASE: ELEMENTO DE MENÚ ==========

class ElementoMenu {
  constructor(nombre, descripcion) {
    this.nombre = nombre;
    this.descripcion = descripcion;
  }

  obtenerPrecio() {
    throw new Error('Método debe ser implementado');
  }

  mostrar(indentacion = '') {
    throw new Error('Método debe ser implementado');
  }
}

// ========== HOJA: PLATO INDIVIDUAL ==========

class Plato extends ElementoMenu {
  constructor(nombre, descripcion, precio) {
    super(nombre, descripcion); // Llama al constructor padre
    this.precio = precio; // Precio del plato
  }

  obtenerPrecio() {
    return this.precio; // Retorna el precio del plato
  }

  mostrar(indentacion = '') {
    // Muestra el plato con su precio
    console.log(`${indentacion}🍽️  ${this.nombre} - ${this.precio}€`);
    console.log(`${indentacion}   ${this.descripcion}`);
  }
}

// ========== COMPOSITE: SECCIÓN DE MENÚ ==========

class SeccionMenu extends ElementoMenu {
  constructor(nombre, descripcion) {
    super(nombre, descripcion); // Llama al constructor padre
    this.elementos = []; // Array de elementos (platos o subsecciones)
  }

  agregar(elemento) {
    this.elementos.push(elemento); // Agrega elemento al menú
    return this;
  }

  eliminar(elemento) {
    const indice = this.elementos.indexOf(elemento);
    if (indice !== -1) {
      this.elementos.splice(indice, 1); // Elimina elemento
    }
    return this;
  }

  obtenerPrecio() {
    // Calcula el precio promedio de todos los elementos
    if (this.elementos.length === 0) return 0;

    const total = this.elementos.reduce((suma, elemento) => {
      return suma + elemento.obtenerPrecio(); // Suma precios recursivamente
    }, 0);

    return total / this.elementos.length; // Retorna promedio
  }

  mostrar(indentacion = '') {
    // Muestra la sección y todos sus elementos
    console.log(`${indentacion}📋 ${this.nombre.toUpperCase()}`);
    console.log(`${indentacion}   ${this.descripcion}`);

    // Muestra cada elemento con mayor indentación
    this.elementos.forEach(elemento => {
      elemento.mostrar(indentacion + '  ');
    });
  }
}

// USO
console.log('\n=== MENÚ DEL RESTAURANTE ===\n');

// Crear platos
const ensalada = new Plato('Ensalada César', 'Lechuga, pollo, crutones', 8.50);
const sopa = new Plato('Sopa del día', 'Crema de verduras', 6.00);

const pasta = new Plato('Pasta Carbonara', 'Con salsa cremosa y bacon', 12.00);
const pizza = new Plato('Pizza Margherita', 'Tomate, mozzarella, albahaca', 10.00);

const tiramisu = new Plato('Tiramisú', 'Postre italiano clásico', 5.50);
const helado = new Plato('Helado artesanal', '3 bolas a elegir', 4.50);

// Crear secciones de menú
const entrantes = new SeccionMenu('Entrantes', 'Para empezar');
entrantes.agregar(ensalada).agregar(sopa);

const principales = new SeccionMenu('Platos Principales', 'Platos fuertes');
principales.agregar(pasta).agregar(pizza);

const postres = new SeccionMenu('Postres', 'Dulces finales');
postres.agregar(tiramisu).agregar(helado);

// Crear menú completo (composite de composites)
const menuCompleto = new SeccionMenu('Menú del Día', 'Especialidades de la casa');
menuCompleto
  .agregar(entrantes)
  .agregar(principales)
  .agregar(postres);

// Mostrar menú completo
menuCompleto.mostrar();
```

## Ventajas
- Puedes trabajar con estructuras de árbol complejas fácilmente
- Principio abierto/cerrado: puedes agregar nuevos tipos de elementos sin romper código existente
- Los clientes tratan objetos simples y compuestos de forma uniforme
- Facilita la recursión y operaciones en toda la jerarquía
- Código más limpio y mantenible para estructuras jerárquicas

## Desventajas
- Puede hacer el diseño demasiado general
- Puede ser difícil restringir los tipos de componentes en un composite
- La jerarquía puede volverse difícil de entender si es muy profunda
- Puede ser excesivo para estructuras simples que no requieren jerarquías
