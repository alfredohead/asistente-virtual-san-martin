# utils/Dockerfile (para servicio de envío)
FROM node:18

WORKDIR /app

COPY ../package*.json ./
RUN npm install --production

COPY . .

CMD ["node", "sendMessage.js"]