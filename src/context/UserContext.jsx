import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null);
  const [profileAuth, setProfileAuth] = useState(null);
  // useEffect(() => {}, []);

  return (
    <UserContext.Provider
      value={{ userAuth, setUserAuth, profileAuth, setProfileAuth }}
    >
      {children}
    </UserContext.Provider>
  );
};
