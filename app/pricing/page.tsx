import { SignInComponent } from "@/components/client";
import { getAssetImages, getSession } from "../supabase-server";
import { redirect } from "next/navigation";
import PricingComponent from "@/components/setup/pricing";
import { Database } from "@/types/supabase";
import Navbar from "@/components/ui/navbar";

type Image = Database["public"]["Tables"]["assets"]["Row"];

export default async function Pricing() {
  const session = await getSession();

  if (!session) {
    return redirect("/");
  }

  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <Navbar />
      <PricingComponent />
    </div>
  );
}
