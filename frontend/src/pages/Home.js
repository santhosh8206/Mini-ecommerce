import React, { Fragment, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom'
import ProductList from './ProductList';
import { getApiUrl } from '../utils/api';

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
      <div className='min-h-screen bg-gray-50 pt-20 pb-12 transition-all duration-300'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

          <div className="mb-12">
            <h1 className='text-3xl font-bold text-amazon-blue border-b-2 border-amazon-yellow pb-2 mb-8 inline-block'>
              Offer Deals
            </h1>
            <ProductList mobiles={mobiles} />
          </div>

          <div className="mb-12">
            <h1 className='text-3xl font-bold text-amazon-blue border-b-2 border-amazon-yellow pb-2 mb-8 inline-block'>
              Latest Products
            </h1>
            <section id="products" className="py-4">
              <div className="flex flex-wrap -mx-4">
                {products.length > 0 ? (
                  products.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <div className="w-full text-center py-20 text-gray-500">
                    <p className="text-xl">No products found.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

        </div>
      </div>
    </Fragment>
  );
}
