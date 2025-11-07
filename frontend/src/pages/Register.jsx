import React, { useState } from "react";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone, senha }),
      });

      const data = await response.json();
      if (response.ok) {
        setMensagem("✅ Cadastro realizado com sucesso!");
        setNome("");
        setEmail("");
        setTelefone("");
        setSenha("");
      } else {
        setMensagem(`❌ ${data.message || "Erro ao cadastrar usuário."}`);
      }
    } catch (error) {
      setMensagem("❌ Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-6">Cadastrar Usuário</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white text-blue-700 rounded-2xl p-8 shadow-lg w-80 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border rounded-lg p-2"
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg p-2"
          required
        />
        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="border rounded-lg p-2"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="border rounded-lg p-2"
          required
        />

        <button
          type="submit"
          className="bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Cadastrar
        </button>
      </form>

      {mensagem && <p className="mt-4">{mensagem}</p>}
    </div>
  );
}

export default Register;
