// index.js
import express from 'express';
import cors from 'cors';
import operatorRoutes from './routes/operator.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/operator', operatorRoutes);

// Ruta base (opcional para testing)
app.get('/', (req, res) => {
  res.send('🟢 Backend Asistente Virtual corriendo correctamente.');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
