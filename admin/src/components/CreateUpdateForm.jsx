import { useState, useEffect } from "react";
import { api } from "../api/http-client";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { PhotoIcon } from "@heroicons/react/24/outline";

export default function CreateUpdateForm({ type }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [product, setProduct] = useState({});
  const [previewImage, setPreviewImage] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchProduct = async () => {
    try {
      const { data } = await api({
        method: "GET",
        url: `/products/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });

      setProduct(data);
    } catch (err) {
      console.log(err);
    }
  };

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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (type === "Update") {
      fetchProduct();
    }
  }, []);

  useEffect(() => {
    if (product.name) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
      setImgUrl(product.imgUrl);
      setCategoryId(product.categoryId);
    }
  }, [product]);

  useEffect(() => {
    if (imgUrl) {
      setPreviewImage(imgUrl);
    }
  }, [imgUrl]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        description,
        price: parseInt(price),
        stock: stock === "" ? null : parseInt(stock),
        imgUrl,
        categoryId: parseInt(categoryId),
      };

      if (type === "Add") {
        await api.post("/products", payload, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        Swal.fire({
          title: "Success",
          text: "Product has been added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else if (type === "Update") {
        await api.put(`/products/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });
        Swal.fire({
          title: "Success",
          text: "Product has been updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      navigate("/");
    } catch (error) {
      console.log(error.response.data.message);

      Swal.fire({
        title: "Error!",
        text: `${error.response.data.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 bg-gradient-to-r from-blue-600 to-blue-700">
            <h2 className="text-2xl font-bold text-white">
              {type === "Add" ? "Tambah Produk Baru" : "Edit Produk"}
            </h2>
            <p className="mt-2 text-blue-100">
              {type === "Add"
                ? "Tambahkan produk baru ke katalog"
                : "Perbarui informasi produk yang ada"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Produk
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Masukkan nama produk"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Masukkan deskripsi produk"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Harga
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stok
                    </label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Gambar
                  </label>
                  <input
                    type="text"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="">Pilih kategori</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview Gambar
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="max-h-48 rounded-lg"
                      />
                    ) : (
                      <div className="space-y-1 text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="text-sm text-gray-600">
                          Preview akan muncul di sini
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                {type === "Add" ? "Tambah Produk" : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
