import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaTimes } from 'react-icons/fa';

const CreateProjectForm = ({ setIsFormVisible , onProjectAdded}) => {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    chairman: "",
    secretary: "",
    treasure: "",
    image: "",
    category: null,
    status: 1,
  });
  const [prospectName, setProspectName] = useState([]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (!newEvent.title.trim()) {
      alert("Project Name is required");
      return;
    }
  
    let formattedTime = newEvent.time ? `${newEvent.time}:00` : null;
  
    const formData = new FormData();
    formData.append("title", newEvent.title);
    if (newEvent.date) formData.append("date", newEvent.date);
    if (formattedTime) formData.append("time", formattedTime);
    if (newEvent.location) formData.append("location", newEvent.location);
    if (newEvent.category) formData.append("category", newEvent.category);
    if (newEvent.status !== undefined) formData.append("status", newEvent.status);
    if (newEvent.chairman) formData.append("chairman", newEvent.chairman);
    if (newEvent.secretary) formData.append("secretary", newEvent.secretary);
    if (newEvent.treasurer) formData.append("treasurer", newEvent.treasurer);
    if (imageFile) formData.append("image", imageFile);
    try {
      const response = await fetch("http://localhost:5000/api/addproject", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to create project");
      }
      const newProject = await response.json();
      onProjectAdded(newProject);
  
      setIsFormVisible(false);
      setNewEvent({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        chairman: "",
        secretary: "",
        treasurer: "",
        image: "",
        category: null,
        status: 1,
      });
  
      setImageFile(null);
      setPreview("");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };
  
  const getProspectNames = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getUserNames/Prospect`);

      // Check if response is OK
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setProspectName(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching prospect names:", error);
      setProspectName([]); 
    }
  };

  useEffect(() => {
    getProspectNames();
  }, []); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px] shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add New Project</h2>
          <button
            onClick={() => setIsFormVisible(false)}
            className="text-gray-500 hover:text-red-500"
            title="Close"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="font-bold">Project Name</label>
              <input
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
                placeholder="Project Name"
                required
              />
            </div>
            <div>
              <label className="font-bold">Project Date</label>
              <input
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="font-bold">Project Time</label>
              <input
                type="time"
                name="time"
                value={newEvent.time}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
              />
            </div>
            <div>
              <label className="font-bold">Project Location</label>
              <input
                type="text"
                name="location"
                value={newEvent.location}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
                placeholder="Venue"
              />
            </div>
            <div className="col-span-2">
              <label className="font-bold">Project Image</label>
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-gray-400 p-6 rounded-lg text-center cursor-pointer"
              >
                <input {...getInputProps()} />
                {preview ? (
                  <img src={preview} alt="Preview" className="h-40 mx-auto" />
                ) : (
                  <p className="text-gray-500">Drag & drop an image or click to upload</p>
                )}
              </div>
            </div>
            <div>
              <label className="font-bold">Project Chairman</label>
              <select
                name="chairman"
                value={newEvent.chairman}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
              >
                <option value="" disabled>Select Project Chairman</option>
                {prospectName.map((prospect, index) => (
                  <option key={index} value={prospect.userName}>
                    {prospect.userName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Project Secretary</label>
              <select
                name="secretary" 
                value={newEvent.secretary}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
              >
                <option value="" disabled>Select Project Secretary</option>
                {prospectName.map((prospect, index) => (
                  <option key={index} value={prospect.userName}>
                    {prospect.userName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Project Treasurer</label>
              <select
                name="treasure" 
                value={newEvent.treasure}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
              >
                <option value="" disabled>Select Project Treasurer</option>
                {prospectName.map((prospect, index) => (
                  <option key={index} value={prospect.userName}>
                    {prospect.userName}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
              >
                Add Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;