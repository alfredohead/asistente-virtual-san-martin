// 📁 utils/sendMessage.js (nuevo watcher Firestore ↔️ WhatsApp)
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');

// Credenciales Firebase
let firebaseCredentials;
try {
  if (process.env.FIREBASE_JSON) {
    firebaseCredentials = JSON.parse(Buffer.from(process.env.FIREBASE_JSON, 'base64').toString('utf8'));
  } else if (fs.existsSync('./credentials/firebase.json')) {
    firebaseCredentials = require('./credentials/firebase.json');
  } else {
    console.error('❌ No se encontró FIREBASE_JSON');
    process.exit(1);
  }
} catch (e) {
  console.error('❌ Error cargando FIREBASE_JSON', e.message);
  process.exit(1);
}

initializeApp({ credential: cert(firebaseCredentials) });
const db = getFirestore();

// Inicializar WhatsApp
const client = new Client({ authStrategy: new LocalAuth() });
client.on('ready', () => {
  console.log('🤖 WhatsApp conectado (envío de mensajes desde operador)');
  escucharMensajes();
});

async function escucharMensajes() {
  const chatsRef = db.collection('chats');
  const snapshot = await chatsRef.get();

  snapshot.forEach(doc => {
    const userId = doc.id;
    chatsRef.doc(userId).collection('mensajes')
      .where('origen', '==', 'operador')
      .orderBy('timestamp', 'desc')
      .limit(1)
      .onSnapshot(async (snap) => {
        snap.docChanges().forEach(async (change) => {
          if (change.type === 'added') {
            const mensaje = change.doc.data().mensaje;
            try {
              await client.sendMessage(userId, mensaje);
              console.log(`✅ Enviado a ${userId}: ${mensaje}`);
            } catch (err) {
              console.error(`❌ Error al enviar mensaje a ${userId}:`, err.message);
            }
          }
        });
      });
  });
}

client.initialize();
