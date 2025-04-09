// routes/operator.js
import express from 'express';

const router = express.Router();

// Ruta test
router.get('/', (req, res) => {
  res.json({ message: 'Operador activo y funcionando 🚀' });
});

export default router;
