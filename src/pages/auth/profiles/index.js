import React from "react";
import ProfilesSection from "@/sections/Profiles";
const Profiles = ({ error }) => {
  return <ProfilesSection error={error} />;
};

export async function getServerSideProps({ query, req }) {
  console.log("query profiles: ", query);
  try {
    if (!query?.error) throw new Error("¡Este es un error forzado!");

    return {
      props: { error: query.error },
    };
  } catch (error) {
    return {
      props: {
        error: null,
      },
    };
  }
}

export default Profiles;
