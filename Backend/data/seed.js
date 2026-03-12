const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/productModels');
const Category = require('../models/categoryModels');

dotenv.config({ path: path.join(__dirname, '..', 'config', 'config.env') });

const products = [
    // Electronics
    { name: 'Latest Smartphone', price: 45000, description: 'High performance 5G mobile', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80', category: 'Electronics', stock: 10 },
    { name: 'Powerful Laptop', price: 75000, description: '8GB RAM, 512GB SSD', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80', category: 'Electronics', stock: 5 },
    { name: 'Noise Cancelling Headphones', price: 5000, description: 'Crystal clear sound', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', category: 'Electronics', stock: 15 },

    // Clothing
    { name: 'Cotton T-Shirt', price: 999, description: 'Premium cotton comfort', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80', category: 'Clothing', stock: 50 },
    { name: 'Slim Fit Jeans', price: 2499, description: 'Durable and stylish', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80', category: 'Clothing', stock: 30 },

    // Books
    { name: 'Mastering JavaScript', price: 1200, description: 'Complete guide to JS', image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&q=80', category: 'Books', stock: 20 },
    { name: 'The Great Adventure', price: 599, description: 'Thrilling story book', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80', category: 'Books', stock: 40 },

    // Home Appliances
    { name: 'Fast Grinder Mixer', price: 3500, description: 'High speed motor', image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&q=80', category: 'Home Appliances', stock: 12 },
    { name: 'Steam Iron Box', price: 1500, description: 'Easy crease removal', image: 'https://images.unsplash.com/photo-1582041235123-5e9334416301?w=500&q=80', category: 'Home Appliances', stock: 25 },

    // Accessories
    { name: 'Premium Watch', price: 8500, description: 'Elegant luxury watch', image: 'https://images.unsplash.com/photo-1524592091214-8c9edf1209a0?w=500&q=80', category: 'Accessories', stock: 8 },
    { name: 'Leather Travel Bag', price: 4500, description: 'Authentic leather', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&q=80', category: 'Accessories', stock: 10 }
];

const categories = [
    { name: 'Electronics' },
    { name: 'Clothing' },
    { name: 'Books' },
    { name: 'Home Appliances' },
    { name: 'Accessories' }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB for seeding');

        await Product.deleteMany();
        console.log('Products deleted');
        await Product.insertMany(products);
        console.log('Products seeded');

        await Category.deleteMany();
        console.log('Categories deleted');
        await Category.insertMany(categories);
        console.log('Categories seeded');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedData();
