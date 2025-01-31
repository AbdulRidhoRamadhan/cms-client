import { api } from "../api/http-client";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeftIcon, TagIcon } from "@heroicons/react/24/outline";
import Loading from "../components/Loading";

export default function Detail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const fetchPublic = async () => {
    try {
      setLoading(true);
      const { data } = await api({
        method: "GET",
        url: `/pub/${id}`,
      });
      setProduct(data.productById);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublic();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <Link
          to="/"
          className="inline-flex items-center mb-8 px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors group"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>

        {loading ? (
          <Loading />
        ) : (
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-[400px] md:h-[600px] group">
                <img
                  src={product.imgUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-4 right-4">
                  <span
                    className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-lg backdrop-blur-sm ${
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

              <div className="p-8 lg:p-12 flex flex-col">
                <div className="flex items-center space-x-2 mb-6">
                  <TagIcon className="w-5 h-5 text-blue-600" />
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {product.Category?.name}
                  </span>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {product.name}
                </h1>

                <div className="mb-8">
                  <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {formatPrice(product.price)}
                  </span>
                </div>

                <div className="prose prose-lg prose-blue max-w-none flex-grow">
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm text-gray-500">Stock Status:</span>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          product.stock > 10
                            ? "bg-green-500"
                            : product.stock > 0
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${Math.min(
                            (product.stock / 20) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
