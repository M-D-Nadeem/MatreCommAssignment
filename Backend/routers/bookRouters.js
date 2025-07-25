import express from "express"
import getBook from "../controllers/getBookController.js";
import getGenres from "../controllers/getGenresController.js";
import getBookById from "../controllers/getBookByIdController.js";

const bookRouter=express.Router();
bookRouter.get('/books',getBook )
bookRouter.get('/genres',getGenres)
bookRouter.get("/books/:id",getBookById)

export default bookRouter