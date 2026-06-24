import { useState, useEffect } from "react"
const ProductCRUD = () => {
    const [products, setProducts] = useState([])
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")
    const [editIndex, setEditIndex] = useState(null)


    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);


    const handleAdd = () => {
        if (title && price && category && image) {
            if (editIndex !== null) {
                const updatedProducts = [...products];
                updatedProducts[editIndex] = { title, price, category, image };
                setProducts(updatedProducts);
                setEditIndex(null);
            } else {
                setProducts([...products, { title, price, category, image }]);
            }
            setTitle("");
            setPrice("");
            setCategory("");
            setImage("");
        }
    }
    const handleEdit = (index) => {
        setTitle(products[index].title);
        setPrice(products[index].price);
        setCategory(products[index].category);
        setImage(products[index].image);
        setEditIndex(index);
    }
    const handleDelete = (index) => {
        setProducts(products.filter((_, i) => i !== index));
    }
    return (
        <>
            <h1 className="text-2xl font-bold text-center mb-4">Manajemen Produk</h1>
            <div className="p-4 mb-4 border rounded shadow">
                <input
                    type="text"
                    placeholder="Nama Produk"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-2 w-full p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Harga Produk"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mb-2 w-full p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Kategori"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mb-2 w-full p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="URL Gambar"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="mb-2 w-full p-2 border rounded"
                />
                <button
                    onClick={handleAdd}
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    {editIndex !== null ? "Update Produk" : "Tambah Produk"}
                </button>
            </div>
            <div>
                {products.map((product, index) => (
                    <div key={index} style={{ padding: "12px", border: "1px solid #ccc", marginBottom: "8px", borderRadius: "5px" }}>
                        <p style={{ fontWeight: "bold" }}>{product.title}</p>
                        <p>Rp{product.price}</p>
                        <p>{product.category}</p>
                        <img src={product.image} alt={product.title} style={{ width: "50px", height: "50px", objectFit: "cover" }} />
                        <div style={{ marginTop: "8px" }}>
                            <button onClick={() => handleEdit(index)} style={{ marginRight: "5px", backgroundColor: "orange", color: "white", padding: "5px", border: "none" }}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(index)} style={{ backgroundColor: "red", color: "white", padding: "5px", border: "none" }}>
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default ProductCRUD
