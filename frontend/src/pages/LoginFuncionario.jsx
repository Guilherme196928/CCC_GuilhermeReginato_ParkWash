import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginFuncionario() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/loginFuncionario",
        { email, senha }
      );

      
      localStorage.setItem("tokenFuncionario", response.data.token);

      
      localStorage.setItem("tipo", response.data.funcionario.tipo);

      
      navigate("/funcionario/dashboard");

    } catch (err) {
      setErro(err.response?.data?.error || "Erro ao fazer login.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-600 text-white">
      <h1 className="text-3xl font-bold mb-6">Login Funcionário</h1>

      <form
        onSubmit={handleLogin}
        className="bg-white text-black rounded-lg p-6 w-96 shadow-lg flex flex-col gap-4"
      >
        {erro && (
          <div className="bg-red-200 text-red-700 px-3 py-2 rounded">
            {erro}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="border p-2 rounded"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default LoginFuncionario;
