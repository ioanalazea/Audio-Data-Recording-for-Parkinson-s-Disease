import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register.js';
import SignIn from './pages/SignIn.js';
import Home from './pages/Home.js';
import AddPatient from './pages/AddPatient.js';
import RecordPatient from './pages/RecordPatient.js';
import ViewPatients from './pages/ViewPatients.js';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />}></Route>
        <Route path="home/addpatient" element={<AddPatient />}></Route>
        <Route path="home/viewpatients" element={<ViewPatients />}></Route>
        <Route path="home/viewpatients/recordpatient" element={<RecordPatient />}></Route>
      </Routes>
    </div>
  );
}