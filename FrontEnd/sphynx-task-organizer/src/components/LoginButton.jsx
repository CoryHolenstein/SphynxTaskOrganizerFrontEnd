import { Button } from "@mui/material";
import { useAuth } from "react-oidc-context";

export default function LoginButton({ name = "Sign In" }) {
  const auth = useAuth();

  const handleLogin = () => {
    auth.signinRedirect();
  };

  return (
    <Button
      variant="outlined"
      size="large"
      onClick={handleLogin}
      sx={{
        borderColor: "white",
        color: "white",
        px: 4,
        py: 1.5,
        fontSize: "16px",
        fontWeight: "bold",
        textTransform: "none",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "white"
        }
      }}
    >
      {name}
    </Button>
  );
}
