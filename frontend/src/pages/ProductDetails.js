import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getApiUrl } from "../utils/api";
import axios from 'axios';


export default function ProductDetails({ cartItems, setCartItems }) {
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;

        axios.get(getApiUrl('/product/') + id)
            .then(res => setProduct(res.data))
            .catch(err => console.error('Product Details Axios error:', err.message));
    }, [id]);

    function addToCart() {
        const itemExist = cartItems.find((item) => item.product._id === product._id)
        if (!itemExist) {
            const newItem = { product, qty };
            setCartItems((state) => [...state, newItem]);
            toast.success("Cart item added successfully")
        }
    }
    function increment() {
        if (product.stock === qty) {
            return;
        }
        setQty((state) => state + 1)
    }
    function decrement() {
        if (qty > 1) {

            setQty((state) => state - 1)
        }
    }
    return (
        product && (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                        <div className="flex flex-col lg:flex-row p-6 md:p-12 gap-12">
                            {/* Product Image */}
                            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white rounded-xl border border-gray-100 p-4">
                                <img
                                    src={product.image || product.images?.[0]?.image || '/images/placeholder.jpg'}
                                    alt={product.name}
                                    className="max-h-[500px] object-contain transform hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="w-full lg:w-1/2">
                                <h1 className="text-3xl font-bold text-amazon-blue mb-4">{product.name}</h1>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center">
                                        <div className="relative text-amazon-yellow text-xl tracking-wider">
                                            <div className="text-gray-300">★★★★★</div>
                                            <div className="absolute top-0 left-0 overflow-hidden text-amazon-yellow" style={{ width: `${product.ratings / 5 * 100}%` }}>
                                                ★★★★★
                                            </div>
                                        </div>
                                        <span className="ml-2 text-sm text-gray-500 font-medium">({product.numOfReviews} Reviews)</span>
                                    </div>
                                    <div className="h-4 w-px bg-gray-300"></div>
                                    <p className="text-sm text-gray-500">
                                        ID: <span className="font-mono">{product._id.substring(0, 8)}...</span>
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-4xl font-extrabold text-amazon-blue">&#x20B9;{product.price}</span>
                                        <span className="text-gray-500 line-through text-lg">&#x20B9;{Math.round(product.price * 1.25)}</span>
                                        <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-sm font-bold ml-2">-25%</span>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                                            <button
                                                onClick={decrement}
                                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-amazon-blue font-bold transition-colors disabled:opacity-50"
                                                disabled={qty <= 1}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                className="w-16 text-center font-bold text-amazon-blue outline-none border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                value={qty}
                                                readOnly
                                            />
                                            <button
                                                onClick={increment}
                                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-amazon-blue font-bold transition-colors disabled:opacity-50"
                                                disabled={qty >= product.stock}
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={addToCart}
                                            disabled={product.stock === 0}
                                            className="flex-grow bg-amazon-yellow hover:bg-primary-dark text-amazon-blue font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:ring-4 focus:ring-yellow-200 disabled:opacity-50 disabled:transform-none"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="flex items-center gap-2 font-medium">
                                        Status:
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </p>

                                    <div className="space-y-2">
                                        <h4 className="text-lg font-bold text-amazon-blue uppercase tracking-wider text-sm">Description</h4>
                                        <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <p className="text-gray-500 text-sm italic">
                                            Sold by: <span className="text-amazon-blue font-bold not-italic">{product.seller}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
