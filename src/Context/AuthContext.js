import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setuserData] = useState(null);
  const [userId, setuserId] = useState(null);
  useEffect(() => {
    const storageToken = localStorage.getItem("token");
    if (storageToken != null) {
      setToken(storageToken);
      getUserData();
    }
  }, []);

  function getUserData() {
    const userData = jwtDecode(localStorage.getItem("token"));
    setuserData(userData);
    setuserId(userData.id);
  }
  return (
    <>
      <authContext.Provider
        value={{ token, setToken, getUserData, userData, userId }}
      >
        {children}
      </authContext.Provider>
    </>
  );
}
