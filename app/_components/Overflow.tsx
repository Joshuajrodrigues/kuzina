import React from "react";

const Overflow = ({ text }: { text: string }) => {
  return (
    <span className="w-1/2 break-words">
     {text}
    </span>
  );
};

export default Overflow;
