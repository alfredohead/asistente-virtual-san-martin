import React, { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";

export default function App() {
  const [operador, setOperador] = useState(null);
  return operador ? (
    <Dashboard operador={operador} />
  ) : (
    <Login onLogin={setOperador} />
  );
}
