import mockBooks from "../utils/mockBooks.js";
import { simulateDelay } from "./helperFunction.js";


async function getBookById(req,res) {
    try {
    await simulateDelay(200);

    const bookId = parseInt(req.params.id);
    const book = mockBooks.find(b => b.id === bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.json({
      success: true,
      data: book
    });

  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
export default getBookById