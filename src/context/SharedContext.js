import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isOnListM, setIsOnListM] = useState(false);
  const [isOnForm, setIsOnform] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("adListToken");

    if (session) {
      setIsOnListM(true);
    } else {
      setIsOnListM(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isOnListM,
        setIsOnListM,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
