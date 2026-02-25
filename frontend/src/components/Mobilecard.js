import React from 'react'
import { Link } from 'react-router-dom'

function Mobilecard({mobile}) {
  return (
   <div  className="col-sm-12 col-md-6 col-lg-3 mb-4 ">
                <div className="card p-3 rounded shadow">
                    <img
                        className="card-img-top mx-auto"
                        src={mobile.images[0].image}
                    />
                    <div className="card-body d-flex flex-column">
                        <h5 className="card-title">
                            <Link to={"/mobiles/"+mobile._id} >{mobile.name}</Link>
                        </h5>
                        <div className='card-text '>
                            <p className="card-text mt-auto">&#x20B9;{mobile.price}</p> 
                        </div>
                        <div className="ratings mt-auto">
                            <div className="rating-outer">
                                <div className="rating-inner"style={{width :`${mobile.ratings/5 *100}%`}}></div>
                            </div>
                        </div>
                        <Link to={"/mobiles/"+mobile._id} id="view_btn" className="btn btn-block">View Details</Link>
                    </div>
                </div>
            </div>
  )
}

export default Mobilecard
