# Proyecto con Docker

Este es un proyecto que utiliza Docker para levantar un backend y una base de datos PostgreSQL.

## Requisitos

- Docker
- Docker Compose

## Como iniciar el proyecto

1. Clonar repositorio:
git clone <URL_DEL_REPOSITORIO>

2. Crear la carpeta 'files' dentro de backend para almacenar los archivos subidos

3. En la raiz del proyecto iniciar los contenedores en docker: 
docker-compose up --build


## Si el contenedor del frontend no se levanta correctamente intentar lo siguiente:

- En la raiz del proyecto: docker-compose run --rm frontend /bin/sh
- Una vez dentro del contenedor ejecutar: npm install
- Volver a iniciar el contenedor: docker-compose up frontend


