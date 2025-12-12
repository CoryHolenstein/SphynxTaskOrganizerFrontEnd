// src/hooks/useHydrateAuth.js
import { useEffect, useRef } from "react";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";
import useAuthStore from "../store/useAuthStore";

export default function useHydrateAuth() {
  const hydrated = useRef(false);
  const loginCognito = useAuthStore((s) => s.loginCognito);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    async function hydrate() {
      try {
        const user = await getCurrentUser();
        const session = await fetchAuthSession();

        loginCognito(user, {
          idToken: session.tokens?.idToken?.toString(),
          accessToken: session.tokens?.accessToken?.toString(),
          refreshToken: session.tokens?.refreshToken?.toString(),
        });
      } catch {
        // Not logged in — that's fine
        logout();
      }
    }

    hydrate();
  }, [loginCognito, logout]);
}
