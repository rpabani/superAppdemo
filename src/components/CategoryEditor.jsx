import { useState, useEffect } from 'react';
import { ACCOUNTING_CATEGORIES } from '../constants/accountingCategories';

export default function CategoryEditor({ transaction, onSave, onClose }) {
  const [selectedCategory, setSelectedCategory] = useState(transaction?.category || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState(transaction?.subcategory || '');

  useEffect(() => {
    if (transaction) {
      setSelectedCategory(transaction.category);
      setSelectedSubcategory(transaction.subcategory);
    }
  }, [transaction]);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    const subcategories = Object.keys(ACCOUNTING_CATEGORIES[newCategory]?.subcategories || {});
    setSelectedSubcategory(subcategories[0] || '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(transaction.id, selectedCategory, selectedSubcategory);
    onClose();
  };

  if (!transaction) return null;

  const currentCategory = ACCOUNTING_CATEGORIES[selectedCategory];
  const subcategories = currentCategory?.subcategories || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Edit Category</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">{transaction.description}</p>
          <p className={`text-lg font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {transaction.amount >= 0 ? '+' : ''}{transaction.amount.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(ACCOUNTING_CATEGORIES).map(([key, cat]) => (
                <option key={key} value={key}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subcategory
            </label>
            <select
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(subcategories).map(([key, sub]) => (
                <option key={key} value={key}>
                  {sub.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
