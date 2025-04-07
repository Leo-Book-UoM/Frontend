import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { Link } from '@mui/icons-material';

const ProjectProposalCard = ({ projectId }) => {
  const [loading, setLoading] = useState(true);
  const [proposalLink, setProposalLink] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const response = await fetch(`http://localhost:5000/getProposal/${projectId}`);
        const data = await response.json();

        if (response.ok) {
          setProposalLink(data.projectProposal);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to fetch project proposal');
      } finally {
        setLoading(false);
      }
    };

    fetchProposal();
  }, [projectId]);

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow ">
      <Card>
        <CardContent>
          <Typography variant="h6" className="text-center text-purple-600 font-bold mb-4">
            Project Proposal
          </Typography>

          {loading ? (
            <div className="text-center">
              <CircularProgress />
              <Typography variant="body2" className="mt-2 text-gray-600">
                Loading Proposal...
              </Typography>
            </div>
          ) : error ? (
            <Typography variant="body2" className="text-center text-red-600">
              {error}
            </Typography>
          ) : proposalLink ? (
            <div className="text-center">
              <Typography variant="body1" className="mb-4 text-gray-700">
                Click below to view or download the project proposal.
              </Typography>
              <a href={proposalLink} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Link />}
                  className="w-full py-2 bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  View Proposal
                </Button>
              </a>
            </div>
          ) : (
            <Typography variant="body2" className="text-center text-red-600">
              No proposal available.
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectProposalCard;
