"use client"
import { Button } from "@/components/ui/button";
import { CheckIcon, ClipboardCopyIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

const CopyToClipboard = ({ id }: { id: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setIsCopied(true)
    setTimeout(()=>{
        setIsCopied(false)
    },5000)
  };
  return (
    <div className="flex items-center justify-start mx-5 px-5 my-0">
      <Button
        onClick={handleCopy}
        className=" bg-primary-foreground text-primary text-[7px] px-2 w-[100px] border-white border border-dashed"
      >
        {!isCopied ? (
          <>
            <ClipboardCopyIcon className="mr-2" /> Copy invite code
          </>
        ) : (
          <>
            <CheckIcon className="mr-2" /> Copied !
          </>
        )}
      </Button>
    </div>
  );
};

export default CopyToClipboard;
