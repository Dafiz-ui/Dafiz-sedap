import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaCalendarAlt, FaTag } from "react-icons/fa";

const packages = [
  { id: 1, title: "Paket Wisata Bali Sunrise", category: "Alam", duration: "4 hari", price: 2800000, rating: 4.8, emoji: "🏝️", reviews: 245 },
  { id: 2, title: "Romantic Lombok", category: "Romantis", duration: "3 hari", price: 3200000, rating: 4.9, emoji: "💑", reviews: 189 },
  { id: 3, title: "Adventure Raja Ampat", category: "Adventure", duration: "5 hari", price: 7500000, rating: 4.7, emoji: "🏄", reviews: 156 },
  { id: 4, title: "City Tour Jakarta", category: "Kota", duration: "2 hari", price: 950000, rating: 4.5, emoji: "🏙️", reviews: 78 },
];

const categoryColors = {
  "Alam": "from-emerald-500 to-teal-500",
  "Romantis": "from-pink-500 to-rose-500",
  "Adventure": "from-orange-500 to-amber-500",
  "Kota": "from-blue-500 to-indigo-500",
};

export default function PaketWisata() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Semua");

  const filtered = useMemo(
    () => packages.filter((pkg) => {
      const matchQuery = pkg.title.toLowerCase().includes(query.toLowerCase());
      const matchFilter = filter === "Semua" || pkg.category === filter;
      return matchQuery && matchFilter;
    }),
    [query, filter]
  );

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-gradient-to-br from-cyan-600 via-blue-500 to-teal-500 p-12 md:p-16 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full -ml-40 -mb-40"></div>
        <div className="relative z-10">
          <p className="text-sm uppercase tracking-widest text-white/80 font-semibold mb-2">JELAJAHI</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Semua Paket Wisata</h1>
          <p className="text-lg text-white/90">Pilih dari berbagai destinasi menarik dengan harga yang kompetitif</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">Cari Paket Wisata</label>
          <input
            type="text"
            placeholder="Ketik nama destinasi atau paket..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">Filter Kategori</label>
          <div className="flex gap-2 flex-wrap">
            {["Semua", "Alam", "Romantis", "Adventure", "Kota"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-5 py-2 font-semibold transition-all duration-300 ${
                  filter === cat
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg scale-105"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <p className="text-slate-600 font-semibold mb-6">
          Menampilkan <span className="text-teal-600 font-bold">{filtered.length}</span> paket wisata
        </p>
        
        {filtered.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pkg) => (
              <Link key={pkg.id} to={`/paket/${pkg.id}`} className="group">
                <div className="rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-slate-200 h-full flex flex-col">
                  {/* Card Header - Gradient Background with Icon */}
                  <div className={`bg-gradient-to-br ${categoryColors[pkg.category]} p-8 text-center relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                      <div className="text-6xl mb-2">{pkg.emoji}</div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${categoryColors[pkg.category]} text-white`}>
                        <FaTag className="text-xs" /> {pkg.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-teal-600 transition">{pkg.title}</h3>

                    {/* Metadata */}
                    <div className="space-y-3 mb-6 flex-1">
                      <div className="flex items-center gap-2 text-slate-600">
                        <FaCalendarAlt className="text-teal-600" />
                        <span className="text-sm">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-400" />
                        <span className="font-bold text-slate-900">{pkg.rating}</span>
                        <span className="text-sm text-slate-500">({pkg.reviews} ulasan)</span>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                      <div>
                        <p className="text-xs text-slate-500">Mulai dari</p>
                        <p className="text-lg font-bold text-teal-600">Rp {(pkg.price / 1000000).toFixed(1)}M</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                        →
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-12 text-center border border-slate-200">
            <p className="text-2xl text-slate-500 mb-2">Paket tidak ditemukan</p>
            <p className="text-slate-400">Coba ubah kata kunci atau filter pencarian Anda</p>
          </div>
        )}
      </div>
    </div>
  );
}
