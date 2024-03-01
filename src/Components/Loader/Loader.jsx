import React from "react";
import { CirclesWithBar } from "react-loader-spinner";

export default function Loader() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-opacity-50 bg-success">
        <CirclesWithBar
          height="100"
          width="100"
          color="#4fa94d"
          outerCircleColor="#4fa94d"
          innerCircleColor="#4fa94d"
          barColor="#4fa94d"
          ariaLabel="circles-with-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );
}
