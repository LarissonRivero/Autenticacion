import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginUsers from './Views/LoginUsers';
import Register from './Views/Register';
import Private from './Views/Private';
import Auth from './Auth';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginUsers />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loginusers" element={<LoginUsers />} />
        <Route path="/private" element={<Auth><Private /></Auth>} />
      </Routes>
    </Router>
  );
}

export default App;
