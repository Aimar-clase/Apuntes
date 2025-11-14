# Patrón Proxy (Representante)

## ¿Qué es?
El patrón Proxy proporciona un sustituto o marcador de posición para otro objeto. Controla el acceso al objeto original, permitiendo hacer algo antes o después de que la solicitud llegue al objeto original.

## ¿Cuándo usarlo?
- **Proxy Virtual**: Cuando tienes un objeto pesado que consume muchos recursos y no siempre lo necesitas
- **Proxy de Protección**: Cuando quieres controlar el acceso a un objeto (permisos, autenticación)
- **Proxy Remoto**: Cuando el objeto está en un espacio de direcciones diferente (servidor remoto)
- **Proxy de Registro**: Cuando quieres mantener un historial de peticiones
- **Proxy de Caché**: Cuando quieres almacenar resultados de operaciones costosas
- **Proxy Inteligente**: Cuando necesitas funcionalidad adicional al acceder a un objeto

## ¿Cómo aplicarlo?
1. Define una interfaz común para el servicio real y el proxy
2. Crea la clase del servicio real
3. Crea la clase proxy que implementa la misma interfaz
4. El proxy mantiene una referencia al objeto real
5. El proxy delega el trabajo al objeto real después de realizar su lógica adicional
6. El cliente trabaja con el proxy como si fuera el objeto real

## Ejemplo en JavaScript

