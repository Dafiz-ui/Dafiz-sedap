import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-8">
            <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-slate-900">TravelGo</h1>
                    <p className="text-slate-500 mt-2">Login untuk mengakses dashboard manajemen wisata</p>
                </div>
                <Outlet />
                <p className="text-center text-sm text-slate-400 mt-8">
                    © 2026 TravelGo. Hak cipta dilindungi.
                </p>
            </div>
        </div>
    );
}
