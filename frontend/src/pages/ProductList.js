import { Link } from "react-router-dom";

export default function ProductList({ mobiles }) {
  if (!Array.isArray(mobiles)) return null;

  return (
    <div className="container mt-4">
      <div className="row g-3">
        {mobiles.map(mobile => (
          <div key={mobile._id} className="col-6 col-md-4 col-lg-3">
            <div className="card h-100 product-card">
              
              <Link to={`/product/${mobile._id}`} className="text-decoration-none text-dark">
                <img
                  src={mobile.images?.[0]?.image}
                  className="card-img-top product-image"
                  alt={mobile.name}
                />
              </Link>

              <div className="card-body p-2">
                <h6 className="product-title">
                  {mobile.name}
                </h6>

                {/* Rating */}
                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(mobile.ratings / 5) * 100}%` }}
                  ></div>
                </div>

                {/* Price */}
                <div className="mt-2">
                  <span className="fw-bold fs-5">₹{mobile.price}</span>
                </div>

                {/* Stock */}
                <small className={mobile.stock > 0 ? "text-success" : "text-danger"}>
                  {mobile.stock > 0 ? "In stock" : "Out of stock"}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
