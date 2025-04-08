# Imagen base con Node.js LTS
FROM node:20

# Crear directorio de trabajo
WORKDIR /app

# Copiar backend y frontend
COPY backend ./backend
COPY frontend ./frontend

# Entrar al backend y frontend, instalar dependencias y compilar React
RUN cd frontend && npm install && npm run build
RUN cd backend && npm install

# Definir puerto
EXPOSE 3000

# Ejecutar backend
CMD ["node", "backend/index.js"]
