import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getApiUrl } from '../utils/api';

export default function Checkout({ cartItems, setCartItems }) {
    const navigate = useNavigate();
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        address: '',
        phone: ''
    });

    const totalAmount = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);

    const handleInputChange = (e) => {
        setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
    };

    const handlePayment = async () => {
        if (!customerDetails.name || !customerDetails.address || !customerDetails.phone) {
            toast.error("Please fill in all details");
            return;
        }

        // Razorpay integration
        const options = {
            key: "rzp_test_YOUR_KEY_HERE", // Hardcoded for demo as per plan
            amount: totalAmount * 100,
            currency: "INR",
            name: "Mini Ecommerce Store",
            description: "Order Payment",
            handler: async function (response) {
                // Success path
                try {
                    const orderData = {
                        customerName: customerDetails.name,
                        products: cartItems.map(item => ({
                            productId: item.product._id,
                            quantity: item.qty
                        })),
                        totalAmount: totalAmount,
                        paymentStatus: 'Paid'
                    };

                    const res = await fetch(getApiUrl('/order'), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(orderData)
                    });

                    if (res.ok) {
                        toast.success("Payment Successful & Order Placed!");
                        setCartItems([]);
                        navigate('/');
                    }
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to save order");
                }
            },
            prefill: {
                name: customerDetails.name,
                contact: customerDetails.phone
            },
            theme: {
                color: "#232f3e"
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-amazon-blue p-8 text-white">
                        <h2 className="text-2xl font-bold">Checkout Details</h2>
                        <p className="text-gray-400 text-sm mt-1">Complete your order by providing shipping information.</p>
                    </div>

                    <div className="p-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={customerDetails.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amazon-yellow focus:border-transparent transition-all outline-none"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Shipping Address</label>
                                <textarea
                                    name="address"
                                    value={customerDetails.address}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amazon-yellow focus:border-transparent transition-all outline-none"
                                    placeholder="House No, Street, City, State, ZIP"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={customerDetails.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amazon-yellow focus:border-transparent transition-all outline-none"
                                    placeholder="+91 9876543210"
                                />
                            </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600 font-medium">Total Amount</span>
                                <span className="text-3xl font-extrabold text-amazon-blue">₹{totalAmount.toLocaleString()}</span>
                            </div>
                            <button
                                onClick={handlePayment}
                                className="w-full bg-amazon-yellow hover:bg-yellow-500 text-amazon-blue font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all duration-200"
                            >
                                Pay Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
