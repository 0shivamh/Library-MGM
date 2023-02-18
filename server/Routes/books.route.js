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

app.use(cors());
app.use(express.json());



module.exports = app

