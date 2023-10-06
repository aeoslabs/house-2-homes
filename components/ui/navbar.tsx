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

const Navbar = () => {
  const router = useRouter();
  const { user } = useUser();
  const { supabase } = useSupabase();
  useEffect(() => {
    if (user) {
    }
  }, [user]);
  // const { supabase } = useSupabase();

  //   const totalCredits =
  //     Number(userDetails?.credits) + Number(userDetails?.addon_credits) || 0;
  function AuthedNavBar() {
    return (
      <ul className="flex flex-1 justify-end items-center space-x-6">
        <li className="items-center space-x-1">
          <CreditCount count={3} />
        </li>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.user_metadata.avatar_url} />
                <AvatarFallback>
                  {user?.user_metadata.full_name.split(" ")[0].substr(0, 2)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" forceMount>
              <DropdownMenuLabel className="opacity-80">
                My Account
              </DropdownMenuLabel>

              <Link href="/pricing">
                <DropdownMenuItem className="text-slate-400">
                  Pricing {/* hide it for screen other than mobile */}
                </DropdownMenuItem>
              </Link>
              <Link href="/account">
                <DropdownMenuItem>Account</DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await supabase.auth.signOut();
                  await router.push("/signin");
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    );
  }

  function UnAuthedNavBar() {
    return (
      <ul className="flex flex-1 justify-end items-center space-x-8">
        <li>
          <Link href="/signin" aria-label="Sign In">
            Sign In
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <nav className="z-99 h-14">
      <div className={poppins.className}>
        <div className="flex justify-between align-center flex-row py-2 px-4 relative">
          <div className="flex flex-1 items-center gap-4">
            <Link href="/" aria-label="Logo" className="mx-2">
              <img src="/logo.svg" alt="AlphaCTR" width={150} />
            </Link>
            {user && (
              <Link href="/" aria-label="Dashboard">
                <Button variant="link" className="font-thin uppercase">
                  Dashboard
                </Button>
              </Link>
            )}
            {user && (
              <Link href="/account" aria-label="Account">
                <Button variant="link" className="font-thin uppercase">
                  Account
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
