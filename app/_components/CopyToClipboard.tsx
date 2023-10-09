"use client"
import { Button } from "@/components/ui/button";
import { CheckIcon, ClipboardCopyIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

const CopyToClipboard = ({ id }: { id: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText("Use invite code " + id);
    setIsCopied(true)
    setTimeout(()=>{
        setIsCopied(false)
    },5000)
  };
  return (
    <div className="flex items-center justify-start  my-0">
      <Button
        onClick={handleCopy}
        className=" bg-transparent text-primary text-[7px] px-2 w-[150px]  border border-dashed hover:bg-slate-100"
      >
        {!isCopied ? (
          <>
            <ClipboardCopyIcon className="mr-2" /> Copy invite code
          </>
        ) : (
          <>
            <CheckIcon className="mr-2" /> Copied ! send to family
          </>
        )}
      </Button>
    </div>
  );
};

export default CopyToClipboard;
