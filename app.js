const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const userRoutes = require('./routes/users');
const quizRoutes = require('./routes/quiz');
const categoryRoutes = require('./routes/category');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

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
app.use('/api/categories', categoryRoutes);


module.exports = app;
