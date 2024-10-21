import { db, booksCollection } from "../config.js";
import { ObjectId } from "mongodb";

export const addBook = async (book) => {
	try {
		const { title, author, genre, publishedYear } = book;
		const newBook = {
			title,
			author,
			genre,
			publishedYear,
			createdAt: new Date(),
		};
		// simialr sql query
		// INSERT INTO books (title, author, genre, publishedYear, createdAt) VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 1925, '2021-08-30T12:00:00Z');
		const result = await booksCollection.insertOne(newBook);
		return result;
	} catch (error) {
		throw new Error(" Error creating book", error);
	}
};

export const getBooks = async (req) => {
	try {
		//example url: http://localhost:3000/books?author=J.K. Rowling&genre=Fantasy&page=1&limit=10

		const { author, genre, page = 1, limit = 10 } = req.query;

		const filters = {};
		if (author) filters.author = author;
		if (genre) filters.genre = genre;

		const skip = (parseInt(page) - 1) * parseInt(limit);

		const books = await booksCollection
			.find(filters)
			.skip(skip)
			.limit(parseInt(limit))
			.toArray();
		return books;
	} catch (error) {
		throw new Error("Error fetching books", error);
	}
};

export const getBook = async (id) => {
	try {
		const book = await booksCollection.findOne({ _id: new ObjectId(id) });
		return book;
	} catch (error) {
		console.error(error);
		throw new Error("Error fetching book", error);
	}
};

export const updateBook = async (id) => {
	try {
		const { id } = req.params;
		const { title, author, genre, publishedYear } = req.body;

		const updatedBook = { title, author, genre, publishedYear };
		// similar sql query
		// UPDATE books SET title = 'The Great Gatsby', author = 'F. Scott Fitzgerald', genre = 'Fiction', publishedYear = 1925 WHERE _id = '612d3b3b8b3b3b3b3b3b3b3b';
		const result = await booksCollection.updateOne(
			{ _id: ObjectId(id) },
			{ $set: updatedBook }
		);

		return result.upsertedId, result.modifiedCount;
	} catch (error) {
		throw new Error("Error updating book", error);
	}
};

export const deleteBook = async (id) => {
	try {
		const { id } = req.params;

		const result = await booksCollection.deleteOne({ _id: ObjectId(id) });

		return result.deletedCount, result.result;
	} catch (error) {
		throw new Error("Error deleting book", error);
	}
};

export const getTopAuthors = async () => {
	try {
		// similar sql query
		// SELECT author, COUNT(*) as totalBooks FROM books GROUP BY author ORDER BY totalBooks DESC LIMIT 5;
		const topAuthors = await booksCollection
			.aggregate([
				{ $group: { _id: "$author", totalBooks: { $sum: 1 } } }, // Group by author and count books
				{ $sort: { totalBooks: -1 } }, // Sort by totalBooks in descending order
				{ $limit: 5 }, // Limit to top 5 authors
			])
			.toArray();
		return topAuthors;
	} catch (error) {
		throw new Error("Error fetching top authors", error);
	}
};
