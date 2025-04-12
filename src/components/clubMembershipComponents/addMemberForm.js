import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

export default function AddMemberPopup({ open, handleClose, onSuccess }) {
  const [formData, setFormData] = useState({
    memberName: '',
    memberType: '',
    myLCI: false,
    myLEO: false,
    dob: '',
    addDate: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/addMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); 
        console.error('Server responded with:', errorText);
        throw new Error('Failed to add member');
      }
  
      const data = await response.json();
  
      onSuccess && onSuccess(); 
      handleClose && handleClose(); 
    } catch (error) {
      console.error('Add member failed:', error);
    }
  };
  
  

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-blue-600 font-bold">Add New Member</DialogTitle>
      <DialogContent className="space-y-4">
        <TextField
          fullWidth
          label="Member Name"
          name="memberName"
          value={formData.memberName}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel>Member Type</InputLabel>
          <Select
            name="memberType"
            value={formData.memberType}
            onChange={handleChange}
            label="Member Type"
          >
            <MenuItem value={1}>Board Member</MenuItem>
            <MenuItem value={2}>Former Board Member</MenuItem>
          </Select>
        </FormControl>
        <div className="flex gap-4">
          <FormControlLabel
            control={
              <Checkbox
                name="myLCI"
                checked={formData.myLCI}
                onChange={handleChange}
              />
            }
            label="MyLCI"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="myLEO"
                checked={formData.myLEO}
                onChange={handleChange}
              />
            }
            label="MyLEO"
          />
        </div>
        <TextField
          fullWidth
          type="date"
          label="Date of Birth"
          name="dob"
          InputLabelProps={{ shrink: true }}
          value={formData.dob}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          type="date"
          label="Added Date"
          name="addDate"
          InputLabelProps={{ shrink: true }}
          value={formData.addDate}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions className="px-6 pb-4">
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add Member
        </Button>
      </DialogActions>
    </Dialog>
  );
}
