import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
export default function Callback() {
  const auth = useAuth();
  const navigate = useNavigate();

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Error: {auth.error.message}</div>;

  if (auth.isAuthenticated) {
    navigate("/home");
    return null;
  }

  return <div>Completing login...</div>;
}
