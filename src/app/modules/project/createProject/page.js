'use client';

import React, { useState, useEffect } from 'react';
import MainLayout from '../../../mainlayout';

const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    designation: '',
    chairman: '',
    secretary: '',
    treasurer: '',
    projectTime: '',
    venue: '',
    projectDate: '',
    projectImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, projectImage: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('projectid', Date.now().toString());
    formDataToSubmit.append('projectname', formData.projectName);
    formDataToSubmit.append('date', formData.projectDate);
    formDataToSubmit.append('time', formData.projectTime);
    formDataToSubmit.append('venue', formData.venue);
    formDataToSubmit.append('category', formData.designation);
    if (formData.projectImage) {
      formDataToSubmit.append('image', formData.projectImage);
    }
    formDataToSubmit.append('status', 1);
    formDataToSubmit.append('chairman', formData.chairman);
    formDataToSubmit.append('secretary', formData.secretary);
    formDataToSubmit.append('treasurer', formData.treasurer);
  
    // Debugging: Log FormData key-value pairs
    for (const [key, value] of formDataToSubmit.entries()) {
      console.log(key, value);
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/addproject', {
        method: 'POST',
        body: formDataToSubmit,
      });
  
      if (response.ok) {
        const result = await response.json();
        setMessage('Project added successfully!');
        setFormData({
          projectName: '',
          designation: '',
          chairman: '',
          secretary: '',
          treasurer: '',
          projectTime: '',
          venue: '',
          projectDate: '',
          projectImage: null,
        });
        setImagePreview(null);
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'An error occurred');
      }
    } catch (err) {
      console.error(err);
      setMessage('Server error');
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add New Project</h2>
        {message && <div className="mb-4 text-green-600">{message}</div>}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 space-y-4 md:space-y-0"
        >
          <div className="space-y-4">
            <label>Project Name</label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              required
              className="w-full border p-2"
            />

            <label>Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              className="w-full border p-2"
            />

            <label>Chairman</label>
            <input
              type="text"
              name="chairman"
              value={formData.chairman}
              onChange={handleChange}
              required
              className="w-full border p-2"
            />

            <label>Secretary</label>
            <input
              type="text"
              name="secretary"
              value={formData.secretary}
              onChange={handleChange}
              required
              className="w-full border p-2"
            />
          </div>

          <div className="space-y-4">
            <label>Treasurer</label>
            <input
              type="text"
              name="treasurer"
              value={formData.treasurer}
              onChange={handleChange}
              required
              className="w-full border p-2"
            />

            <label>Project Time</label>
            <input
              type="time"
              name="projectTime"
              value={formData.projectTime}
              onChange={handleChange}
              required
              className="w-full border p-2"
            />

            <label>Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
              className="w-full border p-2"
            />

            <label>Project Date</label>
            <input
              type="date"
              name="projectDate"
              value={formData.projectDate}
              onChange={handleChange}
              required
              className="w-full border p-2"
            />
          </div>

          <div className="md:col-span-2">
            <label>Project Image</label>
            <input
              type="file"
              name="projectImage"
              onChange={handleImageChange}
              accept="image/*"
              className="w-full border p-2"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="h-32 w-32 mt-4 object-cover rounded"
              />
            )}
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddProjectForm;
