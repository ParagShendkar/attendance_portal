import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function AttendanceReport() {
  const [attendanceData, setAttendanceData] = useState([]);
  
  const location = useLocation();
  const studentName = location.state?.username || 'defaultStudentName'; // Replace 'defaultStudentName' with a fallback if needed

  useEffect(() => {
    fetch(`http://localhost:8080/attendance_page/get_attendance_report/${studentName}`)
      .then(response => response.json())
      .then(data => setAttendanceData(data))
      .catch(error => console.error('Error fetching attendance data:', error));
  }, [studentName]);

  return (
    <div className="max-w-lg mx-auto flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Attendance Report for {studentName}</h1>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">SrNo.</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Sign In Time</th>
              <th className="px-4 py-2 border">Sign Out Time</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.length > 0 ? (
              attendanceData.map((entry, index) => (
                <tr key={index} className="text-center">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{entry.date}</td>
                  <td className="px-4 py-2 border">{entry.signIn}</td>
                  <td className="px-4 py-2 border">{entry.signOut}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 border text-center">No attendance records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceReport;
