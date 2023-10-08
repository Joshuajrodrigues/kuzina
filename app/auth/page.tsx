
import Image from "next/image";
import AuthForm from "../_components/AuthForm";
import auth from "@/public/auth.svg";
const page = () => {

  return (
    <div className="m-5 p-5 my-28 md:mx-20 md:px-20 lg:mx-20 lg:px-20 xl:mx-72 xl:px-72 border border-primary rounded-2xl">
      <h3 className=" text-xl text-primary">Authentication</h3>
      <AuthForm />
      <Image
        alt="lady showing laptop with auth logo"
        src={auth}
        priority={true}
        style={{
          objectFit: "cover",
        }}
     
        //placeholder="blur"
        //width={100}
       // placeholder="blur"
       // quality={100}
    //   width={400}
    //    height={400}
     
      />
    </div>
  );
};

export default page;
