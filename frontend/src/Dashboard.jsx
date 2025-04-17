// 📁 frontend/src/pages/Panel.jsx
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

const API = import.meta.env.VITE_BACKEND_URL;

export default function Panel() {
  const [conversaciones, setConversaciones] = useState([]);
  const [area, setArea] = useState('');
  const [fecha, setFecha] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [respuesta, setRespuesta] = useState('');

  const fetchConversaciones = async () => {
    const query = new URLSearchParams();
    if (area) query.append('area', area);
    if (fecha) query.append('fecha', fecha);
    const res = await fetch(`${API}/api/conversaciones?${query.toString()}`);
    const data = await res.json();
    setConversaciones(data);
  };

  const verConversacion = async (userId) => {
    const res = await fetch(`${API}/api/chat/${userId}`);
    const data = await res.json();
    setMensajes(data);
    setUsuarioActivo(userId);
  };

  const responder = async () => {
    if (!respuesta.trim()) return;
    await fetch(`${API}/api/responder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: usuarioActivo, mensaje: respuesta })
    });
    setRespuesta('');
    verConversacion(usuarioActivo);
  };

  const cambiarEstado = async (estado) => {
    await fetch(`${API}/api/chat/${usuarioActivo}/estado`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado })
    });
    fetchConversaciones();
  };

  useEffect(() => {
    fetchConversaciones();
  }, [area, fecha]);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div>
        <h2 className="text-xl font-bold mb-2">Conversaciones</h2>
        <select value={area} onChange={(e) => setArea(e.target.value)} className="mb-2">
          <option value=''>Todas las áreas</option>
          <option>Escuela de Oficios</option>
          <option>Incubadora</option>
          <option>Nación</option>
          <option>Economía Social</option>
          <option>Punto Digital</option>
        </select>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="mb-2 ml-2" />

        <ul className="bg-white shadow rounded p-2">
          {conversaciones.map((chat) => (
            <li key={chat.id} className="border-b py-2 cursor-pointer" onClick={() => verConversacion(chat.id)}>
              <strong>{chat.id}</strong> - {chat.area} - {chat.estado} - {format(chat.timestamp.toDate(), 'dd/MM/yyyy HH:mm')}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Mensajes</h2>
        {usuarioActivo ? (
          <>
            <ul className="h-96 overflow-y-scroll bg-gray-100 p-2 rounded">
              {mensajes.map((msg, idx) => (
                <li key={idx} className={`mb-1 ${msg.origen === 'usuario' ? 'text-left' : 'text-right'}`}>
                  <span className="inline-block bg-white px-3 py-1 rounded shadow">
                    {msg.mensaje}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex gap-2">
              <input value={respuesta} onChange={(e) => setRespuesta(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Escribir respuesta..." />
              <button onClick={responder} className="bg-blue-500 text-white px-4 py-2 rounded">Enviar</button>
            </div>
            <div className="mt-2">
              <button onClick={() => cambiarEstado('atendiendo')} className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded">Atendiendo</button>
              <button onClick={() => cambiarEstado('en espera')} className="mr-2 bg-gray-500 text-white px-3 py-1 rounded">En espera</button>
              <button onClick={() => cambiarEstado('respondido')} className="bg-green-600 text-white px-3 py-1 rounded">Respondido</button>
            </div>
          </>
        ) : (
          <p>Seleccioná un chat para ver los mensajes.</p>
        )}
      </div>
    </div>
  );
}
