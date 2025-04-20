import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Registration = () => {
  // Update the initial state to include password
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      setSuccessMessage("Registration successful!");
      setFormData({ name: "", email: "", password: "" }); // Clear form
      fetchUsers(); // Refresh users list
    } catch (error) {
      const message = error.response?.data?.error || "Registration failed. Please try again.";
      setErrorMessage(message);
      console.error("Error submitting form:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Update the form JSX to include password field and messages
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg mt-6">
      <h1 className="text-2xl font-bold text-green-500 mb-4 text-center">
        Registration Form
      </h1>
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
          className="w-full p-2 border rounded-md"
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
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 text-center"
          type="submit"
        >
          Register
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6 text-center">Users List</h2>
      <ul className="mt-4 space-y-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center bg-white p-3 shadow-md rounded-md"
          >
            <span className="text-gray-700">
              {user.name} - {user.email}
            </span>
            <div>
              <Link
                className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                to={`/update/${user.id}`}
              >
                Edit
              </Link>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Registration;
