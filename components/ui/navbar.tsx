"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import CreditCount from "./credit-count";
import { useSupabase } from "@/hooks/use-supabase";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";
import { poppins } from "@/app/fonts";
import CreditIcon from "../icons/credit";

const Navbar = () => {
  const router = useRouter();
  const { user } = useUser();
  const { supabase } = useSupabase();
  useEffect(() => {
    if (user) {
      // add mixpanel here
    }
  }, [user]);

  function AuthedNavBar() {
    return (
      <ul className="flex mr-0 ml-6 items-center space-x-6">
        <li className="flex items-center space-x-1">
          <CreditIcon color="#0f172a" />
          <span className={`${poppins.className} text-xl text-gray-900`}>
            {4 + 1}
          </span>
        </li>
        <li>
          <Link href="/account">
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.user_metadata.avatar_url} />
              <AvatarFallback>
                {user?.user_metadata.full_name.split(" ")[0].substr(0, 2)}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    );
  }

  function UnAuthedNavBar() {
    return (
      <ul className="flex mr-0 ml-6 items-center space-x-8 h-10">
        <li>
          <Link href="/signin" className="opacity-0" aria-label="Sign In">
            Sign In
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="z-99 h-14 ">
      <div className={poppins.className}>
        <div className="flex justify-between align-center flex-row py-2 px-4 relative ">
          <div className="flex flex-1 items-center gap-4 h-10 w-full">
            <Link href="/" aria-label="Logo" className="mx-2 mr-auto">
              <img src="/logo.svg" alt="AlphaCTR" width={150} />
            </Link>
            {user && (
              <Link href="/generate" aria-label="Dashboard">
                <Button variant="link" className="font-normal uppercase">
                  Generate
                </Button>
              </Link>
            )}
            {user && (
              <Link href="/generations" aria-label="Dashboard">
                <Button variant="link" className="font-normal uppercase">
                  Generations
                </Button>
              </Link>
            )}
            {user && (
              <Link href="/pricing" aria-label="Dashboard">
                <Button variant="link" className="font-normal uppercase">
                  Pricing
                </Button>
              </Link>
            )}
          </div>

          {user ? <AuthedNavBar /> : <UnAuthedNavBar />}
        </div>

        <Separator />
      </div>
    </nav>
  );
};

export default Navbar;
