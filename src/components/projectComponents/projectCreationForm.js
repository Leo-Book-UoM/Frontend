import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaTimes } from 'react-icons/fa';
import Select from 'react-select';

const CreateProjectForm = ({ setIsFormVisible, onProjectAdded }) => {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [userOptions, setUserOptions] = useState([]);
  const [directorOptions, setDirectorOptions] = useState([]);
  const [director, setDirector] = useState(null);
  const [chairman, setChairman] = useState(null);
  const [secretary, setSecretary] = useState(null);
  const [treasurer, setTreasurer] = useState(null);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    director : "",
    chairman: "",
    secretary: "",
    treasurer: "",
    image: "",
    category: null,
    status: 1,
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

  const getProspectNames = async () => {
    fetch("http://localhost:5000/api/getAllUsers")
      .then((res) => res.json())
      .then((data) => {
        const options = data.map((user) => ({
          value: user.userId,
          label: user.userName,
        }));
        setUserOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching user names:", error);
      });
  };

  const getDirectorPositions = async () => {
    fetch("http://localhost:5000/api/getDerectorPositions")
      .then((res) => res.json())
      .then((data) => {
        const options = data.map((designation) => ({
          value: designation.officerId,
          label: designation.designationName,
          
        }));
        //console.log("d:",director.value);
        setDirectorOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching user names:", error);
      });
  };

  useEffect(() => {
    getProspectNames();
    getDirectorPositions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!newEvent.title.trim()) {
      alert("Project Name is required");
      return;
    }

    const formattedTime = newEvent.time ? `${newEvent.time}:00` : null;

    const formData = new FormData();
    formData.append("title", newEvent.title);
    if (newEvent.date) formData.append("date", newEvent.date);
    if (formattedTime) formData.append("time", formattedTime);
    if (newEvent.location) formData.append("location", newEvent.location);
    if (newEvent.category) formData.append("category", newEvent.category);
    if (newEvent.status !== undefined) formData.append("status", newEvent.status);
    if (director) formData.append("director", director.value);
    if (chairman) formData.append("chairman", chairman.value);
    if (secretary) formData.append("secretary", secretary.value);
    if (treasurer) formData.append("treasurer", treasurer.value);
    if (imageFile) formData.append("image", imageFile);
console.log(director.value)
    try {
      const response = await fetch("http://localhost:5000/api/addproject", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Failed to create project");

      const newProject = await response.json();
      onProjectAdded(newProject);
      setIsFormVisible(false);

      setNewEvent({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        director: "",
        chairman: "",
        secretary: "",
        treasurer: "",
        image: "",
        category: null,
        status: 1,
      });
      setDirector(null);
      setChairman(null);
      setSecretary(null);
      setTreasurer(null);
      setImageFile(null);
      setPreview("");
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px] shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Add New Project</h2>
          <button onClick={() => setIsFormVisible(false)} className="text-gray-500 hover:text-red-500">
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
              <label className="font-bold">Director</label>
              <Select
                options={directorOptions}
                value={director}
                onChange={setDirector}
                placeholder="Select Director Position"
                isSearchable
              />
            </div>
            <div>
              <label className="font-bold">Project Chairman</label>
              <Select
                options={userOptions}
                value={chairman}
                onChange={setChairman}
                placeholder="Select Chairman"
                isSearchable
              />
            </div>
            <div>
              <label className="font-bold">Project Secretary</label>
              <Select
                options={userOptions}
                value={secretary}
                onChange={setSecretary}
                placeholder="Select Secretary"
                isSearchable
              />
            </div>
            <div>
              <label className="font-bold">Project Treasurer</label>
              <Select
                options={userOptions}
                value={treasurer}
                onChange={setTreasurer}
                placeholder="Select Treasurer"
                isSearchable
              />
            </div>

            <div className="col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
              >
                Add Project
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
