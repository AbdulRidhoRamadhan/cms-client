import { useState, useEffect } from "react";
import { api } from "../api/http-client";
import { Card, Title, Text, Metric, Flex, ProgressBar } from "@tremor/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import {
  CubeIcon,
  TagIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PieController,
  ArcElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get("/products", {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }),
        api.get("/categories", {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
          },
        }),
      ]);

      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const lowStockItems = products.filter((product) => product.stock < 10);
  const totalValue = products.reduce(
    (acc, product) => acc + product.price * product.stock,
    0
  );

  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  const stockData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: "Stok Produk",
        data: products.map((product) => product.stock),
        backgroundColor: "rgba(59, 130, 246, 0.8)",
        borderColor: "#2563EB",
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const categoryData = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        data: categories.map(
          (category) =>
            products.filter((product) => product.categoryId === category.id)
              .length
        ),
        backgroundColor: [
          "rgba(244, 63, 94, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(59, 130, 246, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(255, 146, 60, 0.8)",
          "rgba(255, 215, 0, 0.8)",
          "rgba(255, 165, 0, 0.8)",
          "rgba(255, 69, 0, 0.8)",
          "rgba(128, 0, 128, 0.8)",
          "rgba(0, 128, 128, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen space-y-6">
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-white">
            Dashboard Inventaris
          </h1>
          <p className="text-blue-100 mt-2">
            Analisis data inventaris secara real-time
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="!bg-blue-50 hover:shadow-lg transition-shadow">
          <Flex className="space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <CubeIcon className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <Text className="text-gray-600">Total Produk</Text>
              <Metric className="text-gray-900">{products.length}</Metric>
            </div>
          </Flex>
        </Card>

        <Card className="!bg-green-50 hover:shadow-lg transition-shadow">
          <Flex className="space-x-4">
            <div className="bg-green-100 p-3 rounded-lg">
              <TagIcon className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <Text className="text-gray-600">Kategori</Text>
              <Metric className="text-gray-900">{categories.length}</Metric>
            </div>
          </Flex>
        </Card>

        <Card className="!bg-red-50 hover:shadow-lg transition-shadow">
          <Flex className="space-x-4">
            <div className="bg-red-100 p-3 rounded-lg">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <Text className="text-gray-600">Stok Menipis</Text>
              <Metric className="text-gray-900">{lowStockItems.length}</Metric>
            </div>
          </Flex>
        </Card>

        <Card className="!bg-purple-50 hover:shadow-lg transition-shadow">
          <Flex className="space-x-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <CurrencyDollarIcon className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <Text className="text-gray-600">Total Nilai</Text>
              <Metric className="text-gray-900">
                {formatToRupiah(totalValue)}
              </Metric>
            </div>
          </Flex>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4 hover:shadow-lg transition-shadow">
          <Title className="mb-4 text-lg font-semibold">
            Level Stok per Produk
          </Title>
          <div className="h-80">
            <Bar
              data={stockData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    grid: {
                      color: "#e5e7eb",
                    },
                    ticks: {
                      color: "#6b7280",
                    },
                  },
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      color: "#6b7280",
                    },
                  },
                },
              }}
            />
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-shadow">
          <Title className="mb-4 text-lg font-semibold">
            Distribusi Produk per Kategori
          </Title>
          <div className="h-80">
            <Pie
              data={categoryData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "right",
                  },
                },
              }}
            />
          </div>
        </Card>

        <Card className="p-4 col-span-1 lg:col-span-2 hover:shadow-lg transition-shadow">
          <Title className="mb-4 text-lg font-semibold">
            Produk dengan Stok Menipis
          </Title>
          <div className="space-y-4">
            {lowStockItems.map((product) => (
              <div
                key={product.id}
                className="p-4 bg-red-50 rounded-lg border border-red-100"
              >
                <Flex justifyContent="between" alignItems="center">
                  <div>
                    <Text className="font-medium">{product.name}</Text>
                    <Text className="text-red-600">
                      Stok: {product.stock} unit
                    </Text>
                  </div>
                  <Text className="font-medium">
                    {formatToRupiah(product.price)}
                  </Text>
                </Flex>
                <ProgressBar
                  value={(product.stock / 10) * 100}
                  color="red"
                  className="mt-2"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
