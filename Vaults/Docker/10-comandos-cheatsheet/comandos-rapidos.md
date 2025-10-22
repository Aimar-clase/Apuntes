# Comandos Rapidos de Docker

## Imagenes

```bash
# Listar imagenes
docker images

# Descargar imagen
docker pull <imagen>:<tag>

# Construir imagen
docker build -t <nombre>:<tag> .

# Eliminar imagen
docker rmi <imagen_id>

# Eliminar imagenes sin usar
docker image prune
```

## Contenedores

```bash
# Listar contenedores activos
docker ps

# Listar todos los contenedores
docker ps -a

# Crear y ejecutar contenedor
docker run -d --name <nombre> <imagen>

# Detener contenedor
docker stop <contenedor>

# Iniciar contenedor
docker start <contenedor>

# Eliminar contenedor
docker rm <contenedor>

# Ver logs
docker logs <contenedor>

# Ejecutar comando en contenedor
docker exec -it <contenedor> bash
```

## Volumenes

```bash
# Listar volumenes
docker volume ls

# Crear volumen
docker volume create <nombre>

# Inspeccionar volumen
docker volume inspect <nombre>

# Eliminar volumen
docker volume rm <nombre>
```

## Redes

```bash
# Listar redes
docker network ls

# Crear red
docker network create <nombre>

# Conectar contenedor a red
docker network connect <red> <contenedor>

# Inspeccionar red
docker network inspect <red>
```

## Docker Compose

```bash
# Iniciar servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Ver logs
docker-compose logs -f

# Reconstruir servicios
docker-compose up -d --build

# Listar servicios
docker-compose ps
```

## Limpieza

```bash
# Eliminar todo lo no usado
docker system prune -a

# Ver uso de espacio
docker system df
```

---
*Cheatsheet actualizado: 2025-10-22*
