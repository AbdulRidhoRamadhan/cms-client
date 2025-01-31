import { createBrowserRouter, redirect } from "react-router-dom";
import Product from "./pages/Product";
import Login from "./pages/Login";
import MainLayout from "./pages/MainLayout";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Category from "./pages/Category";
import Register from "./pages/register";
import DataPatch from "./pages/DataPatch";
import Dashboard from "./pages/Dashboard";
import AddCategory from "./pages/AddCategory";
import UpdateCategory from "./pages/UpdateCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader() {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "",
        element: <Product />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "update/:id",
        element: <UpdateProduct />,
      },
      {
        path: "categories",
        element: <Category />,
      },
      {
        path: "add-user",
        element: <Register />,
      },
      {
        path: "upload-image/:id",
        element: <DataPatch />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "update-category/:id",
        element: <UpdateCategory />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    loader() {
      if (localStorage.access_token) {
        return redirect("/");
      }

      return null;
    },
  },
]);

export default router;
