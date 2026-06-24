import { Link } from "react-router-dom";
import { useState } from "react";

export const initialUsers = [
  { id: 1, name: "Maya", role: "Admin", email: "maya@travelgo.com" },
  { id: 2, name: "Rudi", role: "Staff Booking", email: "rudi@travelgo.com" },
  { id: 3, name: "Sari", role: "Customer Support", email: "sari@travelgo.com" },
];

export default function UserList() {
  const [users] = useState(initialUsers);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-slate-500">Kelola User</p>
            <h1 className="text-3xl font-semibold text-slate-900">Daftar User Sistem</h1>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-slate-700">
            Total user: {users.length}
          </div>
        </div>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-slate-700">
          <thead className="bg-slate-100 text-left text-slate-600 uppercase text-xs tracking-[0.1em]">
            <tr>
              {['ID', 'Nama', 'Role', 'Email'].map((label) => (
                <th key={label} className="px-4 py-3">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="px-4 py-4 font-medium">
                  <Link to={`/admin/kelola-user/${user.id}`} className="text-blue-600 hover:underline">
                    {user.id}
                  </Link>
                </td>
                <td className="px-4 py-4">
                  <Link to={`/admin/kelola-user/${user.id}`} className="text-slate-900 hover:text-blue-700">
                    {user.name}
                  </Link>
                </td>
                <td className="px-4 py-4">{user.role}</td>
                <td className="px-4 py-4">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
