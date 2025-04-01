const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config'); // Changed from _config

// Define routes
const index = require('./routes/index');
const image = require('./routes/image');

// Initialize the app
const app = express();

// Connect to MongoDB
const mongoURI = process.env.NODE_ENV === 'test' 
  ? config.mongoURI.test 
  : config.mongoURI.development;

  mongoose.connect(mongoURI)

.then(() => console.log(`✅ Connected to MongoDB (${process.env.NODE_ENV || 'development'})`))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', index);
app.use('/image', image);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
let PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === 'production') {
  PORT = process.env.PORT || 80;
}

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});