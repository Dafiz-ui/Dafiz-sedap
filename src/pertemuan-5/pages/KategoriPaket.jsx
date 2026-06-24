import { useState } from "react";

const initialCategories = [
  { id: 1, name: "Adventure", description: "Paket wisata petualangan dan alam bebas." },
  { id: 2, name: "Romantis", description: "Paket honeymoon dan perjalanan pasangan." },
  { id: 3, name: "Keluarga", description: "Paket wisata untuk keluarga dan anak-anak." },
];

export default function KategoriPaket() {
  const [categories, setCategories] = useState(initialCategories);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    setCategories([...categories, { id: Date.now(), name, description }]);
    setName("");
    setDescription("");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <h1 className="text-3xl font-semibold text-slate-900">Kelola Kategori Paket</h1>
        <p className="mt-2 text-slate-500">Tambahkan kategori paket wisata agar sistem lebih terstruktur.</p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <form onSubmit={handleAdd} className="grid gap-4 md:grid-cols-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Kategori"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400"
            required
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi singkat"
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400"
            required
          />
          <button className="md:col-span-2 rounded-2xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-emerald-700 transition">
            Tambah Kategori
          </button>
        </form>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="rounded-3xl border border-slate-200 p-5 bg-slate-50">
            <h2 className="text-xl font-semibold text-slate-900">{category.name}</h2>
            <p className="mt-2 text-slate-600">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
);
}
