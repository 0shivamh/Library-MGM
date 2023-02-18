const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const bcrypt = require("bcrypt");
const User = require("../models/user")
const Books = require("../models/book")

app.use(cors());
app.use(express.json());

app.post("/api/addBook",
    async (req, res) => {

        const email = req.headers['email_id']

        let user = await User.findOne({ email });

        const {  bookAvailability,bookTitle,bookAuthor, bookExcert, bookContent,  bookGenres } = req.body;

        try {
            let book = new Books({
                bookAvailability:bookAvailability,
                bookTitle:bookTitle,
                bookAuthor:bookAuthor,
                bookExcert:bookExcert,
                bookContent:bookContent,
                bookGenres:bookGenres
            });

            book = await book.save();
            return res.json({ status: "okay" });

        } catch (err) {
            console.log(err.message);
            return res.json({ status: "error", error: "invalid" });
        }
    }
);

app.get( "/api/viewBooks",

    async (req, res) => {
        try {
            let books = await Books.find();
            return res.send(books)
        } catch (err) {
            console.log(err);
            res.status(500).send("Server Error");
        }
    }
);

app.post("/api/removeBook/:id",  async (req, res,auth,) => {
    try {
        const stud = await Books.findByIdAndRemove(req.params.id );
        return res.json({ status: "okay" });
    } catch (err) {
        return res.json({ status: "error" });
    }
});

app.get("/api/getBook/:id",  async (req, res) => {
    try {
        const stud = await Books.findById(req.params.id );
        // console.log(stud)
        res.json(stud);
    } catch (err) {
        return res.json({ status: "error-get" });
    }
});

module.exports = app

