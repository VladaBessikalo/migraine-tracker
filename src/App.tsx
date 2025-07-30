import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";
import { useAuth } from "./hooks/useAuth.ts";
import { Box, Container } from "@mui/material";
import Header from "./components/Header.tsx";

function App() {
  useAuth();

  return (
    <Box>
      <Header />
      <Container>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
