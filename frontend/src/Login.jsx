import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");

  function handleLogin() {
    if (usuario.startsWith("OPERADOR_") && clave) {
      onLogin({ usuario });
    } else {
      alert("Credenciales inválidas");
    }
  }

  return (
    <div className="login">
      <h2>Panel de Atención</h2>
      <input placeholder="Usuario" value={usuario} onChange={e => setUsuario(e.target.value)} />
      <input type="password" placeholder="Clave" value={clave} onChange={e => setClave(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
