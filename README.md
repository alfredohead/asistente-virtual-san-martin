# Asistente Humano - Backend

Este backend se encarga de recibir mensajes del operador humano y enviarlos al número del usuario a través del bot de WhatsApp.

## Endpoints

### POST /operator/send

Envía un mensaje al usuario.

**Body esperado**:
```json
{
  "number": "5492615551234",
  "message": "Hola, ¿en qué puedo ayudarte?"
}
```

## Variables de entorno

- `FIREBASE_JSON`: Credenciales JSON en base64

