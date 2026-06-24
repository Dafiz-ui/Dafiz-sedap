import { Link, useParams } from "react-router-dom";

const users = [
  {
    id: "1",
    name: "Adi Pratama",
    email: "adi.pratama@example.com",
    role: "Administrator",
    phone: "0812-3456-7890",
    bio: "Frontend developer yang suka membuat aplikasi dashboard dan antarmuka pengguna.",
    city: "Surabaya"
  },
  {
    id: "2",
    name: "Sinta Maharani",
    email: "sinta.maharani@example.com",
    role: "Content Writer",
    phone: "0813-9876-5432",
    bio: "Penulis konten kreatif yang fokus pada pengalaman pengguna dan branding digital.",
    city: "Bandung"
  },
  {
    id: "3",
    name: "Rudi Santoso",
    email: "rudi.santoso@example.com",
    role: "Customer Support",
    phone: "0814-1234-5678",
    bio: "Melayani pelanggan dengan cepat dan memastikan pengalaman booking berjalan lancar.",
    city: "Yogyakarta"
  }
];

export default function UserDetail() {
  const { id } = useParams();
  const user = users.find((item) => item.id === id);

  if (!user) {
    return (
      <div className="p-6 rounded-xl bg-white shadow-md">
        <h1 className="text-2xl font-bold mb-4">User tidak ditemukan</h1>
        <p className="text-gray-600 mb-4">Silakan kembali ke daftar user dan pilih user yang tersedia.</p>
        <Link to="/users" className="inline-block text-blue-600 hover:underline">
          Kembali ke daftar user
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-xl bg-white shadow-md max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Biodata {user.name}</h1>
          <p className="text-sm text-gray-500">Detail profil dan kontak user terpilih.</p>
        </div>
        <Link
          to="/users"
          className="px-4 py-2 text-sm font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50"
        >
          Kembali ke daftar user
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 p-5 bg-slate-50">
          <p className="text-sm text-gray-500 uppercase tracking-[0.2em]">Nama</p>
          <p className="mt-2 text-xl font-semibold">{user.name}</p>
        </div>
        <div className="rounded-xl border border-gray-200 p-5 bg-slate-50">
          <p className="text-sm text-gray-500 uppercase tracking-[0.2em]">Email</p>
          <p className="mt-2 text-xl font-semibold">{user.email}</p>
        </div>
        <div className="rounded-xl border border-gray-200 p-5 bg-slate-50">
          <p className="text-sm text-gray-500 uppercase tracking-[0.2em]">Peran</p>
          <p className="mt-2 text-xl font-semibold">{user.role}</p>
        </div>
        <div className="rounded-xl border border-gray-200 p-5 bg-slate-50">
          <p className="text-sm text-gray-500 uppercase tracking-[0.2em]">Kota</p>
          <p className="mt-2 text-xl font-semibold">{user.city}</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 p-5 bg-white">
        <h2 className="text-xl font-semibold mb-3">Tentang {user.name}</h2>
        <p className="text-gray-700 leading-relaxed">{user.bio}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 p-5 bg-slate-50">
          <p className="text-sm text-gray-500 uppercase tracking-[0.2em]">No. Telepon</p>
          <p className="mt-2 text-xl font-semibold">{user.phone}</p>
        </div>
        <div className="rounded-xl border border-gray-200 p-5 bg-slate-50">
          <p className="text-sm text-gray-500 uppercase tracking-[0.2em]">ID User</p>
          <p className="mt-2 text-xl font-semibold">{user.id}</p>
        </div>
      </div>
    </div>
  );
}
