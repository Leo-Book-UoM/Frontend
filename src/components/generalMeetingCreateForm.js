import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaTimes } from 'react-icons/fa';

const CreateGeneralMeetingForm = ({ setIsFormVisible , onProjectAdded}) => {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    otherClubs:[],
  });

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
      alert("Meeting Name is required");
      return;
    }
  
    let formattedTime = newEvent.time ? `${newEvent.time}:00` : null;

    // Create FormData instance for file upload
    const formData = new FormData();
    formData.append("title", newEvent.title);
    formData.append("date", newEvent.date);
    formData.append("time", formattedTime);
    formData.append("location", newEvent.location);
    formData.append("otherClubs", JSON.stringify(newEvent.otherClubs));

    // Append the image file if selected
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await fetch("http://localhost:5000/api/createGeneralMeeting", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create meeting: ${errorText}`);
      }
      const newProject = await response.json();
      onProjectAdded(newProject);
      setIsFormVisible(false);

      setNewEvent({
        title: "",
        date: "",
        time: "",
        location: "",
        otherClubs: [],
      });
  
      setImageFile(null);
      setPreview("");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

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
          <h2 className="text-xl font-bold text-gray-800">Add New General Meeting</h2>
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
              <label className="font-bold">Meeting Title</label>
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
              <label className="font-bold">Meeting Date</label>
              <input
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="font-bold">Time</label>
              <input
                type="time"
                name="time"
                value={newEvent.time}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="font-bold">Location</label>
              <input
                type="text"
                name="location"
                value={newEvent.location}
                onChange={handleInputChange}
                className="border rounded p-2 w-full"
                placeholder="Venue"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="font-bold">Meeting Image</label>
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
            <div className="col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
              >
                Add General Meeting
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGeneralMeetingForm;
