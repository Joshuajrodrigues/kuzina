import CreateKitchenForm from "@/app/_components/CreateKitchenForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";


const page = () => {
  return (
    <div className="m-5 p-5">
      <h3 className=" text-xl">Welcome </h3>
      <h2 className=" text-l my-5">Your current kitchen is </h2>
      <Card className="h-24 cursor-pointer flex justify-center items-center p-5">
        You are currently not part of any kitchen :(
      </Card>
      <section className="flex flex-col my-5 text-white">
   
   <CreateKitchenForm/>

        <Button
          disabled
          variant={"default"}
          type="button"
          className=" my-5 text-l"
        >
          Join an existing kitchen{" "}
        </Button>
      </section>
    </div>
  );
};

export default page;
