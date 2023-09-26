import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
const useUserManagement = () => {
  const { setTokenUser } = useUser();
  const router = useRouter();

  const checkUser = async () => {
    try {
      const result = await Auth.currentAuthenticatedUser();
      setTokenUser(result);
      checkAttrGroups();
    } catch (error) {
      setTokenUser(null);
      const { message } = new Error(error);
      switch (message) {
        case "The user is not authenticated":
          router.push({ pathname: `/auth/login` });
          break;
        default:
          break;
      }
    }
  };

  const userSignIn = async (data) => {
    const result = await Auth.currentAuthenticatedUser();
    setTokenUser(result);
    console.log("REVISAR ESTE: ", data);
    const isSignIn = true;
    checkAttrGroups(isSignIn);
    router.push(`/auth/profiles`);
  };

  const userSignOut = () => {
    setTokenUser(null);
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
        if (isSignIn) router.push({ pathname: `/auth/profiles` });
      } else {
        await Auth.signOut();
        router.push({ pathname: `/auth/login` });
        alert("USUARIO NO AUTORIZADO");
      }
    } catch (error) {
      await Auth.signOut();
      router.push({ pathname: `/auth/login` });
    }
  };

  return { checkUser, userSignIn, userSignOut };
};

export default useUserManagement;
