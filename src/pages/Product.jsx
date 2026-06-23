import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { productsAPI } from "../services/productsAPI";
import { useAuth } from "../contexts/useAuth";

const emptyForm = {
  title: "",
  code: "",
  category: "",
  brand: "",
  price: "",
  stock: "",
};

export default function Product() {
  const { profile } = useAuth();
  const isAdmin = profile?.role === "admin";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setProducts(await productsAPI.fetchProducts());
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setShowAddModal(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title || "",
      code: product.code || "",
      category: product.category || "",
      brand: product.brand || "",
      price: product.price || "",
      stock: product.stock || "",
    });
    setShowAddModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingProduct) {
        await productsAPI.updateProduct(editingProduct.id, {
          title: formData.title,
          code: formData.code,
          category: formData.category,
          brand: formData.brand,
          price: Number(formData.price),
          stock: Number(formData.stock),
        });
      } else {
        await productsAPI.createProduct(formData);
      }

      setFormData(emptyForm);
      setShowAddModal(false);
      setEditingProduct(null);
      await loadProducts();
    } catch (err) {
      setError(err.message || "Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      await productsAPI.deleteProduct(id);
      await loadProducts();
    } catch (err) {
      setError(err.message || "Failed to delete product");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <PageHeader
        title="Products"
        breadcrumb={["Dashboard", "Products"]}
        children={
          isAdmin ? (
            <button
              onClick={openCreateModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Add Product
            </button>
          ) : null
        }
      />

      {error && <div className="text-red-600 p-4">{error}</div>}
      {loading && <div className="p-4">Loading...</div>}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                {isAdmin && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id.slice(0, 8)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link to={`/products/${product.id}`} className="text-emerald-400 hover:text-emerald-500">
                      {product.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rp {Number(product.price).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                  {isAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                      <button onClick={() => openEditModal(product)} className="text-blue-600 hover:text-blue-800">Edit</button>
                      <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-800">Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && isAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">{editingProduct ? "Edit Product" : "Add New Product"}</h3>
            <form onSubmit={handleSubmit}>
              {["title", "code", "category", "brand", "price", "stock"].map((field) => (
                <div className="mb-4" key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
                  <input
                    type={field === "price" || field === "stock" ? "number" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  {editingProduct ? "Save" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
