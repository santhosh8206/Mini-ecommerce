import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
    return (

        <div className="col-sm-12 col-md-6 col-lg-3 mb-4 ">
            <div className="card p-3 rounded shadow">
                <img
                    className="card-img-top mx-auto"
                    src={product.images[0].image}
                    alt={product.name}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={"/product/" + product._id} >{product.name}</Link>
                    </h5>
                    <div className='card-text '>
                        <p className="card-text mt-auto">&#x20B9;{product.price}</p>
                    </div>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                        </div>
                    </div>
                    <Link to={"/product/" + product._id} id="view_btn" className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>

    )
}
