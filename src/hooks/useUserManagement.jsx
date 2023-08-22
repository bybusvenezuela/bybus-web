import React from "react";
import { Auth } from "aws-amplify";
import { useSetRecoilState } from "recoil";
import { userAuthenticated } from "@/atoms";
import { useRouter } from "next/router";
const useUserManagement = () => {
  const router = useRouter();
  const setUserAuth = useSetRecoilState(userAuthenticated);
  const checkUser = async () => {
    try {
      const result = await Auth.currentAuthenticatedUser();
      setUserAuth(result);
      // checkAttrGroups();
      console.log(result);
      router.push(`/auth/profiles`);
    } catch (error) {
      const { message } = new Error(error);
      console.error(message);
      // router.push({ pathname: `/` })
      switch (message) {
        case "The user is not authenticated":
          router.push({ pathname: `/auth/login` });
          break;
        default:
          break;
      }
    }
  };

  const userSignIn = (data) => {
    // setUserAuth(data);
    // checkAttrGroups();
    router.push(`/auth/profiles`);
  };

  const userSignOut = () => {
    setUserAuth(null);
    router.push(`/auth/login`);
  };

  const checkAttrGroups = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();

      if (
        user?.signInUserSession.accessToken.payload["cognito:groups"] ===
        undefined
      ) {
        await Auth.signOut();
        router.push({ pathname: `/auth/login` });
        alert("USUARIO NO AUTORIZADO");
        return;
      }
      const userGroups =
        user.signInUserSession.accessToken.payload["cognito:groups"];

      if (userGroups.includes("agency")) {
        router.push({ pathname: `/auth/profiles` });
      } else {
        await Auth.signOut();
        router.push({ pathname: `/auth/login` });
        alert("USUARIO NO AUTORIZADO");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return { checkUser, userSignIn, userSignOut };
};

export default useUserManagement;
