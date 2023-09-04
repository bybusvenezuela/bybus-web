import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
const useUserManagement = () => {
  const { userAuth, setUserAuth } = useUser();
  const router = useRouter();

  const checkUser = async () => {
    try {
      const result = await Auth.currentAuthenticatedUser();
      setUserAuth(result);
      console.log("confirmo");
      checkAttrGroups();
    } catch (error) {
      setUserAuth(null);
      const { message } = new Error(error);
      console.error(message);
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
    const isSignIn = true;
    checkAttrGroups(isSignIn);
    router.push(`/auth/profiles`);
  };

  const userSignOut = () => {
    setUserAuth(null);
    router.push(`/auth/login`);
  };

  const checkAttrGroups = async (isSignIn) => {
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
        console.log("SI ES AGENCIA");
        if (isSignIn) router.push({ pathname: `/auth/profiles` });
      } else {
        await Auth.signOut();
        router.push({ pathname: `/auth/login` });
        alert("USUARIO NO AUTORIZADO");
      }
    } catch (error) {
      console.error("Error: ", error);
      await Auth.signOut();
      router.push({ pathname: `/auth/login` });
    }
  };

  return { checkUser, userSignIn, userSignOut };
};

export default useUserManagement;
