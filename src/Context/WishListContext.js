import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { authContext } from "./AuthContext";
import toast from "react-hot-toast";

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const token = useContext(authContext);
  const [WishListProducts, setWishListProducts] = useState(null);
  const [wishlistCount, setwishlistCount] = useState(0);

  function getWishList() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        setWishListProducts(res.data.data);
        setwishlistCount(res.data.count);
      })
      .catch((err) => {
        setWishListProducts([]);
        setwishlistCount(0);
      });
  }

  function addProductToWishList(id) {
    
    axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          productId: id,
        },
        {
          headers: { token: localStorage.getItem("token") },
        }
      )
      .then((res) => {
        toast.success("Product Adeed Successfully To Your Wishlist", {
          duration: 1500,
          position: "top-right",
          style: { background: "#177448", color: "white" },
        });
        getWishList();
      })
      .catch((err) => {
        toast.error("Error Occurred", {
          duration: 1500,
          position: "top-right",
          style: { background: "#F8D7DA", color: "#58151C" },
        });
      });
  }
  function removeProductToWishList(id) {
    axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        toast.success("Product Removed Successfully From Your Wishlist", {
          duration: 1500,
          position: "top-right",
          style: { background: "#177448", color: "white" },
        });
        getWishList();
      })
      .catch((err) => {
        toast.error("Error Occurred", {
          duration: 1500,
          position: "top-right",
          style: { background: "#F8D7DA", color: "#58151C" },
        });
      });
  }

  useEffect(() => {
    getWishList();
  }, [token]);

  return (
    <>
      <WishListContext.Provider
        value={{
          addProductToWishList,
          removeProductToWishList,
          getWishList,
          WishListProducts,
          wishlistCount,
        }}
      >
        {children}
      </WishListContext.Provider>
    </>
  );
}
