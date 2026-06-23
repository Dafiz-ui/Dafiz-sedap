import { useEffect, useState } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { ordersAPI } from "../services/ordersAPI";
import { getDiscountByTier } from "../services/profilesAPI";
import { useAuth } from "../contexts/useAuth";

export default function Dashboard() {
    const { profile } = useAuth();
    const [stats, setStats] = useState({
        orders: 0,
        delivered: 0,
        canceled: 0,
        revenue: 0,
    });

    useEffect(() => {
        ordersAPI
            .fetchOrders()
            .then((orders) => {
                setStats({
                    orders: orders.length,
                    delivered: orders.filter((order) => order.status === "completed").length,
                    canceled: orders.filter((order) => order.status === "cancelled").length,
                    revenue: orders
                        .filter((order) => order.status === "completed")
                        .reduce((total, order) => total + Number(order.total_price || 0), 0),
                });
            })
            .catch(() => {
                setStats({
                    orders: 0,
                    delivered: 0,
                    canceled: 0,
                    revenue: 0,
                });
            });
    }, []);

    const isMember = profile?.role === "member";
    const discount = getDiscountByTier(profile?.tier);

    return (
        <div id="dashboard-container">
            <PageHeader title={isMember ? "Member Dashboard" : "Dashboard"} />
            <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div id="dashboard-orders" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="orders-icon" className="bg-hijau rounded-full p-4">
                        <FaShoppingCart className="text-3xl text-white" />
                    </div>
                    <div id="orders-info" className="flex flex-col">
                        <span id="orders-count" className="text-2xl font-bold">{stats.orders}</span>
                        <span id="orders-text" className="text-gray-400">{isMember ? "My Orders" : "Total Orders"}</span>
                    </div>
                </div>

                <div id="dashboard-delivered" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="delivered-icon" className="bg-biru rounded-full p-4">
                        <FaTruck className="text-3xl text-white" />
                    </div>
                    <div id="delivered-info" className="flex flex-col">
                        <span id="delivered-count" className="text-2xl font-bold">{isMember ? profile?.points || 0 : stats.delivered}</span>
                        <span id="delivered-text" className="text-gray-400">{isMember ? "Member Points" : "Total Delivered"}</span>
                    </div>
                </div>

                <div id="dashboard-canceled" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="canceled-icon" className="bg-merah rounded-full p-4">
                        <FaBan className="text-3xl text-white" />
                    </div>
                    <div id="canceled-info" className="flex flex-col">
                        <span id="canceled-count" className="text-2xl font-bold">{isMember ? profile?.tier || "bronze" : stats.canceled}</span>
                        <span id="canceled-text" className="text-gray-400">{isMember ? "Member Tier" : "Total Canceled"}</span>
                    </div>
                </div>

                <div id="dashboard-revenue" className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4">
                    <div id="revenue-icon" className="bg-kuning rounded-full p-4">
                        <FaDollarSign className="text-3xl text-white" />
                    </div>
                    <div id="revenue-info" className="flex flex-col">
                        <span id="revenue-amount" className="text-2xl font-bold">{isMember ? `${discount}%` : `Rp ${stats.revenue.toLocaleString()}`}</span>
                        <span id="revenue-text" className="text-gray-400">{isMember ? "Tier Discount" : "Total Revenue"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
