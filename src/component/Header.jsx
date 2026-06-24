import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";


export default function Header() {
  return (
    <div className="w-full flex justify-between items-center bg-white shadow-md p-4">
      <div className="relative w-1/3">
        <FaSearch className="absolute top-3 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center space-x-4">
        <FaBell className="text-gray-600 text-xl cursor-pointer hover:text-blue-500 transition" />
        <FaUserCircle className="text-gray-600 text-3xl cursor-pointer hover:text-blue-500 transition" />
      </div>
    </div>
  );
}
