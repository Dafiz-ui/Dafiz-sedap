import { useState } from "react";

const bookingPackages = [
  { id: 1, name: "Bali Sunrise", date: "10-14 Mei 2026", status: "Confirmed", price: 2800000 },
  { id: 2, name: "Lombok Romantis", date: "20-22 Juni 2026", status: "Pending", price: 3200000 },
];

export default function RiwayatBooking() {
  const [bookings] = useState(bookingPackages);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900">Riwayat Booking Anda</h1>
        <p className="text-slate-500 mt-2">Lihat detail semua booking wisata Anda</p>
      </div>

      <div className="grid gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-lg transition">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{booking.name}</h2>
                <p className="text-slate-600 mt-1">📅 {booking.date}</p>
                <p className="text-emerald-600 font-semibold mt-2">Rp {booking.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  booking.status === "Confirmed" 
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {booking.status}
                </span>
                <button className="rounded-2xl bg-emerald-600 px-4 py-2 text-white text-sm hover:bg-emerald-700">
                  Detail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
