import { useState, useEffect } from 'react';
import { ACCOUNTING_CATEGORIES } from '../constants/accountingCategories';

const STORAGE_KEY = 'superapp_transactions';

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTransactions(JSON.parse(stored));
    }
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const uploadTransactions = (newTransactions) => {
    const updated = [...transactions, ...newTransactions];
    setTransactions(updated);
    saveToStorage(updated);
  };

  const updateCategory = (id, categoryKey, subcategoryKey) => {
    const category = ACCOUNTING_CATEGORIES[categoryKey];
    const subcategory = category?.subcategories[subcategoryKey];

    const updated = transactions.map((t) =>
      t.id === id
        ? {
            ...t,
            category: categoryKey,
            subcategory: subcategoryKey,
            categoryLabel: category?.label || 'Unknown',
            subcategoryLabel: subcategory?.label || 'Unknown',
            isManuallyRecategorized: true
          }
        : t
    );
    setTransactions(updated);
    saveToStorage(updated);
  };

  const deleteTransaction = (id) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    saveToStorage(updated);
  };

  const clearAllTransactions = () => {
    setTransactions([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getSummary = () => {
    const totalIncome = transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const netPosition = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      netPosition,
      transactionCount: transactions.length
    };
  };

  return {
    transactions,
    uploadTransactions,
    updateCategory,
    deleteTransaction,
    clearAllTransactions,
    getSummary
  };
}
