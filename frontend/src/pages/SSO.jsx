// SSO removed - normal login only
import { Navigate } from "react-router-dom";
export default function SSO() {
  return <Navigate to="/login" replace />;
}

