import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Attendance() {
  const location = useLocation();
  const { username } = location.state || { username: 'Guest' };  // Default to 'Guest' if username is not passed

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const formattedTime = currentDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    setDate(formattedDate);
    setTime(formattedTime);
  }, []);

  async function attendanceIn(event) {
    event.preventDefault();

    const currentDate = new Date();
    const attendanceTimeIn = currentDate.toISOString(); // Format to ISO string

    const attendanceInData = {
      attendanceTimeIn: attendanceTimeIn,
      attendanceTimeOut: "2023-01-16T16:00:00", // You can change this to dynamically set the checkout time
      student: {
        student_username: username,  // Send the username as part of the attendance data
      }
    };

    try {
      const response = await fetch('http://localhost:8080/attendance_page/present_in', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attendanceInData)
      });

      if (response.ok) {
        console.log('Attendance submitted successfully.');
      } else {
        console.error('Failed to submit attendance.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="flex flex-col items-center max-w-md mx-auto bg-slate-300 py-8 px-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Attendance Page</h1>
      <div className="w-full flex justify-between mb-6">
        <p className="text-lg ">{date}</p>
        <p className="text-lg ">{time}</p>
      </div>
      <button 
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-green-700 transition-colors duration-300 mb-4"
        onClick={attendanceIn}
      >
        Sign In
      </button>
      <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors duration-300">
        View Report
      </button>
    </div>
  );
}

export default Attendance;
