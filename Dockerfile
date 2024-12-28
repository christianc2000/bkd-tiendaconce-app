# Usa la imagen oficial de Node.js
FROM node:18

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos del backend
COPY package.json ./
COPY . ./

# Instala las dependencias
RUN npm install

# Expone el puerto que usa NestJS
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "run", "start:dev"]
