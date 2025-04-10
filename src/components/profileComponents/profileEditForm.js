import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button} from "@/mui/material";

export default function ProfileEditForm({ open, onClose, userDetails, setUserDetails, onSave }) {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent dividers>
        <TextField
          label="User Name"
          fullWidth
          margin="normal"
          value={userDetails.userName}
          onChange={(e) => setUserDetails({ ...userDetails, userName: e.target.value })}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
        />
        <TextField
          label="Mobile"
          fullWidth
          margin="normal"
          value={userDetails.mobile}
          onChange={(e) => setUserDetails({ ...userDetails, mobile: e.target.value })}
        />
        <TextField
          label="Date of Birth"
          fullWidth
          margin="normal"
          value={userDetails.dob}
          onChange={(e) => setUserDetails({ ...userDetails, dob: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={onSave} variant="contained" color="primary">Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
}