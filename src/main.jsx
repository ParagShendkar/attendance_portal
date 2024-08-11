import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/login/Login';
import SignIn from './components/sign/SignIn';
import AdminPage from './components/admin/AdminPage';
import Attendance from './components/attendance/Attendance';
import AttendanceReport from './components/report/AttendanceReport';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="SignIn" element={<SignIn />} />
        <Route path="AdminPage" element={<AdminPage />} />
        <Route path="Attendance" element={<Attendance />} />
        <Route path="AttendanceReport" element={<AttendanceReport />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
