import React, { useState } from "react";

export default function Chat({ numero, operador }) {
  const [mensaje, setMensaje] = useState("");

  async function enviarMensaje() {
    const res = await fetch("/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numero, mensaje }),
    });
    if (res.ok) {
      setMensaje("");
      alert("Mensaje enviado ✔️");
    } else {
      alert("Error al enviar");
    }
  }

  return (
    <div className="chat">
      <h4>Conversación con: {numero}</h4>
      <textarea value={mensaje} onChange={e => setMensaje(e.target.value)} />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  );
}
