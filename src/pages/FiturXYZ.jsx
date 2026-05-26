import React from "react";
import PageHeader from "../components/PageHeader";

export default function FiturXYZ() {
  return (
    <div className="p-6">
      <PageHeader title="Fitur XYZ" subtitle="Percobaan fitur baru di branch coba-fitur-xyz" />

      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold">Selamat datang di Fitur XYZ</h3>
        <p className="text-sm text-gray-600 mt-2">Halaman ini dibuat untuk mendemonstrasikan pembuatan branch dan penambahan menu baru.</p>

        <div className="mt-4">
          <button className="bg-hijau text-white px-4 py-2 rounded-md">Contoh Tombol</button>
        </div>
      </div>
    </div>
  );
}
