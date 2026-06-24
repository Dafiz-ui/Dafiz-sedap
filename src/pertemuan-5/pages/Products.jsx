import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const initialPackages = [
  { id: 1, title: "Paket Wisata Bali Sunrise", category: "Alam", duration: "4 hari", price: 2800000 },
  { id: 2, title: "Romantic Lombok", category: "Romantis", duration: "3 hari", price: 3200000 },
  { id: 3, title: "Adventure Raja Ampat", category: "Adventure", duration: "5 hari", price: 7500000 },
  { id: 4, title: "City Tour Jakarta", category: "Kota", duration: "2 hari", price: 950000 },
];

export default function Products() {
  const [query, setQuery] = useState("");

  const packages = useMemo(
    () =>
      initialPackages.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-slate-500">Kelola Paket Wisata</p>
            <h1 className="text-3xl font-semibold text-slate-900">Daftar Paket Wisata</h1>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-slate-700">
            {packages.length} paket ditemukan
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari paket wisata..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-slate-400 focus:outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
            <thead className="bg-slate-100 text-left text-slate-600 uppercase tracking-[0.02em]">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Nama Paket</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Durasi</th>
                <th className="px-4 py-3">Harga</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {packages.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors duration-200">
                  <td className="px-4 py-4 font-medium">{index + 1}</td>
                  <td className="px-4 py-4 text-slate-900">
                    <Link to={`/admin/products/${item.id}`} className="text-emerald-600 hover:underline">
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-4 py-4">{item.category}</td>
                  <td className="px-4 py-4">{item.duration}</td>
                  <td className="px-4 py-4">Rp {item.price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 
