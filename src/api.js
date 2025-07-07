const router = require("express").Router();
const books = require('./books_list');
let BookDirectory = books;

router.get('/books', (req, res) => {
    res.send(BookDirectory);
});

router.get('/book/:id', (req, res) => {
    const { id } = req.params;
    const book = BookDirectory.find(b => b.isbn === id);
    if (!book) {
        return res.status(404).send("Book does not exist");
    }
    res.send(book);
});

router.post('/book', (req, res) => {
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        authors,
        categories
    } = req.body;

    const bookExist = BookDirectory.find(b => b.isbn === isbn);
    if (bookExist) {
        return res.status(400).send("Book already exists");
    }

    const newBook = {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        authors,
        categories
    };
    
    BookDirectory.push(newBook);
    res.send(newBook);
});

router.put('/book/:id', (req, res) => {
    const { id } = req.params;
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        authors,
        categories
    } = req.body;

    let book = BookDirectory.find(b => b.isbn === id);
    if (!book) {
        return res.status(404).send("Book does not exist");
    }

    const updateField = (val, prev) => val ? val : prev;
    const updatedBook = {
        title: updateField(title, book.title),
        isbn: updateField(isbn, book.isbn),
        pageCount: updateField(pageCount, book.pageCount),
        publishedDate: updateField(publishedDate, book.publishedDate),
        thumbnailUrl: updateField(thumbnailUrl, book.thumbnailUrl),
        shortDescription: updateField(shortDescription, book.shortDescription),
        longDescription: updateField(longDescription, book.longDescription),
        authors: updateField(authors, book.authors),
        categories: updateField(categories, book.categories)
    };

    const bookIndex = BookDirectory.findIndex(b => b.isbn === book.isbn);
    BookDirectory.splice(bookIndex, 1, updatedBook);
    res.status(200).send(updatedBook);
});

router.delete('/book/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = BookDirectory.findIndex(b => b.isbn === id);

    if (bookIndex === -1) {
        return res.status(404).send("Book does not exist");
    }

    BookDirectory.splice(bookIndex, 1);
    res.send("Success");
});

module.exports = router;
