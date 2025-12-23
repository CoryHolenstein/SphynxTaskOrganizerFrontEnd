import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

export default function Callback() {
  const auth = useAuth();
  const navigate = useNavigate();
  const loginCognito = useAuthStore((s) => s.loginCognito);

  useEffect(() => {
    if (auth.isAuthenticated && auth.user) {
      console.log("[Callback] Authenticated. Syncing Cognito → Zustand.");

      const userData = auth.user.profile; // decoded ID token claims

      const tokens = {
        idToken: auth.user.id_token,
        accessToken: auth.user.access_token,
        refreshToken: auth.user.refresh_token,
      };

      loginCognito(userData, tokens);

      navigate("/dashboard");
    }
  }, [auth.isAuthenticated, auth.user]);

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Error: {auth.error.message}</div>;

  return <div>Completing login...</div>;
}
