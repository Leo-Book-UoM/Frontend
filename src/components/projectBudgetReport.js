import React, { useEffect, useState } from "react";
import AddProjectBudgetDetailes from "./addProjectBudgetDetailes";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Download as DownloadIcon, Visibility as VisibilityIcon } from "@mui/icons-material";

const ProjectBudgetReport = ({ projectId }) => {
  const [income, setIncome] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [billPreview, setBillPreview] = useState(null);

  const fetchBudgetIncome = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getprojectBudget/${projectId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch project budget data");
      }
      const data = await response.json();
      setIncome(data);

      const total = data.reduce((acc, item) => acc + (parseFloat(item.amount) || 0), 0);
      setTotalAmount(total);
    } catch (error) {
      console.error("Error fetching budget details:", error);
      setIncome([]);
    }
  };

  useEffect(() => {
    fetchBudgetIncome();
  }, [projectId]);

  const handleBudgetAdded = (newBudget) => {
    setIncome((prevIncome) => [...prevIncome, { description: newBudget.description }]);
    setTotalAmount((prevTotal) => prevTotal + parseFloat(newBudget.amount));
  };

  const formatAmount = (amount) => {
    return parseFloat(amount)
      .toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      .replace(/,/g, " ");
  };

  const handleBillPreview = (billUrl) => {
    setBillPreview(billUrl);
    setPreviewOpen(true);
  };

  const handleBillDownload = (billUrl) => {
    const link = document.createElement("a");
    link.download = billUrl.split("/").pop(); 
    window.open(billUrl, "_blank"); 
    link.click();
  };

  return (
    <div className="rounded-2xl shadow-lg">
      <h2 className="text-white text-2xl font-semibold mb-4">Project Budget Report</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-white bg-gray-600 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Bill</th>
            </tr>
          </thead>
          <tbody>
            {income.length > 0 ? (
              income.map((item, index) => (
                <tr key={index} className="border-b border-gray-800">
                  <td className="px-6 py-3">{item.description || "N/A"}</td>
                  <td className="px-6 py-3">{formatAmount(item.amount) || "0.00"}</td>
                  <td className="px-6 py-3">
                    {item.bill ? (
                      <a href="#" onClick={() => handleBillPreview(item.bill)}>
                        <VisibilityIcon color="primary" />
                      </a>
                    ) : (
                      "N/A"
                    )}
                    {item.bill && (
                      <IconButton onClick={() => handleBillDownload(item.bill)}>
                        <DownloadIcon color="primary" />
                      </IconButton>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-3 text-center">No Data Available</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="bg-gray-800 font-bold text-green-600">
              <td className="px-6 py-3">Total</td>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">{formatAmount(totalAmount)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      {isModelOpen && (
        <AddProjectBudgetDetailes
          projectId={projectId}
          onClose={() => setIsModelOpen(false)}
          onBudgetAdded={handleBudgetAdded}
        />
      )}
      <div className="flex justify-end mt-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsModelOpen(true)}
        >
          + Add Budget
        </Button>
      </div>

      {/* Bill Preview Modal */}
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Bill Preview</DialogTitle>
        <DialogContent>
          {billPreview ? (
            <img src={billPreview} alt="Bill Preview" style={{ width: "100%", height: "auto" }} />
          ) : (
            <p>No image available</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProjectBudgetReport;
