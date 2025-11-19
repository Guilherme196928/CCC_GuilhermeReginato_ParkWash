import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Reserva() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [estacionamento, setEstacionamento] = useState("");
  const [data, setData] = useState("");
  const [horaEntrada, setHoraEntrada] = useState("");
  const [horaSaida, setHoraSaida] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) navigate("/login");
    else setUsuario(JSON.parse(userData));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: usuario.id,
          estacionamento,
          data_reserva: data,
          hora_entrada: horaEntrada,
          hora_saida: horaSaida,
        }),
      });

      const dataRes = await response.json();

      if (response.ok) {
        setMensagem(dataRes.message);
        setEstacionamento("");
        setData("");
        setHoraEntrada("");
        setHoraSaida("");
      } else {
        setMensagem(`❌ ${dataRes.message}`);
      }
    } catch (error) {
      setMensagem("❌ Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-6">Reservar Vaga</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white text-blue-700 rounded-2xl p-8 shadow-lg w-80 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Nome do Carro"
          value={estacionamento}
          onChange={(e) => setEstacionamento(e.target.value)}
          className="border rounded-lg p-2"
          required
        />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="border rounded-lg p-2"
          required
        />
        <input
          type="time"
          value={horaEntrada}
          onChange={(e) => setHoraEntrada(e.target.value)}
          className="border rounded-lg p-2"
          required
        />
        <input
          type="time"
          value={horaSaida}
          onChange={(e) => setHoraSaida(e.target.value)}
          className="border rounded-lg p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Confirmar Reserva
        </button>
      </form>

      {mensagem && <p className="mt-4">{mensagem}</p>}

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 text-white underline"
      >
        Voltar ao menu
      </button>
    </div>
  );
}

export default Reserva;
