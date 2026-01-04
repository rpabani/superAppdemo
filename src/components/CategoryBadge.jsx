import { getCategoryColor } from '../constants/accountingCategories';

export default function CategoryBadge({ category, subcategoryLabel, onClick }) {
  const colors = getCategoryColor(category);

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text} hover:opacity-80 transition-opacity cursor-pointer`}
    >
      {subcategoryLabel}
    </button>
  );
}
