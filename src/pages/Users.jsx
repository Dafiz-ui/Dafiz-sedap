import { Link } from "react-router-dom";

const users = [
  {
    id: "1",
    name: "Adi Pratama",
    email: "adi.pratama@example.com",
    role: "Administrator",
    city: "Surabaya"
  },
  {
    id: "2",
    name: "Sinta Maharani",
    email: "sinta.maharani@example.com",
    role: "Content Writer",
    city: "Bandung"
  },
  {
    id: "3",
    name: "Rudi Santoso",
    email: "rudi.santoso@example.com",
    role: "Customer Support",
    city: "Yogyakarta"
  }
];

export default function Users() {
  return (
    <div className="p-4">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Daftar User</h1>
          <p className="text-gray-600 mt-1">Klik user untuk melihat biodata lengkap masing-masing.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {users.map((user) => (
          <Link
            key={user.id}
            to={`/users/${user.id}`}
            className="block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">Lihat</span>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>Email: {user.email}</p>
              <p>Kota: {user.city}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
