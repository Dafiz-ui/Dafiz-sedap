import { Outlet, Link } from 'react-router-dom';
import { FaHome, FaMap, FaHistory, FaInfoCircle, FaPhone } from 'react-icons/fa';

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex flex-col min-h-screen">
        {/* Header/Navigation */}
        <nav className="bg-white border-b border-slate-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-emerald-600">
                TravelGo
              </Link>
              <div className="hidden md:flex items-center gap-8">
                <Link to="/" className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition">
                  <FaHome /> Home
                </Link>
                <Link to="/paket-wisata" className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition">
                  <FaMap /> Paket Wisata
                </Link>
                <Link to="/riwayat-booking" className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition">
                  <FaHistory /> Riwayat Booking
                </Link>
                <Link to="/tentang-kami" className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition">
                  <FaInfoCircle /> Tentang Kami
                </Link>
                <Link to="/kontak" className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 transition">
                  <FaPhone /> Kontak
                </Link>
                <Link to="/login" className="rounded-2xl bg-emerald-600 text-white px-6 py-2 hover:bg-emerald-700 transition">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-white mt-12">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <h3 className="font-bold text-lg mb-4">TravelGo</h3>
                <p className="text-slate-400">Platform wisata terpercaya untuk liburan sempurna Anda.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Menu</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><Link to="/" className="hover:text-white">Home</Link></li>
                  <li><Link to="/paket-wisata" className="hover:text-white">Paket Wisata</Link></li>
                  <li><Link to="/tentang-kami" className="hover:text-white">Tentang Kami</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Kontak</h4>
                <ul className="space-y-2 text-slate-400">
                  <li>Phone: +62 812-3456-7890</li>
                  <li>Email: info@travelgo.com</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Ikuti Kami</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><a href="#" className="hover:text-white">Instagram</a></li>
                  <li><a href="#" className="hover:text-white">Facebook</a></li>
                  <li><a href="#" className="hover:text-white">Twitter</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
              <p>&copy; 2026 TravelGo. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default UserLayout;
