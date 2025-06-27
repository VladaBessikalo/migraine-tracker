import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.tsx';
import AuthPage from './pages/AuthPage.tsx';
import ProtectedRoute from './auth/ProtectedRoute.tsx';

function App() {

  return (
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
  )
}

export default App
