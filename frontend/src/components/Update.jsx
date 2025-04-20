import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const { id } = useParams(); // Get user ID from URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    fetchUser();
  }, [id]); // Added id as dependency

  const fetchUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${id}`); // Updated to fetch single user
      const user = response.data;
      if (user) {
        setFormData({ name: user.name, email: user.email });
      } else {
        console.error("User not found");
        navigate("/"); // Redirect if user not found
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      navigate("/"); // Redirect on error
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, formData);
      navigate("/"); // Redirect to home after update
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Please try again."); // Added error feedback
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Update User</h1>
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
