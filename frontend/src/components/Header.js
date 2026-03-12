import React from 'react'
import Search from './Search'
import { Link } from 'react-router-dom'

export default function Header({ cartItems }) {
  return (
    <div>
      <nav className="bg-amazon-blue px-4 py-3 fixed top-0 w-full z-50 flex flex-wrap items-center justify-between shadow-lg">
        <div className="flex-shrink-0">
          <Link to={'/'}>
            <img
              className="w-32 md:w-36 transition-transform hover:scale-105"
              src="/images/logo.png"
              alt="Logo"
            />
          </Link>
        </div>

        <div className="flex-grow max-w-2xl mx-4 mt-2 md:mt-0 order-3 md:order-2 w-full md:w-auto">
          <Search />
        </div>

        <div className="flex items-center space-x-6 order-2 md:order-3">
          <Link to={'/cart'} className="flex items-center group">
            <div className="relative">
              <span className="text-white text-lg font-medium group-hover:text-amazon-yellow transition-colors">Cart</span>
              <span className="absolute -top-2 -right-3 bg-amazon-yellow text-amazon-blue text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-amazon-blue">
                {cartItems.length}
              </span>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  )
}
