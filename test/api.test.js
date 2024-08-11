const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('../src/api');

const app = express();
app.use(bodyParser.json());
app.use('/api/v1', api);

describe("Rest Api tests", () => {
    it("Return all books", async () => {
        const result = await request(app).get("/api/v1/Books");
        expect(result.statusCode).toEqual(200)
        expect(Array.isArray(result.body)).toBeTruthy()
    })

    it("Get Book By Id", async () => {
        const result = await request(app).get("/api/v1/book/1933988673")
        if (result.statusCode == 404) {
            expect(result.text).toBe("Book does not exist")
        }
        else {
            expect(result.statusCode).toEqual(200)
            expect(result.body.isbn).toEqual("1933988673")
        }
    })
    it("Delete Book By Id", async () => {
        const res = await request(app).get("/api/v1/Books")
        const Books = res.body
        const BookToDelete = Books[0].isbn
        const result = await request(app).delete(`/api/v1/book/${BookToDelete}`)
        if (result.statusCode == 404) {
            expect(result.text).toBe("Book does not exist")
        }
        else {
            expect(result.statusCode).toEqual(200)
            expect(result.text).toEqual("Success")
            const deletedResponse = await request(app).get(`/api/v1/book/${BookToDelete}`)
            expect(deletedResponse.statusCode).toEqual(404)
        }
    })
    it("should add a new book", async () => {
        const newBook = {
            title: "New Book",
            isbn: "145",
            pageCount: 300,
            publishedDate: "2024-01-01",
            thumbnailUrl: "http://example.com/image.jpg",
            shortDescription: "A short description",
            longDescription: "A long description",
            authors: ["Author 1"],
            categories: ["Category 1"]
        };
    
        const res = await request(app).post("/api/v1/book").send(newBook);
        
        if (res.statusCode === 400) {
            expect(res.text).toBe("Book already exists");
        } else if (res.statusCode === 200) {
            expect(res.body.isbn).toBe(newBook.isbn);
        } else {
            throw new Error(`Unexpected status code: ${res.statusCode}`);
        }
    });
    it("it should update book by their id",async ()=>{
        const updatedBook={
            book:"updated book",
            isbn:"1234567"
        }
        const res=await request(app).put("/api/v1/book/12345")
        if(res.statusCode==404){
            expect(res.text).toBe("Book does not exist")
        }
        else{
            expect(res.statusCode).toBe(200)
            expect(res.body.book).toEqual(updatedBook.book)
            expect(res.body.isbn).toEqual(updatedBook.isbn)
        }
    })
   

})