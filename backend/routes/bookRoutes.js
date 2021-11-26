const express = require('express');
const asynchHandler = require('express-async-handler')
const Book = require('../models/Book');
const bookRouter = express.Router();

//Create Book
bookRouter.post(
    '/',

    asynchHandler(async (req, res) => {
        try {
            const book = await Book.create(req.body);
            res.status(200);
            res.json(book);
        } catch (error) {
            res.status(500);
            throw new Error('Not able to create book');
        }
    })
);

bookRouter.get(
    '/',
    asynchHandler(async (req, res) => {
        const books = await Book.find().populate('createdBy').sort('createdAt');
        //Compare password
        if (books) {
            res.status(201);
            res.send(books);
        } else {
            res.status(401);
            throw new Error('Server error');
        }
    })
);

//Delete book

bookRouter.delete(
    '/:id',
    asynchHandler(async (req, res) => {
        try {
            const book = await Book.findByIdAndDelete(req.params.id);
            res.status(200);
            res.send(book);
        } catch (error) {
            res.status(500);
            throw new Error('Server Error');
        }
    })
);

//Update

bookRouter.put(
    '/:id',
    asynchHandler(async (req, res) => {
        try {
            const book = await Book.findByIdAndUpdate(req.params.id, req.body);
            res.status(200);
            res.json(book);
        } catch (error) {
            res.status(500);
            throw new Error('Update failed');
        }
    })
);

//find a book
bookRouter.get(
    '/:id',
    asynchHandler(async (req, res) => {
        const book = await Book.findById(req.params.id);
        if (book) {
            const updatedBook = await Book.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidator: true,
                }
            );
            res.status(200);
            res.json(updatedBook);
        }
        else {
            res.status(500);
            throw new Error('Update Failed');
        }
    })
);

module.exports = bookRouter;