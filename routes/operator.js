const express = require('express');
const router = express.Router();
const sendMessage = require('../utils/sendMessage');

router.post('/', async (req, res) => {
  const { numero, mensaje } = req.body;

  try {
    await sendMessage(numero, mensaje);
    res.json({ mensaje: 'Mensaje enviado exitosamente' });
  } catch (error) {
    console.error('Error al enviar mensaje:', error.message);
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
});

module.exports = router;
