const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const bcrypt = require("bcrypt");


app.use(cors());
app.use(express.json());

app.post("/api/signup",
    [check("lib_id", "Please provide Employee id").notEmpty()],
    [check("name", "Please provide  name").notEmpty()],
    [check("email", "Please provide a valid email").isEmail()],
    [check("psw","Please provide a password 8 charecter long password").isLength({ min: 8 }),],
    [check("phone", "Please provide a valid phone").notEmpty()],

    async (req, res) => {

        const { lib_id,name,email,psw, phone  } = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({ status: "error-psw", error: "Invalid" });

        } else {
            try {
                let user = await User.findOne({ email });
                if (user) {
                    return res.json({ status: "error-email", error: "Invalid" });
                }
            }
            catch(error){

            }
        }

        try {
            let user =new User({
                lib_id,
                name,
                email,
                psw,
                phone,

            });
            const salt = await bcrypt.genSalt(10);
            user.psw = await bcrypt.hash(psw, salt)
            await user.save();
            res.json({ status: "Okay" });

        } catch (error) {
            res.json({ status: "error", error: error });
            console.error(error);
        }

    });

app.post( "/api/signin",
    [check("email", "Please provide a valid email").isEmail()],
    [
        check(
            "psw",
            "Please provide a password 8 character long password"
        ).isLength({ min: 8 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        // console.log(req.body);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }
        const { email, psw } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.json({ status: "error", error: "invalid" });
            }

            const token = jwt.sign(
                {
                    name: user.name,
                    email: user.email,
                    user_id:user._id,
                },
                'bigbooster',{
                    expiresIn: "94h",
                }
            )

            user.token = token;

            // console.log(user)

            const match = await bcrypt.compare(psw, user.psw);

            if (!match) {
                return res.json({ status: "error", error: "invalid" });
            }
            else{

                return res.json({ status: "okay", user:token });

            }

        } catch (err) {
            console.log(err);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = app

