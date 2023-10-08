import { SignInComponent } from "@/components/client";
import { getAssetImages, getSession } from "../supabase-server";
import { redirect } from "next/navigation";
import GenerateComponent from "@/components/setup/generate";
import { Database } from "@/types/supabase";
import Navbar from "@/components/ui/navbar";

type Image = Database["public"]["Tables"]["assets"]["Row"];

export default async function Generate() {
  const session = await getSession();

  if (!session) {
    return redirect("/");
  }

  const images: Image[] = await getAssetImages();

  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <Navbar />
      <GenerateComponent images={images} />
    </div>
  );
}
