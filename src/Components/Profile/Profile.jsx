import React, { useContext } from "react";
import { authContext } from "./../../Context/AuthContext";
import Loader from "./../Loader/Loader";
import { Helmet } from "react-helmet";

export default function Profile() {
  const { userData } = useContext(authContext);

  if (!userData) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="container py-5 my-5">
        <h1 className="text-success text-center py-5 my-5 fw-bolder fa-4x">
          Hello {userData.name}
        </h1>
      </div>
    </>
  );
}
