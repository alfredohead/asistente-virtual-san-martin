import express from 'express';

const router = express.Router();

router.get('/operator', (req, res) => {
  res.json({ message: 'Operador funcionando correctamente 🎯' });
});

router.post('/operator', (req, res) => {
  const { nombre, rol } = req.body;

  if (!nombre || !rol) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  res.status(201).json({
    message: 'Operador procesado correctamente',
    data: { nombre, rol },
  });
});

export default router;
