import { useEffect, useState } from "react";

function FuncionarioDashboard() {
  const [reservas, setReservas] = useState([]);
  const [lavagens, setLavagens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Reservas
        const r1 = await fetch("http://localhost:3001/api/reservas/all");
        const reservasData = await r1.json();
        setReservas(reservasData);

        // Lavagens
        const r2 = await fetch("http://localhost:3001/api/lavagens/all");
        const lavagensData = await r2.json();
        setLavagens(lavagensData);

      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Painel do Funcionário</h2>

      {/* ======================================================
         TABELA DE RESERVAS DE ESTACIONAMENTO
      ====================================================== */}
      <h3>Reservas de Estacionamento</h3>
      {reservas.length === 0 ? (
        <p>Nenhuma reserva encontrada.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: 10 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Estacionamento</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.nome_usuario}</td>
                <td>{new Date(r.data_reserva).toLocaleDateString()}</td>
                <td>{r.hora_entrada} - {r.hora_saida}</td>
                <td>{r.estacionamento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr style={{ margin: "40px 0" }} />

      {/* ======================================================
         TABELA DE LAVAGENS AGENDADAS
      ====================================================== */}
      <h3>Lavagens Agendadas</h3>
      {lavagens.length === 0 ? (
        <p>Nenhuma lavagem encontrada.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: 10 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Estacionamento</th>
              <th>Tipo</th>
              <th>Preço</th>
              <th>Data</th>
              <th>Horário</th>
            </tr>
          </thead>
          <tbody>
            {lavagens.map((l) => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.nome_usuario}</td>
                <td>{l.estacionamento}</td>
                <td>{l.tipo}</td>
                <td>R$ {l.preco}</td>
                <td>{new Date(l.data_lavagem).toLocaleDateString()}</td>
                <td>{l.hora}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FuncionarioDashboard;
