import { Link } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default function TableRowCategory({ category }) {
  return (
    <tr className="hover:bg-gray-50/80 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-700 font-semibold text-lg">
              {category.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              #{category.id}
            </div>
            <div className="text-sm text-gray-500">ID Kategori</div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center">
          <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-lg font-medium">
            {category.name}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="flex items-center justify-end">
          <Link
            to={`/update-category/${category.id}`}
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 shadow-sm hover:shadow-md"
            title="Edit"
          >
            <PencilSquareIcon className="w-5 h-5 text-gray-600 hover:text-blue-600" />
          </Link>
        </div>
      </td>
    </tr>
  );
}
