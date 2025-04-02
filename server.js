const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');

// Define routes
const index = require('./routes/index');
const image = require('./routes/image');

// Initialize the app
const app = express();

// Connect to MongoDB (Updated for Render)
const mongoURI = process.env.MONGODB_URI || 
  (process.env.NODE_ENV === 'test' 
    ? config.mongoURI.test 
    : config.mongoURI.development);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
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

// Debug middleware (helps verify requests in Render logs)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/', index);
app.use('/image', image);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3000;
console.log(`Render PORT env: ${process.env.PORT}`);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`   Listening on port: ${PORT}`);
});
