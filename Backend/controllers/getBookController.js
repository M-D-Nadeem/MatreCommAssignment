import mockBooks from "../utils/mockBooks.js";
import { filterBooks, paginateBooks, simulateDelay, sortBooks } from "./helperFunction.js";


async function getBook(req,res) {
      try {
    await simulateDelay(300);

    const {
      search = '',
      title = '',
      author = '',
      genre = '',
      sortField = 'title',
      sortDirection = 'asc',
      page = 1,
      limit = 10
    } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid pagination parameters'
      });
    }

    const validSortFields = ['title', 'author', 'genre', 'publishedAt', 'pages'];
    const validSortDirections = ['asc', 'desc'];

    if (!validSortFields.includes(sortField) || !validSortDirections.includes(sortDirection)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid sort parameters'
      });
    }

    const filters = { search, title, author, genre };
    let filteredBooks = filterBooks(mockBooks, filters);

    filteredBooks = sortBooks([...filteredBooks], sortField, sortDirection);

    const totalBooks = filteredBooks.length;
    const totalPages = Math.ceil(totalBooks / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    const paginatedBooks = paginateBooks(filteredBooks, pageNum, limitNum);

    res.json({
      success: true,
      data: {
        books: paginatedBooks,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalBooks,
          hasNextPage,
          hasPrevPage,
          limit: limitNum,
          startItem: totalBooks > 0 ? (pageNum - 1) * limitNum + 1 : 0,
          endItem: Math.min(pageNum * limitNum, totalBooks)
        },
        filters: {
          search,
          title,
          author,
          genre,
          sortField,
          sortDirection
        }
      }
    });

  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }

}

export default getBook