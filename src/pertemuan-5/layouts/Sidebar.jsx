import { NavLink } from "react-router-dom";
import { FiGrid, FiMap, FiBookOpen, FiCreditCard, FiUsers, FiLayers, FiStar, FiBarChart2, FiMessageCircle } from "react-icons/fi";

export default function Sidebar() {
  const menuClass = ({ isActive }) =>
    `flex items-center px-4 py-3 rounded-xl transition ${
      isActive ? "bg-slate-100 text-slate-900 font-semibold" : "text-slate-600 hover:bg-slate-50"
    }`;

  return (
    <aside className="w-72 bg-white min-h-screen border-r border-slate-200 shadow-sm">
      <div className="p-6">
        <div className="text-3xl font-bold text-slate-900 mb-2">TravelGo</div>
        <div className="text-sm text-slate-500 mb-8">Admin Dashboard</div>
        <ul className="space-y-2">
          <li>
            <NavLink to="/admin/dashboard" className={menuClass}>
              <FiGrid className="mr-3 text-lg" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/kelola-paket" className={menuClass}>
              <FiMap className="mr-3 text-lg" />
              Kelola Paket Wisata
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/kelola-booking" className={menuClass}>
              <FiBookOpen className="mr-3 text-lg" />
              Kelola Booking
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/verifikasi-pembayaran" className={menuClass}>
              <FiCreditCard className="mr-3 text-lg" />
              Verifikasi Pembayaran
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/kelola-user" className={menuClass}>
              <FiUsers className="mr-3 text-lg" />
              Kelola User
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}

