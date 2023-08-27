"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clientSupabase } from "@/lib/constants";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  EnvelopeClosedIcon,
  EnvelopeOpenIcon,
} from "@radix-ui/react-icons";
import { Session } from "@supabase/supabase-js";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type NotificationRequests = {
  request_from: string;
  full_name: string;
};

const Notifications = ({ session }: { session: Session | null }) => {
  const user = session?.user;
  const kitchenId = useParams().slug;
  const [notifications, setNotifications] = useState<NotificationRequests[]>(
    []
  );
  const fetchRequests = async () => {
    //@ts-ignore
    const { data } = await clientSupabase.rpc("join_notifications", {
      owner_id: user!.id,
      request_to: kitchenId,
    });
    if (data) setNotifications(data);
    console.log("data", await data);
  };

  const rejectRequests = async (id: string) => {
    try {
      //@ts-ignore
      const { data, error } = await clientSupabase.rpc("reject_request", {
        request_from_id: id,
        request_to_id: kitchenId,
      });
      if (error) throw error;
    } catch (error) {
      console.log(error);
    } finally {
      fetchRequests();
    }
  };
  useEffect(() => {
    if (user) fetchRequests();
  }, [user]);

  if (!user || !kitchenId) {
    return <></>;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mr-3" asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full ">
          <Avatar className="h-8 w-8 ">
            <AvatarFallback>
              {notifications?.length > 0 ? (
                <EnvelopeClosedIcon />
              ) : (
                <EnvelopeOpenIcon />
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Join requests</p>
            <p className="text-xs leading-none text-muted-foreground">
              Accept new members to your kitchen
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {notifications?.length > 0 ? (
            notifications.map((item) => (
              <DropdownMenuItem className="w-full" key={item.request_from}>
                <AcceptListItem rejectRequests={rejectRequests} item={item} />
              </DropdownMenuItem>
            ))
          ) : (
            <span className="text-sm p-2">No new requests</span>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;

const AcceptListItem = ({
  item,
  rejectRequests,
}: {
  item: any;
  rejectRequests: (id: string) => void;
}) => {
  return (
    <div className="flex w-full items-center justify-between">
      <span>{item.full_name}</span>
      <span className="flex justify-end">
        <Button
          onClick={() => rejectRequests(item.request_from as string)}
          className="bg-red-500 mr-2 h-6"
        >
          <CrossCircledIcon />{" "}
        </Button>
        <Button className=" h-6 bg-green-500">
          <CheckCircledIcon />{" "}
        </Button>
      </span>
    </div>
  );
};
