import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
    return (

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full flex flex-col group">
                <div className="relative overflow-hidden h-48 flex items-center justify-center p-4">
                    <img
                        alt={product.name}
                        className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                        src={product.images[0].image}
                    />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                    <h5 className="text-sm font-medium text-gray-800 line-clamp-2 h-10 mb-2">
                        <Link to={"/product/" + product._id} className="hover:text-amazon-yellow transition-colors">{product.name}</Link>
                    </h5>

                    <div className="flex items-center mb-2">
                        <div className="flex text-amazon-yellow text-sm mr-2">
                            <div className="relative">
                                <div className="text-gray-300">★★★★★</div>
                                <div className="absolute top-0 left-0 overflow-hidden text-amazon-yellow" style={{ width: `${product.ratings / 5 * 100}%` }}>
                                    ★★★★★
                                </div>
                            </div>
                        </div>
                        <span className="text-xs text-gray-400">({product.numOfReviews})</span>
                    </div>

                    <p className="text-xl font-bold text-amazon-blue mt-auto mb-4">&#x20B9;{product.price}</p>

                    <Link
                        to={"/product/" + product._id}
                        className="block text-center bg-amazon-yellow hover:bg-primary-dark text-amazon-blue font-bold py-2 px-4 rounded transition-colors text-sm"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>

    )
}
