import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { ordersAPI } from "../services/ordersAPI";
import { productsAPI } from "../services/productsAPI";
import { customersAPI } from "../services/customersAPI";
import { useAuth } from "../contexts/useAuth";

export default function Orders() {
  const { user, profile } = useAuth();
  const isAdmin = profile?.role === "admin";
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    customerId: "",
    productId: "",
    quantity: 1,
  });

  const formatDate = (dateStr) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(new Date(dateStr));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount || 0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const loadOrders = async () => {
    try {
      setLoading(true);
      setOrders(await ordersAPI.fetchOrders());
    } catch (err) {
      setError(err.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const loadFormData = async () => {
    const [productList, customerList] = await Promise.all([
      productsAPI.fetchProducts(),
      customersAPI.fetchCustomers(),
    ]);
    setProducts(productList);
    setCustomers(customerList);
  };

  useEffect(() => {
    loadOrders();
    loadFormData().catch((err) => setError(err.message || "Failed to load form data"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const product = products.find((item) => item.id === formData.productId);
    const customer = customers.find((item) => item.id === formData.customerId);

    if (!product) {
      setError("Product is required");
      return;
    }

    try {
      await ordersAPI.createOrder({
        userId: customer?.user_id || user.id,
        customerId: formData.customerId || customer?.id || null,
        product,
        quantity: formData.quantity,
        tier: profile?.tier,
      });

      setFormData({ customerId: "", productId: "", quantity: 1 });
      setShowAddModal(false);
      await loadOrders();
    } catch (err) {
      setError(err.message || "Failed to create order");
    }
  };

  const handleStatusChange = async (order, status) => {
    try {
      await ordersAPI.updateOrderStatus(order, status);
      await loadOrders();
    } catch (err) {
      setError(err.message || "Failed to update order");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this order?")) return;

    try {
      await ordersAPI.deleteOrder(id);
      await loadOrders();
    } catch (err) {
      setError(err.message || "Failed to delete order");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div id="orders-container" className="p-6">
      <PageHeader
        title={isAdmin ? "Order List" : "My Orders"}
        breadcrumb={["Dashboard", "Orders"]}
        children={
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add Order
          </button>
        }
      />

      {error && <div className="text-red-600 p-4">{error}</div>}
      {loading && <div className="p-4">Loading...</div>}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                {isAdmin && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.order_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customers ? `${order.customers.first_name} ${order.customers.last_name}` : profile?.full_name || profile?.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(order.total_price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.order_date)}</td>
                  {isAdmin && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                      <select value={order.status} onChange={(e) => handleStatusChange(order, e.target.value)} className="border border-gray-300 rounded p-1">
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <button onClick={() => handleDelete(order.id)} className="text-red-600 hover:text-red-800">Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Add New Order</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                {isAdmin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Customer</label>
                    <select name="customerId" value={formData.customerId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">No customer</option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.first_name} {customer.last_name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
                  <select name="productId" value={formData.productId} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Select product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.title} - {formatCurrency(product.price)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="1" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
              </div>
              <div className="flex space-x-3 pt-6">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium">
                  Add Order
                </button>
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 font-medium">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
