import mockBooks from "../utils/mockBooks.js";
import { simulateDelay } from "./helperFunction.js";

async function getGenres(req,res) {
    try {
    await simulateDelay(100);

    const genres = [...new Set(mockBooks.map(book => book.genre))].sort();
    
    res.json({
      success: true,
      data: genres
    });

  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
export default getGenres