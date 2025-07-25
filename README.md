# Book Management System 

## Backend API 

### Overview
A simple REST API for managing book data with search, filtering, sorting, and pagination capabilities.

### Base URL
```
http://localhost:7002/api
```

### Endpoints

#### 1. Get Books
**GET** `/books`

Retrieves books with optional filtering, sorting, and pagination.

**Query Parameters:**
- `search` (string, optional) - Search across title, author, genre
- `title` (string, optional) - Filter by title (partial match)
- `author` (string, optional) - Filter by author (partial match)  
- `genre` (string, optional) - Filter by exact genre match
- `sortField` (string, optional) - Sort by: title, author, genre, publishedAt, pages (default: title)
- `sortDirection` (string, optional) - asc or desc (default: asc)
- `page` (number, optional) - Page number starting from 1 (default: 1)
- `limit` (number, optional) - Items per page, max 100 (default: 10)

**Example Request:**
```
GET /books?search=tolkien&sortField=publishedAt&sortDirection=desc&page=1&limit=25
```

**Response:**
```json
{
  "success": true,
  "data": {
    "books": [
      {
        "id": 1,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Fiction",
        "publishedAt": "1925",
        "pages": 180
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalBooks": 47,
      "hasNextPage": true,
      "hasPrevPage": false,
      "limit": 10,
      "startItem": 1,
      "endItem": 10
    }
  }
}
```

#### 2. Get Genres
**GET** `/genres`

Returns all unique genres available in the system.

**Response:**
```json
{
  "success": true,
  "data": ["Fiction", "Science Fiction", "Romance", "Fantasy", "Mystery"]
}
```

#### 3. Get Single Book
**GET** `/books/:id`

Get details for a specific book.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Fiction",
    "publishedAt": "1925",
    "pages": 180
  }
}
```


### Error Responses
All errors return consistent format:
```json
{
  "success": false,
  "message": "Error description"
}
```

**Common HTTP Status Codes:**
- 200: Success
- 400: Bad request (invalid parameters)
- 404: Resource not found
- 500: Internal server error

### Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Start Production Server**
   ```bash
   npm start
   ```

The server runs on port 7002 by default.

---

## Frontend Documentation

### Overview
A React-based book library interface with real-time search, filtering, sorting, and pagination. Uses Tailwind CSS for styling.

### Key Features
- **Debounced Search**: 2-second delay prevents excessive API calls
- **Multiple Filters**: Search, title, author, genre filtering
- **Sortable Columns**: Click any column header to sort
- **Responsive Pagination**: Configurable page sizes
- **Loading States**: Visual feedback during API calls
- **Error Handling**: Retry mechanisms and user notifications


### Component API

#### SearchFilters Component
**Props:**
- `searchTerm`, `setSearchTerm` - Main search input
- `titleFilter`, `setTitleFilter` - Title filter input
- `authorFilter`, `setAuthorFilter` - Author filter input  
- `genreFilter`, `setGenreFilter` - Genre dropdown
- `genres` - Array of available genres
- `onClearFilters` - Function to reset all filters
- `isLoading` - Boolean to show loading state

#### BooksTable Component
**Props:**
- `books` - Array of book objects to display
- `sortField` - Currently sorted field
- `sortDirection` - Current sort direction (asc/desc)
- `onSort` - Function called when column header clicked
- `isLoading` - Boolean to disable sorting during load

#### Pagination Component
**Props:**
- `currentPage` - Current page number
- `totalPages` - Total number of pages
- `onPageChange` - Function called when page changes
- `pageSize` - Current items per page
- `onPageSizeChange` - Function called when page size changes
- `totalItems` - Total number of items
- `startItem`, `endItem` - Range of items being shown
- `isLoading` - Boolean to disable pagination controls

### State Management

The main App component manages all state including:
- **Filter States**: search terms, filter values
- **Pagination States**: current page, page size
- **Sort States**: sort field and direction
- **UI States**: loading, error, toast notifications
- **Data States**: books array, genres array, pagination info

### API Integration

**Configuration:**
Update `API_BASE_URL` in App.js to match your backend:
```javascript
const API_BASE_URL = 'http://localhost:7002/api';
```

**Debouncing:**
Search inputs use 2-second debounce to reduce API calls. Only triggers after user stops typing.

**Error Handling:**
- Network errors show retry button
- API errors display user-friendly messages
- Toast notifications for quick feedback

### Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Update API URL**
   Edit `API_BASE_URL` in App.js if backend runs on different port

3. **Start Development Server**
   ```bash
   npm start
   ```

### Troubleshooting

**Books Not Loading:**
- Check browser console for API errors
- Verify backend is running on correct port
- Ensure CORS is enabled on backend

**Filters Not Working:**
- Wait 2 seconds after typing (debounce delay)
- Check network tab for API requests
- Verify API response format matches expected structure

**Pagination Issues:**
- Check pagination object in API response
- Verify totalPages calculation is correct
- Ensure currentPage is being updated properly

### Browser Support
- Chrome 
- Firefox 
- Safari 
- Edge 
