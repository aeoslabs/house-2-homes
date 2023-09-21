"use client";
import Link from "next/link";
import { cookies } from "next/headers";
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

import { ExternalLinkIcon, PencilIcon } from "lucide-react";
import CreditCount from "./credit-count";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSupabase } from "@/hooks/use-supabase";
import { useUser } from "@/hooks/use-user";
import { useEffect } from "react";

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
        <li className="hidden md:block">
          <Link href="/projects/new" aria-label="Create">
            <Button variant="ghost" className="flex space-x-1" size="sm">
              <PencilIcon size={16} /> <span>Create</span>
            </Button>
          </Link>
        </li>

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
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link
                href="https://woolen-digestion-6a4.notion.site/CTR-Hero-FAQs-3e3120843e284f06bb2d1f9f01f4e64d"
                target="_blank"
              >
                <DropdownMenuItem>
                  FAQs
                  <ExternalLinkIcon size={12} className="ml-2" />
                </DropdownMenuItem>
              </Link>
              <Link href="https://alphactr.com/terms" target="_blank">
                <DropdownMenuItem>
                  T&C
                  <ExternalLinkIcon size={12} className="ml-2" />
                </DropdownMenuItem>
              </Link>
              <Link href="https://alphactr.com/privacy-policy" target="_blank">
                <DropdownMenuItem>
                  Privacy Policy
                  <ExternalLinkIcon size={12} className="ml-2" />
                </DropdownMenuItem>
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
      <div>
        <div className="flex justify-between align-center flex-row py-2 px-4 relative">
          <div className="flex flex-1 items-center space-x-4">
            <Link href="/" aria-label="Logo">
              <img src="/logo.png" alt="AlphaCTR" width={128} />
            </Link>
            {user && (
              <Link href="/" aria-label="Dashboard Button">
                <Button variant="ghost">Dashboard</Button>
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
