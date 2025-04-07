"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import AuthWrapper from '@/components/authWrapper';
import SecretaryLayout from '@/components/layout/secrataryLayout';

const ProjectReportPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/lastMonthProjectReports'); 
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Failed to fetch project reports');
        setReports(data.result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <AuthWrapper>
        <SecretaryLayout>
    <div className="min-h-screen bg-gray-900 via-white to-purple-50 p-8">
      <Typography variant="h4" className="text-center text-blue-700 font-bold mb-10 ">
        <DescriptionIcon style={{ fontSize: '40px' }}/> Last Month Project Reports
      </Typography>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <CircularProgress />
        </div>
      ) : error ? (
        <Typography variant="body1" className="text-red-600 text-center">{error}</Typography>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto mt-5">
          {reports.map((report, index) => (
            <Card
            key={index}
            className="bg-gray-900 text-white rounded-2xl shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
          >          
              <CardContent className="flex flex-col items-center text-center space-y-4 ">
                <DescriptionIcon className="text-blue-600" fontSize="large" />
                <Typography variant="h6" className="text-gray-800 font-semibold">
                  {report.projectname}
                </Typography>
                {report.projectReport ? (
                  <a
                    href={`http://localhost:5000${report.projectReport}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 hover:underline"
                  >
                    View Report
                  </a>
                ) : (
                  <Typography variant="body2" className="text-gray-500">
                    No report available.
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
    </SecretaryLayout>
    </AuthWrapper>
  );
};

export default ProjectReportPage;
