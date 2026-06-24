import React, { useState, useEffect } from "react";

const CustomerForm = ({ addCustomer, editingCustomer }) => {
  const [customer, setCustomer] = useState({ id: null, name: "", email: "" });

  // Mengisi form jika sedang dalam mode edit
  useEffect(() => {
    if (editingCustomer) {
      setCustomer(editingCustomer);
    } else {
      setCustomer({ id: null, name: "", email: "" });
    }
  }, [editingCustomer]);

  // Mengelola perubahan input
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.email) return;

    addCustomer(customer);
    setCustomer({ id: null, name: "", email: "" }); // Reset form setelah submit
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{customer.id ? "Edit Customer" : "Add Customer"}</h3>
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={customer.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={customer.email}
        onChange={handleChange}
      />
      <button type="submit">
        {customer.id ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default CustomerForm;
