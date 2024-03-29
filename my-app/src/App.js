import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register.js';
import SignIn from './pages/SignIn.js';
import Home from './pages/Home.js';
import AddPatient from './pages/AddPatient.js';
import RecordPatient from './pages/RecordPatient.js';
import ViewPatients from './pages/ViewPatients.js';
import EditPatient from './pages/EditPatient';
import AdminDashboard from './pages/AdminDashboard.js';
import AdminOverview from './pages/AdminOverview.js';
import ResetPassword from './pages/ResetPassword.js';
import AdminPatientData from './pages/AdminPatientData.js';
import AdminTokens from './pages/AdminTokens.js';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />}></Route>
        <Route path="home/addpatient" element={<AddPatient />}></Route>
        <Route path="home/viewpatients" element={<ViewPatients />}></Route>
        <Route path="home/viewpatients/recordpatient" element={<RecordPatient />}></Route>
        <Route path="home/viewpatients/editpatient" element={<EditPatient />}></Route>
        <Route path="admin/dashboard" element={<AdminDashboard />}></Route>
        <Route path="admin/overview" element={<AdminOverview />}></Route>
        <Route path="admin/data" element={<AdminPatientData />}></Route>
        <Route path="admin/tokens" element={<AdminTokens />}></Route>
      </Routes>
    </div>
  );
}