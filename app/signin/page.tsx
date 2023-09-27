import { SignInComponent } from "@/components/client";
import { getSession } from "../supabase-server";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  return <SignInComponent />;
}
