import { useState } from "react";

const initialMessages = [
  { id: 1, name: "Hendra", subject: "Inquiry Paket Bali", message: "Apakah paket Bali termasuk tiket pesawat?" },
  { id: 2, name: "Mira", subject: "Bantuan Pembayaran", message: "Saya kesulitan upload bukti transfer." },
];

export default function KontakPesan() {
  const [messages] = useState(initialMessages);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <h1 className="text-3xl font-semibold text-slate-900">Kelola Pesan Kontak</h1>
        <p className="mt-2 text-slate-500">Tinjau pesan pelanggan dan tanggapi permintaan layanan.</p>
      </div>

      <div className="grid gap-4">
        {messages.map((item) => (
          <div key={item.id} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{item.subject}</h2>
                <p className="text-slate-500">{item.name}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-4 py-2 text-slate-700">ID {item.id}</span>
            </div>
            <p className="mt-4 text-slate-700">{item.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
