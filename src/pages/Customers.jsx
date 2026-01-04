import { useState } from 'react';
import { useCustomers } from '../hooks/useCustomers';
import { CustomerTable } from '../components/CustomerTable';
import { CustomerForm } from '../components/CustomerForm';

export default function Customers() {
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useCustomers();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const handleAdd = () => {
    setEditingCustomer(null);
    setIsFormOpen(true);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      deleteCustomer(id);
    }
  };

  const handleSave = (formData) => {
    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
    } else {
      addCustomer(formData);
    }
    setIsFormOpen(false);
    setEditingCustomer(null);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingCustomer(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Customers</h1>

      <CustomerTable
        customers={customers}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {isFormOpen && (
        <CustomerForm
          customer={editingCustomer}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
