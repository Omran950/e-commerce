import React, { createContext, useEffect, useState } from "react";
export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storageToken = localStorage.getItem("token");
    if (storageToken != null) {
      setToken(storageToken);
    }
  }, []);

  return (
    <>
      <authContext.Provider value={{ token, setToken }}>
        {children}
      </authContext.Provider>
    </>
  );
}
