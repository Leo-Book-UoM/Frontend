import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, CircularProgress, Box } from '@mui/material';
import { CloudUpload, Download } from '@mui/icons-material';

const SubmitProjectReport = ({ projectId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [reportURL, setReportURL] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setMessage(null);
    } else {
      setMessage('Only PDF files are allowed');
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('report', selectedFile);

    try {
      setUploading(true);
      const response = await axios.patch(
        `http://localhost:5000/api/report/${projectId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setMessage(response.data.message);
      setReportURL(`http://localhost:5000${response.data.reportLink}`);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <Typography variant="h5" className="text-center font-bold mb-4 text-purple-700">
        Upload Project Report (PDF)
      </Typography>

      <div className="mb-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
        />
      </div>

      <Box className="text-center mb-4">
        <Button
          variant="contained"
          startIcon={<CloudUpload />}
          onClick={handleUpload}
          disabled={uploading}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6 py-2"
        >
          {uploading ? <CircularProgress size={24} color="inherit" /> : 'Upload'}
        </Button>
      </Box>

      {message && (
        <Typography
          variant="body2"
          className={`mb-4 text-center ${
            message.toLowerCase().includes('success') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </Typography>
      )}

      {reportURL && (
        <div className="mt-4">
          <Typography variant="subtitle1" className="text-purple-700 font-semibold mb-2">
            Report Preview:
          </Typography>
          <iframe
            src={reportURL}
            className="w-full h-64 border border-gray-300 rounded-md"
            title="PDF Preview"
          ></iframe>
          <div className="text-center mt-2">
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
        </div>
      )}
    </div>
  );
};

export default SubmitProjectReport;
