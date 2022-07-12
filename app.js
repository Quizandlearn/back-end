const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');
const userRoutes = require('./routes/users');
const quizRoutes = require('./routes/quiz');
const categoryRoutes = require('./routes/category');
require('dotenv').config();

const app = express();

// specified on which URL we allow cors
const corsOptions = {
  origin: process.env.BACKEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));

mongoose
  .connect(process.env.MONGODB_URI || config.get('mongoURI'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use('/api', userRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/categories', categoryRoutes);

module.exports = app;
