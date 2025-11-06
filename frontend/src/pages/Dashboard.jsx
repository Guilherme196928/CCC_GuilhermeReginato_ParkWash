import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) navigate("/login");
    else setUsuario(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-indigo-900 flex flex-col items-center justify-center text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Bem-vindo ao ParkWash 🚗</h1>

      {usuario && (
        <h2 className="text-xl mb-8">Olá, {usuario.nome || "usuário"}!</h2>
      )}

      <div className="grid grid-cols-1 gap-4 w-64">
        <button
          onClick={() => navigate("/reserva")}
          className="bg-blue-600 hover:bg-blue-700 py-3 rounded-2xl shadow-lg text-lg transition"
        >
          🅿️ Reservar Vaga
        </button>

        <button
          onClick={() => navigate("/lavagem")}
          className="bg-blue-600 hover:bg-blue-700 py-3 rounded-2xl shadow-lg text-lg transition"
        >
          🧽 Agendar Lavagem
        </button>

        <button
          onClick={() => navigate("/historico")}
          className="bg-blue-600 hover:bg-blue-700 py-3 rounded-2xl shadow-lg text-lg transition"
        >
          📋 Histórico
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 py-3 rounded-2xl shadow-lg text-lg transition"
        >
          🚪 Sair
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
