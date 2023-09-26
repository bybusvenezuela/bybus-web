import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);
const cookies = new Cookies();

function setToken(accessToken) {
  setStorageToken(accessToken);
  setCookieToken(accessToken);
}

export const UserProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null);
  const [profileAuth, setProfileAuth] = useState(null);

  function setStorageTokenProfile(data) {
    localStorage.setItem("profile", JSON.stringify(data));
  }
  function setStorageTokenUser(data) {
    localStorage.setItem("user", JSON.stringify(data));
  }

  function setCookieTokenProfile(data) {
    cookies.set("profile", data, { path: "/" });
  }

  function setCookieTokenUser(accessToken) {
    cookies.set("user", accessToken, { path: "/" });
  }

  function setTokenProfile(data) {
    setProfileAuth(data);
    setStorageTokenProfile(data);
    setCookieTokenProfile(data);
  }

  function setTokenUser(data) {
    setUserAuth(data);
    setStorageTokenUser(data);
    setCookieTokenUser(data);
  }
  useEffect(() => {
    if (cookies.get("profile")) setTokenProfile(cookies.get("profile"));
    if (cookies.get("user")) setTokenUser(cookies.get("user"));
  }, []);

  return (
    <UserContext.Provider
      value={{
        userAuth,
        setUserAuth,
        profileAuth,
        setProfileAuth,
        setTokenProfile,
        setTokenUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
