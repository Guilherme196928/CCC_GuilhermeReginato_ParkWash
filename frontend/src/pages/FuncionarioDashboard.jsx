import { useEffect, useState } from "react";

function FuncionarioDashboard() {
  const [reservas, setReservas] = useState([]);
  const [lavagens, setLavagens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {

        const r1 = await fetch("http://localhost:3001/api/reservas/all");
        const reservasData = await r1.json();
        setReservas(reservasData);

        
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

      {}
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
              <th>Veiculo</th>
              <th>Preco</th>
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
                <td>{r.preco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr style={{ margin: "40px 0" }} />

      {}
      <h3>Lavagens Agendadas</h3>
      {lavagens.length === 0 ? (
        <p>Nenhuma lavagem encontrada.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: 10 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Veiculo</th>
              <th>Tipo</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {lavagens.map((l) => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.nome_usuario}</td>
                <td>{l.estacionamento}</td>
                <td>{l.tipo}</td>
                <td>{new Date(l.data_lavagem).toLocaleDateString()}</td>
                <td>{l.hora}</td>
                <td>R$ {l.preco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FuncionarioDashboard;
