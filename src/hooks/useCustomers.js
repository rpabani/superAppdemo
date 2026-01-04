import { useState, useEffect } from 'react';
import initialCustomers from '../../data/customers.json';

const STORAGE_KEY = 'superapp_customers';

export function useCustomers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCustomers(JSON.parse(stored));
    } else {
      setCustomers(initialCustomers);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCustomers));
    }
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const addCustomer = (customer) => {
    const newCustomer = {
      ...customer,
      id: crypto.randomUUID(),
    };
    const updated = [...customers, newCustomer];
    setCustomers(updated);
    saveToStorage(updated);
  };

  const updateCustomer = (id, updates) => {
    const updated = customers.map((c) =>
      c.id === id ? { ...c, ...updates } : c
    );
    setCustomers(updated);
    saveToStorage(updated);
  };

  const deleteCustomer = (id) => {
    const updated = customers.filter((c) => c.id !== id);
    setCustomers(updated);
    saveToStorage(updated);
  };

  return {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  };
}
