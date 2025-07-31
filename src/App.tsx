import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";
import { useAuth } from "./hooks/useAuth.ts";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./components/Header.tsx";
import { theme } from "./theme/theme.tsx";

function App() {
  useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* This applies the theme's background color globally */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Container
          maxWidth="lg"
          component="main"
          sx={{
            mt: 8,
            flexGrow: 1,
            pt: 5,
            pb: 3,
          }}
        >
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
    </ThemeProvider>
  );
}

export default App;
