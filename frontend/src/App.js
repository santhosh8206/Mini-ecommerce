import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductDetails from './pages/ProductDetails';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';

import CategoryPage from './pages/CategoryPage';
import Checkout from './components/Checkout';

function App() {
  const [cartItems, setCartItems] = useState([])
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <div className="flex-grow">
          <ToastContainer
            theme='dark'
            position='top-center'
            toastClassName="bg-amazon-blue border border-gray-700"
          />
          <Header cartItems={cartItems} />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search' element={<Home />} />
              <Route path='/category/:category' element={<CategoryPage />} />
              <Route path='/checkout' element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
              <Route path='/product/:id' element={<ProductDetails cartItems={cartItems} setCartItems={setCartItems} />} />
              <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
