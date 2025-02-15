import React, { useEffect , useState} from "react";
import {FaCheckCircle, FaRegCircle} from 'react-icons/fa';

const generalMeetingAttendance = ({generalMeetingId}) => {
const[ attendance , setAttendance ] = useState([]);

const fetchOfficerAttendance = async () =>{
    try{
        const response = await fetch(`http://localhost:5000/api/getGMAttendance/${generalMeetingId}`);
        if(!response.ok){
            throw new Error(("Failed to fetch officer Attendance"));
        }
        const data = await response.json();
        setAttendance(data);
        console.log(attendance)
    }catch(error){
        console.error("Error fetching attendance detailes:",error);
        setAttendance([]);
    }
};

useEffect(() => {
    if (generalMeetingId) {
      fetchOfficerAttendance();
    }
  }, [generalMeetingId]);


return(
    <div className="rounded-2xl shadow-lg">
    <h2 className="text-blue-700 text-2xl font-semibold mb-4">Meeting Attendance of Club Officers </h2>
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
                    attendance.map((participent, index) =>(
                            <tr key={`${index}`} className="border-b border-gray-800">
                                <td className="px-6 py-3">{participent.designationName || "N/A"}</td>
                                <td className="px-6 py-3">{participent.officerName || "N/A"}</td>
                                <td className="px-6 py-3">{participent.participation ? 
                                    <FaCheckCircle size={20} className="text-green-500" /> :<FaRegCircle className="text-red-500" size={20} />}</td>
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
</div>
);
};
export default generalMeetingAttendance;