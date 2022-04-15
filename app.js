const express = require('express');
var cors = require('cors')
const mongoose = require('mongoose');
const config = require("config");
const userRoutes = require('./routes/users');
const quizRoutes = require('./routes/quiz');

const app = express();

//specified on which URL we allow cors
var corsOptions = {
    origin: 'http://localhost:4000',
    credentials : true
   }
  
app.use(cors(corsOptions));

//connection bdd avec mongoose
const db = config.get("mongoURI");

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));

app.use(express.json());
app.use('/api/auth', userRoutes);
app.use('/api/quiz', quizRoutes);

module.exports = app;