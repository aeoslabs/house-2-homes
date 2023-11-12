import AccountComponent from "@/components/setup/account";
import { getGenerationImages, getSession } from "../supabase-server";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase";
import Navbar from "@/components/ui/navbar";

type Image = Database["public"]["Tables"]["generations"]["Row"];

export default async function Account() {
  const session = await getSession();

  if (!session) {
    return redirect("/");
  }

  const images: Image[] = await getGenerationImages();

  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <Navbar />
      <AccountComponent images={images} />
    </div>
  );
}
