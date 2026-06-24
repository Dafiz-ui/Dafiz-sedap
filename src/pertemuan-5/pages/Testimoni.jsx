import { useState } from "react";

const initialTestimonials = [
  { id: 1, name: "Ayu", text: "Paket wisata Bali sangat memuaskan dan layanan bagus!" },
  { id: 2, name: "Fajar", text: "Booking cepat, tim support ramah, pengalaman tak terlupakan." },
];

export default function Testimoni() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    setTestimonials([...testimonials, { id: Date.now(), name, text }]);
    setName("");
    setText("");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <h1 className="text-3xl font-semibold text-slate-900">Kelola Testimoni</h1>
        <p className="mt-2 text-slate-500">Tinjau dan tambahkan testimoni pelanggan untuk meningkatkan kepercayaan.</p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <form onSubmit={handleAdd} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Pelanggan"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400"
            required
          />
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Testimoni singkat"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400 h-28"
            required
          />
          <button className="rounded-2xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-emerald-700 transition">
            Tambah Testimoni
          </button>
        </form>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((item) => (
          <div key={item.id} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <p className="text-slate-700">"{item.text}"</p>
            <p className="mt-4 font-semibold text-slate-900">- {item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
