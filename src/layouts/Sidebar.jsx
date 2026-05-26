import { FaHome, FaShoppingCart, FaUsers, FaBox, FaStar, FaPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4 space-x-2
        ${isActive ? 
            "text-hijau bg-green-200 font-extrabold" : 
            "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`;

    return (
        <div id="sidebar" className="w-64 bg-latar h-screen p-4 flex flex-col">
            {/* Logo */}
            <div id="sidebar-logo" className="flex flex-col mb-8">
                <span id="logo-title" className="font-poppins text-[48px] text-gray-900">
                    Sedap <b id="logo-dot" className="text-hijau">.</b>
                </span>
                <span id="logo-subtitle" className="font-semibold text-gray-400">Modern Admin Dashboard</span>
            </div>

            {/* List Menu */}
            <div id="sidebar-menu">
                <ul id="menu-list" className="space-y-2">
                    <li>
                        <NavLink to="/" className={menuClass}>
                            <FaHome className="mr-4 text-xl" />
                            <span className="font-barlow">Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/orders" className={menuClass}>
                            <FaShoppingCart className="mr-4 text-xl" />
                            <span className="font-barlow">Orders</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/customers" className={menuClass}>
                            <FaUsers className="mr-4 text-xl" />
                            <span className="font-barlow">Customers</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" className={menuClass}>
                            <FaBox className="mr-4 text-xl" />
                            <span className="font-barlow">Products</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/fitur-xyz" className={menuClass}>
                            <FaStar className="mr-4 text-xl" />
                            <span className="font-barlow">Fitur XYZ</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <div id="sidebar-footer" className="mt-auto">
                <div id="footer-card" className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center">
                    <div id="footer-text" className="text-white text-sm flex-1">
                        <span>Please organize your menus through button below!</span>
                        <div id="add-menu-button" className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2">
                            <FaPlus className="text-gray-600" />
                            <span className="text-gray-600 flex items-center">Add Menus</span>
                        </div>
                    </div>
                    <img id="footer-avatar" src="https://avatar.iran.liara.run/public/28" className="w-20 rounded-full ml-4" />
                </div>
                <span id="footer-brand" className="font-bold text-gray-400 block">Sedap Restaurant Admin Dashboard</span>
                <p id="footer-copyright" className="font-light text-gray-400">&copy; 2025 All Right Reserved</p>
            </div>
        </div>
    );
}