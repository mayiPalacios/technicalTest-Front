import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isOnListM, setIsOnListM] = useState(false);
  const [isOnForm, setIsOnform] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("adListToken");
    const formIsOff = localStorage.getItem("adFormToken");

    if (session) {
      setIsOnListM(true);
    } else {
      setIsOnListM(false);
    }

    if (formIsOff) {
      setIsOnform(true);
    } else {
      setIsOnform(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isOnListM,
        setIsOnListM,
        isOnForm,
        setIsOnform,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
