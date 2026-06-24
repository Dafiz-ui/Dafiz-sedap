import { FaHome, FaUsers, FaBox, FaSignOutAlt } from "react-icons/fa";


export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-5 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex-1">
        <ul>
          <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-md cursor-pointer">
            <FaHome />
            <span>Dashboard</span>
          </li>
          <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-md cursor-pointer">
            <FaUsers />
            <span>Users</span>
          </li>
          <li className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-md cursor-pointer">
            <FaBox />
            <span>Products</span>
          </li>
          <li>
    <NavLink
            id="menu-4"
            to="/products"
            className={menuClass}
        >
            <MdFastfood className="mr-4 text-xl" />
            Products
    </NavLink>
</li>
        </ul>
      </nav>
      <button className="flex items-center space-x-3 p-3 hover:bg-red-500 rounded-md cursor-pointer">
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </div>
  );
}
