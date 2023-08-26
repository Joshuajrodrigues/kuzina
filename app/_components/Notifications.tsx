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
import {
  CheckCircledIcon,
  CrossCircledIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";

const Notifications = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="mr-3" asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full ">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              <EnvelopeClosedIcon />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
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
          <DropdownMenuItem>
            <AcceptListItem />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <AcceptListItem />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;

const AcceptListItem = () => {
  return (
    <div className="flex items-center justify-between">
      <div>Chiara Rodrigues</div>
      <div className="flex">
        <Button className="bg-red-500 mr-2 h-6">
          <CrossCircledIcon />{" "}
        </Button>
        <Button className=" h-6 bg-green-500">
          <CheckCircledIcon />{" "}
        </Button>
      </div>
    </div>
  );
};
