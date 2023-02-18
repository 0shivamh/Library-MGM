
const mongoose= require("mongoose");

const bookSchema = new mongoose.Schema({
    bookAvailability: {
        type: String,
    },
    bookTitle: {
        type: String,
    },
    bookAuthor: {
        type: String,
    },
    bookExcert: {
        type: String,
    },
    bookContent: {
        type: String
    },
    bookGenres: {
        type:[],
    },
});

module.exports = mongoose.model("book",bookSchema)
