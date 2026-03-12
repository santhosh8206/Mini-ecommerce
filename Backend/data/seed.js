const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/productModels');
const Category = require('../models/categoryModels');

dotenv.config({ path: path.join(__dirname, '..', 'config', 'config.env') });

const data = [
    {
        "category": "Electronics",
        "products": [
            { "name": "Smartphone X1", "price": 15000, "stock": 20, "description": "High-performance smartphone with advanced features", "image": "https://m.media-amazon.com/images/I/71ZOtNdaZCL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Laptop Pro", "price": 55000, "stock": 15, "description": "Professional laptop for work and gaming", "image": "https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Bluetooth Headphones", "price": 2000, "stock": 30, "description": "Crystal clear wireless sound", "image": "https://m.media-amazon.com/images/I/516m8J5M1AL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Wireless Mouse", "price": 500, "stock": 40, "description": "Ergonomic wireless mouse", "image": "https://m.media-amazon.com/images/I/61SAsS56C9L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Mechanical Keyboard", "price": 3500, "stock": 25, "description": "Tactile mechanical keys for typing", "image": "https://m.media-amazon.com/images/I/7185S++W7ZL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Gaming Monitor", "price": 12000, "stock": 10, "description": "144Hz Refresh rate gaming monitor", "image": "https://m.media-amazon.com/images/I/71fL98zndlL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Smart Watch", "price": 4500, "stock": 18, "description": "Track your fitness and notifications", "image": "https://m.media-amazon.com/images/I/61ZjlBOp+rL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Power Bank", "price": 1200, "stock": 50, "description": "20000mAh fast charging power bank", "image": "https://m.media-amazon.com/images/I/71R6U7v7qWL._SX679_.jpg", "seller": "Amazon" },
            { "name": "USB-C Charger", "price": 800, "stock": 35, "description": "Fast charging USB-C adapter", "image": "https://m.media-amazon.com/images/I/51SIdW-I-hL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Tablet 10", "price": 22000, "stock": 12, "description": "10-inch display versatile tablet", "image": "https://m.media-amazon.com/images/I/71S8qS6v6EL._SX679_.jpg", "seller": "Amazon" },
            { "name": "External HDD 1TB", "price": 4500, "stock": 22, "description": "Portable 1TB hard drive storage", "image": "https://m.media-amazon.com/images/I/61Ere87EdfL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Bluetooth Speaker", "price": 2500, "stock": 28, "description": "Portable booming bass speaker", "image": "https://m.media-amazon.com/images/I/71f-T97-FAL._SX679_.jpg", "seller": "Amazon" },
            { "name": "VR Headset", "price": 7000, "stock": 9, "description": "Immersive virtual reality experience", "image": "https://m.media-amazon.com/images/I/61vYfG7+3RL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Webcam HD", "price": 1500, "stock": 26, "description": "1080p HD webcam for calls", "image": "https://m.media-amazon.com/images/I/61X-N6e4zWL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Router WiFi 6", "price": 3000, "stock": 17, "description": "High-speed WiFi 6 router", "image": "https://m.media-amazon.com/images/I/61X-N6e4zWL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Graphics Card", "price": 35000, "stock": 7, "description": "NVIDIA GeForce powerful GPU", "image": "https://m.media-amazon.com/images/I/71fL98zndlL._SX679_.jpg", "seller": "Amazon" },
            { "name": "SSD 512GB", "price": 4200, "stock": 19, "description": "Super fast NVMe SSD storage", "image": "https://m.media-amazon.com/images/I/61Ere87EdfL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Projector Mini", "price": 6000, "stock": 11, "description": "Mini portable home projector", "image": "https://m.media-amazon.com/images/I/71fL98zndlL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Smart TV 43", "price": 28000, "stock": 8, "description": "43-inch 4K Smart Android TV", "image": "https://m.media-amazon.com/images/I/71fL98zndlL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Noise Cancelling Earbuds", "price": 3800, "stock": 24, "description": "Active noise cancelling wireless buds", "image": "https://m.media-amazon.com/images/I/516m8J5M1AL._SX679_.jpg", "seller": "Amazon" }
        ]
    },

    {
        "category": "Clothing",
        "products": [
            { "name": "Men T-Shirt", "price": 600, "stock": 40, "description": "Comfortable cotton men shirt", "image": "https://m.media-amazon.com/images/I/71F7O7n0O6L._UY879_.jpg", "seller": "Amazon" },
            { "name": "Women T-Shirt", "price": 650, "stock": 35, "description": "Soft casual women shirt", "image": "https://m.media-amazon.com/images/I/61+u0I7vLSL._UY879_.jpg", "seller": "Amazon" },
            { "name": "Jeans Classic", "price": 1200, "stock": 30, "description": "Classic blue denim jeans", "image": "https://m.media-amazon.com/images/I/61fS4yN00+L._UY879_.jpg", "seller": "Amazon" },
            { "name": "Hoodie Winter", "price": 1500, "stock": 22, "description": "Warm fleece winter hoodie", "image": "https://m.media-amazon.com/images/I/61Nf+20+WJL._UY879_.jpg", "seller": "Amazon" },
            { "name": "Casual Shirt", "price": 900, "stock": 28, "description": "Stylish casual button-down", "image": "https://m.media-amazon.com/images/I/71F7O7n0O6L._UY879_.jpg", "seller": "Amazon" },
            { "name": "Formal Shirt", "price": 1100, "stock": 20, "description": "Premium formal office shirt", "image": "https://m.media-amazon.com/images/I/71F7O7n0O6L._UY879_.jpg", "seller": "Amazon" },
            { "name": "Denim Jacket", "price": 2000, "stock": 15, "description": "Rugged denim jacket for men", "image": "https://m.media-amazon.com/images/I/61Nf+20+WJL._UY879_.jpg", "seller": "Amazon" },
            { "name": "Sports Shorts", "price": 500, "stock": 32, "description": "Breathable gym and sports shorts", "image": "https://m.media-amazon.com/images/I/61fS4yN00+L._UY879_.jpg", "seller": "Amazon" },
            { "name": "Track Pants", "price": 800, "stock": 27, "description": "Comfortable workout track pants", "image": "https://m.media-amazon.com/images/I/61fS4yN00+L._UY879_.jpg", "seller": "Amazon" },
            { "name": "Kurta Cotton", "price": 950, "stock": 19, "description": "Ethnic cotton kurta for men", "image": "https://m.media-amazon.com/images/I/71F7O7n0O6L._UY879_.jpg", "seller": "Amazon" },
            { "name": "Leggings", "price": 400, "stock": 36, "description": "Stretchable comfortable leggings", "image": "https://m.media-amazon.com/images/I/61+u0I7vLSL._UY879_.jpg", "seller": "Amazon" },
            { "name": "Winter Sweater", "price": 1400, "stock": 18, "description": "Knitted wool winter sweater", "image": "https://m.media-amazon.com/images/I/61Nf+20+WJL._UY879_.jpg", "seller": "Amazon" },
            { "name": "Blazer Formal", "price": 3500, "stock": 12, "description": "Sophisticated formal suit blazer", "image": "https://m.media-amazon.com/images/I/71F7O7n0O6L._UY879_.jpg", "seller": "Amazon" },
            { "name": "Saree Silk", "price": 3000, "stock": 14, "description": "Elegant traditional silk saree", "image": "https://m.media-amazon.com/images/I/61+u0I7vLSL._UY879_.jpg", "seller": "Amazon" },
            { "name": "Kids T-Shirt", "price": 450, "stock": 29, "description": "Cute printed kids shirt", "image": "https://m.media-amazon.com/images/I/71F7O7n0O6L._UY879_.jpg", "seller": "Amazon" },
            { "name": "Kids Shorts", "price": 350, "stock": 33, "description": "Playful kids cotton shorts", "image": "https://m.media-amazon.com/images/I/61fS4yN00+L._UY879_.jpg", "seller": "Amazon" },
            { "name": "Rain Jacket", "price": 1200, "stock": 16, "description": "Waterproof travel rain jacket", "image": "https://m.media-amazon.com/images/I/61Nf+20+WJL._UY879_.jpg", "seller": "Amazon" },
            { "name": "Sports Jersey", "price": 700, "stock": 25, "description": "High-performance sports jersey", "image": "https://m.media-amazon.com/images/I/71F7O7n0O6L._UY879_.jpg", "seller": "Amazon" },
            { "name": "Night Suit", "price": 850, "stock": 21, "description": "Soft cotton night wear set", "image": "https://m.media-amazon.com/images/I/61+u0I7vLSL._UY879_.jpg", "seller": "Amazon" },
            { "name": "Cotton Socks Pack", "price": 200, "stock": 50, "description": "Pack of 5 cotton socks", "image": "https://m.media-amazon.com/images/I/61fS4yN00+L._UY879_.jpg", "seller": "Amazon" }
        ]
    },

    {
        "category": "Books",
        "products": [
            { "name": "JavaScript Basics", "price": 500, "stock": 20, "description": "Learn the fundamentals of JS", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "React Guide", "price": 650, "stock": 18, "description": "Complete guide to modern React", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Node.js Handbook", "price": 700, "stock": 15, "description": "Backend development with Node", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "MongoDB Essentials", "price": 600, "stock": 17, "description": "NoSQL database mastering", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "HTML & CSS Design", "price": 450, "stock": 22, "description": "Beautiful web design basics", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Python Programming", "price": 750, "stock": 19, "description": "Python for data and web", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Data Structures", "price": 800, "stock": 13, "description": "Core computer science concepts", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Algorithms Book", "price": 900, "stock": 12, "description": "Mastering logical problem solving", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Operating Systems", "price": 650, "stock": 14, "description": "How computers manage resources", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Computer Networks", "price": 620, "stock": 16, "description": "Fundamentals of networking", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "AI Basics", "price": 700, "stock": 11, "description": "Intro to Artificial Intelligence", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Machine Learning Intro", "price": 850, "stock": 10, "description": "Training models for prediction", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Cloud Computing", "price": 720, "stock": 9, "description": "AWS, Azure, and Google Cloud", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "DevOps Handbook", "price": 780, "stock": 8, "description": "CID/CD and automation culture", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Cybersecurity Guide", "price": 690, "stock": 15, "description": "Protecting systems from attacks", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Database Systems", "price": 640, "stock": 17, "description": "SQL and relational concepts", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Software Engineering", "price": 600, "stock": 21, "description": "Agile and SDLC principles", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Clean Code", "price": 950, "stock": 12, "description": "Writing maintainable software", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Design Patterns", "price": 920, "stock": 11, "description": "Reusable logical structures", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Agile Development", "price": 550, "stock": 20, "description": "Scrum and iterative workflows", "image": "https://m.media-amazon.com/images/I/51A1O9X2L._SX679_.jpg", "seller": "Amazon" }
        ]
    },

    {
        "category": "Home Appliances",
        "products": [
            { "name": "Mixer Grinder", "price": 2500, "stock": 20, "description": "Heavy duty kitchen grinder", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Electric Iron", "price": 1200, "stock": 25, "description": "Steam iron for crisp clothes", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Air Fryer", "price": 5000, "stock": 10, "description": "Healthy oil-free cooking", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Rice Cooker", "price": 2200, "stock": 18, "description": "Automatic non-stick rice cooker", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Water Purifier", "price": 8500, "stock": 8, "description": "Advanced RO purification system", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Induction Stove", "price": 1800, "stock": 22, "description": "Energy efficient digital stove", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Vacuum Cleaner", "price": 6500, "stock": 9, "description": "Powerful suction for home cleaning", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Ceiling Fan", "price": 2000, "stock": 30, "description": "High speed aerodynamic fan", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Table Fan", "price": 1500, "stock": 26, "description": "Portable 3-speed desk fan", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Room Heater", "price": 3000, "stock": 14, "description": "Efficient heater for winter", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Electric Kettle", "price": 900, "stock": 33, "description": "1.5L fast boiling kettle", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Toaster", "price": 1100, "stock": 19, "description": "2-slice automatic bread toaster", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Coffee Maker", "price": 3500, "stock": 11, "description": "Brew professional coffee at home", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Dishwasher Mini", "price": 12000, "stock": 5, "description": "Countertop compact dishwasher", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Air Cooler", "price": 7500, "stock": 7, "description": "High air throw cooling fan", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Refrigerator 200L", "price": 18000, "stock": 6, "description": "Single door energy saver fridge", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Washing Machine", "price": 22000, "stock": 5, "description": "Fully automatic top load washer", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Microwave Oven", "price": 9500, "stock": 8, "description": "Convection microwave for baking", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Chimney Kitchen", "price": 8000, "stock": 6, "description": "Auto-clean kitchen suction hood", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" },
            { "name": "Water Heater", "price": 4000, "stock": 13, "description": "Instant electric hot geyser", "image": "https://m.media-amazon.com/images/I/61f8X9S+0+L._SX679_.jpg", "seller": "Amazon" }
        ]
    },

    {
        "category": "Accessories",
        "products": [
            { "name": "Leather Wallet", "price": 700, "stock": 25, "description": "Premium build leather wallet", "image": "https://m.media-amazon.com/images/I/71R6U7v7qWL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Analog Watch", "price": 2000, "stock": 18, "description": "Classy analog dial watch", "image": "https://m.media-amazon.com/images/I/61ZjlBOp+rL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Digital Watch", "price": 1500, "stock": 22, "description": "Multifunctional digital watch", "image": "https://m.media-amazon.com/images/I/61ZjlBOp+rL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Sunglasses", "price": 900, "stock": 30, "description": "UV protected stylish shades", "image": "https://m.media-amazon.com/images/I/61p3D9Zp+rL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Backpack", "price": 1200, "stock": 27, "description": "Water resistant travel backpack", "image": "https://m.media-amazon.com/images/I/71R6U7v7qWL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Laptop Bag", "price": 1400, "stock": 20, "description": "Padded slim laptop sleeve bag", "image": "https://m.media-amazon.com/images/I/71R6U7v7qWL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Travel Bag", "price": 2500, "stock": 15, "description": "Large capacity luggage bag", "image": "https://m.media-amazon.com/images/I/71R6U7v7qWL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Keychain Metal", "price": 150, "stock": 50, "description": "Durable metal ring keychain", "image": "https://m.media-amazon.com/images/I/61p3D9Zp+rL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Bracelet", "price": 300, "stock": 35, "description": "Stylish unisex wrist bracelet", "image": "https://m.media-amazon.com/images/I/61p3D9Zp+rL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Cap", "price": 400, "stock": 28, "description": "Adjustable cotton baseball cap", "image": "https://m.media-amazon.com/images/I/61p3D9Zp+rL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Belts Leather", "price": 800, "stock": 24, "description": "Formal leather waist belt", "image": "https://m.media-amazon.com/images/I/71R6U7v7qWL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Phone Case", "price": 350, "stock": 40, "description": "Protective silicon phone cover", "image": "https://m.media-amazon.com/images/I/61ZjlBOp+rL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Earphone Pouch", "price": 250, "stock": 37, "description": "Mini protective case for buds", "image": "https://m.media-amazon.com/images/I/516m8J5M1AL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Passport Holder", "price": 600, "stock": 19, "description": "Travel safety passport wallet", "image": "https://m.media-amazon.com/images/I/71R6U7v7qWL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Travel Organizer", "price": 750, "stock": 21, "description": "Toiletry and small items kit", "image": "https://m.media-amazon.com/images/I/71R6U7v7qWL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Fitness Band", "price": 2200, "stock": 13, "description": "Activity tracker and heart rate", "image": "https://m.media-amazon.com/images/I/61ZjlBOp+rL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Portable Mirror", "price": 200, "stock": 32, "description": "Small compact makeup mirror", "image": "https://m.media-amazon.com/images/I/61p3D9Zp+rL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Jewelry Box", "price": 950, "stock": 14, "description": "Secure storage for accessories", "image": "https://m.media-amazon.com/images/I/71R6U7v7qWL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Camera Strap", "price": 500, "stock": 23, "description": "Comfortable neck strap for SLR", "image": "https://m.media-amazon.com/images/I/71R6U7v7qWL._SX679_.jpg", "seller": "Amazon" },
            { "name": "Card Holder", "price": 450, "stock": 26, "description": "Slim metal card protector", "image": "https://m.media-amazon.com/images/I/71R6U7v7qWL._SX679_.jpg", "seller": "Amazon" }
        ]
    }
]

const seedData = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB for seeding');

        await Product.deleteMany();
        console.log('Old products deleted');

        let allProducts = [];
        data.forEach(item => {
            item.products.forEach(p => {
                allProducts.push({
                    ...p,
                    category: item.category
                });
            });
        });

        await Product.insertMany(allProducts);
        console.log(`${allProducts.length} Products seeded successfully`);

        await Category.deleteMany();
        const categories = data.map(item => ({ name: item.category }));
        await Category.insertMany(categories);
        console.log('Categories seeded successfully');

        process.exit();
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedData();
