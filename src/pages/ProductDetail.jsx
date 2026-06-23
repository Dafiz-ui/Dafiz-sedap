import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { productsAPI } from "../services/productsAPI";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        productsAPI
            .fetchProduct(id)
            .then(setProduct)
            .catch((err) => {
                setError(err.message || "Failed to load product");
            });
    }, [id]);

    if (error) return <div className="text-red-600 p-4">{error}</div>;
    if (!product) return <div className="p-4">Loading...</div>;

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6">
            {product.image_url && (
                <img
                    src={product.image_url}
                    alt={product.title}
                    className="rounded-xl mb-4 w-full h-48 object-cover"
                />
            )}
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-1">Kategori: {product.category || "-"}</p>
            <p className="text-gray-600 mb-1">Brand: {product.brand || "-"}</p>
            <p className="text-gray-600 mb-1">Stock: {product.stock}</p>
            <p className="text-gray-800 font-semibold text-lg">
                Harga: Rp {Number(product.price || 0).toLocaleString()}
            </p>
        </div>
    );
}
