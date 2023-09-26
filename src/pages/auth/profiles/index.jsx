import React, { useEffect } from "react";
import ProfilesSection from "@/sections/Profiles";
import { useUser } from "@/context/UserContext";
const Profiles = ({ error }) => {
  const { setTokenProfile } = useUser();
  useEffect(() => {
    if (error) {
      alert(error);
      setTokenProfile(null);
    }
  }, [error]);

  return <ProfilesSection />;
};

export async function getServerSideProps({ query }) {
  console.log("PROFILE: ", query);
  if (query.error) {
    return {
      props: {
        error: query.error,
      },
    };
  }

  return {
    props: {},
  };
}

export default Profiles;
