import React, {useEffect, useState} from 'react'
import AddItemButton from '../addItemButton';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,IconButton,Menu,MenuItem } from '@mui/material';
import AddAttributeForm from './addAttributeForm';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteAttributeButton from '../clubMembershipComponents/deleteButton';

function viewAttribute() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [attributes, setAttributes] = useState([]);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [selectedAttributeId, setSelectedAttributeId] = useState(null)

    const fetchProjectAttributes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/getAttributesList`);
        if (!response.ok) {
          throw new Error("Failed to fetch project Attributes");
        }
        const data = await response.json();
        setAttributes(data);
      } catch (error) {
        console.error("Error fetching attributes:", error);
        setAttributes([]);
      }
    };

    useEffect(() => {
      fetchProjectAttributes();
    },[]);

    const handleProjectAdded = async () => {
        setIsFormVisible(false);
        fetchProjectAttributes();
      };

    const handleMenuOpen = (event, attributeId) => {
      setMenuAnchorEl(event.currentTarget);
      setSelectedAttributeId(attributeId);
    };

    const handleMenuClose = () => {
      setMenuAnchorEl(null);
      setSelectedAttributeId(null);
    };

    const handleDeleteSuccess = async (deletedId) => {
      handleMenuClose();
      setAttributes(prev => prev.filter(attribute => attribute.attributeId !== deletedId));
    };

  return (
    <>
      <div className=" flex flex-col items-center">
            <Typography variant="h4" className="mb-6 text-gray-800 font-bold">
              Project Attributes
            </Typography>
            <TableContainer
              component={Paper}
              sx={{
                borderRadius: 3,
                boxShadow: 4,
                bgcolor: '#f9fafb',
                
                width: '100%'
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: '#374151' }}>
                    <TableCell align="center" sx={{ color: '#ffffff' }}>Attribute ID</TableCell>
                    <TableCell align="center" sx={{ color: '#ffffff' }}>Attribute Name</TableCell>
                    <TableCell align="center" sx={{ color: '#ffffff' }}>Director</TableCell>
                    <TableCell align="center" sx={{ color: '#ffffff' }}>Name of Director</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {attributes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ color: '#6b7280', fontStyle: 'italic' }}>
                      No attributes found. Please create an attribute.
                    </TableCell>
                  </TableRow>
                ) : (
                      attributes.map((attr, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            '&:nth-of-type(odd)': { backgroundColor: '#f3f4f6' },
                            '&:nth-of-type(even)': { backgroundColor: '#e5e7eb' }
                          }}
                        >
                          <TableCell align="center">{attr.attributeId}</TableCell>
                          <TableCell align="center">{attr.attributeName}</TableCell>
                          <TableCell align="center">{attr.designationName || 'N/A'}</TableCell>
                          <TableCell align="center">{attr.officerName || 'N/A'}</TableCell>
                          <TableCell align='right'>
                            <IconButton onClick={(event) => handleMenuOpen(event, attr.attributeId)}>
                              <MoreVertIcon/>
                            </IconButton>
                            <Menu
                              anchorEl={menuAnchorEl}
                              open={Boolean(menuAnchorEl && selectedAttributeId === attr.attributeId)}
                              onClose={handleMenuClose}
                            >
                              <MenuItem onClick={(event) => {event.stopPropagation(); }}>Edit</MenuItem>
                              <MenuItem onClick={(event) => {event.stopPropagation();}}>
                              <DeleteAttributeButton
                                attributeId={attr.attributeId}
                                onSuccess={() => handleDeleteSuccess(attr.attributeId)}
                              />
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      ))
                )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <AddItemButton onClick={() => setIsFormVisible(true)} />

          <AddAttributeForm
            open={isFormVisible}
            onClose={() => setIsFormVisible(false)}
            onAdded={handleProjectAdded}
          />
    </>
  );
}

export default viewAttribute