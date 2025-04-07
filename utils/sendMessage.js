const axios = require('axios');

const sendMessage = async (numero, mensaje) => {
  await axios.post('https://asistente-whatsapp.fly.dev/send', {
    numero,
    mensaje
  });
};

module.exports = sendMessage;