```javascript
// ========== INTERFAZ COMÚN ==========

// Interfaz que define las operaciones de un servicio de base de datos
class IBaseDatos {
  // Método para consultar datos
  consultar(query) {
    throw new Error('Método debe ser implementado');
  }

  // Método para insertar datos
  insertar(tabla, datos) {
    throw new Error('Método debe ser implementado');
  }
}

// ========== SERVICIO REAL ==========

// Clase del servicio real de base de datos (operación costosa)
class BaseDatos extends IBaseDatos {
  // Constructor que simula la conexión a la base de datos
  constructor() {
    super(); // Llama al constructor padre
    this.conectada = false; // Estado de conexión
    this.conectar(); // Conecta automáticamente al crear la instancia
  }

  // Simula una conexión costosa a la base de datos
  conectar() {
    console.log('[BaseDatos] Estableciendo conexión... (operación costosa)');
    // Simula delay de conexión
    this.conectada = true; // Marca como conectada
    console.log('[BaseDatos] ✓ Conectado a la base de datos');
  }

  // Implementa la consulta real a la base de datos
  consultar(query) {
    // Verifica que esté conectada
    if (!this.conectada) {
      throw new Error('No conectado a la base de datos');
    }

    // Simula la ejecución de la consulta
    console.log(`[BaseDatos] Ejecutando query: ${query}`);

    // Simula resultado de la consulta
    return {
      datos: ['registro1', 'registro2', 'registro3'], // Datos simulados
      timestamp: new Date().toISOString() // Marca de tiempo
    };
  }

  // Implementa la inserción real en la base de datos
  insertar(tabla, datos) {
    // Verifica que esté conectada
    if (!this.conectada) {
      throw new Error('No conectado a la base de datos');
    }

    // Simula la inserción de datos
    console.log(`[BaseDatos] Insertando en tabla ${tabla}:`, datos);

    // Retorna confirmación
    return {
      exitoso: true, // Indica éxito
      id: Math.floor(Math.random() * 1000) // ID generado
    };
  }
}

// ========== PROXY DE PROTECCIÓN ==========

// Proxy que controla el acceso basado en permisos
class ProxyProteccionBD extends IBaseDatos {
  // Constructor que recibe la base de datos real y el usuario
  constructor(baseDatosReal, usuario) {
    super(); // Llama al constructor padre
    this.baseDatosReal = baseDatosReal; // Referencia al objeto real
    this.usuario = usuario; // Usuario que realiza las operaciones
  }

  // Verifica si el usuario tiene permiso para una operación
  tienePermiso(operacion) {
    // Define los permisos según el rol del usuario
    const permisos = {
      'admin': ['consultar', 'insertar', 'eliminar'], // Admin tiene todos los permisos
      'usuario': ['consultar'], // Usuario solo puede consultar
      'invitado': [] // Invitado no tiene permisos
    };

    // Obtiene los permisos del rol del usuario
    const permisosUsuario = permisos[this.usuario.rol] || [];

    // Verifica si el usuario tiene el permiso específico
    return permisosUsuario.includes(operacion);
  }

  // Intercepta la consulta y verifica permisos
  consultar(query) {
    console.log(`[Proxy Protección] Usuario ${this.usuario.nombre} intenta consultar`);

    // Verifica permiso antes de delegar
    if (!this.tienePermiso('consultar')) {
      console.log('[Proxy Protección] ✗ Acceso denegado');
      throw new Error('No tiene permisos para consultar');
    }

    console.log('[Proxy Protección] ✓ Permiso concedido');
    // Delega al objeto real si tiene permiso
    return this.baseDatosReal.consultar(query);
  }

  // Intercepta la inserción y verifica permisos
  insertar(tabla, datos) {
    console.log(`[Proxy Protección] Usuario ${this.usuario.nombre} intenta insertar`);

    // Verifica permiso antes de delegar
    if (!this.tienePermiso('insertar')) {
      console.log('[Proxy Protección] ✗ Acceso denegado');
      throw new Error('No tiene permisos para insertar');
    }

    console.log('[Proxy Protección] ✓ Permiso concedido');
    // Delega al objeto real si tiene permiso
    return this.baseDatosReal.insertar(tabla, datos);
  }
}

// ========== PROXY DE CACHÉ ==========

// Proxy que cachea resultados de consultas costosas
class ProxyCacheBD extends IBaseDatos {
  // Constructor que recibe la base de datos real
  constructor(baseDatosReal) {
    super(); // Llama al constructor padre
    this.baseDatosReal = baseDatosReal; // Referencia al objeto real
    this.cache = new Map(); // Map para almacenar resultados en caché
    this.hits = 0; // Contador de aciertos de caché
    this.misses = 0; // Contador de fallos de caché
  }

  // Intercepta la consulta y usa caché
  consultar(query) {
    console.log(`[Proxy Caché] Buscando en caché: "${query}"`);

    // Verifica si la consulta está en caché
    if (this.cache.has(query)) {
      this.hits++; // Incrementa contador de aciertos
      console.log(`[Proxy Caché] ✓ Cache HIT (${this.hits} hits, ${this.misses} misses)`);
      return this.cache.get(query); // Retorna resultado cacheado
    }

    // Si no está en caché, consulta al objeto real
    this.misses++; // Incrementa contador de fallos
    console.log(`[Proxy Caché] ✗ Cache MISS (${this.hits} hits, ${this.misses} misses)`);

    // Delega al objeto real
    const resultado = this.baseDatosReal.consultar(query);

    // Guarda el resultado en caché para futuras consultas
    this.cache.set(query, resultado);
    console.log('[Proxy Caché] Resultado almacenado en caché');

    return resultado; // Retorna el resultado
  }

  // Delega directamente la inserción (no se cachea)
  insertar(tabla, datos) {
    console.log('[Proxy Caché] Insertando (no se cachea)');

    // Las inserciones invalidan la caché
    this.cache.clear(); // Limpia la caché
    console.log('[Proxy Caché] Caché limpiada tras inserción');

    // Delega al objeto real
    return this.baseDatosReal.insertar(tabla, datos);
  }

  // Método adicional para ver estadísticas de caché
  obtenerEstadisticas() {
    const total = this.hits + this.misses; // Total de consultas
    const tasaAcierto = total > 0 ? (this.hits / total * 100).toFixed(2) : 0; // Porcentaje

    return {
      hits: this.hits, // Aciertos
      misses: this.misses, // Fallos
      total: total, // Total
      tasaAcierto: `${tasaAcierto}%` // Tasa de acierto
    };
  }
}

// ========== PROXY DE REGISTRO (LOGGING) ==========

// Proxy que registra todas las operaciones
class ProxyRegistroBD extends IBaseDatos {
  // Constructor que recibe la base de datos real
  constructor(baseDatosReal) {
    super(); // Llama al constructor padre
    this.baseDatosReal = baseDatosReal; // Referencia al objeto real
    this.registros = []; // Array para almacenar el historial
  }

  // Intercepta la consulta y la registra
  consultar(query) {
    // Registra la operación con timestamp
    const registro = {
      operacion: 'CONSULTAR', // Tipo de operación
      query: query, // Query ejecutado
      timestamp: new Date().toISOString(), // Momento de ejecución
      usuario: 'sistema' // Usuario (podría venir del contexto)
    };

    this.registros.push(registro); // Añade al historial
    console.log('[Proxy Registro] Operación registrada:', registro);

    // Delega al objeto real
    return this.baseDatosReal.consultar(query);
  }

  // Intercepta la inserción y la registra
  insertar(tabla, datos) {
    // Registra la operación con timestamp
    const registro = {
      operacion: 'INSERTAR', // Tipo de operación
      tabla: tabla, // Tabla afectada
      datos: datos, // Datos insertados
      timestamp: new Date().toISOString(), // Momento de ejecución
      usuario: 'sistema' // Usuario (podría venir del contexto)
    };

    this.registros.push(registro); // Añade al historial
    console.log('[Proxy Registro] Operación registrada:', registro);

    // Delega al objeto real
    return this.baseDatosReal.insertar(tabla, datos);
  }

  // Método adicional para obtener el historial
  obtenerHistorial() {
    return this.registros; // Retorna todos los registros
  }
}

// ========== USO DEL PATRÓN ==========

console.log('=== PROXY DE PROTECCIÓN ===\n');

// Crear base de datos real
const bd = new BaseDatos(); // Instancia del servicio real

// Crear usuarios con diferentes roles
const admin = {nombre: 'Admin', rol: 'admin'}; // Usuario administrador
const usuarioNormal = {nombre: 'Juan', rol: 'usuario'}; // Usuario normal
const invitado = {nombre: 'Invitado', rol: 'invitado'}; // Usuario invitado

// Crear proxy de protección para usuario normal
const proxyUsuario = new ProxyProteccionBD(bd, usuarioNormal);

try {
  // Usuario normal puede consultar
  console.log('\n--- Usuario normal consulta ---');
  proxyUsuario.consultar('SELECT * FROM productos');

  // Usuario normal NO puede insertar
  console.log('\n--- Usuario normal intenta insertar ---');
  proxyUsuario.insertar('productos', {nombre: 'Nuevo Producto'});
} catch (error) {
  console.log(`Error: ${error.message}`); // Muestra el error de permisos
}

// Crear proxy de protección para admin
const proxyAdmin = new ProxyProteccionBD(bd, admin);

try {
  // Admin puede hacer todo
  console.log('\n--- Admin inserta ---');
  proxyAdmin.insertar('productos', {nombre: 'Producto Admin'});
} catch (error) {
  console.log(`Error: ${error.message}`);
}

console.log('\n\n=== PROXY DE CACHÉ ===\n');

// Crear nuevo servicio real
const bd2 = new BaseDatos();

// Crear proxy de caché
const proxyCache = new ProxyCacheBD(bd2);

// Primera consulta (MISS - va a la BD)
console.log('\n--- Primera consulta ---');
proxyCache.consultar('SELECT * FROM usuarios');

// Segunda consulta igual (HIT - viene de caché)
console.log('\n--- Segunda consulta (misma query) ---');
proxyCache.consultar('SELECT * FROM usuarios');

// Tercera consulta igual (HIT - viene de caché)
console.log('\n--- Tercera consulta (misma query) ---');
proxyCache.consultar('SELECT * FROM usuarios');

// Consulta diferente (MISS - va a la BD)
console.log('\n--- Consulta diferente ---');
proxyCache.consultar('SELECT * FROM productos');

// Mostrar estadísticas
console.log('\n--- Estadísticas de Caché ---');
console.log(proxyCache.obtenerEstadisticas());

console.log('\n\n=== PROXY DE REGISTRO ===\n');

// Crear nuevo servicio real
const bd3 = new BaseDatos();

// Crear proxy de registro
const proxyLog = new ProxyRegistroBD(bd3);

// Realizar varias operaciones
console.log('\n--- Realizando operaciones ---');
proxyLog.consultar('SELECT * FROM clientes');
proxyLog.insertar('clientes', {nombre: 'María', email: 'maria@email.com'});
proxyLog.consultar('SELECT * FROM pedidos WHERE cliente_id = 1');

// Mostrar historial completo
console.log('\n--- Historial de Operaciones ---');
proxyLog.obtenerHistorial().forEach((reg, index) => {
  console.log(`${index + 1}.`, reg); // Muestra cada registro
});

console.log('\n\n=== PROXY COMBINADO ===\n');

// Puedes combinar múltiples proxies
const bd4 = new BaseDatos(); // Servicio real
const conCache = new ProxyCacheBD(bd4); // Añade caché
const conLog = new ProxyRegistroBD(conCache); // Añade logging
const conProteccion = new ProxyProteccionBD(conLog, admin); // Añade protección

console.log('--- Usando proxy combinado ---');
conProteccion.consultar('SELECT * FROM combined');
conProteccion.consultar('SELECT * FROM combined'); // Esta vendrá de caché
```

## Ventajas
- Controla el acceso al objeto real sin que el cliente lo sepa
- Puede gestionar el ciclo de vida del objeto de servicio
- Funciona incluso si el objeto de servicio no está disponible
- Principio abierto/cerrado: puedes añadir nuevos proxies sin cambiar el servicio o clientes
- Lazy initialization, caché, logging, control de acceso sin modificar el objeto original

## Desventajas
- El código puede volverse más complicado
- La respuesta del servicio puede retrasarse
- Puede introducir overhead de rendimiento
