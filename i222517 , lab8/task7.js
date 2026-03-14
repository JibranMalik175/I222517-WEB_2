const express = require('express');
const app = express();
const PORT = 3007;

app.use(express.json());

// Task 7: Library Book Management System

let books = [
    { id: 1, title: "Clean Code", author: "Robert Martin" },
    { id: 2, title: "Introduction to Algorithms", author: "CLRS" }
];

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('Book not found');
    }
    res.json(book);
});

app.post('/books', (req, res) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).send('Missing title or author');
    }

    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title,
        author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const { title, author } = req.body;

    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send('Book not found');
    }

    if (title) book.title = title;
    if (author) book.author = author;

    res.json(book);
});

app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) {
        return res.status(404).send('Book not found');
    }

    books.splice(bookIndex, 1);
    res.send('Book deleted successfully');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Task 7 Server is running on http://localhost:${PORT}`);
});
