

import BooksTable from "./components/BooksTable";
import EmptyState from "./components/EmptyState";
import ErrorMessage from "./components/ErrorBlock";
import Pagination from "./components/Pagination";
import SearchFilters from "./components/SearchFilters";
import Toast from "./components/ToastPortal";
import LoadingSpinner from "./components/Loading";
import useDebounce from "./hooks/useDebounce";

import { useState, useEffect, useCallback } from "react";

const API_BASE_URL = 'http://localhost:7002/api';

const api = {
  async fetchBooks(params = {}) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        searchParams.append(key, value);
      }
    });

    console.log('API Request URL:', `${API_BASE_URL}/books?${searchParams.toString()}`);
    console.log('API Request Params:', params);

    const response = await fetch(`${API_BASE_URL}/books?${searchParams}`);
    const data = await response.json();
    
    console.log('API Response:', data);
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    return data;
  },

  async fetchGenres() {
    const response = await fetch(`${API_BASE_URL}/genres`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    return data;
  }
};

const App = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  
  const [searchTerm, setSearchTerm] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  
  const [sortField, setSortField] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const [toasts, setToasts] = useState([]);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 2000);
  const debouncedTitleFilter = useDebounce(titleFilter, 2000);
  const debouncedAuthorFilter = useDebounce(authorFilter, 2000);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  useEffect(() => {
    let cancelled = false;
    
    const fetchGenres = async () => {
      try {
        console.log('Fetching genres...');
        const response = await api.fetchGenres();
        if (!cancelled && response.success) {
          setGenres(response.data);
          console.log('Genres loaded:', response.data);
        }
      } catch (error) {
        console.error('Error fetching genres:', error);
        if (!cancelled) {
          addToast('Failed to load genres', 'error');
        }
      }
    };

    fetchGenres();
    
    return () => {
      cancelled = true;
    };
  }, [addToast]);

  const fetchBooks = useCallback(async () => {
    let cancelled = false;
    
    console.log('Starting fetchBooks...');
    console.log('Fetching books with params:', {
      search: debouncedSearchTerm,
      title: debouncedTitleFilter,
      author: debouncedAuthorFilter,
      genre: genreFilter,
      sortField,
      sortDirection,
      page: currentPage,
      limit: pageSize
    });
    
    setLoading(true);
    setError(null);

    try {
      const params = {
        search: debouncedSearchTerm,
        title: debouncedTitleFilter,
        author: debouncedAuthorFilter,
        genre: genreFilter,
        sortField,
        sortDirection,
        page: currentPage,
        limit: pageSize
      };

      const response = await api.fetchBooks(params);
      
      console.log('API response received');
      console.log('Response success:', response.success);
      console.log('Cancelled:', cancelled);
      
      if (!cancelled && response.success) {
        console.log('Updating state with books:', response.data.books.length);
        setBooks(response.data.books);
        setPagination(response.data.pagination);
        console.log('State updated successfully');
      } else if (!cancelled) {
        throw new Error(response.message || 'Failed to fetch books');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      if (!cancelled) {
        setError(error.message || 'Failed to load books');
        setBooks([]);
        setPagination({});
        addToast('Failed to load books', 'error');
      }
    } finally {
      if (!cancelled) {
        console.log('Setting loading to false');
        setLoading(false);
      }
    }
  }, [
    debouncedSearchTerm,
    debouncedTitleFilter,
    debouncedAuthorFilter,
    genreFilter,
    sortField,
    sortDirection,
    currentPage,
    pageSize,
    addToast
  ]);

  useEffect(() => {
    console.log('Dependencies changed, fetching books...');
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    console.log('Filters changed, resetting to page 1');
    setCurrentPage(1);
  }, [debouncedSearchTerm, debouncedTitleFilter, debouncedAuthorFilter, genreFilter]);

  useEffect(() => {
    console.log('Page size changed, resetting to page 1');
    setCurrentPage(1);
  }, [pageSize]);

  const handleSort = useCallback((field) => {
    console.log('Sort clicked:', field);
    if (sortField === field) {
      const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      console.log('Toggling sort direction to:', newDirection);
      setSortDirection(newDirection);
    } else {
      console.log('Setting new sort field:', field);
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField, sortDirection]);

  const handleClearFilters = useCallback(() => {
    console.log('Clearing all filters');
    setSearchTerm('');
    setTitleFilter('');
    setAuthorFilter('');
    setGenreFilter('');
    setCurrentPage(1);
    addToast('Filters cleared successfully', 'success');
  }, [addToast]);

  const handleRetry = useCallback(() => {
    console.log('Retrying fetch books');
    fetchBooks();
  }, [fetchBooks]);

  const handlePageChange = useCallback((newPage) => {
    console.log('Page changed to:', newPage);
    setCurrentPage(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newPageSize) => {
    console.log('Page size changed to:', newPageSize);
    setPageSize(newPageSize);
  }, []);

  const hasActiveFilters = debouncedSearchTerm || debouncedTitleFilter || debouncedAuthorFilter || genreFilter;

  console.log('Render - Current state:', {
    booksCount: books.length,
    loading,
    error: !!error,
    pagination,
    hasActiveFilters,
    currentPage,
    pageSize
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Book Library</h1>
          <p className="text-gray-600">Search and explore our collection of books</p>
        </header>

        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          titleFilter={titleFilter}
          setTitleFilter={setTitleFilter}
          authorFilter={authorFilter}
          setAuthorFilter={setAuthorFilter}
          genreFilter={genreFilter}
          setGenreFilter={setGenreFilter}
          genres={genres}
          onClearFilters={handleClearFilters}
          isLoading={loading}
        />

        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-600">
            {loading ? (
              <span>Loading...</span>
            ) : (
              <span>
                {pagination.totalBooks || 0} books found
                {hasActiveFilters && ' (filtered)'}
              </span>
            )}
          </div>
          
          <div className="text-xs text-gray-400">
            Page {currentPage} of {pagination.totalPages || 1} | Books: {books.length}
          </div>
        </div>

        {error ? (
          <ErrorMessage message={error} onRetry={handleRetry} />
        ) : loading && books.length === 0 ? (
          <LoadingSpinner />
        ) : books.length === 0 ? (
          <EmptyState 
            onClearFilters={handleClearFilters} 
            hasFilters={hasActiveFilters}
          />
        ) : (
          <>
            <BooksTable
              books={books}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
              isLoading={loading}
            />
            
            {pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage || 1}
                totalPages={pagination.totalPages || 1}
                onPageChange={handlePageChange}
                pageSize={pageSize}
                onPageSizeChange={handlePageSizeChange}
                totalItems={pagination.totalBooks || 0}
                startItem={pagination.startItem || 0}
                endItem={pagination.endItem || 0}
                isLoading={loading}
              />
            )}
          </>
        )}

        <div className="fixed top-4 right-4 space-y-2 z-50">
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
