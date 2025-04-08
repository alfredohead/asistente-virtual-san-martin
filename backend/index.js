
const express = require('express');
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const app = express();
app.use(cors());
app.use(express.json());

// DEBUG: Mostrar longitud del env base64
const base64Str = process.env.FIREBASE_JSON_BASE64;
console.log("📦 FIREBASE_JSON_BASE64 length:", base64Str?.length);

if (!base64Str) {
    console.error("❌ FIREBASE_JSON_BASE64 is missing or empty.");
    process.exit(1);
}

let firebaseConfig;
try {
    firebaseConfig = JSON.parse(Buffer.from(base64Str, 'base64').toString('utf8'));
} catch (error) {
    console.error("❌ Error parsing FIREBASE_JSON_BASE64:", error.message);
    process.exit(1);
}

initializeApp({
    credential: cert(firebaseConfig)
});

const db = getFirestore();

app.get('/', (req, res) => {
    res.send('🔥 Firebase app is running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Backend corriendo en http://0.0.0.0:${PORT}`);
});
