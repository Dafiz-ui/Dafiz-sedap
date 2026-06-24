import { useMemo, useState } from "react";

const initialTransactions = [
  { id: 1, date: "2026-04-28", customer: "Alya", amount: 850000, status: "Paid" },
  { id: 2, date: "2026-04-29", customer: "Dimas", amount: 1250000, status: "Pending" },
  { id: 3, date: "2026-04-30", customer: "Nina", amount: 420000, status: "Paid" },
];

export default function LaporanTransaksi() {
  const [query, setQuery] = useState("");

  const filteredTransactions = useMemo(
    () => initialTransactions.filter((transaction) =>
      transaction.customer.toLowerCase().includes(query.toLowerCase()) ||
      transaction.status.toLowerCase().includes(query.toLowerCase())
    ),
    [query]
  );

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <h1 className="text-3xl font-semibold text-slate-900">Laporan Transaksi</h1>
        <p className="mt-2 text-slate-500">Review ringkasan transaksi dan status pembayaran hari ini.</p>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <input
          type="text"
          placeholder="Cari berdasarkan nama pelanggan atau status"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-slate-400"
        />
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-slate-700">
          <thead className="bg-slate-100 text-left text-slate-600 uppercase text-xs tracking-[0.1em]">
            <tr>
              {['ID', 'Tanggal', 'Pelanggan', 'Jumlah', 'Status'].map((label) => (
                <th key={label} className="px-4 py-3">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-slate-50">
                <td className="px-4 py-4 font-medium">{transaction.id}</td>
                <td className="px-4 py-4">{transaction.date}</td>
                <td className="px-4 py-4">{transaction.customer}</td>
                <td className="px-4 py-4">Rp {transaction.amount.toLocaleString()}</td>
                <td className="px-4 py-4">{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
