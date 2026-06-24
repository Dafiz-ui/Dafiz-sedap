import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import Unauthorized from "../pages/Unauthorized";

export default function OrderList() {
  const hasAccess = true;

  const [orders, setOrders] = useState([
    { id: 1, customer: "Andi", packageName: "Bali Sunrise", status: "Confirmed" },
    { id: 2, customer: "Siti", packageName: "Raja Ampat Adventure", status: "Pending" },
  ]);
  const [formData, setFormData] = useState({ customer: "", packageName: "", status: "Pending" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setOrders(orders.map((order) => (order.id === editId ? { ...formData, id: editId } : order)));
      setIsEditing(false);
      setEditId(null);
    } else {
      setOrders([...orders, { ...formData, id: Date.now() }]);
    }
    setFormData({ customer: "", packageName: "", status: "Pending" });
  };

  const handleEdit = (order) => {
    setIsEditing(true);
    setEditId(order.id);
    setFormData(order);
  };

  const handleDelete = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  if (!hasAccess) {
    return <Unauthorized />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Kelola Booking" }]} />
        <h1 className="text-3xl font-semibold text-slate-900">Kelola Booking</h1>
        <p className="text-slate-500 mt-2">Lihat dan kelola semua pesanan paket wisata pelanggan.</p>
      </div>
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr_auto] items-end">
          <div>
            <label className="text-sm text-slate-600">Nama Pelanggan</label>
            <input
              type="text"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-slate-400 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Nama Paket</label>
            <input
              type="text"
              value={formData.packageName}
              onChange={(e) => setFormData({ ...formData, packageName: e.target.value })}
              required
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-slate-400 outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-slate-600">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus:border-slate-400 outline-none"
            >
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
            </select>
          </div>
          <button className="rounded-2xl bg-emerald-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-emerald-700 transition">
            {isEditing ? "Perbarui Booking" : "Tambah Booking"}
          </button>
        </form>
      </div>
      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-slate-700">
          <thead className="bg-slate-100 text-left text-slate-600 uppercase text-xs tracking-[0.1em]">
            <tr>
              {['ID', 'Pelanggan', 'Paket Wisata', 'Status', 'Aksi'].map((title) => (
                <th key={title} className="px-4 py-3">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50">
                <td className="px-4 py-4 font-medium">{order.id}</td>
                <td className="px-4 py-4">{order.customer}</td>
                <td className="px-4 py-4">{order.packageName}</td>
                <td className="px-4 py-4">{order.status}</td>
                <td className="px-4 py-4 flex gap-2">
                  <button
                    className="rounded-2xl bg-yellow-400 px-4 py-2 text-white hover:bg-yellow-500"
                    onClick={() => handleEdit(order)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded-2xl bg-rose-500 px-4 py-2 text-white hover:bg-rose-600"
                    onClick={() => handleDelete(order.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
