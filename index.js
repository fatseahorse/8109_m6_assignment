// REQUIRES
const express = require('express');
require('dotenv').config();  // put the variables in the .env file into process.env
const cors = require('cors');
const { connect } = require("./db");
const { ObjectId } = require('mongodb');
const { ai, generateSearchParams, generateRecipe } = require('./gemini');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { verifyToken } = require("./middlewares")

// SETUP EXPRESS
const app = express();

// app.use is to activate middleware
app.use(cors()); // enable CORS for API
app.use(express.json()); // tell Express that we are sending and reciving JSON

// SETUP DATABASE
const mongoUri = process.env.MONGO_URI;
const dbName = "db_8109_assignment";


function generateAccessToken(id, email) {
    // jwt.sign creates a JWT
    // first parameter -> object payload
    // second parameter -> your secret key
    // third parameter -> options object

    return jwt.sign({
        "user_id": id,
        "email": email
    }, process.env.TOKEN_SECRET, {
        // m = minutes, h = hours, s = seconds, d = days, w = weeks
        "expiresIn": "1h"
    });
}

