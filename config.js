import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// Connect to MongoDB
// client
// 	.connect()
// 	.then(() => {
// 		db = client.db("bookstore");
// 		booksCollection = db.collection("books");
// 		console.log("Connected to MongoDB");
// 	})
// 	.catch((err) => console.error("Failed to connect to MongoDB", err));

await client.connect();
const db = client.db("book-store");
const booksCollection = db.collection("books");

export { db, booksCollection };
