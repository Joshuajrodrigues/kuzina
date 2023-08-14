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
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { BASE_URL, clientSupabase } from "@/lib/constants";
import { Database } from "@/types/supabase";
import { EnterIcon, ExitIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
const UserNav = ({ session }: { session: Session | null }) => {
  const pathname = usePathname();
  const user = session?.user;


  const [fullname, setFullname] = useState<string | null>(null)
  const [displayName, setDisplayName] = useState<string | null>(null)

  let testData = {
    full_name:"test test",
    username:"test",

  }


  const getProfile = useCallback(async () => {
    try {

      let { data, error, status } = await clientSupabase
        .from('profiles')
        .select(`full_name, username`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }
     
      if (data) {
        let name = data.full_name
        let initials = name?.split(' ') || ""
        
        setFullname(data.full_name)
        setDisplayName(initials[0][0]+ initials[1][0])
      }
    } catch (error) {
        console.log(error);
        
      //alert('Error loading user data!')
    }
  }, [user, clientSupabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])







  if (!user) {
    return (
      <Link
        href={"/auth"}
        className="button items-center justify-center flex text-sm"
      >
        {pathname !== "/auth" && (
          <>
            <EnterIcon className="mr-2" /> Sign in
          </>
        )}
      </Link>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{displayName}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{fullname}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {session?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link className="w-full" href={"/account"}>Account</Link>
            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          <DropdownMenuItem>
          <Link className="w-full" href={"/lobby"}>Lobby</Link>
            
            {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem>New Team</DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form action={`${BASE_URL}/api/auth/signout`} method="post">
            <Button
              className="p-0 text-left flex text-red-500"
              variant={"ghost"}
              type="submit"
            >
              <ExitIcon className="mr-2" />
              Sign out
            </Button>
          </form>
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
