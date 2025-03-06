import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

const GeneralMeetingAttendance = ({ generalMeetingId }) => {
  const [attendance, setAttendance] = useState([]);
  const [tickedIds, setTickedIds] = useState([]);
  const [markAttendance, setMarkAttendance] = useState(false);

  const fetchOfficerAttendance = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getGMAttendance/${generalMeetingId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch officer attendance");
      }
      const data = await response.json();
      setAttendance(data);
      console.log("Fetched Attendance:", data); // Corrected logging
    } catch (error) {
      console.error("Error fetching attendance details:", error);
      setAttendance([]);
    }
  };

  const handleTickClick = (id) => {
    if (!markAttendance) return;

    setAttendance((prevAttendance) =>
      prevAttendance.map((participant) =>
        participant.officerId === id ? { ...participant, participation: !participant.participation } : participant
      )
    );
  };

  const handleGetTickIds = async () => {
    const participantsArr = attendance
      .filter((participant) => participant.participation)
      .map((participant) => participant.officerId);
  
    setTickedIds(participantsArr);
    console.log("TickedIds", participantsArr);
  
    try {
      const response = await fetch(`http://localhost:5000/api/markAttendance/${generalMeetingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ participantsArr }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add participants");
      }
  
      const attendanceData = await response.json();
      console.log("Updated Attendance:", attendanceData);
    } catch (error) {
      console.error("Error adding attendance:", error);
    }
  
    setMarkAttendance(false);
  };
  

  const handleClearAll = () => {
    setAttendance((prevAttendance) => prevAttendance.map((participant) => ({ ...participant, participation: false })));
    setTickedIds([]);
  };

  useEffect(() => {
    if (generalMeetingId) {
      fetchOfficerAttendance();
    }
  }, [generalMeetingId]);

  return (
    <div className="rounded-2xl shadow-lg p-4">
      <h2 className="text-blue-700 text-2xl font-semibold mb-4">Meeting Attendance of Club Officers</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-white bg-gray-600 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-6 py-3 text-left">Designation</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendance.length > 0 ? (
              attendance.map((participant, index) => (
                <tr key={index} className="border-b border-gray-800">
                  <td className="px-6 py-3">{participant.designationName || "N/A"}</td>
                  <td className="px-6 py-3">{participant.officerName || "N/A"}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleTickClick(participant.officerId)}
                      className="focus:outline-none"
                      disabled={!markAttendance}
                    >
                      {participant.participation ? (
                        <FaCheckCircle size={20} className="text-green-500" />
                      ) : (
                        <FaRegCircle className="text-red-500" size={20} />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-3 text-center">No Data Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-5 gap-3 mt-4">
        {markAttendance && (
          <button onClick={handleGetTickIds} className="p-2 bg-green-500 text-white rounded-lg">
            Submit Attendance
          </button>
        )}
        {markAttendance && (
          <button onClick={handleClearAll} className="p-2 bg-red-500 text-white rounded-lg">
            Clear All
          </button>
        )}
        {markAttendance && (
          <button onClick={() => setMarkAttendance(false)} className="p-2 bg-yellow-500 text-white rounded-lg">
            Cancel
          </button>
        )}
        {!markAttendance && (
          <button onClick={() => setMarkAttendance(true)} className="p-2 bg-blue-700 text-white rounded-lg">
            Mark Attendance
          </button>
        )}
      </div>
    </div>
  );
};

export default GeneralMeetingAttendance;
