import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React, { ReactNode } from "react";

const LandingPageCards = ({title,content}:{title:string,content:ReactNode}) => {
  return (
    <Card className="lg:m-2 lg:h-72">
      <CardHeader>
        <CardTitle className=" text-primary font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
       {content}
      </CardContent>
    </Card>
  );
};

export default LandingPageCards;
