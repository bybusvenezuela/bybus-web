import { createContext, useContext, useEffect, useState } from "react";

export const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const updateIndex = (action) => setSelectedIndex(action);
  useEffect(() => {
  }, []);

  return (
    <MenuContext.Provider
      value={{ updateIndex, selectedIndex }}
    >
      {children}
    </MenuContext.Provider>
  );
};
