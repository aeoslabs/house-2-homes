import AccountComponent from "@/components/setup/account";
import { getGenerationImages, getSession } from "../supabase-server";
import { redirect } from "next/navigation";
import { Database } from "@/types/supabase";

type Image = Database["public"]["Tables"]["generations"]["Row"];

export default async function Account() {
  const session = await getSession();

  if (!session) {
    return redirect("/");
  }

  const images: Image[] = await getGenerationImages();
  return <AccountComponent images={images} />;
}
