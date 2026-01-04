import { ACCOUNTING_CATEGORIES } from '../constants/accountingCategories';

export function categorizeTransaction(transaction) {
  const description = transaction.description.toLowerCase();
  const amount = transaction.amount;
  const isCredit = amount > 0;

  for (const [categoryKey, category] of Object.entries(ACCOUNTING_CATEGORIES)) {
    if (categoryKey === 'uncategorized') continue;

    for (const [subKey, subcategory] of Object.entries(category.subcategories)) {
      for (const keyword of subcategory.keywords) {
        if (description.includes(keyword.toLowerCase())) {
          return {
            category: categoryKey,
            subcategory: subKey,
            categoryLabel: category.label,
            subcategoryLabel: subcategory.label
          };
        }
      }
    }
  }

  if (isCredit) {
    return {
      category: 'revenue',
      subcategory: 'other_revenue',
      categoryLabel: 'Revenue',
      subcategoryLabel: 'Other Revenue'
    };
  } else {
    return {
      category: 'operating_expenses',
      subcategory: 'other_expenses',
      categoryLabel: 'Operating Expenses',
      subcategoryLabel: 'Other Expenses'
    };
  }
}

export function categorizeTransactions(transactions) {
  return transactions.map(transaction => {
    const categorization = categorizeTransaction(transaction);
    return {
      ...transaction,
      id: crypto.randomUUID(),
      ...categorization,
      isManuallyRecategorized: false
    };
  });
}
