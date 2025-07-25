
import { Loader2, Search } from "lucide-react";

const SearchFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  titleFilter, 
  setTitleFilter, 
  authorFilter, 
  setAuthorFilter, 
  genreFilter, 
  setGenreFilter, 
  genres, 
  onClearFilters,
  isLoading 
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
          Search Books
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          {isLoading && (
            <Loader2 className="absolute right-3 top-3 h-4 w-4 text-gray-400 animate-spin" />
          )}
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, author, or genre..."
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Search will be performed automatically after you stop typing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label htmlFor="titleFilter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Title
          </label>
          <input
            id="titleFilter"
            type="text"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            placeholder="Enter title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="authorFilter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Author
          </label>
          <input
            id="authorFilter"
            type="text"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            placeholder="Enter author..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="genreFilter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Genre
          </label>
          <select
            id="genreFilter"
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={onClearFilters}
          disabled={isLoading}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};
export default SearchFilters

