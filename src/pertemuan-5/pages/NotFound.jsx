import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Halaman yang kamu cari tidak ditemukan.</p>
      <button
        onClick={() => navigate('/dashboard')}
        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md shadow-md transition duration-300"
      >
        Kembali ke Home
      </button>
    </div>
  );
};

export default NotFound;
