import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaUsers } from "react-icons/fa";

const travelPackages = [
  { id: 1, title: "Paket Wisata Bali Sunrise", price: 2800000, maxGuests: 20, duration: "4 hari", emoji: "🏝️" },
  { id: 2, title: "Romantic Lombok", price: 3200000, maxGuests: 15, duration: "3 hari", emoji: "💑" },
  { id: 3, title: "Adventure Raja Ampat", price: 7500000, maxGuests: 25, duration: "5 hari", emoji: "🏄" },
];

export default function Booking() {
  const { id } = useParams();
  const pkg = travelPackages.find((p) => p.id === Number(id));
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`🎉 Booking untuk ${name} berhasil dibuat!\\nAmi akan menghubungi Anda dalam 24 jam ke nomor ${phone}.`);
    setName("");
    setEmail("");
    setPhone("");
    setDate("");
    setGuests(1);
  };

  if (!pkg) {
    return (
      <div className="rounded-3xl bg-gradient-to-r from-red-500 to-pink-500 p-12 text-white text-center">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-2xl font-bold mb-2">Paket tidak ditemukan</p>
        <p className="text-white/80 mb-6">Maaf, paket wisata yang Anda cari tidak tersedia</p>
        <Link to="/paket-wisata" className="inline-flex items-center gap-2 bg-white text-red-600 font-bold px-6 py-3 rounded-2xl hover:shadow-lg transition">
          <FaArrowLeft /> Kembali ke Paket Wisata
        </Link>
      </div>
    );
  }

  const totalPrice = pkg.price * guests;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-500 to-cyan-500 p-8 md:p-12 text-white">
        <Link to={`/paket/${pkg.id}`} className="inline-flex items-center gap-2 text-white/80 hover:text-white transition mb-4">
          <FaArrowLeft /> Kembali
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Pesan Paket Wisata</h1>
        <p className="text-xl text-white/90">{pkg.title}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl bg-white p-8 shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FaUser className="text-teal-600" />
              Data Pribadi Anda
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Nama Lengkap <span className="text-red-500">*</span></label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Masukkan nama lengkap Anda"
                    className="w-full rounded-2xl border-2 border-slate-200 bg-white pl-12 pr-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Email <span className="text-red-500">*</span></label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="nama@email.com"
                    className="w-full rounded-2xl border-2 border-slate-200 bg-white pl-12 pr-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Nomor Telepon <span className="text-red-500">*</span></label>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-4 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+62 812-3456-7890"
                    className="w-full rounded-2xl border-2 border-slate-200 bg-white pl-12 pr-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Tanggal Keberangkatan <span className="text-red-500">*</span></label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-4 top-4 text-slate-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full rounded-2xl border-2 border-slate-200 bg-white pl-12 pr-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Jumlah Peserta <span className="text-red-500">*</span></label>
                <div className="relative">
                  <FaUsers className="absolute left-4 top-4 text-slate-400" />
                  <input
                    type="number"
                    min="1"
                    max={pkg.maxGuests}
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full rounded-2xl border-2 border-slate-200 bg-white pl-12 pr-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Maksimal {pkg.maxGuests} peserta</p>
              </div>
              <button className="w-full rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-4 text-white font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 mt-8 flex items-center justify-center gap-2">
                <FaCheckCircle /> Lanjutkan ke Pembayaran
              </button>
            </form>
          </div>
        </div>

        {/* Summary Section */}
        <div>
          <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 border border-slate-200 sticky top-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span>📋</span>
              Ringkasan Pemesanan
            </h2>
            <div className="space-y-4 text-sm text-slate-600 pb-6 border-b border-slate-300">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Harga per orang:</span>
                <span className="font-bold text-slate-900">Rp {(pkg.price / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Jumlah peserta:</span>
                <span className="font-bold text-slate-900">{guests} {guests > 1 ? "orang" : "orang"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Durasi perjalanan:</span>
                <span className="font-bold text-slate-900">{pkg.duration}</span>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200">
              <p className="text-xs text-slate-600 mb-1">Total Harga:</p>
              <p className="text-3xl font-bold text-teal-600">Rp {(totalPrice / 1000000).toFixed(1)}M</p>
            </div>
            <div className="mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-200">
              <p className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-2">✅ Mengapa memilih kami?</p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>✓ Harga terjangkau & transparan</li>
                <li>✓ Pemandu wisata profesional</li>
                <li>✓ Asuransi perjalanan lengkap</li>
                <li>✓ Jaminan uang kembali 100%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
