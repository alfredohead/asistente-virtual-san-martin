import React, { useEffect, useState } from "react";
import Chat from "./Chat";

export default function Dashboard({ operador }) {
  const [conversaciones, setConversaciones] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [activo, setActivo] = useState(null);

  useEffect(() => {
    fetch("/api/conversaciones")
      .then(res => res.json())
      .then(setConversaciones);
  }, []);

  const filtradas = conversaciones.filter(c => !filtro || c.area === filtro);

  return (
    <div className="dashboard">
      <h3>Bienvenido, {operador.usuario}</h3>
      <div>
        <label>Filtrar por área:</label>
        <select value={filtro} onChange={e => setFiltro(e.target.value)}>
          <option value="">Todas</option>
          <option value="Incubadora">Incubadora</option>
          <option value="Escuela de Oficios">Escuela de Oficios</option>
        </select>
      </div>
      <ul>
        {filtradas.map(c => (
          <li key={c.id} onClick={() => setActivo(c)}>
            {c.id} - {c.area}
          </li>
        ))}
      </ul>
      {activo && <Chat numero={activo.id} operador={operador} />}
    </div>
  );
}
