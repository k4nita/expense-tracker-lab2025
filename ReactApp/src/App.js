import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Register from './screens/Register';
import ExpenseTrackerScreen from './screens/ExpenseTracker';

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔄 Change default route to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tracker" element={<ExpenseTrackerScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
