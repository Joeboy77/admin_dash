import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminPage from './components/AdminPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
