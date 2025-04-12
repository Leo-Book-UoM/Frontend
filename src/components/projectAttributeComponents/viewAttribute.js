import React, {useState} from 'react'
import AddItemButton from '../addItemButton';

function viewAttribute() {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleProjectAdded = async () => {
        setIsFormVisible(false);
      }
  return (
    <AddItemButton onClick={() => setIsFormVisible(true)} />
  )
}

export default viewAttribute