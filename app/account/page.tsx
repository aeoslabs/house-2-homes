import AccountComponent from "@/components/setup/account";
import { getSession } from "../supabase-server";
import { redirect } from "next/navigation";

export default async function Account() {
  const session = await getSession();

  if (!session) {
    return redirect("/");
  }

  return <AccountComponent />;
}
