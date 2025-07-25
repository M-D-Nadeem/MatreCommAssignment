const EmptyState = ({ onClearFilters, hasFilters }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
    <h3 className="text-xl font-semibold text-gray-900 mb-3">No books found</h3>
    <p className="text-gray-600 mb-6">
      {hasFilters 
        ? "Try adjusting your search criteria or clearing filters." 
        : "No books are available at the moment."
      }
    </p>
    {hasFilters && (
      <button 
        onClick={onClearFilters}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Clear All Filters
      </button>
    )}
  </div>
);
export default EmptyState

