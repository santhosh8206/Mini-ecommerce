import React, { Fragment, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getApiUrl } from '../utils/api'
import axios from 'axios'

export default function CategoryPage() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const categoryName = category.replace(/-/g, ' ');
        const url = getApiUrl(`/products/category/${encodeURIComponent(categoryName)}`);

        console.log('Fetching Category with Axios:', url);
        axios.get(url)
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Category Axios error:', err.response?.data || err.message);
                setLoading(false);
            });
    }, [category]);

    return (
        <Fragment>
            <div className='min-h-screen bg-gray-50 pt-24 pb-12 transition-all duration-300'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className="mb-12">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <h1 className='text-3xl font-bold text-amazon-blue border-b-2 border-amazon-yellow pb-2 inline-block capitalize'>
                                {category.replace(/-/g, ' ')}
                            </h1>
                            <Link to="/" className="text-amazon-blue hover:text-amazon-yellow font-bold flex items-center transition-colors">
                                <i className="fa fa-arrow-left mr-2"></i> Browse All Categories
                            </Link>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amazon-yellow"></div>
                            </div>
                        ) : (
                            <section id="products" className="py-4">
                                <div className="flex flex-wrap -mx-4">
                                    {products.length > 0 ? (
                                        products.map(product => (
                                            <ProductCard key={product._id} product={product} />
                                        ))
                                    ) : (
                                        <div className="w-full text-center py-20 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
                                            <i className="fa fa-search text-5xl mb-4 text-gray-200"></i>
                                            <p className="text-xl font-medium">No products found in this category.</p>
                                            <p className="text-sm mt-2">Check back later or explore other categories.</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
