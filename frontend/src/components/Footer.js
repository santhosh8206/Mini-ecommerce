import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-amazon-blue text-gray-400 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/">
                            <img src="/images/logo.png" alt="Logo" className="w-32 mb-4 opacity-80 hover:opacity-100 transition-opacity" />
                        </Link>
                        <p className="text-sm leading-relaxed max-w-sm">
                            Your one-stop destination for premium electronics and lifestyle products. Quality guaranteed with every purchase.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Shop</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-amazon-yellow transition-colors">All Products</Link></li>
                            <li><Link to="/search?keyword=mobile" className="hover:text-amazon-yellow transition-colors">Mobiles</Link></li>
                            <li><Link to="/search?keyword=laptop" className="hover:text-amazon-yellow transition-colors">Laptops</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/cart" className="hover:text-amazon-yellow transition-colors">Your Cart</Link></li>
                            <li><Link to="/" className="hover:text-amazon-yellow transition-colors">Track Order</Link></li>
                            <li><Link to="/" className="hover:text-amazon-yellow transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-gray-800 text-center">
                    <p className="text-xs">
                        &copy; {new Date().getFullYear()} Mini-Ecommerce. Built for excellence. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
