import { api } from "../api/http-client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PhotoIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

export default function DataPatch() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getImage = async () => {
    try {
      const { data } = await api.get(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setImage(data.image);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("image", file);

      try {
        await api.patch(`/products/upload/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        Swal.fire({
          title: "Berhasil!",
          text: "Gambar berhasil diunggah",
          icon: "success",
          confirmButtonText: "OK",
        });

        navigate("/");
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Terjadi kesalahan",
          icon: "error",
          confirmButtonText: "OK",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8 bg-gradient-to-r from-blue-600 to-blue-700">
            <div className="flex items-center space-x-3">
              <PhotoIcon className="w-8 h-8 text-white" />
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Upload Gambar Produk
                </h2>
                <p className="mt-2 text-blue-100">
                  Pilih file gambar untuk mengunggah foto produk
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer">
              {preview ? (
                <div className="mb-4 relative group">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-xs rounded-lg shadow-md"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <p className="text-white text-sm">
                      Klik untuk mengganti gambar
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <ArrowUpTrayIcon className="w-12 h-12 text-gray-400 mx-auto mb-4 group-hover:text-blue-500 transition-colors" />
                  <p className="text-gray-600 group-hover:text-gray-900 transition-colors">
                    Klik atau seret file gambar ke sini
                  </p>
                </div>
              )}

              <div className="relative mt-4 w-full max-w-sm">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                />
                <div className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-center">
                  <span className="text-blue-600 font-medium">Pilih File</span>
                  <span className="text-gray-600 ml-2">atau seret ke sini</span>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                Format yang didukung: JPG, PNG, GIF (Max. 2MB)
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Mengunggah...
                  </>
                ) : (
                  <>
                    <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
                    Upload Gambar
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
