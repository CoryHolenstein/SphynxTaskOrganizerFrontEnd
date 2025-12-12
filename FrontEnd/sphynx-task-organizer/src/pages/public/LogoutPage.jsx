import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";

export default function LogoutPage() {
  const logout = useAuthStore((s) => s.logout);
  const [done, setDone] = useState(false);

  useEffect(() => {
    logout();
    setDone(true);
  }, [logout]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#121212" : "#f4f6f8",
        px: 2,
      }}
    >
      <Card
        elevation={4}
        sx={{
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          borderRadius: 3,
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Signed Out
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "text.secondary", mb: 3 }}
          >
            You have been successfully logged out.
          </Typography>

          {!done && <CircularProgress size={36} sx={{ mb: 2 }} />}

          <Typography variant="body2" color="text.secondary">
            You may close this window or log in again at any time.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
