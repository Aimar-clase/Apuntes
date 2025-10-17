<?php

abstract class Hobby {
    private $nombre;

    public function setNombre(string $nombre){
        $this->nombre = $nombre;
    }

    public function getNombre(): string {
        return $this->nombre;
    }
}