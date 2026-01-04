export default function TransactionSummary({ summary }) {
  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-GB', {
      style: 'currency',
      currency: 'GBP'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
        <p className="text-sm text-gray-500 uppercase tracking-wide">Total Income</p>
        <p className="text-2xl font-bold text-green-600">
          {formatCurrency(summary.totalIncome)}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
        <p className="text-sm text-gray-500 uppercase tracking-wide">Total Expenses</p>
        <p className="text-2xl font-bold text-red-600">
          {formatCurrency(summary.totalExpenses)}
        </p>
      </div>

      <div className={`bg-white rounded-lg shadow p-4 border-l-4 ${
        summary.netPosition >= 0 ? 'border-blue-500' : 'border-orange-500'
      }`}>
        <p className="text-sm text-gray-500 uppercase tracking-wide">Net Position</p>
        <p className={`text-2xl font-bold ${
          summary.netPosition >= 0 ? 'text-blue-600' : 'text-orange-600'
        }`}>
          {formatCurrency(summary.netPosition)}
        </p>
      </div>
    </div>
  );
}
