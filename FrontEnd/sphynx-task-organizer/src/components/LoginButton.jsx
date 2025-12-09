// App.js

import { useAuth } from "react-oidc-context";

function LoginButton() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "57sdvrue6aqa3tj35vk64gfakv";
    const logoutUri = "http://localhost:5173/logout";
    const cognitoDomain = "https://us-east-1rrws7xxku.auth.us-east-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default LoginButton;