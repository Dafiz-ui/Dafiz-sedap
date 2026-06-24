import { Link } from "react-router-dom";
import { FaArrowRight, FaStar, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

export default function Home() {
  const featuredPackages = [
    { id: 1, name: "Bali Sunrise", price: "Rp 2.8M", image: "🏝️", category: "Alam", days: "4 hari", rating: 4.8 },
    { id: 2, name: "Lombok Romantis", price: "Rp 3.2M", image: "💑", category: "Romantis", days: "3 hari", rating: 4.9 },
    { id: 3, name: "Raja Ampat Adventure", price: "Rp 7.5M", image: "🏄", category: "Adventure", days: "5 hari", rating: 4.7 },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl bg-gradient-to-br from-blue-600 via-teal-500 to-emerald-500 p-12 md:p-24 text-white text-center overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48"></div>
        <div className="relative z-10">
          <p className="text-lg uppercase tracking-widest text-white/80 mb-4 font-semibold">Temukan Petualanganmu</p>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">Jelajahi Keindahan Indonesia</h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto">Ciptakan kenangan indah bersama keluarga tercinta ke destinasi impian dengan paket wisata terpercaya</p>
          <Link to="/paket-wisata" className="inline-flex items-center gap-3 bg-white text-teal-600 font-bold px-10 py-4 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Mulai Jelajahi <FaArrowRight className="text-lg" />
          </Link>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: "✈️", title: "Destinasi Terbaik", desc: "Pilihan paket ke seluruh Indonesia" },
          { icon: "💰", title: "Harga Terjangkau", desc: "Paket hemat tanpa mengurangi kualitas" },
          { icon: "👥", title: "Pemandu Profesional", desc: "Tour guide berpengalaman dan ramah" },
          { icon: "⭐", title: "Rating Tinggi", desc: "Dipercaya oleh ribuan pelanggan" },
        ].map((item, idx) => (
          <div key={idx} className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-6 border border-slate-200 text-center hover:shadow-lg transition">
            <div className="text-5xl mb-3">{item.icon}</div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
            <p className="text-slate-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Featured Packages */}
      <section>
        <div className="mb-12">
          <p className="text-teal-600 font-bold uppercase tracking-wider text-sm">PAKET UNGGULAN</p>
          <h2 className="text-4xl font-bold text-slate-900 mt-2 mb-3">Destinasi Pilihan Terpopuler</h2>
          <p className="text-slate-600 text-lg">Jelajahi paket wisata paling dicari dan dinilai tinggi oleh pelanggan kami</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPackages.map((pkg) => (
            <Link key={pkg.id} to={`/paket/${pkg.id}`} className="group rounded-3xl bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-slate-200">
              <div className="bg-gradient-to-br from-teal-400 to-emerald-500 p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="text-7xl mb-2 relative z-10">{pkg.image}</div>
                <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">{pkg.category}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{pkg.name}</h3>
                <div className="space-y-2 mb-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-teal-600" />
                    <span>{pkg.days}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    <span className="font-semibold text-slate-900">{pkg.rating}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-teal-600 font-bold text-lg">{pkg.price}</span>
                  <span className="text-teal-600 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-12 md:p-16 text-white text-center">
        <h2 className="text-4xl font-bold mb-4">Siap untuk Petualangan?</h2>
        <p className="text-xl mb-8 text-white/90">Jangan lewatkan kesempatan emas untuk merasakan pengalaman wisata yang tak terlupakan</p>
        <Link to="/paket-wisata" className="inline-flex items-center gap-2 bg-white text-indigo-600 font-bold px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300">
          Lihat Semua Paket <FaArrowRight />
        </Link>
      </section>
    </div>
  );
}
