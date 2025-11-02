import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Verifica se o usuário está logado
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-900 text-white flex flex-col items-center p-6">
      <header className="w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">ParkWash</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Sair
        </button>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 w-full">
        <h2 className="text-2xl mb-8">
          Bem-vindo, <span className="font-semibold">{user?.nome}</span> 👋
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
          <button
            onClick={() => alert("Tela de reserva em breve!")}
            className="bg-white text-blue-700 font-semibold py-4 rounded-2xl shadow-lg hover:bg-blue-100 transition"
          >
            Reservar Vaga
          </button>
          <button
            onClick={() => alert("Tela de lavagem em breve!")}
            className="bg-white text-blue-700 font-semibold py-4 rounded-2xl shadow-lg hover:bg-blue-100 transition"
          >
            Agendar Lavagem
          </button>
          <button
            onClick={() => alert("Tela de histórico em breve!")}
            className="bg-white text-blue-700 font-semibold py-4 rounded-2xl shadow-lg hover:bg-blue-100 transition"
          >
            Histórico
          </button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
