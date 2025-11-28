<?php

class databaseManager {
    private $host;
    private $port;
    private $dbname;
    private $username;
    private $password;
    private $connection;

    public function __construct($host, $dbname, $port, $username, $password) {
        $this->host = $host;
        $this->dbname = $dbname;
        $this->port = $port;
        $this->username = $username;
        $this->password = $password;

        $this->connect();
    }

    private function connect() {
        try {
            $dsn = "mysql:host={$this->host};port={$this->port};dbname={$this->dbname};charset=utf8mb4";

            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ];

            $this->connection = new PDO($dsn, $this->username, $this->password, $options);

        } catch (PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }

    private function consultarLogin($usuario, $password) {

    }
}