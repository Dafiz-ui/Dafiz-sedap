import { FaMapSigns, FaSuitcaseRolling, FaCreditCard, FaChartLine } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-500">Selamat datang di</p>
            <h1 className="text-4xl font-semibold text-slate-900">Dashboard Admin Travel</h1>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-slate-700 shadow-inner">
            <p className="text-sm">Status Sistem</p>
            <p className="font-semibold text-slate-900">Semua modul aktif</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <FaMapSigns className="text-xl" />
            </div>
            <span className="text-sm text-slate-400">Paket Wisata</span>
          </div>
          <div className="mt-6">
            <p className="text-4xl font-bold text-slate-900">24</p>
            <p className="text-slate-500 mt-1">Paket tersedia</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">
              <FaSuitcaseRolling className="text-xl" />
            </div>
            <span className="text-sm text-slate-400">Booking</span>
          </div>
          <div className="mt-6">
            <p className="text-4xl font-bold text-slate-900">128</p>
            <p className="text-slate-500 mt-1">Booking aktif</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <FaCreditCard className="text-xl" />
            </div>
            <span className="text-sm text-slate-400">Pembayaran</span>
          </div>
          <div className="mt-6">
            <p className="text-4xl font-bold text-slate-900">27</p>
            <p className="text-slate-500 mt-1">Menunggu verifikasi</p>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
              <FaChartLine className="text-xl" />
            </div>
            <span className="text-sm text-slate-400">Pendapatan</span>
          </div>
          <div className="mt-6">
            <p className="text-4xl font-bold text-slate-900">Rp 1.48M</p>
            <p className="text-slate-500 mt-1">Transaksi bulan ini</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Aktivitas Terbaru</h2>
          <ul className="space-y-4">
            {[
              "Booking baru masuk dari Jakarta ke Bali",
              "Paket Wisata Raja Ampat diperbarui",
              "Verifikasi pembayaran 9 booking selesai",
              "Testimoni terbaru ditambahkan oleh pelanggan"
            ].map((item, idx) => (
              <li key={idx} className="rounded-2xl bg-slate-50 p-4 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Rekomendasi Aksi</h2>
          <div className="space-y-4 text-slate-700">
            <p>Perbarui kategori paket untuk liburan sekolah.</p>
            <p>Tinjau pesan kontak pelanggan yang belum dibalas.</p>
            <p>Periksa laporan transaksi untuk status hari ini.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 