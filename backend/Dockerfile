# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos de dependencias primero (para aprovechar la cache de Docker)
COPY package*.json ./

# Instala las dependencias de Node.js (esto incluye Prisma Client)
RUN npm install

# Copia todo el código de la aplicación al contenedor
COPY . .

# Genera el cliente de Prisma y aplica las migraciones
RUN npx prisma generate
# RUN npx prisma migrate deploy

# Exponer el puerto de la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev"]

