import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

function AdminPage() {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/admin_report/get_all_users')
      .then(response => response.json())
      .then(data => setStudentData(data))
      .catch(error => console.error('Error fetching attendance data:', error));
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      {studentData.length > 0 ? (
        studentData.map((student, index) => (
          <div key={index}>
            <NavLink 
              to={{
                pathname: '/AttendanceReport',
                state: { username: student.student_username } // Passing username via state
              }}
            >
              <h2 className='text-blue-600 font-semibold'>
                {index + 1}. {student.student_username}
              </h2>
            </NavLink>
          </div>
        ))
      ) : (
        <h2>No Student Data present</h2>
      )}
    </div>
  );
}

export default AdminPage;
