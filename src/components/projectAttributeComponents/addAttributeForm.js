'use client'
import React, { useEffect, useState } from "react"
import { Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Button } from "@mui/material"

const addAttributeForm = ({ open, onClose, onAdded }) => {
    const [attributeName, setAttributeName] = useState('');
    const [directorId, setDirectorId] = useState('');
    const [directors, setDirectors] = useState([]);

    const fetchDirectors = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/getDerectorPositions`);
            const data = await response.json();
            setDirectors(data);
        } catch (error) {
            console.error('Error fetching directors:', error);
        }
    };

    useEffect(() => {
        if (open) fetchDirectors();
    }, [open]);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/addAttribute`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ attributeName, directorId })
            });

            if (response.ok) {
                onAdded();
                setAttributeName('');
                setDirectorId('');
            } else {
                console.error('Failed to add attribute');
            }
        } catch (error) {
            console.error('Error submitting attribute:', error);
        }
    };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Attribute</DialogTitle>
        <DialogContent className="space-y-4">
            <TextField 
                label="Attribute Name"
                variant="outlined"
                fullWidth
                value={attributeName}
                onChange={(e) => setAttributeName(e.target.value)}
            />
            <FormControl fullWidth>
                <InputLabel>Director</InputLabel>
                <Select
                    value={directorId}
                    onChange={(e) => setDirectorId(e.target.value)}
                    label="Director"
                >
                    {directors.map((director) => (
                        <MenuItem key={director.officerId} value={director.officerId}>
                            {director.designationName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </DialogContent>
        <DialogActions>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Add</Button>
        </DialogActions>
    </Dialog>
  )
}

export default addAttributeForm