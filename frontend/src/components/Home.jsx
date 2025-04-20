import React from 'react';

const Home = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-green-500 mb-4">Welcome to User Management</h1>
      <p className="text-gray-600">
        Hello, {user?.name}! You're successfully logged in.
      </p>
    </div>
  );
};

export default Home;
