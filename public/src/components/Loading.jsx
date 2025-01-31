import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <ArrowPathIcon className="w-12 h-12 text-blue-500 animate-spin" />
      <h2 className="mt-4 text-xl font-medium text-gray-700">Loading...</h2>
    </div>
  );
}
