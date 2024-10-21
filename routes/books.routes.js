import { Router } from "express";
import * as booksController from "../controllers/books.controller.js";

const router = Router();

// POST /books - Create a new book
router.post("/", booksController.createBook);

// GET /books - Get books with filters and pagination
router.get("/", booksController.getBooks);

// GET /books/:id - Get a book by id
router.get("/:id", booksController.getBook);

// PUT /books/:id - Update a book
router.put("/:id", booksController.updateBook);

// DELETE /books/:id - Delete a book
router.delete("/:id", booksController.deleteBook);

// GET /top-authors - Get the top 5 authors with the most books
router.get("/top-authors", booksController.getTopAuthors);

export default router;
