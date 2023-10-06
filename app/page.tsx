import { redirect } from "next/navigation";
import Navbar from "@/components/ui/navbar";
import { getAssetImages, getSession } from "./supabase-server";
import PageComponent from "@/components/setup/page";
import { Database } from "@/types/supabase";

type Image = Database["public"]["Tables"]["assets"]["Row"];

export default async function Generate() {
  const session = await getSession();
  console.log(session, "hereee");

  // if (!session) {
  //   return redirect("/signin");
  // }
  const images: Image[] = await getAssetImages();

  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <Navbar />
      <PageComponent images={images} />
    </div>
  );
}
