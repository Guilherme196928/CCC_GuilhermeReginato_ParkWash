import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Lavagem() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [estacionamento, setEstacionamento] = useState("");
  const [tipo, setTipo] = useState("Simples");
  const [preco, setPreco] = useState(30);
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) navigate("/login");
    else setUsuario(JSON.parse(userData));
  }, [navigate]);

  const tiposLavagem = [
    { nome: "Simples", preco: 30 },
    { nome: "Completa", preco: 50 },
    { nome: "Polimento", preco: 80 },
  ];

  const handleTipoChange = (e) => {
    const tipoSelecionado = tiposLavagem.find((t) => t.nome === e.target.value);
    setTipo(tipoSelecionado.nome);
    setPreco(tipoSelecionado.preco);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/lavagens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_id: usuario.id,
          estacionamento,
          tipo,
          preco,
          data_lavagem: data,
          hora,
        }),
      });

      const dataRes = await response.json();

      if (response.ok) {
        setMensagem(dataRes.message);
        setEstacionamento("");
        setData("");
        setHora("");
      } else {
        setMensagem(`❌ ${dataRes.message}`);
      }
    } catch (error) {
      setMensagem("❌ Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-indigo-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-3xl font-bold mb-6">Agendar Lavagem</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white text-blue-800 rounded-2xl p-8 shadow-lg w-80 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Nome do Carro"
          value={estacionamento}
          onChange={(e) => setEstacionamento(e.target.value)}
          className="border rounded-lg p-2"
          required
        />

        <select
          value={tipo}
          onChange={handleTipoChange}
          className="border rounded-lg p-2"
        >
          {tiposLavagem.map((t) => (
            <option key={t.nome} value={t.nome}>
              {t.nome} - R$ {t.preco}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="border rounded-lg p-2"
          required
        />

        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          className="border rounded-lg p-2"
          required
        />

        <button
          type="submit"
          className="bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Confirmar Lavagem
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

export default Lavagem;
