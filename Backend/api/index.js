const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

// Configure dotenv
dotenv.config({ path: path.join(__dirname, '..', 'config', 'config.env') });

// Routes
const products = require('../routes/product');
const order = require('../routes/order');

// Cached connection for serverless
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDatabase() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(process.env.DB_URL, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

// Global connect middleware
app.use(async (req, res, next) => {
    try {
        await connectDatabase();
        next();
    } catch (err) {
        res.status(500).json({ error: 'Database connection failed' });
    }
});

app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.use('/api/v1/', products);
app.use('/api/v1/', order);

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'Mini-Ecommerce API is running' });
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });
}

module.exports = app;
