import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AuthContextProvider from "./Context/AuthContext";
import CartContextProvider from "./Context/CartContext";
import Layout from "./Components/Layout/Layout";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Categories from "./Components/Categories/Categories";
import Cart from "./Components/Cart/Cart";
import Brands from "./Components/Brands/Brands";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import Products from "./Components/Products/Products";
import { Toaster } from "react-hot-toast";
import Payment from "./Components/Payment/Payment";
import ProductSearchByBrand from "./Components/ProductSearchByBrand/ProductSearchByBrand";
import ProductSearchByCategory from "./Components/ProductSearchByCategory/ProductSearchByCategory";
import AllOrders from "./Components/AllOrders/AllOrders";
import WishList from "./Components/WishList/WishList";
import WishListContextProvider from "./Context/WishListContext";

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "Categories", element: <Categories /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "allOrders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ),
      },
      {
        path: "Productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      { path: "brands", element: <Brands /> },
      { path: "ProductSearchByBrand/:id", element: <ProductSearchByBrand /> },
      {
        path: "productSearchByCategory/:id",
        element: <ProductSearchByCategory />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  const myClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={myClient}>
        <AuthContextProvider>
          <CartContextProvider>
          <WishListContextProvider>
            <RouterProvider router={myRouter} />
          </WishListContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
      <Toaster />
    </>
  );
}
