'use strict';

export class StorageManager {

    // ==========================================
    // CONFIGURACIÓN: CAMBIA ESTO EN CADA EXAMEN
    // ==========================================
    static KEY = "productos";
    // Ejemplos: "gastos", "tareas", "pokedex"


    // 1. Obtener todos los datos (devuelve array vacío si no hay nada)
    static get() {
        const datos = localStorage.getItem(this.KEY);
        // Si hay datos los parsea, si no, devuelve array vacío []
        return datos ? JSON.parse(datos) : [];
    }

    // 2. Guardar el array completo (Sobrescribe)
    static save(datos) {
        localStorage.setItem(this.KEY, JSON.stringify(datos));
    }

    // 3. Añadir un item nuevo al array existente
    static add(item) {
        const listado = this.get();
        listado.push(item);
        this.save(listado);
    }

    // 4. Eliminar un item por su ID
    static remove(id) {
        const listado = this.get();
        // Crea un nuevo array excluyendo el que tenga ese ID
        const nuevoListado = listado.filter(item => item.id !== id);
        this.save(nuevoListado);
    }

    // 5. Modificar un item (Para el Update/Editar estado)
    // Recibe el objeto ya modificado o busca por ID y cambia propiedad
    static update(itemActualizado) {
        let listado = this.get();
        // Encontramos la posición del item por su ID
        const index = listado.findIndex(item => item.id === itemActualizado.id);

        if (index !== -1) {
            listado[index] = itemActualizado; // Reemplazamos
            this.save(listado);
        }
    }

    // 6. Borrar todo (Resetear app)
    static clear() {
        localStorage.removeItem(this.KEY);
    }
}