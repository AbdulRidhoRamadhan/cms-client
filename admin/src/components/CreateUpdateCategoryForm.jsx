import { useState } from "react";
import { api } from "../api/http-client";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function CreateUpdateCategoryForm({ type }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name };

      if (type === "Add") {
        await api.post("/categories", payload, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        Swal.fire({
          title: "Berhasil!",
          text: "Kategori berhasil ditambahkan",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else if (type === "Update") {
        await api.put(`/categories/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        Swal.fire({
          title: "Berhasil!",
          text: "Kategori berhasil diperbarui",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      navigate("/categories");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Terjadi kesalahan",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 bg-gradient-to-r from-blue-600 to-blue-700">
            <h2 className="text-2xl font-bold text-white">
              {type === "Add" ? "Tambah Kategori Baru" : "Edit Kategori"}
            </h2>
            <p className="mt-2 text-blue-100">
              {type === "Add"
                ? "Tambahkan kategori baru untuk mengorganisir produk"
                : "Perbarui informasi kategori yang ada"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Kategori
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Masukkan nama kategori"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/categories")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                >
                  {type === "Add" ? "Tambah Kategori" : "Simpan Perubahan"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
