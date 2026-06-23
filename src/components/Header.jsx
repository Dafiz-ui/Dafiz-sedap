import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

export default function Header() {
    const navigate = useNavigate();
    const { profile, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div id="header-container" className="bg-white shadow p-4 flex justify-between items-center">
            <div id="search-bar" className="relative flex-1 max-w-lg">
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search Here..."
                    className="border border-gray-100 p-2 pr-10 bg-white w-full max-w-lg rounded-md outline-none"
                />
                <FaSearch id="search-icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
            </div>

            <div id="icons-container" className="flex items-center space-x-4">
                <div id="notification-icon" className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer">
                    <FaBell />
                    <span id="notification-badge" className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs">50</span>
                </div>
                <div id="chart-icon" className="p-3 bg-blue-100 rounded-2xl cursor-pointer">
                    <FcAreaChart />
                </div>
                <div id="settings-icon" className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer">
                    <SlSettings />
                </div>

                <div id="profile-container" className="flex items-center space-x-4 border-l pl-4 border-gray-300">
                    <span id="profile-text" className="font-barlow text-teks">
                        Hi, <b>{profile?.full_name || profile?.email || "User"}</b>
                    </span>
                    <img
                        id="profile-avatar"
                        src="https://avatar.iran.liara.run/public/28"
                        className="w-10 h-10 rounded-full"
                    />
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
