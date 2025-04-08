# Proyecto: asistente-virtual-web

✅ Panel de operadores para WhatsApp
✅ Conexión con bot externo vía whatsapp-web.js
✅ Control de modo bot/humano
✅ Filtro por áreas
✅ Mensajes en tiempo real
✅ Historial de conversación por usuario
✅ Contador de mensajes pendientes
✅ Login básico de operadores
✅ Listo para Fly.io y Firestore

## Estructura del Proyecto

asistente-virtual-web/
├── backend/                  # API REST + conexión Firestore
│   ├── index.js              # Backend Express principal
│   ├── .env.example          # Variables de entorno (seguro)
│   └── firebase.json         # (se genera dinámicamente)
│
├── frontend/                 # Panel de operador React (Vite)
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── Login.jsx
│       ├── Dashboard.jsx
│       ├── Chat.jsx
│       └── main.jsx
│
└── README.md                 # Este archivo

## Cómo correr el proyecto

### 1. Backend

```bash
cd asistente-virtual-web/backend
cp .env.example .env
npm install
node index.js
```

### 2. Frontend (build de React)

```bash
cd ../frontend
npm install
npm run build
```

Esto crea `dist/` que será servido automáticamente por el backend.

---

### 3. Deploy en Fly.io

```bash
cd asistente-virtual-web
fly launch
fly secrets set FIREBASE_JSON_BASE64="..." WHATSAPP_TOKEN="..."
fly deploy
```

---

## Notas Importantes

- El bot externo debe estar corriendo y accesible desde la URL definida en `WHATSAPP_API_URL`
- Los mensajes pendientes se guardan en Firestore en `/mensajes/{numero}/conversacion`
- La colección `/contextos` define si un usuario está en "modo humano" o "modo bot"

