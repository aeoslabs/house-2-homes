import { redirect } from "next/navigation";
import { getSession } from "./supabase-server";
import IndexComponent from "@/components/setup/page";

export default async function Index() {
  const session = await getSession();
  console.log(session, "hereee");

  if (session) {
    return redirect("/generate");
  }

  return <IndexComponent />;
}
