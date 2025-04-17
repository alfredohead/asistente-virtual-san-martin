// 📁 backend/routes/auth.js
const express = require('express');
const router = express.Router();

// Operadores hardcodeados desde variables de entorno
const operadores = [
  { usuario: process.env.OPERADOR1_USER, password: process.env.OPERADOR1_PASS },
  { usuario: process.env.OPERADOR2_USER, password: process.env.OPERADOR2_PASS }
];

router.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  const valido = operadores.find(op => op.usuario === usuario && op.password === password);

  if (valido) {
    res.json({ token: Buffer.from(usuario).toString('base64') });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

module.exports = router;
