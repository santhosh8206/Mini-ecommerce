import React, { Fragment, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useSearchParams, Link } from 'react-router-dom'
import ProductList from './ProductList';
import { getApiUrl } from '../utils/api';

const categories = [
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80', description: 'Mobiles, Laptops, Headphones' },
  { name: 'Clothing', image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&q=80', description: 'T-shirts, Jeans' },
  { name: 'Books', image: 'https://images.unsplash.com/photo-1524578271613-d550eeba8485?w=500&q=80', description: 'Programming, Story Books' },
  { name: 'Home Appliances', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&q=80', description: 'Mixers, Iron Boxes' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', description: 'Watches, Bags' },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [mobiles, setMobiles] = useState([]);
  const [searchParams] = useSearchParams();
  console.log("API URL BASE:", process.env.REACT_APP_API_URL);

  useEffect(() => {
    fetch(getApiUrl('/products?') + searchParams)
      .then(res => res.json())
      .then(res => setProducts(res.products || [])) // ✅ safe fallback
      .catch(err => console.error(err)); // optional: log errors
  }, [searchParams]);
  useEffect(() => {
    fetch(getApiUrl('/mobiles?') + searchParams)
      .then(res => res.json())
      .then(res => setMobiles(res.mobiles))
      .catch(err => console.error(err));
  }, [searchParams]);

  return (
    <Fragment>
      <div className='min-h-screen bg-gray-50 pt-24 pb-12 transition-all duration-300'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

          <div className="text-center mb-16">
            <h1 className='text-4xl md:text-5xl font-extrabold text-amazon-blue mb-4'>
              Explore Our <span className="text-amazon-yellow underline decoration-2 underline-offset-8">Categories</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Find exactly what you're looking for by browsing through our curated sections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amazon-blue via-amazon-blue/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                  <h3 className="text-2xl font-bold mb-2 transform transition-transform group-hover:translate-x-2">{category.name}</h3>
                  <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center text-amazon-yellow font-bold text-sm">
                    Shop Now <i className="fa fa-arrow-right ml-2 transition-transform group-hover:translate-x-2"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </Fragment>
  );
}
