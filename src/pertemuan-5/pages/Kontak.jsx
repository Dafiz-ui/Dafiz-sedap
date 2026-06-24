import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Kontak() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Pesan dari ${formData.name} telah dikirim!`);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="space-y-12">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Hubungi Kami</h1>
        <p className="text-lg text-slate-600">Kami siap membantu Anda. Hubungi kami melalui berbagai saluran komunikasi.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl bg-emerald-50 p-6 border border-emerald-200">
          <div className="text-4xl text-emerald-600 mb-4"><FaPhone /></div>
          <h3 className="font-semibold text-slate-900 mb-2">Telepon</h3>
          <p className="text-slate-600">+62 812-3456-7890</p>
        </div>
        <div className="rounded-3xl bg-cyan-50 p-6 border border-cyan-200">
          <div className="text-4xl text-cyan-600 mb-4"><FaEnvelope /></div>
          <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
          <p className="text-slate-600">info@travelgo.com</p>
        </div>
        <div className="rounded-3xl bg-blue-50 p-6 border border-blue-200">
          <div className="text-4xl text-blue-600 mb-4"><FaMapMarkerAlt /></div>
          <h3 className="font-semibold text-slate-900 mb-2">Lokasi</h3>
          <p className="text-slate-600">Jakarta, Indonesia</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Kirim Pesan</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nama Anda"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400"
            />
            <input
              type="text"
              placeholder="Subjek"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400"
            />
            <textarea
              placeholder="Pesan Anda"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400 h-32"
            />
            <button className="w-full rounded-2xl bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-700 transition">
              Kirim Pesan
            </button>
          </form>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Jam Operasional</h2>
          <ul className="space-y-3 text-slate-600">
            <li><span className="font-semibold">Senin - Jumat:</span> 08:00 - 18:00 WIB</li>
            <li><span className="font-semibold">Sabtu:</span> 09:00 - 15:00 WIB</li>
            <li><span className="font-semibold">Minggu:</span> Tutup</li>
            <li className="pt-4 border-t border-slate-200">
              <p className="text-sm">Kami akan merespons pesan Anda dalam waktu 24 jam kerja.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
