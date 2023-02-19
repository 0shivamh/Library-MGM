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
const Books = require("../models/book");

app.use(cors());
app.use(express.json());

app.post("/api/signup",
    [check("libId", "Please provide Employee id").notEmpty()],
    [check("name", "Please provide  name").notEmpty()],
    [check("email", "Please provide a valid email").isEmail()],
    [check("phone", "Please provide a valid phone").notEmpty()],
    [check("psw","Please provide a password 8 charecter long password").isLength({ min: 8 }),]
   ,
    async (req, res) => {

        const { libId,name,email,phone,psw  } = req.body;

        const errors = validationResult(req);

        console.log(errors)

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
                libId,
                name,
                email,
                phone,
                psw,
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

app.get("/api/lib/:email",  async (req, res) => {
    const email=req.params.email
    try {
        const emp = await User.findOne({email} );
        return res.send(emp)
    } catch (err) {
        return res.json({ status: "error" });
    }
});

app.post("/api/lib/reset/:libId",
    [check("libId", "Please provide a valid id")],
    async (req, res) => {
        const { libId,psw } = req.body;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({ status: "error", error: "Invalid" });
        } else {
            let user = await User.findOne({ libId });
            if (!user) {
                return res.json({ status: "error", error: "Invalid" });
            }
            try {
                const salt = await bcrypt.genSalt(10);
                const psw1 = await bcrypt.hash(psw, salt);
                // console.log(psw1);
                user = await User.findOneAndUpdate(
                    { libId: req.body.libId },
                    { $set: { psw: psw1 } },
                    { new: true }
                );

                return res.json({ status: "okay", error: "valid" });

            } catch (error) {
                // console.log(error.message);
                res.status(500).send("Server Error");
            }
        }
    }
);

module.exports = app

