// 📁 backend/index.js (extendido)
const express = require('express');
const operatorRoutes = require('./routes/operators');
app.use('/api', operatorRoutes);
const compression = require('compression');
const { WebhookClient } = require('dialogflow-fulfillment');
const fs = require('fs');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const cors = require('cors');

// 🔐 Cargar credenciales Firebase
let firebaseCredentials;
try {
  if (process.env.FIREBASE_JSON) {
    firebaseCredentials = JSON.parse(Buffer.from(process.env.FIREBASE_JSON, 'base64').toString('utf8'));
  } else if (fs.existsSync('./credentials/firebase.json')) {
    firebaseCredentials = require('./credentials/firebase.json');
  } else {
    console.error('❌ FIREBASE_JSON no definido ni encontrado');
    process.exit(1);
  }
} catch (err) {
  console.error('❌ Error al cargar FIREBASE_JSON:', err.message);
  process.exit(1);
}

initializeApp({ credential: cert(firebaseCredentials) });
const db = getFirestore();

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(compression());
app.use(express.json());
const operatorRoutes = require('./routes/operators');
app.use('/api', operatorRoutes);

app.get('/', (req, res) => {
  res.send('🟢 Backend operador funcionando');
});

// 🔁 Guardar mensaje entrante del bot
app.post('/api/chats', async (req, res) => {
  const { userId, mensaje, area } = req.body;
  if (!userId || !mensaje) return res.status(400).json({ error: 'Faltan datos' });

  const ref = db.collection('chats').doc(userId);
  await ref.set({ userId, area: area || 'Sin área', estado: 'pendiente', timestamp: new Date() }, { merge: true });
  await ref.collection('mensajes').add({ mensaje, origen: 'usuario', timestamp: new Date() });
  res.sendStatus(200);
});

// 📩 Enviar respuesta al usuario desde el operador
app.post('/api/responder', async (req, res) => {
  const { userId, mensaje } = req.body;
  if (!userId || !mensaje) return res.status(400).json({ error: 'Faltan datos' });

  await db.collection('chats').doc(userId).collection('mensajes').add({ mensaje, origen: 'operador', timestamp: new Date() });
  await db.collection('chats').doc(userId).set({ estado: 'respondido' }, { merge: true });

  // Aquí deberías integrar con WhatsApp principal para enviar el mensaje real
  res.sendStatus(200);
});

// 📥 Obtener conversaciones filtradas
app.get('/api/conversaciones', async (req, res) => {
  const { area, fecha } = req.query;
  let query = db.collection('chats');

  if (area) query = query.where('area', '==', area);
  if (fecha) {
    const dia = new Date(fecha);
    const desde = new Date(dia.setHours(0, 0, 0, 0));
    const hasta = new Date(dia.setHours(23, 59, 59, 999));
    query = query.where('timestamp', '>=', desde).where('timestamp', '<=', hasta);
  }

  const snap = await query.get();
  const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(data);
});

// 📄 Ver historial completo de un usuario
app.get('/api/chat/:userId', async (req, res) => {
  const { userId } = req.params;
  const mensajesSnap = await db.collection('chats').doc(userId).collection('mensajes').orderBy('timestamp').get();
  const mensajes = mensajesSnap.docs.map(doc => doc.data());
  res.json(mensajes);
});

// 🔄 Cambiar estado de atención
app.patch('/api/chat/:userId/estado', async (req, res) => {
  const { userId } = req.params;
  const { estado } = req.body;
  await db.collection('chats').doc(userId).set({ estado }, { merge: true });
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`🚀 Backend operador corriendo en puerto ${port}`);
});
