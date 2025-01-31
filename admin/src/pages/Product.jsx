import { useState, useEffect, useMemo } from "react";
import { api } from "../api/http-client";
import TableRowProduct from "../components/TableRowProduct";
import { Link } from "react-router-dom";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { Card } from "@tremor/react";
import { debounce } from "lodash";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchProducts = async () => {
    try {
      const { data } = await api({
        method: "GET",
        url: "/products",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetch = useMemo(
    () =>
      debounce((searchTerm) => {
        setSearch(searchTerm);
      }, 500),
    []
  );

  useEffect(() => {
    fetchProducts();
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    e.target.value = searchTerm;
    debouncedFetch(searchTerm);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.Category.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "low_stock" && product.stock < 10) ||
      (filter === "out_stock" && product.stock === 0);
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manajemen Produk
            </h1>
            <p className="mt-2 text-gray-600">
              Total {filteredProducts.length} produk ditemukan
            </p>
          </div>
          <Link
            to="/add-product"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Tambah Produk Baru
          </Link>
        </div>

        <Card className="rounded-xl border-0 shadow-xl">
          <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 border-b border-gray-100">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Cari produk..."
                className="pl-10 pr-4 py-2.5 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                onChange={handleSearchChange}
              />
            </div>

            <select
              className="py-2.5 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Semua Produk</option>
              <option value="low_stock">Stok Menipis ({"<10"})</option>
              <option value="out_stock">Stok Habis</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50 hidden sm:table-header-group">
                <tr>
                  {[
                    "Produk",
                    "Deskripsi",
                    "Harga",
                    "Stok",
                    "Dibuat Oleh",
                    "Aksi",
                  ].map((header, idx) => (
                    <th
                      key={idx}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <TableRowProduct
                    key={product.id}
                    product={product}
                    fetchProducts={fetchProducts}
                  />
                ))}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div className="p-12 text-center">
                <div className="inline-flex flex-col items-center max-w-md">
                  <PhotoIcon className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Tidak ada produk ditemukan
                  </h3>
                  <p className="text-gray-600">
                    Coba ubah pencarian atau filter yang digunakan
                  </p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
