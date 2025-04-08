const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Operador en funcionamiento');
});

module.exports = router;
