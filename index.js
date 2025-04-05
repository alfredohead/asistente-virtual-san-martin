
const express = require('express');
const compression = require('compression');
const { WebhookClient } = require('dialogflow-fulfillment');
const fs = require('fs');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// 🔐 Cargar credenciales Firebase
let firebaseCredentials;
try {
  if (process.env.FIREBASE_JSON) {
    firebaseCredentials = JSON.parse(
      Buffer.from(process.env.FIREBASE_JSON, 'base64').toString('utf8')
    );
  } else if (fs.existsSync('./credentials/firebase.json')) {
    firebaseCredentials = require('./credentials/firebase.json');
  } else {
    console.error('❌ FIREBASE_JSON no está definido y no se encontró credentials/firebase.json');
    process.exit(1);
  }
} catch (err) {
  console.error('❌ No se pudo cargar FIREBASE_JSON:', err.message);
  process.exit(1);
}

// 🔥 Inicializar Firebase
initializeApp({ credential: cert(firebaseCredentials) });
const db = getFirestore();

// 🌐 Inicializar servidor Express
const app = express();
const port = process.env.PORT || 8080;
app.use(compression());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('🟢 Servidor Express para atención humana activo');
});

app.post('/webhook', (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function fallback(agent) {
    agent.add('🤖 El asistente no está disponible ahora. Un humano te responderá pronto.');
  }

  function saveQuery(agent) {
    const nombre = agent.parameters.nombre || 'desconocido';
    const mensaje = agent.query;
    return db.collection('consultas').add({
      nombre,
      mensaje,
      timestamp: new Date()
    }).then(() => {
      agent.add(`👌 Hola ${nombre}, un operador te contactará pronto.`);
    });
  }

  const intentMap = new Map();
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Guardar Consulta Operador', saveQuery);

  agent.handleRequest(intentMap);
});

// 🚀 Iniciar servidor
app.listen(port, () => {
  console.log(`🚀 Backend para atención humana activo en puerto ${port}`);
});
