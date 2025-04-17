// Importa los módulos necesarios de firebase-admin
const { initializeApp } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');

// Inicializa la aplicación de Firebase con las credenciales del servicio
initializeApp({
  credential: require('firebase-admin').credential.applicationDefault(), // Usa las credenciales predeterminadas
});

// Función para enviar un mensaje
async function sendMessage() {
  try {
    // Define el mensaje que se enviará
    const message = {
      token: 'DEVICE_TOKEN', // Reemplaza con el token del dispositivo de destino
      notification: {
        title: 'Título del mensaje',
        body: 'Cuerpo del mensaje',
      },
    };

    // Envía el mensaje usando Firebase Cloud Messaging
    const response = await getMessaging().send(message);
    console.log('Mensaje enviado exitosamente:', response);
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
  }
}

// Llama a la función para enviar el mensaje
sendMessage();