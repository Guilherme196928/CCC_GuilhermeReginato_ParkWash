import { Navigate } from "react-router-dom";

function FuncionarioRoute({ children }) {
  const tipo = localStorage.getItem("tipo");

  if (tipo !== "funcionario") {
    return <Navigate to="/funcionario/login" replace />;
  }

  return children;
}

export default FuncionarioRoute;
