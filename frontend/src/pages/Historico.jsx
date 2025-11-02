import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Historico() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [lavagens, setLavagens] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(userData);
    setUsuario(user);
    carregarHistorico(user.id);
  }, [navigate]);

  const carregarHistorico = async (id) => {
    try {
      const [resReservas, resLavagens] = await Promise.all([
        fetch(`http://localhost:3001/api/reservas/${id}`),
        fetch(`http://localhost:3001/api/lavagens/${id}`),
      ]);

      const reservasData = await resReservas.json();
      const lavagensData = await resLavagens.json();

      setReservas(reservasData);
      setLavagens(lavagensData);
    } catch (error) {
      console.error(error);
      setMensagem("❌ Erro ao carregar histórico.");
    }
  };

  const cancelarReserva = async (id) => {
    if (window.confirm("Tem certeza que deseja cancelar esta reserva?")) {
      await fetch(`http://localhost:3001/api/reservas/${id}`, { method: "DELETE" });
      setMensagem("🗑️ Reserva cancelada com sucesso!");
      carregarHistorico(usuario.id);
    }
  };

  const cancelarLavagem = async (id) => {
    if (window.confirm("Tem certeza que deseja cancelar esta lavagem?")) {
      await fetch(`http://localhost:3001/api/lavagens/${id}`, { method: "DELETE" });
      setMensagem("🗑️ Lavagem cancelada com sucesso!");
      carregarHistorico(usuario.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-800 to-indigo-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Histórico de Agendamentos</h1>

      {mensagem && <p className="text-center mb-4">{mensagem}</p>}

      {/* Reservas */}
      <div className="bg-white text-blue-800 rounded-2xl p-6 shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">📅 Reservas de Estacionamento</h2>
        {reservas.length === 0 ? (
          <p>Nenhuma reserva encontrada.</p>
        ) : (
          reservas.map((r) => (
            <div key={r.id} className="flex justify-between items-center border-b py-2">
              <div>
                <p><b>Estacionamento:</b> {r.estacionamento}</p>
                <p><b>Data:</b> {r.data_reserva}</p>
                <p><b>Entrada:</b> {r.hora_entrada} | <b>Saída:</b> {r.hora_saida}</p>
              </div>
              <button
                onClick={() => cancelarReserva(r.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
              >
                Cancelar
              </button>
            </div>
          ))
        )}
      </div>

      {/* Lavagens */}
      <div className="bg-white text-blue-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">🧽 Lavagens Agendadas</h2>
        {lavagens.length === 0 ? (
          <p>Nenhuma lavagem encontrada.</p>
        ) : (
          lavagens.map((l) => (
            <div key={l.id} className="flex justify-between items-center border-b py-2">
              <div>
                <p><b>Estacionamento:</b> {l.estacionamento}</p>
                <p><b>Tipo:</b> {l.tipo}</p>
                <p><b>Data:</b> {l.data_lavagem}</p>
                <p><b>Hora:</b> {l.hora}</p>
                <p><b>Preço:</b> R$ {l.preco}</p>
              </div>
              <button
                onClick={() => cancelarLavagem(l.id)}
                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
              >
                Cancelar
              </button>
            </div>
          ))
        )}
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 text-white underline block mx-auto"
      >
        Voltar ao menu
      </button>
    </div>
  );
}

export default Historico;
