export const ACCOUNTING_CATEGORIES = {
  revenue: {
    label: 'Revenue',
    type: 'income',
    color: 'green',
    subcategories: {
      coaching_revenue: {
        label: 'Coaching Revenue',
        keywords: ['stripe payout', 'client session', 'coaching', 'consulting', 'retainer']
      },
      course_sales: {
        label: 'Course Sales',
        keywords: ['course sales', 'online course', 'digital product']
      },
      workshop_revenue: {
        label: 'Workshop Revenue',
        keywords: ['workshop', 'seminar', 'training', 'webinar']
      },
      other_revenue: {
        label: 'Other Revenue',
        keywords: []
      }
    }
  },

  cost_of_sales: {
    label: 'Cost of Sales',
    type: 'expense',
    color: 'orange',
    subcategories: {
      refunds: {
        label: 'Refunds',
        keywords: ['refund', 'chargeback', 'reversal']
      },
      platform_fees: {
        label: 'Platform Fees',
        keywords: ['stripe fee', 'paypal fee', 'transaction fee']
      }
    }
  },

  operating_expenses: {
    label: 'Operating Expenses',
    type: 'expense',
    color: 'red',
    subcategories: {
      software_subscriptions: {
        label: 'Software Subscriptions',
        keywords: ['zoom', 'calendly', 'notion', 'canva', 'slack', 'google workspace', 'convertkit', 'mailchimp', 'loom']
      },
      cloud_services: {
        label: 'Cloud & AI Services',
        keywords: ['aws', 'openai', 'anthropic', 'azure', 'gcp', 'api credits', 'api']
      },
      marketing: {
        label: 'Marketing & Advertising',
        keywords: ['facebook ads', 'google ads', 'linkedin ads', 'advertising', 'marketing']
      },
      professional_services: {
        label: 'Professional Services',
        keywords: ['insurance', 'legal', 'accounting', 'bookkeeping', 'liability']
      },
      education: {
        label: 'Education & Training',
        keywords: ['linkedin learning', 'udemy', 'coursera', 'training', 'certification']
      },
      bank_fees: {
        label: 'Bank Fees',
        keywords: ['bank fee', 'service fee', 'wire fee', 'monthly fee']
      },
      other_expenses: {
        label: 'Other Expenses',
        keywords: []
      }
    }
  },

  uncategorized: {
    label: 'Uncategorized',
    type: 'unknown',
    color: 'gray',
    subcategories: {
      uncategorized: {
        label: 'Needs Review',
        keywords: []
      }
    }
  }
};

export const CATEGORY_COLORS = {
  green: { bg: 'bg-green-100', text: 'text-green-800' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-800' },
  red: { bg: 'bg-red-100', text: 'text-red-800' },
  gray: { bg: 'bg-gray-100', text: 'text-gray-800' }
};

export function getCategoryColor(categoryKey) {
  const category = ACCOUNTING_CATEGORIES[categoryKey];
  if (!category) return CATEGORY_COLORS.gray;
  return CATEGORY_COLORS[category.color] || CATEGORY_COLORS.gray;
}

export function getAllCategoriesFlat() {
  const flat = [];
  for (const [catKey, category] of Object.entries(ACCOUNTING_CATEGORIES)) {
    for (const [subKey, subcategory] of Object.entries(category.subcategories)) {
      flat.push({
        categoryKey: catKey,
        subcategoryKey: subKey,
        categoryLabel: category.label,
        subcategoryLabel: subcategory.label,
        type: category.type,
        color: category.color
      });
    }
  }
  return flat;
}
