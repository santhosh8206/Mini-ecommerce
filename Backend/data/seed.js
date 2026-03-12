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
            { "name": "Smartphone X1", "price": 15000, "stock": 20, "description": "High-performance smartphone with advanced features", "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80", "seller": "Amazon" },
            { "name": "Laptop Pro", "price": 55000, "stock": 15, "description": "Professional laptop for work and gaming", "image": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80", "seller": "Amazon" },
            { "name": "Bluetooth Headphones", "price": 2000, "stock": 30, "description": "Crystal clear wireless sound", "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", "seller": "Amazon" },
            { "name": "Wireless Mouse", "price": 500, "stock": 40, "description": "Ergonomic wireless mouse", "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80", "seller": "Amazon" },
            { "name": "Mechanical Keyboard", "price": 3500, "stock": 25, "description": "Tactile mechanical keys for typing", "image": "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&q=80", "seller": "Amazon" },
            { "name": "Gaming Monitor", "price": 12000, "stock": 10, "description": "144Hz Refresh rate gaming monitor", "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80", "seller": "Amazon" },
            { "name": "Smart Watch", "price": 4500, "stock": 18, "description": "Track your fitness and notifications", "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", "seller": "Amazon" },
            { "name": "Power Bank", "price": 1200, "stock": 50, "description": "20000mAh fast charging power bank", "image": "https://images.unsplash.com/photo-1609091839311-d536801ff14d?w=500&q=80", "seller": "Amazon" },
            { "name": "USB-C Charger", "price": 800, "stock": 35, "description": "Fast charging USB-C adapter", "image": "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&q=80", "seller": "Amazon" },
            { "name": "Tablet 10", "price": 22000, "stock": 12, "description": "10-inch display versatile tablet", "image": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80", "seller": "Amazon" },
            { "name": "External HDD 1TB", "price": 4500, "stock": 22, "description": "Portable 1TB hard drive storage", "image": "https://images.unsplash.com/photo-1531062991700-4034714e10ad?w=500&q=80", "seller": "Amazon" },
            { "name": "Bluetooth Speaker", "price": 2500, "stock": 28, "description": "Portable booming bass speaker", "image": "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=500&q=80", "seller": "Amazon" },
            { "name": "VR Headset", "price": 7000, "stock": 9, "description": "Immersive virtual reality experience", "image": "https://images.unsplash.com/photo-1592477976530-fa670239226d?w=500&q=80", "seller": "Amazon" },
            { "name": "Webcam HD", "price": 1500, "stock": 26, "description": "1080p HD webcam for calls", "image": "https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=500&q=80", "seller": "Amazon" },
            { "name": "Router WiFi 6", "price": 3000, "stock": 17, "description": "High-speed WiFi 6 router", "image": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&q=80", "seller": "Amazon" },
            { "name": "Graphics Card", "price": 35000, "stock": 7, "description": "NVIDIA GeForce powerful GPU", "image": "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&q=80", "seller": "Amazon" },
            { "name": "SSD 512GB", "price": 4200, "stock": 19, "description": "Super fast NVMe SSD storage", "image": "https://images.unsplash.com/photo-1544794816-c7ef5c8593ca?w=500&q=80", "seller": "Amazon" },
            { "name": "Projector Mini", "price": 6000, "stock": 11, "description": "Mini portable home projector", "image": "https://images.unsplash.com/photo-1535016120720-40c646bebbfc?w=500&q=80", "seller": "Amazon" },
            { "name": "Smart TV 43", "price": 28000, "stock": 8, "description": "43-inch 4K Smart Android TV", "image": "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80", "seller": "Amazon" },
            { "name": "Noise Cancelling Earbuds", "price": 3800, "stock": 24, "description": "Active noise cancelling wireless buds", "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80", "seller": "Amazon" }
        ]
    },

    {
        "category": "Clothing",
        "products": [
            { "name": "Men T-Shirt", "price": 600, "stock": 40, "description": "Comfortable cotton men shirt", "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80", "seller": "Amazon" },
            { "name": "Women T-Shirt", "price": 650, "stock": 35, "description": "Soft casual women shirt", "image": "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500&q=80", "seller": "Amazon" },
            { "name": "Jeans Classic", "price": 1200, "stock": 30, "description": "Classic blue denim jeans", "image": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80", "seller": "Amazon" },
            { "name": "Hoodie Winter", "price": 1500, "stock": 22, "description": "Warm fleece winter hoodie", "image": "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80", "seller": "Amazon" },
            { "name": "Casual Shirt", "price": 900, "stock": 28, "description": "Stylish casual button-down", "image": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80", "seller": "Amazon" },
            { "name": "Formal Shirt", "price": 1100, "stock": 20, "description": "Premium formal office shirt", "image": "https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?w=500&q=80", "seller": "Amazon" },
            { "name": "Denim Jacket", "price": 2000, "stock": 15, "description": "Rugged denim jacket for men", "image": "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=500&q=80", "seller": "Amazon" },
            { "name": "Sports Shorts", "price": 500, "stock": 32, "description": "Breathable gym and sports shorts", "image": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&q=80", "seller": "Amazon" },
            { "name": "Track Pants", "price": 800, "stock": 27, "description": "Comfortable workout track pants", "image": "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&q=80", "seller": "Amazon" },
            { "name": "Kurta Cotton", "price": 950, "stock": 19, "description": "Ethnic cotton kurta for men", "image": "https://images.unsplash.com/photo-1529139572177-33e46c76db57?w=500&q=80", "seller": "Amazon" },
            { "name": "Leggings", "price": 400, "stock": 36, "description": "Stretchable comfortable leggings", "image": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80", "seller": "Amazon" },
            { "name": "Winter Sweater", "price": 1400, "stock": 18, "description": "Knitted wool winter sweater", "image": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80", "seller": "Amazon" },
            { "name": "Blazer Formal", "price": 3500, "stock": 12, "description": "Sophisticated formal suit blazer", "image": "https://images.unsplash.com/photo-1507679799987-c737715830eb?w=500&q=80", "seller": "Amazon" },
            { "name": "Saree Silk", "price": 3000, "stock": 14, "description": "Elegant traditional silk saree", "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80", "seller": "Amazon" },
            { "name": "Kids T-Shirt", "price": 450, "stock": 29, "description": "Cute printed kids shirt", "image": "https://images.unsplash.com/photo-1519234221762-1b655b757ffb?w=500&q=80", "seller": "Amazon" },
            { "name": "Kids Shorts", "price": 350, "stock": 33, "description": "Playful kids cotton shorts", "image": "https://images.unsplash.com/photo-1503945438517-f65904a5adc0?w=500&q=80", "seller": "Amazon" },
            { "name": "Rain Jacket", "price": 1200, "stock": 16, "description": "Waterproof travel rain jacket", "image": "https://images.unsplash.com/photo-1544648151-182cda4701d4?w=500&q=80", "seller": "Amazon" },
            { "name": "Sports Jersey", "price": 700, "stock": 25, "description": "High-performance sports jersey", "image": "https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=500&q=80", "seller": "Amazon" },
            { "name": "Night Suit", "price": 850, "stock": 21, "description": "Soft cotton night wear set", "image": "https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?w=500&q=80", "seller": "Amazon" },
            { "name": "Cotton Socks Pack", "price": 200, "stock": 50, "description": "Pack of 5 cotton socks", "image": "https://images.unsplash.com/photo-1582967702047-11f867929a0a?w=500&q=80", "seller": "Amazon" }
        ]
    },

    {
        "category": "Books",
        "products": [
            { "name": "JavaScript Basics", "price": 500, "stock": 20, "description": "Learn the fundamentals of JS", "image": "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&q=80", "seller": "Amazon" },
            { "name": "React Guide", "price": 650, "stock": 18, "description": "Complete guide to modern React", "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80", "seller": "Amazon" },
            { "name": "Node.js Handbook", "price": 700, "stock": 15, "description": "Backend development with Node", "image": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&q=80", "seller": "Amazon" },
            { "name": "MongoDB Essentials", "price": 600, "stock": 17, "description": "NoSQL database mastering", "image": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&q=80", "seller": "Amazon" },
            { "name": "HTML & CSS Design", "price": 450, "stock": 22, "description": "Beautiful web design basics", "image": "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=500&q=80", "seller": "Amazon" },
            { "name": "Python Programming", "price": 750, "stock": 19, "description": "Python for data and web", "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80", "seller": "Amazon" },
            { "name": "Data Structures", "price": 800, "stock": 13, "description": "Core computer science concepts", "image": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&q=80", "seller": "Amazon" },
            { "name": "Algorithms Book", "price": 900, "stock": 12, "description": "Mastering logical problem solving", "image": "https://images.unsplash.com/photo-1532012197111-05315785ef61?w=500&q=80", "seller": "Amazon" },
            { "name": "Operating Systems", "price": 650, "stock": 14, "description": "How computers manage resources", "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80", "seller": "Amazon" },
            { "name": "Computer Networks", "price": 620, "stock": 16, "description": "Fundamentals of networking", "image": "https://images.unsplash.com/photo-1558494949-ef010978941c?w=500&q=80", "seller": "Amazon" },
            { "name": "AI Basics", "price": 700, "stock": 11, "description": "Intro to Artificial Intelligence", "image": "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=500&q=80", "seller": "Amazon" },
            { "name": "Machine Learning Intro", "price": 850, "stock": 10, "description": "Training models for prediction", "image": "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=500&q=80", "seller": "Amazon" },
            { "name": "Cloud Computing", "price": 720, "stock": 9, "description": "AWS, Azure, and Google Cloud", "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80", "seller": "Amazon" },
            { "name": "DevOps Handbook", "price": 780, "stock": 8, "description": "CID/CD and automation culture", "image": "https://images.unsplash.com/photo-1618401471353-b98aadebc25a?w=500&q=80", "seller": "Amazon" },
            { "name": "Cybersecurity Guide", "price": 690, "stock": 15, "description": "Protecting systems from attacks", "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80", "seller": "Amazon" },
            { "name": "Database Systems", "price": 640, "stock": 17, "description": "SQL and relational concepts", "image": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&q=80", "seller": "Amazon" },
            { "name": "Software Engineering", "price": 600, "stock": 21, "description": "Agile and SDLC principles", "image": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=80", "seller": "Amazon" },
            { "name": "Clean Code", "price": 950, "stock": 12, "description": "Writing maintainable software", "image": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&q=80", "seller": "Amazon" },
            { "name": "Design Patterns", "price": 920, "stock": 11, "description": "Reusable logical structures", "image": "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=500&q=80", "seller": "Amazon" },
            { "name": "Agile Development", "price": 550, "stock": 20, "description": "Scrum and iterative workflows", "image": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&q=80", "seller": "Amazon" }
        ]
    },

    {
        "category": "Home Appliances",
        "products": [
            { "name": "Mixer Grinder", "price": 2500, "stock": 20, "description": "Heavy duty kitchen grinder", "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&q=80", "seller": "Amazon" },
            { "name": "Electric Iron", "price": 1200, "stock": 25, "description": "Steam iron for crisp clothes", "image": "https://images.unsplash.com/photo-1582041235123-5e9334416301?w=500&q=80", "seller": "Amazon" },
            { "name": "Air Fryer", "price": 5000, "stock": 10, "description": "Healthy oil-free cooking", "image": "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=500&q=80", "seller": "Amazon" },
            { "name": "Rice Cooker", "price": 2200, "stock": 18, "description": "Automatic non-stick rice cooker", "image": "https://images.unsplash.com/photo-1594140726715-aa4319859f51?w=500&q=80", "seller": "Amazon" },
            { "name": "Water Purifier", "price": 8500, "stock": 8, "description": "Advanced RO purification system", "image": "https://images.unsplash.com/photo-1527633590522-3861ed076840?w=500&q=80", "seller": "Amazon" },
            { "name": "Induction Stove", "price": 1800, "stock": 22, "description": "Energy efficient digital stove", "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80", "seller": "Amazon" },
            { "name": "Vacuum Cleaner", "price": 6500, "stock": 9, "description": "Powerful suction for home cleaning", "image": "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&q=80", "seller": "Amazon" },
            { "name": "Ceiling Fan", "price": 2000, "stock": 30, "description": "High speed aerodynamic fan", "image": "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=500&q=80", "seller": "Amazon" },
            { "name": "Table Fan", "price": 1500, "stock": 26, "description": "Portable 3-speed desk fan", "image": "https://images.unsplash.com/photo-1556214578-83959c193246?w=500&q=80", "seller": "Amazon" },
            { "name": "Room Heater", "price": 3000, "stock": 14, "description": "Efficient heater for winter", "image": "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?w=500&q=80", "seller": "Amazon" },
            { "name": "Electric Kettle", "price": 900, "stock": 33, "description": "1.5L fast boiling kettle", "image": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&q=80", "seller": "Amazon" },
            { "name": "Toaster", "price": 1100, "stock": 19, "description": "2-slice automatic bread toaster", "image": "https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?w=500&q=80", "seller": "Amazon" },
            { "name": "Coffee Maker", "price": 3500, "stock": 11, "description": "Brew professional coffee at home", "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80", "seller": "Amazon" },
            { "name": "Dishwasher Mini", "price": 12000, "stock": 5, "description": "Countertop compact dishwasher", "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80", "seller": "Amazon" },
            { "name": "Air Cooler", "price": 7500, "stock": 7, "description": "High air throw cooling fan", "image": "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&q=80", "seller": "Amazon" },
            { "name": "Refrigerator 200L", "price": 18000, "stock": 6, "description": "Single door energy saver fridge", "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80", "seller": "Amazon" },
            { "name": "Washing Machine", "price": 22000, "stock": 5, "description": "Fully automatic top load washer", "image": "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?w=500&q=80", "seller": "Amazon" },
            { "name": "Microwave Oven", "price": 9500, "stock": 8, "description": "Convection microwave for baking", "image": "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&q=80", "seller": "Amazon" },
            { "name": "Chimney Kitchen", "price": 8000, "stock": 6, "description": "Auto-clean kitchen suction hood", "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80", "seller": "Amazon" },
            { "name": "Water Heater", "price": 4000, "stock": 13, "description": "Instant electric hot geyser", "image": "https://images.unsplash.com/photo-1601058268499-e52658b8bb88?w=500&q=80", "seller": "Amazon" }
        ]
    },

    {
        "category": "Accessories",
        "products": [
            { "name": "Leather Wallet", "price": 700, "stock": 25, "description": "Premium build leather wallet", "image": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80", "seller": "Amazon" },
            { "name": "Analog Watch", "price": 2000, "stock": 18, "description": "Classy analog dial watch", "image": "https://images.unsplash.com/photo-1524592091214-8c9edf1209a0?w=500&q=80", "seller": "Amazon" },
            { "name": "Digital Watch", "price": 1500, "stock": 22, "description": "Multifunctional digital watch", "image": "https://images.unsplash.com/photo-1544006659-f0b21f04cb1d?w=500&q=80", "seller": "Amazon" },
            { "name": "Sunglasses", "price": 900, "stock": 30, "description": "UV protected stylish shades", "image": "https://images.unsplash.com/photo-1511499767350-a45a1bbdd071?w=500&q=80", "seller": "Amazon" },
            { "name": "Backpack", "price": 1200, "stock": 27, "description": "Water resistant travel backpack", "image": "https://images.unsplash.com/photo-1553062407-98eeb94c6a62?w=500&q=80", "seller": "Amazon" },
            { "name": "Laptop Bag", "price": 1400, "stock": 20, "description": "Padded slim laptop sleeve bag", "image": "https://images.unsplash.com/photo-1544816153-39ad44446b1f?w=500&q=80", "seller": "Amazon" },
            { "name": "Travel Bag", "price": 2500, "stock": 15, "description": "Large capacity luggage bag", "image": "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&q=80", "seller": "Amazon" },
            { "name": "Keychain Metal", "price": 150, "stock": 50, "description": "Durable metal ring keychain", "image": "https://images.unsplash.com/photo-1622353995893-66a9d7010461?w=500&q=80", "seller": "Amazon" },
            { "name": "Bracelet", "price": 300, "stock": 35, "description": "Stylish unisex wrist bracelet", "image": "https://images.unsplash.com/photo-1611591439972-ed60ecfe3f62?w=500&q=80", "seller": "Amazon" },
            { "name": "Cap", "price": 400, "stock": 28, "description": "Adjustable cotton baseball cap", "image": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80", "seller": "Amazon" },
            { "name": "Belts Leather", "price": 800, "stock": 24, "description": "Formal leather waist belt", "image": "https://images.unsplash.com/photo-1624222247344-550fb8ec5b8d?w=500&q=80", "seller": "Amazon" },
            { "name": "Phone Case", "price": 350, "stock": 40, "description": "Protective silicon phone cover", "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&q=80", "seller": "Amazon" },
            { "name": "Earphone Pouch", "price": 250, "stock": 37, "description": "Mini protective case for buds", "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80", "seller": "Amazon" },
            { "name": "Passport Holder", "price": 600, "stock": 19, "description": "Travel safety passport wallet", "image": "https://images.unsplash.com/photo-1512418490979-92798ccc13fb?w=500&q=80", "seller": "Amazon" },
            { "name": "Travel Organizer", "price": 750, "stock": 21, "description": "Toiletry and small items kit", "image": "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500&q=80", "seller": "Amazon" },
            { "name": "Fitness Band", "price": 2200, "stock": 13, "description": "Activity tracker and heart rate", "image": "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80", "seller": "Amazon" },
            { "name": "Portable Mirror", "price": 200, "stock": 32, "description": "Small compact makeup mirror", "image": "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&q=80", "seller": "Amazon" },
            { "name": "Jewelry Box", "price": 950, "stock": 14, "description": "Secure storage for accessories", "image": "https://images.unsplash.com/photo-1616150638538-ffb0679a3fc4?w=500&q=80", "seller": "Amazon" },
            { "name": "Camera Strap", "price": 500, "stock": 23, "description": "Comfortable neck strap for SLR", "image": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=80", "seller": "Amazon" },
            { "name": "Card Holder", "price": 450, "stock": 26, "description": "Slim metal card protector", "image": "https://images.unsplash.com/photo-1618381381417-d542382405d4?w=500&q=80", "seller": "Amazon" }
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
