import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";

export default function CustomerList() {
  const [payments, setPayments] = useState([
    { id: 1, customer: "Rina", amount: 5200000, method: "Transfer", status: "Belum Diverifikasi" },
    { id: 2, customer: "Budi", amount: 2800000, method: "E-Wallet", status: "Terverifikasi" },
  ]);

  const verifyPayment = (id) => {
    setPayments(payments.map((payment) => payment.id === id ? { ...payment, status: "Terverifikasi" } : payment));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Verifikasi Pembayaran" }]} />
        <h1 className="text-3xl font-semibold text-slate-900">Verifikasi Pembayaran</h1>
        <p className="text-slate-500 mt-2">Periksa bukti pembayaran dan konfirmasi status transfer pelanggan.</p>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-slate-700">
          <thead className="bg-slate-100 text-left text-slate-600 uppercase text-xs tracking-[0.1em]">
            <tr>
              {['ID', 'Pelanggan', 'Jumlah', 'Metode', 'Status', 'Aksi'].map((title) => (
                <th key={title} className="px-4 py-3">{title}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-slate-50">
                <td className="px-4 py-4 font-medium">{payment.id}</td>
                <td className="px-4 py-4">{payment.customer}</td>
                <td className="px-4 py-4">Rp {payment.amount.toLocaleString()}</td>
                <td className="px-4 py-4">{payment.method}</td>
                <td className="px-4 py-4">{payment.status}</td>
                <td className="px-4 py-4">
                  {payment.status !== "Terverifikasi" ? (
                    <button
                      className="rounded-2xl bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                      onClick={() => verifyPayment(payment.id)}
                    >
                      Verifikasi
                    </button>
                  ) : (
                    <span className="rounded-2xl bg-slate-100 px-4 py-2 text-slate-600">Sudah</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
