const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    libId: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    phone: {
        type: Number,
    },
    psw: {
        type: String,
    }
});

module.exports = mongoose.model("Librarian", userSchema);
