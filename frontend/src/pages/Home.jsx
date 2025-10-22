import React from "react";
import { Button } from "../components/Button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-gray-800 px-4">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-3">
        Park<span className="text-gray-900">Wash</span>
      </h1>

      <p className="text-center text-lg max-w-md mb-8">
        Reserve vagas de estacionamento e agende lavagens privadas em um só
        lugar — rápido, prático e confiável.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button text="Entrar" variant="primary" />
        <Button text="Cadastrar" variant="secondary" />
      </div>
    </div>
  );
}
