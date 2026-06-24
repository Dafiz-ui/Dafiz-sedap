import { FaUsers, FaBullseye, FaHeart } from "react-icons/fa";

export default function TentangKami() {
  return (
    <div className="space-y-12">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Tentang TravelGo</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          TravelGo adalah platform terpercaya untuk booking paket wisata ke seluruh destinasi Indonesia. 
          Kami berkomitmen memberikan pengalaman wisata terbaik dengan harga yang kompetitif.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-cyan-50 p-8 border border-emerald-200">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Misi Kami</h3>
          <p className="text-slate-600">Menyediakan layanan wisata berkualitas tinggi yang terjangkau untuk semua kalangan.</p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-cyan-50 to-blue-50 p-8 border border-cyan-200">
          <div className="text-5xl mb-4">👁️</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Visi Kami</h3>
          <p className="text-slate-600">Menjadi platform wisata nomor satu di Indonesia dengan kepercayaan pelanggan.</p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 border border-blue-200">
          <div className="text-5xl mb-4">❤️</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">Nilai Kami</h3>
          <p className="text-slate-600">Integritas, inovasi, dan kepuasan pelanggan adalah prioritas utama kami.</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Tim Kami</h2>
        <p className="text-slate-600 leading-relaxed">
          Tim profesional kami terdiri dari expert di bidang pariwisata, customer service, dan teknologi. 
          Setiap anggota tim berkomitmen untuk memberikan pelayanan terbaik kepada Anda.
        </p>
      </div>
    </div>
  );
}
