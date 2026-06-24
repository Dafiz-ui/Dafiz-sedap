import { FaBell, FaSearch } from "react-icons/fa";
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    return (
        <div className="flex flex-col gap-4 md:flex-row justify-between items-center p-6 bg-white border-b border-slate-200 shadow-sm">
            <div className="w-full md:w-2/3 relative">
                <input
                    type="text"
                    placeholder="Cari paket destinasi, booking, atau user..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-slate-700 focus:border-slate-400 focus:outline-none"
                />
                <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <div className="flex items-center gap-3">
                <div className="relative p-3 rounded-2xl bg-slate-100 text-slate-700 cursor-pointer">
                    <FaBell />
                    <span className="absolute top-0 right-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">8</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 text-slate-700 cursor-pointer">
                    <FcAreaChart />
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 text-rose-500 cursor-pointer">
                    <SlSettings />
                </div>
                <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
                    <div className="text-right">
                        <p className="text-sm text-slate-500">Hello,</p>
                        <p className="font-semibold text-slate-900">Dafiz Z.</p>
                    </div>
                    <img
                        src="https://avatar.iran.liara.run/public/28"
                        alt="Avatar"
                        className="w-11 h-11 rounded-full border border-slate-200"
                    />
                </div>
            </div>
        </div>
    );
}
