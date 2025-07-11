import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Interface from './components/Interface';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/user/profile', { credentials: 'include' })
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/"  element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/interface"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Interface />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
