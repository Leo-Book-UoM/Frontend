import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography,IconButton,Menu,MenuItem} from '@mui/material';
import AddItemButton from '@/components/addItemButton';
import AddMemberForm from './addMemberForm';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteMemberButton from './deleteButton';

export default function MembersTable() {
  const [members, setMembers] = useState([]);
  const [isFromVisible,setIsFormVisible] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState(null);

    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getAllMembers'); 
        setMembers(response.data);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

useEffect(() => { 
    fetchMembers();
  }, []);

  const getMemberTypeLabel = (type) => {
    if (type == '1') return "Board Member";
    if (type == '2') return "Former Board Member";
    if (type == '3') return "New Leo";
    return '-';
  }

  const handleMemberAdded = async () => {
    setIsFormVisible(false);
    await fetchMembers();
  }

  const handleMenuOpen = (event, memberId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedMemberId(memberId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedMemberId(null);
  };

  const handleDeleteSuccess = async (deletedId) => {
    handleMenuClose();
    setMembers(prev => prev.filter(member => member.memberId !== deletedId));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Typography variant="h5" className="mb-4 text-blue-600 font-bold">
        Membership List
      </Typography>
      <TableContainer component={Paper} className="shadow-lg rounded-xl">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>MyLCI</TableCell>
              <TableCell>MyLEO</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Added Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.memberId}>
                <TableCell>{member.memberName}</TableCell>
                <TableCell>{getMemberTypeLabel(member.memberType)}</TableCell>
                <TableCell>{member.myLCI ? '✅' : '❌'}</TableCell>
                <TableCell>{member.myLEO ? '✅' : '❌'}</TableCell>
                <TableCell>
                  {member.dob ? new Date(member.dob).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell>
                  {member.addDate
                    ? new Date(member.addDate).toLocaleDateString()
                    : '-'}
                </TableCell>
                <TableCell align='right'>
                  <IconButton onClick={(event) => handleMenuOpen(event, member.memberId) }>
                    <MoreVertIcon/>
                  </IconButton>
                  <Menu
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl && selectedMemberId === member.memberId)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={(event) => {event.stopPropagation(); setSelectedEditBook(book); setOpen(true); }}>Edit</MenuItem>
                    <MenuItem onClick={(event) => {event.stopPropagation();}}>
                    <DeleteMemberButton
                      memberId={member.memberId}
                      onSuccess={() => handleDeleteSuccess(member.memberId)}
                    />
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddItemButton onClick={() => setIsFormVisible(true)} />
        <AddMemberForm
          open={isFromVisible}
          onClose={() => setIsFormVisible(false)}
          onSuccess={handleMemberAdded}
        />
    </div>
  );
}
