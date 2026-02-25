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
  console.log("FETCH URL EXAMPLE:", getApiUrl('/products'));
  console.log(mobiles._id);

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
      <div className='mt-5 p-3'>
        <div className='container mt-5'>
          <h1 className='text-center' id="products_heading">Offer Deal</h1>
          <section>
            <div className="row">
              <ProductList mobiles={mobiles} />
            </div>
          </section>

        </div>
        <h1 className='text-center' id="products_heading">Latest Products</h1>
        <section id="products" className="container mt-2">
          <div className="row">
            {products.map(product => ( // ✅ variable name fixed
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </Fragment>
  );
}
