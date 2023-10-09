"use client";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { MinusCircledIcon, MinusIcon, PlusCircledIcon, PlusIcon } from "@radix-ui/react-icons";
const FastFill = ({
  handleAutoData,
  title,
}: {
  handleAutoData: (text: string[],isPreserve:boolean) => void;
  title?: string;
}) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [splitBy, setSplitBy] = useState("comma");
  const [isPreserve, setIsPreserve] = useState(false);
  const handlePaste = () => {
    let splitArray: string[] = [];
    switch (splitBy) {
      case "comma":
        splitArray = text.split(",");
        break;
      case "line":
        splitArray = text.split("\n");
        break;
      case "number":
        splitArray = text.split(/(\d+\s+)/).filter(Boolean);
        let currentElement = "";
        const combinedArray = [];

        for (let i = 0; i < splitArray.length; i++) {
          if (splitArray[i].match(/\d+\s+/)) {
            currentElement = splitArray[i];
          } else {
            currentElement += splitArray[i];
            combinedArray.push(currentElement);
          }
        }
        splitArray = combinedArray;
        break;
      default:
        break;
    }
    handleAutoData(splitArray,isPreserve);
    console.log("handle Paste", splitArray);
  };

  return (
    <>
      <Button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        variant={"outline"}
      >
        {
            show ? <MinusCircledIcon className="mr-2"/> : <PlusCircledIcon className="mr-2"/>
        }
        Fast fill {title}
      </Button>
      {show && (
        <>
          <Textarea
            onChange={(e) => setText(e.target.value)}
            wrap="off"
            className=" whitespace-break-spaces h-64"
          />
          <p>Break on </p>{" "}
          <RadioGroup
            value={splitBy}
            onValueChange={(e) => setSplitBy(e)}
            defaultValue="comma"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comma" id="option-one" />
              <Label htmlFor="option-one">Commas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="line" id="option-two" />
              <Label htmlFor="option-two">New line</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="number" id="option-two" />
              <Label htmlFor="option-two">Numbers</Label>
            </div>
          </RadioGroup>
          <div className="flex">
            <Checkbox checked={isPreserve} onClick={()=>{setIsPreserve((prev)=>!prev)}} className="mr-2" />
            <p>Preserve existing</p>
          </div>
          <Button onClick={handlePaste} type="button">
            Fill
          </Button>
        </>
      )}
    </>
  );
};

export default FastFill;
