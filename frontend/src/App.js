import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
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
        </div>

        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
