import * as booksService from "../services/books.services.js";

export const createBook = async (req, res) => {
	try {
		const result = await booksService.addBook(req.body);
		console.log(result);
		// if (!result.acknowledged) {
		// 	throw new Error("Book not created");
		// }
		res.status(201).json({
			message: "Book created",
			data: {
				_id: result.insertedId,
				...req.body,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error creating book", error });
	}
};

export const getBooks = async (req, res) => {
	try {
		const books = await booksService.getBooks(req);
		if (!books.length) {
			return res
				.status(404)
				.json({ message: "Books not found", data: [] });
		}
		res.status(200).json({
			message: "Books fetched",
			data: books,
		});
	} catch (error) {
		res.status(500).json({ message: "Error fetching books", error });
	}
};

export const getBook = async (req, res) => {
	try {
		const book = await booksService.getBook(req.params.id);
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}
		res.status(200).json({
			message: "Book fetched",
			data: book,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error fetching book", error });
	}
};

export const deleteBook = async (req, res) => {
	try {
		const result = await booksService.deleteBook(req.params.id);
		res.status(200).json({
			message: "Book deleted",
			data: {
				_id: req.params.id,
			},
		});
	} catch (error) {
		res.status(500).json({ message: "Error deleting book", error });
	}
};

export const getTopAuthors = async (req, res) => {
	try {
		const topAuthors = await booksService.getTopAuthors();
		res.status(200).json({ topAuthors });
	} catch (error) {
		res.status(500).json({ message: "Error fetching top authors", error });
	}
};

export const updateBook = async (req, res) => {
	try {
		const { upsertedId, modifiedCount } = await booksService.updateBook(
			req.params.id,
			req.body
		);
		if (!upsertedId && !modifiedCount) {
			throw new Error("Book not updated");
		}
		res.status(200).json({ message: "Book updated" });
	} catch (error) {
		res.status(500).json({ message: "Error updating book", error });
	}
};
