import { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { parseCSV, readFileAsText } from '../utils/csvParser';
import { categorizeTransactions } from '../utils/transactionCategorizer';
import FileUpload from '../components/FileUpload';
import TransactionTable from '../components/TransactionTable';
import TransactionSummary from '../components/TransactionSummary';
import CategoryEditor from '../components/CategoryEditor';

export default function Accounting() {
  const {
    transactions,
    uploadTransactions,
    updateCategory,
    deleteTransaction,
    clearAllTransactions,
    getSummary
  } = useTransactions();

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleFileUpload = async (file) => {
    setIsProcessing(true);
    setError('');

    try {
      const content = await readFileAsText(file);
      const parsed = parseCSV(content);
      const categorized = categorizeTransactions(parsed);
      uploadTransactions(categorized);
    } catch (err) {
      setError(err.message || 'Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCategoryClick = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleCategorySave = (id, category, subcategory) => {
    updateCategory(id, category, subcategory);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all transactions? This cannot be undone.')) {
      clearAllTransactions();
    }
  };

  const summary = getSummary();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Accounting</h1>
        {transactions.length > 0 && (
          <button
            onClick={handleClearAll}
            className="px-4 py-2 text-red-600 hover:text-red-800 text-sm"
          >
            Clear All
          </button>
        )}
      </div>

      {transactions.length > 0 && (
        <TransactionSummary summary={summary} />
      )}

      <FileUpload onUpload={handleFileUpload} isProcessing={isProcessing} />

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">
            Transactions ({transactions.length})
          </h2>
        </div>
        <TransactionTable
          transactions={transactions}
          onCategoryClick={handleCategoryClick}
          onDelete={handleDelete}
        />
      </div>

      {editingTransaction && (
        <CategoryEditor
          transaction={editingTransaction}
          onSave={handleCategorySave}
          onClose={() => setEditingTransaction(null)}
        />
      )}
    </div>
  );
}
