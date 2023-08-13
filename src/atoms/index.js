import { atom } from "recoil";

export const userAuthenticated = atom({
  key: "userAuthenticatedValue",
  default: null,
});
