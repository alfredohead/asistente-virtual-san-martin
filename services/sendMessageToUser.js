// utils/sendMessage.js

const axios = require('axios');

const sendMessage = async (numero, mensaje) => {
  try {
    const payload = {
      numero,
      mensaje
    };

    const respuesta = await axios.post(
      'https://asistente-whatsapp.fly.dev/send', // URL del bot principal de WhatsApp
      payload,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    return respuesta.data;
  } catch (error) {
    console.error('Error al enviar el mensaje:', error.message);
    throw error;
  }
};

module.exports = sendMessage;
