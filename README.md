# Asistente Virtual Municipalidad de San Martín

Este proyecto integra WhatsApp, Dialogflow y Firebase, desplegado en Fly.io. También puede conectarse con un frontend en Netlify.

## Estructura del Proyecto

- `index.js`: Código principal del bot.
- `credentials/firebase.json`: Archivo de credenciales (NO subir a GitHub).
- `fly.toml`: Configuración para desplegar en Fly.io.
- `Dockerfile`: Imagen de contenedor Node.js.

## Despliegue en Fly.io

1. Iniciá tu proyecto:
```bash
flyctl launch
```

2. Desplegá:
```bash
flyctl deploy
```

3. Puerto por defecto: 8080

## Firebase y Dialogflow

- Firebase debe tener habilitado Firestore.
- Dialogflow debe estar conectado al fulfillment.
- El archivo `credentials/firebase.json` debe estar completo y válido.

## Frontend opcional

- Podés agregar una carpeta `/public` y alojarla en Netlify.
- El bot escucha en `/webhook` y responde en `/`.

## Seguridad

- Nunca subas `credentials/firebase.json` a GitHub.
- Asegurate de incluir `.gitignore` en esa carpeta.
