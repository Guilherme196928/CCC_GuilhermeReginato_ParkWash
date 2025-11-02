import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ IMPORTAÇÃO CORRIGIDA

function Login() {
  const navigate = useNavigate(); // ✅ DECLARAÇÃO CORRETA DO HOOK

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMensagem("✅ Login realizado com sucesso!");
        setTimeout(() => navigate("/dashboard"), 1000); // ✅ REDIRECIONAMENTO FUNCIONAL
      } else {
        setMensagem(`❌ ${data.message}`);
      }
    } catch (err) {
      setMensagem("❌ Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-6">Login</h1>

      <form
        onSubmit={handleLogin}
        className="bg-white text-blue-700 rounded-2xl p-8 shadow-lg w-80 flex flex-col gap-4"
      >
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg p-2"
          required
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
          Entrar
        </button>
      </form>

      {mensagem && <p className="mt-4">{mensagem}</p>}
    </div>
  );
}

export default Login;
