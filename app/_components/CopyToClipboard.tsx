import { Button } from "@/components/ui/button";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import React from "react";

const CopyToClipboard = ({ id }: { id: string }) => {
  return (
    <div className="flex items-center justify-start mx-5 px-5 my-0">
      <Button className=" bg-primary-foreground text-primary text-[7px] px-2 border-white border border-dashed">
        {" "}
        <ClipboardCopyIcon className="mr-2" /> Copy invite code
      </Button>
    </div>
  );
};

export default CopyToClipboard;
