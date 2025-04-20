import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Update the axios instance configuration
  const api = axios.create({
    baseURL: 'http://localhost:5000', // Change to local backend URL
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    withCredentials: false // Disable for local development
  });
  
  // Update the fetchUsers function
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/api/users");
      if (response.data) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setErrorMessage(
        error.response?.data?.error || 
        "Failed to load users. Please check if the server is running."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Update handleDelete function
  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await api.delete(`/api/users/${id}`);
      if (response.data?.message) {
        setSuccessMessage(response.data.message);
        fetchUsers();
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || 
        "Failed to delete user. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Update handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    
    try {
      const response = await api.post('/api/register', formData);
      setSuccessMessage(response.data.message || "Registration successful!");
      setFormData({ name: "", email: "", password: "" });
      fetchUsers();
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || 
        error.message || 
        "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-6">
      <h1 className="text-2xl font-bold text-green-500 mb-4 text-center">
        Registration Form
      </h1>
      {/* Error and Success Messages */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}
      {/* Form */}
      <form
        className="bg-white p-4 rounded-lg shadow-md space-y-3"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
          disabled={isLoading}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded-md"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="w-full p-2 border rounded-md"
        />
        <button
          className={`w-full py-2 rounded-md ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600'
          } text-white`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {/* Users List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-center mb-4">Users List</h2>
        {isLoading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : users.length > 0 ? (
          <ul className="space-y-3">
            {users.map((user) => (
              <li
                key={user._id}
                className="flex justify-between items-center bg-white p-3 shadow-md rounded-md"
              >
                <span className="text-gray-700">
                  {user.name} - {user.email}
                </span>
                <div className="space-x-2">
                  <Link
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    to={`/update/${user._id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(user._id)}
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
};

export default Registration;
