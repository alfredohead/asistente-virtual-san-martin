const express = require('express');
const cors = require('cors');
const operatorRoutes = require('./routes/operator');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', express.static('public'));
app.use('/webhook', operatorRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
