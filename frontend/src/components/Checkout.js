import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getApiUrl } from '../utils/api';
import axios from 'axios';

export default function Checkout({ cartItems, setCartItems }) {
    const navigate = useNavigate();
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        address: '',
        phone: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('UPI'); // Default to UPI
    const [loading, setLoading] = useState(false);

    const totalAmount = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);

    const handleInputChange = (e) => {
        setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
    };

    const placeOrder = async (method) => {
        if (!customerDetails.name || !customerDetails.address || !customerDetails.phone) {
            toast.error("Please fill in all details");
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                customerName: customerDetails.name,
                shippingAddress: customerDetails.address,
                products: cartItems.map(item => ({
                    productId: item.product._id,
                    quantity: item.qty
                })),
                totalAmount: totalAmount,
                paymentMethod: method,
                paymentStatus: method === 'COD' ? 'Pending' : 'Paid'
            };

            const res = await axios.post(getApiUrl('/order'), orderData);

            if (res.status === 200 || res.status === 201) {
                toast.success(`Order placed successfully via ${method}!`);
                setCartItems([]);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    const handleCheckout = () => {
        if (paymentMethod === 'UPI') {
            // Simplified UPI flow (direct to success for demo)
            placeOrder('UPI');
        } else {
            // COD flow
            placeOrder('COD');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-amazon-blue p-8 text-white">
                        <h2 className="text-2xl font-bold">Checkout & Payment</h2>
                        <p className="text-gray-400 text-sm mt-1">Provide shipping details and select payment method.</p>
                    </div>

                    <div className="p-8">
                        <section className="mb-10">
                            <h3 className="text-lg font-bold text-amazon-blue mb-4 border-b-2 border-gray-100 pb-2">Shipping Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={customerDetails.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amazon-yellow focus:border-transparent outline-none"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Shipping Address</label>
                                    <textarea
                                        name="address"
                                        value={customerDetails.address}
                                        onChange={handleInputChange}
                                        rows="2"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amazon-yellow focus:border-transparent outline-none"
                                        placeholder="House No, Street, City, ZIP"
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={customerDetails.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amazon-yellow focus:border-transparent outline-none"
                                        placeholder="+91 9876543210"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="mb-10">
                            <h3 className="text-lg font-bold text-amazon-blue mb-4 border-b-2 border-gray-100 pb-2">Select Payment Method</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'UPI' ? 'border-amazon-yellow bg-yellow-50' : 'border-gray-100 hover:border-gray-200'}`}>
                                    <div className="flex items-center">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${paymentMethod === 'UPI' ? 'border-amazon-yellow' : 'border-gray-300'}`}>
                                            {paymentMethod === 'UPI' && <div className="w-2.5 h-2.5 rounded-full bg-amazon-yellow"></div>}
                                        </div>
                                        <div>
                                            <p className="font-bold text-amazon-blue">UPI Payment</p>
                                            <p className="text-xs text-gray-500">GPay, PhonePe, Paytm</p>
                                        </div>
                                    </div>
                                    <i className="fa fa-qrcode text-amazon-blue text-xl"></i>
                                    <input type="radio" className="hidden" name="payment" value="UPI" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} />
                                </label>

                                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-amazon-yellow bg-yellow-50' : 'border-gray-100 hover:border-gray-200'}`}>
                                    <div className="flex items-center">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${paymentMethod === 'COD' ? 'border-amazon-yellow' : 'border-gray-300'}`}>
                                            {paymentMethod === 'COD' && <div className="w-2.5 h-2.5 rounded-full bg-amazon-yellow"></div>}
                                        </div>
                                        <div>
                                            <p className="font-bold text-amazon-blue">Cash on Delivery</p>
                                            <p className="text-xs text-gray-500">Pay when you receive</p>
                                        </div>
                                    </div>
                                    <i className="fa fa-money-bill-wave text-amazon-blue text-xl"></i>
                                    <input type="radio" className="hidden" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                                </label>
                            </div>
                        </section>

                        <div className="pt-8 border-t border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-gray-600 font-medium">Order Total</span>
                                <span className="text-3xl font-extrabold text-amazon-blue">₹{totalAmount.toLocaleString()}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className={`w-full bg-amazon-yellow hover:bg-yellow-500 text-amazon-blue font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all duration-200 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-amazon-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing Order...
                                    </span>
                                ) : (
                                    paymentMethod === 'UPI' ? 'Verify & Pay with UPI' : 'Confirm Order (COD)'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
