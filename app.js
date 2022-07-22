const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');
const userRoutes = require('./routes/users');
const quizRoutes = require('./routes/quiz');
const categoryRoutes = require('./routes/category');

const app = express();

// specified on which URL we allow cors
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

// connection bdd avec mongoose
const db = config.get('mongoURI');

mongoose
  .connect(db, {
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
