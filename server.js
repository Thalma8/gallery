const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config'); // Import your config file

// Define routes
const index = require('./routes/index');
const image = require('./routes/image');

// Initialize the app
const app = express();

// Connect to MongoDB Atlas
mongoose.connect(config.mongoURI.development, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('✅ Connected to MongoDB Atlas (darkroom-dev)'))
.catch(err => {
  console.error('❌ MongoDB Atlas connection error:', err.message);
  process.exit(1); // Exit if DB connection fails
});

// Database connection events
const db = mongoose.connection;
db.on('error', err => console.error('MongoDB connection error:', err));
db.once('open', () => console.log('Database connection established'));

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data

// Routes
app.use('/', index);
app.use('/image', image);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});