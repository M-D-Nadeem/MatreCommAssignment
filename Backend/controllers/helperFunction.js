export const simulateDelay = (ms = 200) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const filterBooks = (books, filters) => {
  return books.filter(book => {
    const matchesSearch = !filters.search || 
      book.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      book.author.toLowerCase().includes(filters.search.toLowerCase()) ||
      book.genre.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesTitle = !filters.title || 
      book.title.toLowerCase().includes(filters.title.toLowerCase());
    
    const matchesAuthor = !filters.author || 
      book.author.toLowerCase().includes(filters.author.toLowerCase());
    
    const matchesGenre = !filters.genre || book.genre === filters.genre;

    return matchesSearch && matchesTitle && matchesAuthor && matchesGenre;
  });
};

export const sortBooks = (books, sortField, sortDirection) => {
  return books.sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === 'pages' || sortField === 'publishedAt') {
      aValue = Number(aValue);
      bValue = Number(bValue);
    } else {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
};

export const paginateBooks = (books, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return books.slice(startIndex, endIndex);
};

