const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

const PORT = 5000;
require('dotenv').config();
const authRoute = require('./Routes/AuthRoute');
const postRoute = require('./Routes/PostRoute');

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoute);
app.use('/api/posts', postRoute);

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connected"))
.catch(() => console.log("Error connecting database"));

app.listen(PORT, () => {
  console.log("Server is running on: http://localhost:5000");
});