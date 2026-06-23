import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { customersAPI } from "../services/customersAPI";

export default function CustomerDetail() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        customersAPI
            .fetchCustomer(id)
            .then(setCustomer)
            .catch((err) => {
                setError(err.message || "Failed to load customer");
            });
    }, [id]);

    if (error) return <div className="text-red-600 p-4">{error}</div>;
    if (!customer) return <div className="p-4">Loading...</div>;

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6">
            <h2 className="text-2xl font-bold mb-2">{customer.first_name} {customer.last_name}</h2>
            <p className="text-gray-600 mb-1">Email: {customer.email}</p>
            <p className="text-gray-600 mb-1">Phone: {customer.phone || "-"}</p>
            <p className="text-gray-600 mb-1">Age: {customer.age || "-"}</p>
            <p className="text-gray-600 mb-1">Gender: {customer.gender || "-"}</p>
        </div>
    );
}
