<?php

class Entrenar extends Hobby implements Acciones {
    private $nombre;
    private $ejercicio;
    private $tiempo;
    private $fechaFinalizacion;
    private $ayuda;
    private const ejercicioMinimoSemanal = 3;
    private static int $totalEntrenamientos = 0;

    public function __construct($nombre, $ejercicio, $tiempo, $fechaCreacion){
        $this->nombre = $nombre;
        $this->ejercicio = $ejercicio;
        $this->tiempo = $tiempo;
        $this->fechaFinalizacion = $fechaCreacion;
        $this->ayuda = new Ayuda(); 
        self::$totalEntrenamientos++;
    }

    public function __destruct(){
        echo "Eliminando el ejercicio... " .$this->ejercicio ."<br>";
    }
    
    public function __toString(){
        echo "datos : "
        ."Nombre: " .$this->nombre
        ." Ejercicio: " .$this->ejercicio
        ."Tiempo: " .$this->tiempo
        ." Fecha: " .$this->fechaFinalizacion;
    }

    // get de la variable constante Y statica
    public static function getEjercicioMinimo() {
        return self::ejercicioMinimoSemanal;
    }

    public static function getTotalEntrenamientos() {
        return self::$totalEntrenamientos;
    }

        
    public static function setTotalEntrenamientos($valor) {
        self::$totalEntrenamientos = $valor;
    }

    
    public static function incrementarTotal() {
        self::$totalEntrenamientos++;
    }

    
    public static function resetearTotal() {
        self::$totalEntrenamientos = 0;
    }



    public static function aleatorio() {
        $a = new Ayuda();
        $nombre = $a->cadena_aleatoria();
        $ejercicio = $a->cadena_aleatoria();
        $tiempo = $a->entero_3a8_digitos();
        $fecha = $a->fecha_2025();
        return new Entrenar($nombre, $ejercicio, $tiempo, $fecha);
    }

    public function getNombre(): string {
        return $this->nombre;
    }

    public function setNombre ($nombre){
        $this->nombre = $nombre;
    }

    public function getejercicio(){
        return $this->ejercicio;
    }

    public function setejercicio($ejercicio){
        $this->ejercicio = $ejercicio;
    }

    public function gettiempo(){
        return $this->tiempo;
    }

    public function settiempo($tiempo){
        $this->tiempo = $tiempo;
    }
    
    public function getfechaFinalizacion(){
        return $this->fechaFinalizacion;
    }

    public function setfechaFinalizacion($fechaCreacion){
        $this->fechaFinalizacion = $fechaCreacion;
    }

    public function datosEmpresa(){
        echo "El nombre del entrenamiento es: ". $this->nombre ." se hará: ". $this->ejercicio ." durará: ". $this->tiempo ." hasta: ". $this->fechaFinalizacion;
    }

    public function iniciar(){
        echo "Iniciando entrenamiento...";
    }

    public function detener(){
        echo "Deteniendo entrenamiento";
    }

    public function actualizar(array $a) {
        echo "Actualizando empresa";
    }

    public function resumen(){
        echo "Resumen del entrenamiento: ". $this->nombre .", ejercicio ". $this->ejercicio .", duración ". $this->tiempo ." minutos.";
    }

    protected function mostrarFecha(){
        echo "Fecha del entrenamiento: ". $this->fechaFinalizacion;
    }

    private function mensajeInterno(){
        return "Método privado ejecutado.";
    }
}
