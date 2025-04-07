import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Typography, CircularProgress } from '@mui/material';
import { Visibility, Download } from '@mui/icons-material';

const ViewProjectReport = ({ projectId }) => {
  const [loading, setLoading] = useState(true);
  const [reportURL, setReportURL] = useState(null);
  const [error, setError] = useState(null);

  const fetchReport = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/getReport/${projectId}`);
      const reportPath = response.data.reportLink;
      setReportURL(`http://localhost:5000${reportPath}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch report');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [projectId]);

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <Typography variant="h5" className="text-center font-bold mb-4 text-purple-700">
        View Project Report
      </Typography>

      {loading && (
        <div className="text-center">
          <CircularProgress color="primary" />
          <Typography variant="body2" className="mt-2 text-gray-600">
            Loading report...
          </Typography>
        </div>
      )}

      {error && (
        <Typography variant="body2" className="text-center text-red-600">
          {error}
        </Typography>
      )}

      {reportURL && (
        <>
          <Typography className="mb-2 text-purple-600 font-semibold">Report Preview:</Typography>
          <iframe
            src={reportURL}
            className="w-full h-64 rounded border border-gray-300"
            title="Project Report Preview"
          ></iframe>
          <div className="text-center mt-4">
            <a
              href={reportURL}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium"
            >
              <Download className="mr-2" /> Download PDF
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewProjectReport;
