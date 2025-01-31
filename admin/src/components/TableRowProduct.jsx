import { Link } from "react-router-dom";
import { api } from "../api/http-client";
import Swal from "sweetalert2";
import {
  PencilSquareIcon,
  TrashIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

export default function TableRowProduct({ product, fetchProducts }) {
  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  async function handleDelete() {
    const result = await Swal.fire({
      title: "Hapus Produk?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await api({
          method: "DELETE",
          url: `/products/${product.id}`,
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        });

        Swal.fire("Terhapus!", "Produk berhasil dihapus.", "success");
        fetchProducts();
      } catch (error) {
        console.log(error.response.data.message);
        Swal.fire("Error!", `${error.response.data.message}`, "error");
      }
    }
  }

  return (
    <tr className="hover:bg-gray-50/80 transition-colors group block sm:table-row">
      <td className="px-4 py-4 sm:px-6 block sm:table-cell">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="relative h-20 w-20 sm:h-14 sm:w-14 flex-shrink-0">
            <img
              src={product.imgUrl}
              alt={product.name}
              className="h-full w-full rounded-xl object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/5" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-gray-900 text-lg sm:text-base">
              {product.name}
            </div>
            <div className="mt-1 text-sm text-gray-500 flex items-center">
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-md">
                {product.Category.name}
              </span>
            </div>
          </div>
        </div>
      </td>

      <td className="px-4 py-2 sm:px-6 sm:py-4 block sm:table-cell">
        <div className="text-sm text-gray-900 sm:hidden font-medium mb-1">
          Deskripsi:
        </div>
        <div className="text-sm text-gray-600 line-clamp-2 hover:line-clamp-none transition-all">
          {product.description}
        </div>
      </td>

      <td className="px-4 py-2 sm:px-6 sm:py-4 block sm:table-cell">
        <div className="text-sm text-gray-900 sm:hidden font-medium mb-1">
          Harga:
        </div>
        <div className="text-sm font-semibold text-blue-600">
          {formatToRupiah(product.price)}
        </div>
      </td>

      <td className="px-4 py-2 sm:px-6 sm:py-4 block sm:table-cell">
        <div className="text-sm text-gray-900 sm:hidden font-medium mb-1">
          Stok:
        </div>
        <div className="flex items-center">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              product.stock > 10
                ? "bg-green-100/80 text-green-700"
                : product.stock > 0
                ? "bg-amber-100/80 text-amber-700"
                : "bg-red-100/80 text-red-700"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                product.stock > 10
                  ? "bg-green-500"
                  : product.stock > 0
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
            />
            <span className="flex items-center">
              {product.stock}
              <span className="ml-1">Unit</span>
            </span>
          </span>
        </div>
      </td>

      <td className="px-4 py-2 sm:px-6 sm:py-4 block sm:table-cell">
        <div className="text-sm text-gray-900 sm:hidden font-medium mb-1">
          Created By:
        </div>
        <div className="flex items-center">
          <span className="inline-block w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-700">
            {product.User.username.charAt(0).toUpperCase()}
          </span>
          <span className="ml-3 text-sm text-gray-600">
            {product.User.username}
          </span>
        </div>
      </td>

      <td className="px-4 py-4 sm:px-6 block sm:table-cell">
        <div className="flex items-center justify-end space-x-2">
          <Link
            to={`/update/${product.id}`}
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            title="Edit"
          >
            <PencilSquareIcon className="w-5 h-5 text-gray-600 hover:text-blue-600" />
          </Link>

          <button
            onClick={handleDelete}
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            title="Hapus"
          >
            <TrashIcon className="w-5 h-5 text-gray-600 hover:text-red-600" />
          </button>

          <Link
            to={`/upload-image/${product.id}`}
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            title="Upload Gambar"
          >
            <PhotoIcon className="w-5 h-5 text-gray-600 hover:text-purple-600" />
          </Link>
        </div>
      </td>
    </tr>
  );
}
