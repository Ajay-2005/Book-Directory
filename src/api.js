const router = require("express").Router()
const books = require('./books_list')
let BookDirectory = books
router.get('/books', (req, res) => {
    res.send(BookDirectory)
})
router.get('/books/:id', (req, res) => {
    const { id } = req.params
    const books = BookDirectory.find(b => b.isbn === id)
    if (!books) {
        return res.status(404).send("Book does not exist")
    }
    res.send(books)

})
router.post('/books', (req, res) => {
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
    } = req.body
    const BookExist = BookDirectory.find(b => b.isbn === isbn)
    if (BookExist) {
        return res.status(404).send("Book already existed")
    }
    const B = {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        shortDescription,
        longDescription,
        authors,
        categories
    }
    BookDirectory.push(B)
    res.send(B)

})
router.put('/books/:id', (req, res) => {
    const { id } = req.params
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
    } = req.body
    let Book = BookDirectory.find(b => b.isbn === id)
    if (!Book) {
        return res.status(404).send("book does not exist ")
    }
    const updateField=(val,prev)=>!val?prev:val
    const updatedBook={
        title:updateField(title,Book.title),
        isbn:updateField(isbn,Book.isbn),
        pageCount:updateField(pageCount,Book.pageCount),
        publishedDate:updateField(publishedDate,Book.publishedDate),
        thumbnailUrl:updateField(thumbnailUrl,Book.thumbnailUrl),
        shortDescription:updateField(shortDescription,Book.shortDescription),
        longDescription:updateField(longDescription,Book.longDescription),
        authors:updateField(authors,books.authors),
        categories:updateField(categories,Book.updateField)
    }
    const bookIndex=BookDirectory.findIndex(b=>b.isbn===book.isbn)
    BookDirectory.splice(bookIndex,1,updatedBook)
    res.status(404).send(updatedBook)

}
)
router.delete('/books/:id', (req, re) => {
    const{id}=req.params
    let Book=BookDirectory.find(b=>b.isbn===id)
    if(!Book){
        return res.status.send(404).send("Book does not exist")
    }
    BookDirectory.filter(b=>b.isbn !== id)
    res.send("successs")

})
module.exports = router;