import axios from 'axios';
import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa';

const  addProjectBudgetDetailes = ({projectId, onClose, onBudgetAdded}) => {
    const [description, setDescription] = useState([{description:"",billNo:"",amount:""}]);

    //handle input change
    const handleDescriptionChange = (index, field, value) => {
        const newDescription = [...description];
        newDescription[index][field] = value;
        setDescription(newDescription);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`http://localhost:5000/api/addprojectBudget/${projectId}`,{
                description
            });
            console.log("buddget added successfully!");
            onBudgetAdded(description)
            onClose();
        }catch(error){
            console.error("Error adding buddget",error);
        }
    };

    return(
        <div className='fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-6 w-96 shadow-md'>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Add Income</h2>
                    <button
                     onClick={onClose}
                     className="text-gray-500 hover:text-red-500"
                     title="Close"
                    >
            <FaTimes size={20} />
          </button>
        </div>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 gap-6'>
                {description.map((item, index) => (
                    <div key={index}>
                        <div className='mt-0'>
                        <label className='font-bold'>Description</label>
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={item.description}
                            onChange={(e) => handleDescriptionChange(index, "description", e.target.value)}
                            className='border rounded p-2 w-full '
                            required
                        />
                        </div>
                        <div className='mt-3'>
                        <label className='font-bold'>Bill No.</label>
                        <input
                            type="number"
                            name='billNo'
                            placeholder="Bill No"
                            value={item.billNo}
                            onChange={(e) => handleDescriptionChange(index, "billNo", e.target.value)}
                            className='border rounded p-2 w-full '
                        />
                        </div>
                        <div className='mt-3'>
                        <label className='font-bold'>Amount</label>
                        <input
                            type="number"
                            name='amoubt'
                            placeholder="Amount"
                            value={item.amount}
                            onChange={(e) => handleDescriptionChange(index, "amount", e.target.value)}
                            className='border rounded p-2 w-full '
                            required
                        />
                        </div>
                    </div>
                ))}

                <button type="submit" className='bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600'>Submit</button>
            </div>
            </form>
            </div>
        </div>
    )
};
export default addProjectBudgetDetailes;