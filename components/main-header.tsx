"use client";

import { LogOut, Settings, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation'

export default function MainHeader({
  //   avatar,
  name,
}: {
  //   avatar?: string;
  name: string;
}) {
  const router = useRouter();

  const getCharector = (name: string) => {
    const list = name.split("");
    return list[0];
  };

  function signOutbtn() {
    signOut({ redirect: false })
      .then(() => {
        localStorage.removeItem("token"); 
        sessionStorage.removeItem("token");
        document.cookie = "session=; Max-Age=0; path=/;";
        router.push("/");
        router.refresh();
      })
      .catch((err) => {
        console.log("[SignOut err]", err);
      });
  }
  return (
    <div className="w-full h-full flex items-center justify-between px-4">
      <div className=""></div>
      <div className="">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="border-solid border-gray-200 cursor-pointer">
              {/* <AvatarImage src={avatar} /> */}
              <AvatarFallback className="uppercase">
                {getCharector(name)}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOutbtn}>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
