# Usa una imagen oficial de Node
FROM node:18

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto (debe coincidir con tu app: 3000)
EXPOSE 3000

# Arranca la app en modo módulo
CMD ["node", "index.js"]
