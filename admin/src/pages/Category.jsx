import { useState, useEffect } from "react";
import { api } from "../api/http-client";
import TableRowCategory from "../components/TableRowCategory";
import { Link } from "react-router-dom";
import { PlusIcon, TagIcon } from "@heroicons/react/24/outline";
import { Card } from "@tremor/react";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const { data } = await api({
        method: "GET",
        url: "/categories",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCategories(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manajemen Kategori
            </h1>
            <p className="mt-2 text-gray-600">
              Total {categories.length} kategori tersedia
            </p>
          </div>
          <Link
            to="/add-category"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Tambah Kategori
          </Link>
        </div>

        <Card className="rounded-xl border-0 shadow-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Nama Kategori
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {categories.map((category) => (
                  <TableRowCategory
                    key={category.id}
                    category={category}
                    fetchCategories={fetchCategories}
                  />
                ))}
              </tbody>
            </table>

            {categories.length === 0 && (
              <div className="p-12 text-center">
                <div className="inline-flex flex-col items-center max-w-md">
                  <TagIcon className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Belum ada kategori
                  </h3>
                  <p className="text-gray-600">
                    Mulai dengan menambahkan kategori baru
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
