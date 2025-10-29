import React, { Fragment, useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom'

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + '/products?' + searchParams)
      .then(res => res.json())
      .then(res => setProducts(res.products || [])) // ✅ safe fallback
      .catch(err => console.error(err)); // optional: log errors
  }, [searchParams]);

  return (
    <Fragment>
      <h1 className='text-center' id="products_heading">Latest Products</h1>
      <section id="products" className="container mt-5">
        <div className="row">
          {products.map(product => ( // ✅ variable name fixed
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </Fragment>
  );
}
