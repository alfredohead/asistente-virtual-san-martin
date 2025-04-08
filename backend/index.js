const express = require('express');
const cors = require('cors');
const app = express();
const operatorRouter = require('./routes/operator');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/enviar-mensaje', operatorRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
