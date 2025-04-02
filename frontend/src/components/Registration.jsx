import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
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
    try {
      await axios.post("http://localhost:5000/users", formData);
      setFormData({ name: "", email: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <h1 className="text-green-500 font-bold">Registration Form</h1>
      <form className="bg-red-300 flex flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <button className="bg-green-800 inline text-white" type="submit">
          Register
        </button>
      </form>

      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <Link to={`/update/${user.id}`} style={{ marginLeft: "10px" }}>
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Registration;
