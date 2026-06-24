import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaMapMarkedAlt, FaCalendarAlt, FaWallet, FaStar } from "react-icons/fa";

const travelPackages = [
  { id: 1, title: "Paket Wisata Bali Sunrise", category: "Alam", duration: "4 hari", price: 2800000, description: "Nikmati sunrise terbaik, tour pantai, dan kuliner Bali dalam paket lengkap.", highlights: ["Sunrise di pantai", "Akomodasi bintang 4", "Tour kuliner lokal", "Transport lengkap"] },
  { id: 2, title: "Romantic Lombok", category: "Romantis", duration: "3 hari", price: 3200000, description: "Pengalaman romantis dengan villa private, sunset dinner, dan tur pantai.", highlights: ["Villa private", "Makan malam romantis", "Sunset cruise", "Spa pasangan"] },
  { id: 3, title: "Adventure Raja Ampat", category: "Adventure", duration: "5 hari", price: 7500000, description: "Snorkeling di perairan terindah, island hopping, dan hidden beach.", highlights: ["Snorkeling terbaik", "Island hopping", "Guide lokal", "Pemandangan bawah laut"] },
  { id: 4, title: "City Tour Jakarta", category: "Kota", duration: "2 hari", price: 950000, description: "Wisata kota Jakarta dengan destinasi landmark dan kuliner lokal terbaik.", highlights: ["Kota modern", "Kuliner street food", "Museum & landmark", "Transport mudah"] },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = travelPackages.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200 text-slate-700">
        Paket tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-teal-500 to-cyan-500 p-8 text-white shadow-lg">
        <Link to="/admin/kelola-paket" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6">
          <FaArrowLeft /> Kembali ke Daftar Paket
        </Link>
        <p className="text-sm uppercase tracking-[0.2em] text-white/80 mb-4">{product.category}</p>
        <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm font-semibold">
          <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full"><FaCalendarAlt /> {product.duration}</span>
          <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full"><FaWallet /> Rp {product.price.toLocaleString()}</span>
          <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full"><FaStar /> 4.8 Rating</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Deskripsi Paket</h2>
            <p className="text-slate-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Highlight Perjalanan</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {product.highlights.map((item, index) => (
                <li key={index} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-slate-700">
                  <FaMapMarkedAlt className="text-teal-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-50 p-8 shadow-sm border border-slate-200 h-fit">
          <div className="space-y-4">
            <p className="text-sm text-slate-500">Ringkasan Paket</p>
            <div className="rounded-3xl bg-white p-6 border border-slate-200">
              <p className="text-slate-500">Kategori</p>
              <p className="text-lg font-semibold text-slate-900">{product.category}</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-slate-200">
              <p className="text-slate-500">Durasi</p>
              <p className="text-lg font-semibold text-slate-900">{product.duration}</p>
            </div>
            <div className="rounded-3xl bg-white p-6 border border-slate-200">
              <p className="text-slate-500">Harga</p>
              <p className="text-lg font-semibold text-emerald-600">Rp {product.price.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
