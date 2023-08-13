import React from "react";
import { Auth } from "aws-amplify";
import { useRecoilState } from "recoil";
import { userAuthenticated } from "@/atoms";
import { useRouter } from "next/router";
const useUserManagement = () => {
  const router = useRouter();
  const [userAUth, setUserAuth] = useRecoilState(userAuthenticated);
  const checkUser = async () => {
    try {
      const result = await Auth.currentAuthenticatedUser();
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
    setUserAuth(data);
    router.push(`/auth/profiles`);
  };

  return { checkUser, userSignIn };
};

export default useUserManagement;
