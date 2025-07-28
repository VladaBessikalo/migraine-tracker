import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";
import { useAuth } from "./hooks/useAuth.ts";
import AuthRoute from "./auth/AuthRoute.tsx";

function App() {
  useAuth();

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <AuthRoute>
            <AuthPage />
          </AuthRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      {/* Catch-all route - redirect unknown paths to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
