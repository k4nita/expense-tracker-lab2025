import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Register from './screens/Register';
import ExpenseTrackerScreen from './screens/ExpenseTracker';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Load user session from cookie
  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/me', { withCredentials: true })
      .then(res => {
        setUser(res.data.user);
      })
      .catch(err => {
        console.log('Not logged in');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        window.location.href = '/login';
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Router>
      <div style={{ padding: '1rem' }}>
        {user && (
          <div style={{ marginBottom: '1rem' }}>
            <p>Welcome, {user.username} ({user.email})</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
        <Routes>
          <Route
            path="/"
            element={<Navigate to={user ? "/dashboard" : "/login"} />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/tracker"
            element={user ? <ExpenseTrackerScreen user={user} /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
