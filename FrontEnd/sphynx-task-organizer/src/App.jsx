import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContextProvider } from "./context/ThemeContext";

import AppLayout from "./layouts/AppLayout";
import PublicLayout from "./layouts/PublicLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import Landing from "./pages/public/Landing";
import Callback from "./pages/public/Callback";
import LogoutPage from "./pages/public/LogoutPage";
import ErrorPage from "./pages/public/ErrorPage";
import AboutPage from "./pages/public/AboutPage";

import DashboardPage from "./pages/private/DashboardPage";

import useHydrateAuth from "./hooks/useHydrateAuth";

function App() {
  useHydrateAuth();

  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Public pages (no header) */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/callback" element={<Callback />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>

          {/* Protected pages (dashboard with tabs) */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
}

export default App;
