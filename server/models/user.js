const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    lib_id: {
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
    psw: {
        type: String,
    },
    phone: {
        type: Number,
    }
});

module.exports = mongoose.model("Librarian", userSchema);
