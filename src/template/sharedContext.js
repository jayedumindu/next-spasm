import React, { createContext, useContext, useState } from "react";

const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  return (
    <SharedStateContext.Provider
      value={{ isUserLogged: true, setIsUserLogged }}
    >
      {children}
    </SharedStateContext.Provider>
  );
};

export const useSharedState = () => useContext(SharedStateContext);
