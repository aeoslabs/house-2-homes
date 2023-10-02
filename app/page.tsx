import { redirect } from "next/navigation";
import Navbar from "@/components/ui/navbar";
import { getImages, getSession } from "./supabase-server";
import PageComponent from "@/components/setup/page";

export default async function Generate() {
  const session = await getSession();

  // if (!session) {
  //   return redirect("/signin");
  // }
  const images = await getImages();

  return (
    <>
      <Navbar />
      <PageComponent images={images} />
    </>
  );
}
