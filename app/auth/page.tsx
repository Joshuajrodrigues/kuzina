import React from "react";
import AuthForm from "../_components/AuthForm";

const page = () => {
  return (
    <div className="m-5 p-5 md:mx-20 md:px-20 lg:mx-20 lg:px-20 xl:mx-72 xl:px-72" >
      <h3 className=" text-xl">Authentication</h3>
      <AuthForm />
    </div>
  );
};

export default page;
