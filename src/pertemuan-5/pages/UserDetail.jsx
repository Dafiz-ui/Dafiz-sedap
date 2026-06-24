import { Link, useParams } from "react-router-dom";
import { initialUsers } from "./UserList";

export default function UserDetail() {
  const { id } = useParams();
  const user = initialUsers.find((item) => String(item.id) === String(id));

  if (!user) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <h1 className="text-3xl font-semibold mb-4">User tidak ditemukan</h1>
        <p className="text-slate-600 mb-6">ID user yang Anda pilih tidak tersedia. Silakan kembali ke daftar user.</p>
        <Link to="/admin/kelola-user" className="inline-flex items-center rounded-2xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">
          Kembali ke Daftar User
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-slate-500">Detail User</p>
            <h1 className="text-3xl font-semibold text-slate-900">{user.name}</h1>
          </div>
          <Link to="/admin/kelola-user" className="rounded-2xl bg-slate-50 px-4 py-3 text-slate-700 hover:bg-slate-100">
            Kembali ke Daftar User
          </Link>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Informasi Akun</p>
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-slate-500">Nama</p>
              <p className="text-xl font-semibold text-slate-900">{user.name}</p>
            </div>
            <div>
              <p className="text-slate-500">Role</p>
              <p className="text-xl font-semibold text-slate-900">{user.role}</p>
            </div>
            <div>
              <p className="text-slate-500">Email</p>
              <p className="text-xl font-semibold text-slate-900">{user.email}</p>
            </div>
            <div>
              <p className="text-slate-500">ID User</p>
              <p className="text-xl font-semibold text-slate-900">{user.id}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Aktivitas</p>
          <div className="mt-6 space-y-4 text-slate-700">
            <p>Role {user.role} bertanggung jawab terhadap tugas yang berbeda di sistem TravelGo.</p>
            <p>Semua kontak dan informasi akun tersimpan secara aman.</p>
            <p>Gunakan halaman ini untuk melihat detail dan memastikan pengguna benar sebelum memperbarui hak akses.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
