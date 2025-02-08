import React, { useEffect , useState} from "react";
import AddProjectBudgetDetailes from "./addProjectBudgetDetailes";

const ProjectBudgetReport = ({projectId}) => {
const[ income , setIncome] = useState([]);
const[isModelOpen, setIsModelOpen] = useState(false);

const fetchBudgetIncome = async () =>{
    try{
        const response = await fetch(`http://localhost:5000/api/getprojectBudget/${projectId}/1`)
        if(!response.ok){
            throw new Error(("Failed to fetch project budget data"));
        }
        const data = await response.json();
        console.log(data);
        setIncome(data);
    }catch(error){
        console.error("Error fetching budget detailes:",error);
        setIncome([]);
    }
};

useEffect(() => {
    fetchBudgetIncome();
},[projectId]);

return(
    <div className="rounded-2xl shadow-lg">
    <h2 className="text-white text-2xl font-semibold mb-4">Project Budget Report</h2>
    <button className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    onClick={()=> setIsModelOpen(true)}
    >
        + Add Budget
    </button>
    <div className="overflow-x-auto">
        <table className="w-full text-white bg-gray-600 rounded-lg shadow-md">
            <thead>
                <tr className="bg-gray-800">
                    <th className="px-6 py-3 text-left">Description</th>
                    <th className="px-6 py-3 text-left">Bill No.</th>
                    <th className="px-6 py-3 text-left">Amount</th>
                </tr>
            </thead>
            <tbody>
                {income.length > 0 ? (
                    income.map((item, index) =>
                        item.description.map((desc, subIndex) => (
                            <tr key={`${index}-${subIndex}`} className="border-b border-gray-800">
                                <td className="px-6 py-3">{desc.description || "N/A"}</td>
                                <td className="px-6 py-3">{desc.billNo || "N/A"}</td>
                                <td className="px-6 py-3">{desc.amount || "N/A"}</td>
                            </tr>
                        ))
                    )
                ) : (
                    <tr>
                        <td colSpan="3" className="px-6 py-3 text-center">No Data Available</td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
    {isModelOpen && (
            <AddProjectBudgetDetailes projectId={projectId} onClose={() => setIsModelOpen(false)} />
    )}
</div>
);
}
export default ProjectBudgetReport;