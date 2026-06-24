import { useParams, Link } from "react-router-dom";
import { FaStar, FaCalendarAlt, FaUsers, FaCheckCircle, FaPhone, FaArrowRight } from "react-icons/fa";

const packages = [
  { id: 1, title: "Paket Wisata Bali Sunrise", category: "Alam", duration: "4 hari", price: 2800000, description: "Nikmati sunrise terbaik, tour pantai, dan kuliner Bali dalam paket lengkap. Destinasi impian dengan pemandangan yang menakjubkan.", rating: 4.8, reviews: 245, emoji: "🏝️", maxGuests: 6 },
  { id: 2, title: "Romantic Lombok", category: "Romantis", duration: "3 hari", price: 3200000, description: "Pengalaman romantis dengan villa private, sunset dinner, dan tur pantai. Sempurna untuk honeymoon atau anniversary trip.", rating: 4.9, reviews: 189, emoji: "💑", maxGuests: 2 },
  { id: 3, title: "Adventure Raja Ampat", category: "Adventure", duration: "5 hari", price: 7500000, description: "Snorkeling di perairan terindah, island hopping, dan hidden beach. Petualangan yang tidak akan pernah terlupakan.", rating: 4.7, reviews: 156, emoji: "🏄", maxGuests: 8 },
  { id: 4, title: "City Tour Jakarta", category: "Kota", duration: "2 hari", price: 950000, description: "Wisata kota Jakarta dengan destinasi landmark dan kuliner lokal terbaik. Explore modernitas dan tradisi dalam satu perjalanan.", rating: 4.5, reviews: 78, emoji: "🏙️", maxGuests: 4 },
];

const categoryColors = {
  "Alam": "from-emerald-500 to-teal-500",
  "Romantis": "from-pink-500 to-rose-500",
  "Adventure": "from-orange-500 to-amber-500",
  "Kota": "from-blue-500 to-indigo-500",
};

export default function DetailPaket() {
  const { id } = useParams();
  const pkg = packages.find((p) => p.id === Number(id));

  if (!pkg) {
    return (
      <div className="rounded-3xl bg-gradient-to-r from-red-500 to-pink-500 p-12 text-white text-center">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-2xl font-bold mb-2">Paket tidak ditemukan</p>
        <p className="text-white/80 mb-6">Maaf, paket wisata yang Anda cari tidak tersedia</p>
        <Link to="/paket-wisata" className="inline-flex items-center gap-2 bg-white text-red-600 font-bold px-6 py-3 rounded-2xl hover:shadow-lg transition">
          Kembali ke Daftar Paket <FaArrowRight />
        </Link>
      </div>
    );
  }

  const highlights = [
    "🏖️ Pantai dan laut yang indah",
    "🏨 Penginapan bintang 4",
    "🍴 Makan siang dan makan malam",
    "🚕 Transportasi lengkap",
    "👨‍🏫 Tour guide profesional",
    "📸 Dokumentasi profesional",
  ];

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className={`relative rounded-3xl bg-gradient-to-br ${categoryColors[pkg.category]} p-12 md:p-16 text-white overflow-hidden`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold mb-3">{pkg.category}</span>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">{pkg.title}</h1>
            </div>
            <div className="text-7xl opacity-20">{pkg.emoji}</div>
          </div>
          <div className="flex flex-wrap gap-6 md:gap-8 text-lg font-semibold">
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-300" />
              <span>{pkg.rating}</span>
              <span className="text-white/80">({pkg.reviews} ulasan)</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt />
              <span>{pkg.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="rounded-3xl bg-white p-8 shadow-md border border-slate-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Tentang Paket</h2>
            <p className="text-lg text-slate-600 leading-relaxed">{pkg.description}</p>
          </div>

          {/* Highlights */}
          <div className="rounded-3xl bg-white p-8 shadow-md border border-slate-200">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Apa yang Termasuk</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-md transition">
                  <span className="text-2xl flex-shrink-0">{highlight.split(" ")[0]}</span>
                  <span className="text-slate-700 font-semibold">{highlight.substring(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="rounded-3xl bg-white p-8 shadow-md border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-slate-900">Ulasan Pelanggan</h2>
              <div className="flex items-center gap-2 text-lg font-bold text-yellow-500">
                <FaStar /> {pkg.rating}
              </div>
            </div>
            <div className="space-y-5">
              {[
                { name: "Andi Wijaya", time: "2 bulan lalu", rating: 5, text: "Paket wisata ini benar-benar luar biasa! Pemandu wisata sangat ramah dan berpengalaman. Destinasi yang dijelajahi sangat indah dan tidak akan pernah saya lupakan." },
                { name: "Siti Rahayu", time: "1 bulan lalu", rating: 5, text: "Pelayanan dari awal booking hingga selesai tour sangat memuaskan. Semua detail diperhatikan dengan baik dan makanan yang disediakan sangat lezat." },
                { name: "Budi Santoso", time: "2 minggu lalu", rating: 4, text: "Secara keseluruhan sangat bagus. Hanya saja ada satu hari yang hujan, tapi guide kami tetap membuat suasana tetap menyenangkan." },
              ].map((review, i) => (
                <div key={i} className="pb-5 border-b border-slate-200 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-slate-900 text-lg">{review.name}</p>
                      <p className="text-sm text-slate-500">{review.time}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array(review.rating).fill(0).map((_, j) => (
                        <FaStar key={j} className="text-yellow-400 text-sm" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Booking Sidebar */}
        <div className="space-y-6">
          {/* Price Card */}
          <div className={`rounded-3xl bg-gradient-to-br ${categoryColors[pkg.category]} p-8 text-white shadow-lg sticky top-20`}>
            <div className="text-sm uppercase tracking-wider text-white/80 font-semibold mb-2">Harga Paket Per Orang</div>
            <p className="text-5xl font-bold mb-6">Rp {(pkg.price / 1000000).toFixed(1)}M</p>

            <div className="bg-white/20 rounded-2xl p-4 mb-6 backdrop-blur-md">
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-white/80">Durasi:</span>
                <span className="font-semibold">{pkg.duration}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/80">Kapasitas:</span>
                <span className="font-semibold">Hingga {pkg.maxGuests} orang</span>
              </div>
            </div>

            <Link
              to={`/booking/${pkg.id}`}
              className="w-full rounded-2xl bg-white text-slate-900 px-6 py-4 text-center font-bold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 mb-3"
            >
              <span>Pesan Sekarang</span>
              <FaArrowRight className="text-lg" />
            </Link>
            <button className="w-full rounded-2xl border-2 border-white px-6 py-3 text-white font-bold hover:bg-white/10 transition flex items-center justify-center gap-2">
              <FaPhone className="text-lg" />
              Hubungi Kami
            </button>
          </div>

          {/* Info Cards */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 border border-blue-200">
              <div className="flex items-start gap-3">
                <span className="text-3xl">✈️</span>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Perjalanan Terjamin</h3>
                  <p className="text-sm text-slate-600">Lisensi resmi & asuransi perjalanan</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 border border-emerald-200">
              <div className="flex items-start gap-3">
                <span className="text-3xl">💳</span>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Pembayaran Fleksibel</h3>
                  <p className="text-sm text-slate-600">Cicilan tanpa bunga tersedia</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 border border-purple-200">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🎯</span>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Refund Jaminan</h3>
                  <p className="text-sm text-slate-600">Uang kembali 100% jika batal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
