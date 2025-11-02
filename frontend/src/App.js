import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Reserva from "./pages/Reserva";
import Lavagem from "./pages/Lavagem";
import Historico from "./pages/Historico";



function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gradient-to-b from-blue-500 to-blue-800 flex flex-col justify-center items-center text-white">
              <h1 className="text-5xl font-bold mb-4">ParkWash</h1>
              <p className="text-lg mb-8 text-center max-w-md">
                Reserve sua vaga de estacionamento e agende a lavagem do seu carro de forma rápida e prática.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/register"
                  className="bg-white text-blue-700 font-semibold px-6 py-2 rounded-full hover:bg-blue-100 transition"
                >
                  Cadastrar
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-blue-700 font-semibold px-6 py-2 rounded-full hover:bg-blue-100 transition"
                >
                  Login
                </Link>
              </div>
            </div>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reserva" element={<Reserva />} />
        <Route path="/lavagem" element={<Lavagem />} />
        <Route path="/historico" element={<Historico />} />
      </Routes>
    </Router>
  );
}

export default App;
