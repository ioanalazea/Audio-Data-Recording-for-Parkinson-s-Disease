import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Register from './pages/Register.js';
import SignIn from './pages/SignIn.js';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        
      </Routes>
    </div>
  );
}