import { ChevronDown, ChevronUp } from "lucide-react";

const TableHeader = ({ field, label, sortField, sortDirection, onSort, disabled }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    <button 
      onClick={() => !disabled && onSort(field)}
      disabled={disabled}
      className="flex items-center space-x-1 hover:text-gray-700 disabled:cursor-not-allowed"
    >
      <span>{label}</span>
      {sortField === field && (
        sortDirection === 'asc' ? 
          <ChevronUp size={16} /> : 
          <ChevronDown size={16} />
      )}
    </button>
  </th>
);

export default TableHeader