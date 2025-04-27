import React, { useState } from 'react';
import {Button,Dialog,DialogTitle,DialogContent,DialogActions,CircularProgress} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';


const DeleteMemberButton = ({ memberId, onSuccess }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/dropMember/${memberId}`);
      setOpenDialog(false);
      onSuccess();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Error deleting member");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="text"
        color="error"
        startIcon={
          loading ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />
        }
        onClick={() => setOpenDialog(true)}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete"}
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Member Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this member?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteMemberButton;
