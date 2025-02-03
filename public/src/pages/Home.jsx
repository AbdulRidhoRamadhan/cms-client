import { useState, useEffect, useMemo } from "react";
import { api } from "../api/http-client";
import ProductCard from "../components/ProductCard";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Loading from "../components/Loading";
import { debounce } from "lodash";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  async function fetchPublic() {
    try {
      setLoading(true);
      const { data } = await api({
        method: "GET",
        url: "/pub",
        params: {
          search,
          sort,
          page,
          limit: 9,
          categoryName: category,
        },
      });

      setProducts(data.products);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  const fetchCategories = async () => {
    try {
      const { data } = await api({
        method: "GET",
        url: "/pub/categories",
      });
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchPublic();
  }, [search, sort, page, category]);

  const debouncedFetch = useMemo(
    () =>
      debounce((searchTerm) => {
        setSearch(searchTerm);
      }, 500),
    []
  );

  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    e.target.value = searchTerm;
    debouncedFetch(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 pt-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Our Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of premium furniture and home decor
            items
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="relative mb-6">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              onChange={handleSearchChange}
              className="w-full bg-gray-50 pl-12 pr-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Sort By
              </label>
              <select
                className="w-full bg-gray-50 px-4 py-2 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 transition-all"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                className="w-full bg-gray-50 px-4 py-2 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 transition-all"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </>
        )}

        <div className="mt-12 flex justify-center">
          <ul className="flex space-x-2">
            <li
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-sm hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer transition-all ${
                  page === index + 1
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
                }`}
                onClick={() => setPage(index + 1)}
              >
                {index + 1}
              </li>
            ))}
            <li
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-sm hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
