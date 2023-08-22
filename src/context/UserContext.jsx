import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const updateUser = (action) => setUser(action);
  useEffect(() => {
  }, []);

  return (
    <UserContext.Provider
      value={{ updateUser, user }}
    >
      {children}
    </UserContext.Provider>
  );
};
