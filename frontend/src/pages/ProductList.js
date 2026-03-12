import { Link } from "react-router-dom";

export default function ProductList({ mobiles }) {
  if (!Array.isArray(mobiles)) return null;

  return (
    <div className="flex flex-wrap -mx-4">
      {mobiles.map(mobile => (
        <div key={mobile._id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full flex flex-col group">
            <Link to={`/product/${mobile._id}`} className="block relative overflow-hidden h-48 flex items-center justify-center p-4">
              <img
                src={mobile.images?.[0]?.image}
                className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                alt={mobile.name}
              />
            </Link>

            <div className="p-4 flex flex-col flex-grow">
              <h6 className="text-sm font-medium text-gray-800 line-clamp-2 h-10 mb-2">
                <Link to={`/product/${mobile._id}`} className="hover:text-amazon-yellow transition-colors">{mobile.name}</Link>
              </h6>

              <div className="flex items-center mb-2">
                <div className="flex text-amazon-yellow text-sm mr-2">
                  <div className="relative">
                    <div className="text-gray-300">★★★★★</div>
                    <div className="absolute top-0 left-0 overflow-hidden text-amazon-yellow" style={{ width: `${(mobile.ratings / 5) * 100}%` }}>
                      ★★★★★
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <span className="text-xl font-bold text-amazon-blue block mb-2">₹{mobile.price}</span>
                <p className={`text-xs font-semibold ${mobile.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                  {mobile.stock > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
