import { useParams } from "react-router-dom";
export default function ProductsDetail() {
    const { id } = useParams();
    return <h1 className="text-2xl p-4">Detail Product dengan ID: {id}</h1>
}
