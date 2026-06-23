import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { customersAPI } from "../services/customersAPI";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  age: "",
  gender: "male",
};

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setCustomers(await customersAPI.fetchCustomers());
    } catch (err) {
      setError(err.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const openCreateModal = () => {
    setEditingCustomer(null);
    setFormData(emptyForm);
    setShowAddModal(true);
  };

  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      firstName: customer.first_name || "",
      lastName: customer.last_name || "",
      email: customer.email || "",
      phone: customer.phone || "",
      age: customer.age || "",
      gender: customer.gender || "male",
    });
    setShowAddModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (editingCustomer) {
        await customersAPI.updateCustomer(editingCustomer.id, {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          age: Number(formData.age) || null,
          gender: formData.gender,
        });
      } else {
        await customersAPI.createCustomer(formData);
      }

      setFormData(emptyForm);
      setShowAddModal(false);
      setEditingCustomer(null);
      await loadCustomers();
    } catch (err) {
      setError(err.message || "Failed to save customer");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this customer?")) return;

    try {
      await customersAPI.deleteCustomer(id);
      await loadCustomers();
    } catch (err) {
      setError(err.message || "Failed to delete customer");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div>
      <PageHeader
        title="Customers"
        breadcrumb={["Dashboard", "Customers"]}
        children={
          <button 
            onClick={openCreateModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add Customer
          </button>
        }
      />

      {error && <div className="text-red-600 p-4">{error}</div>}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{customer.id.slice(0, 8)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link to={`/customers/${customer.id}`} className="text-emerald-400 hover:text-emerald-500">
                      {customer.first_name} {customer.last_name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                    <button onClick={() => openEditModal(customer)} className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button onClick={() => handleDelete(customer.id)} className="text-red-600 hover:text-red-800">Delete</button>
                  </td>
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
              <h2 className="text-xl font-bold text-gray-900">{editingCustomer ? "Edit Customer" : "Add New Customer"}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 pt-6">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium">
                  {editingCustomer ? "Save" : "Add Customer"}
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
