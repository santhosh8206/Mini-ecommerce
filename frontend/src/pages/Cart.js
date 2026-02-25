import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Cart({cartItems , setCartItems}) {
    const[complete,setComplete]=useState(false)
    function incrementQty(item){
        if (item.product.stock === item.qty) {
            return;
        }
        const updateitems=cartItems.map((i) => {
            if (i.product._id === item.product._id) {
                i.qty++
            }
            return i ;
        })
        setCartItems(updateitems)
    }
    function decrementQty(item) {
        if (item.qty > 1) {
            const updateitems=cartItems.map((i) => {
              if (i.product._id === item.product._id) {
                  i.qty--
              }
              return i ;
          })
          setCartItems(updateitems)
        }
    }
    function removedItemCard(item){
          const updateitems = cartItems.filter((i) => i.product._id !== item.product._id);
          setCartItems(updateitems)
    }

   function palceOrderHandler() {
    fetch(process.env.REACT_APP_API_URL+'/order', {
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
 cartItems.length > 0 ?<Fragment>
    <div className="container container-fluid">
        <h2 className="mt-5 text-center">Your Cart: <b>{cartItems.length}</b></h2>
        
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
               {cartItems.map((item) => (
    <Fragment key={item.product._id}>
        <hr />
        <div className="cart-item">
            <div className="row">
                <div className="col-4 col-lg-3">
                    <img
                        src={item.product.images[0].image}
                        alt={item.product.name}
                        height="90"
                        width="115"
                    />
                </div>

                <div className="col-5 col-lg-3">
                    <Link to={"/product/" + item.product._id}>
                        {item.product.name}
                    </Link>
                </div>

                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p id="card_item_price">${item.product.price}</p>
                </div>

                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <div className="stockCounter d-inline">
                        <span className="btn btn-danger minus" onClick={()=>decrementQty(item)}>-</span>
                        <input
                            type="number"
                            className="form-control count d-inline"
                            value={item.qty}
                            readOnly
                        />
                        <span className="btn btn-primary plus" onClick={()=> incrementQty(item)}>+</span>
                    </div>
                </div>

                <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                    <i
                        id="delete_cart_item"
                        onClick={()=>removedItemCard(item)}
                        className="fa fa-trash btn btn-danger"
                    ></i>
                </div>
            </div>
        </div>
    </Fragment>
))}

            </div>

            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc,item)=> (acc +item.qty), 0)}(units)</span></p>
                    <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc,item)=> (acc +item.product.price *item.qty), 0)}</span></p>
    
                    <hr />
                    <button id="checkout_btn" onClick={palceOrderHandler} className="btn btn-primary btn-block">Place Order</button>
                </div>
            </div>
        </div>
    </div>
</Fragment > : (!complete ? <h2 className='mt-5 text-center'>your Cart is Empty!</h2> :<Fragment><h2 className='mt-5 text-center'>Order Completed</h2><p>Your Order has Been Placed Successfully</p></Fragment>)

  )
}
