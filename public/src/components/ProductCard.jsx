import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function ProductCard({ product }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group relative">
      <div className="w-full h-[450px] bg-white rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out flex flex-col overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.imgUrl}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100" />

          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/90 text-blue-800 shadow-md backdrop-blur-sm">
              {product.Category?.name}
            </span>
          </div>

          <div className="absolute bottom-4 right-4">
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full shadow-md backdrop-blur-sm ${
                product.stock > 10
                  ? "bg-green-500/90 text-white"
                  : product.stock > 0
                  ? "bg-yellow-500/90 text-white"
                  : "bg-red-500/90 text-white"
              }`}
            >
              {product.stock > 10
                ? `${product.stock} in Stock`
                : product.stock > 0
                ? `Only ${product.stock} left`
                : "Out of Stock"}
            </span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-6 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            <Link
              to={`detail/${product.id}`}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <ShoppingCartIcon className="w-5 h-5 mr-2" />
              Detail
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
