import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Operador activo 🚀' });
});

export default router;
