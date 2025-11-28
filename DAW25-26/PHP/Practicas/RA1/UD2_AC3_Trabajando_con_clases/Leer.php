<?php


class Leer extends Hobby implements Acciones {
    private $nombre;
    private $libro;
    private $paginas;
    private $fechaInicio;
    private $ayuda;
    private $tiempoMinimo;
    private $tiempoMaximo;
    private $tiempoDedicado;

    public function __construct($nombre, $libro, $paginas, $fechaInicio){
        $this->nombre = $nombre;
        $this->libro = $libro;
        $this->paginas = $paginas;
        $this->fechaInicio = $fechaInicio;
        $this->ayuda = new Ayuda();
        $this->tiempoDedicado = 0;
    }

    public function setTiempoMinimo($minutos) {
        $this->tiempoMinimo = $minutos;
    }


    public function setTiempoMaximo($minutos) {
        $this->tiempoMaximo = $minutos;
    }


    public function getTiempoMinimo() {
        return $this->tiempoMinimo;
    }


    public function getTiempoMaximo() {
        return $this->tiempoMaximo;
    }


    public function registrarTiempo($minutos) {
        $this->tiempoDedicado += $minutos;
    }

    public function getTiempoDedicado() {
        return $this->tiempoDedicado;
    }


    public function iniciar(){
        echo "Comenzando a leer...";
    }

    public function detener(){
        echo "Deteniendo lectura";
    }

    public function actualizar(array $a) {
        echo "Actualizando lectura";
    }

    public function getNombre(): string {
        return $this->nombre;
    }

    public function setNombre($nombre){
        $this->nombre = $nombre;
    }
}