import React from "react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1 className="text-8xl font-extrabold text-red-600 mb-4">401</h1>
      <p className="text-xl text-gray-700 mb-6">Unauthorized Access</p>
      <p className="text-gray-600 mb-8 max-w-md text-center">
        Kamu tidak memiliki akses untuk halaman ini. Silakan hubungi administrator jika ini adalah kesalahan.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md shadow-md transition duration-300"
      >
        Kembali ke Login
      </button>
    </div>
  );
}
