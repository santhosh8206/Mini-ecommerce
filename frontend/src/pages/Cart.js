import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getApiUrl } from '../utils/api';

export default function Cart({ cartItems, setCartItems }) {
    const [complete, setComplete] = useState(false)
    function incrementQty(item) {
        if (item.product.stock === item.qty) {
            return;
        }
        const updateitems = cartItems.map((i) => {
            if (i.product._id === item.product._id) {
                i.qty++
            }
            return i;
        })
        setCartItems(updateitems)
    }
    function decrementQty(item) {
        if (item.qty > 1) {
            const updateitems = cartItems.map((i) => {
                if (i.product._id === item.product._id) {
                    i.qty--
                }
                return i;
            })
            setCartItems(updateitems)
        }
    }
    function removedItemCard(item) {
        const updateitems = cartItems.filter((i) => i.product._id !== item.product._id);
        setCartItems(updateitems)
    }

    function palceOrderHandler() {
        fetch(getApiUrl('/order'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartItems), // ✅ send array directly
        })
            .then(res => {
                if (!res.ok) throw new Error('Failed to place order');
                return res.json();
            })
            .then(data => {
                console.log("✅ Order Response:", data);
                setCartItems([]);
                setComplete(true);
                toast.success('Order placed successfully!');
            })
            .catch(err => {
                console.error("❌ Order Error:", err);
                toast.error('Failed to place order');
            });
    }


    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {cartItems.length > 0 ? (
                    <Fragment>
                        <h1 className="text-3xl font-bold text-amazon-blue mb-8">
                            Shopping Cart <span className="text-lg font-normal text-gray-500 ml-2">({cartItems.length} items)</span>
                        </h1>

                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Cart Items */}
                            <div className="lg:w-2/3 space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.product._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 group hover:shadow-md transition-shadow">
                                        <div className="w-32 h-32 flex-shrink-0 bg-white rounded-lg border border-gray-50 p-2">
                                            <img
                                                src={item.product.images[0].image}
                                                alt={item.product.name}
                                                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform"
                                            />
                                        </div>

                                        <div className="flex-grow text-center sm:text-left">
                                            <Link to={"/product/" + item.product._id} className="text-lg font-bold text-amazon-blue hover:text-amazon-yellow transition-colors line-clamp-2">
                                                {item.product.name}
                                            </Link>
                                            <p className="text-amazon-blue font-bold text-xl mt-2">&#x20B9;{item.product.price}</p>
                                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">In Stock</p>
                                        </div>

                                        <div className="flex flex-col items-center gap-4">
                                            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 shadow-inner">
                                                <button
                                                    onClick={() => decrementQty(item)}
                                                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-red-600 transition-colors font-bold"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    className="w-12 text-center bg-transparent font-bold text-amazon-blue outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                    value={item.qty}
                                                    readOnly
                                                />
                                                <button
                                                    onClick={() => incrementQty(item)}
                                                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removedItemCard(item)}
                                                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                                            >
                                                <i className="fa fa-trash"></i>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:w-1/3">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                                    <h4 className="text-xl font-bold text-amazon-blue mb-6">Order Summary</h4>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal ({cartItems.reduce((acc, item) => (acc + item.qty), 0)} units)</span>
                                            <span className="font-bold text-amazon-blue">&#x20B9;{cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Shipping</span>
                                            <span className="text-green-600 font-bold uppercase text-xs">Free</span>
                                        </div>
                                    </div>

                                    <hr className="border-gray-100 mb-6" />

                                    <div className="flex justify-between items-baseline mb-8">
                                        <span className="text-lg font-bold text-amazon-blue">Total</span>
                                        <span className="text-3xl font-extrabold text-amazon-blue">
                                            &#x20B9;{cartItems.reduce((acc, item) => (acc + item.product.price * item.qty), 0)}
                                        </span>
                                    </div>

                                    <Link
                                        to="/checkout"
                                        className="w-full bg-amazon-yellow hover:bg-yellow-500 text-amazon-blue font-bold py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center"
                                    >
                                        Proceed to Checkout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <div className="text-center py-20">
                        {!complete ? (
                            <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 inline-block">
                                <i className="fa fa-shopping-cart text-6xl text-gray-200 mb-6"></i>
                                <h2 className="text-3xl font-bold text-amazon-blue mb-4">Your Cart is Empty!</h2>
                                <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                                <Link to="/" className="inline-block bg-amazon-yellow hover:bg-primary-dark text-amazon-blue font-bold py-3 px-8 rounded-lg transition-all">
                                    Start Shopping
                                </Link>
                            </div>
                        ) : (
                            <div className="bg-white p-12 rounded-2xl shadow-sm border border-green-100 inline-block animate-fadeIn">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <i className="fa fa-check text-4xl text-green-600"></i>
                                </div>
                                <h2 className="text-3xl font-bold text-green-700 mb-4">Order Completed!</h2>
                                <p className="text-gray-600 mb-8 text-lg">Your order has been placed successfully. Thank you for shopping with us!</p>
                                <Link to="/" className="inline-block bg-amazon-blue hover:bg-amazon-lightBlue text-white font-bold py-3 px-8 rounded-lg transition-all">
                                    Continue Shopping
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
