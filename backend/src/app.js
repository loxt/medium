require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { v2: cloudinary } = require('cloudinary');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();
const url = process.env.MONGODB_URI;

cloudinary.config({
  cloud_name: 'loxt',
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

try {
  mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (err) {
  throw new Error(err);
}

const port = 3333 || process.env.PORT;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use('/api', routes);

app.listen(port);
