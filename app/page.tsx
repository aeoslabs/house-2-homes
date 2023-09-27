import { redirect, useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { getURL } from "@/utils/helpers";
import dynamic from "next/dynamic";
import CenteredSpinner from "@/components/ui/centered-spinner";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/ui/navbar";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { Check } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useSupabase } from "@/hooks/use-supabase";
import { getImages, getSession } from "./supabase-server";
import { RadioGroup } from "@radix-ui/react-dropdown-menu";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import { ImageUpload } from "@/components/client";
export default async function Generate() {
  // const [panelType, setPanelType] = useState("compact");
  // const radio = [
  //   {
  //     image: "https://picsum.photos/200/200",
  //     value: "compact",
  //   },
  //   {
  //     image: "https://picsum.photos/200/400",
  //     value: "full",
  //   },
  //   {
  //     image: "https://picsum.photos/200/600",
  //     value: "custom",
  //   },
  // ];

  const session = await getSession();

  if (!session) {
    return redirect("/signin");
  }
  const images = await getImages();
  return (
    <>
      {" "}
      <Navbar />
      <ImageUpload images={images} />
      {/* <section className="relative">
        <div className="flex flex-row w-full h-adjusted">
          <div className="p-4 max-w-xs overflow-y-auto max-h-screen">
            <div className="items-center flex justify-between mt-auto w-72">
              <p>panelType</p>
            </div>
            <div className="flex flex-col flex-1 max-h-full">
              <ImageUpload />
              <RadioGroup
                value={panelType}
                onValueChange={setPanelType}
                className="grid grid-cols-3"
              >
                {radio.map(({ image, value }) => (
                  <div
                    className={clsx(
                      "flex items-center relative border-2 border-transparent",
                      value == panelType && "border-gray-950"
                    )}
                  >
                    <RadioGroupItem
                      value={value}
                      id={value}
                      className="absolute w-full h-full opacity-0 cursor-pointer"
                    />

                    <img
                      src={image}
                      alt={value}
                      className="w-full h-full object-cover"
                    />

                    {value === panelType && (
                      <div className="absolute top-0 right-0 p-2 ">
                        <Check size={24} />
                      </div>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <Separator orientation="vertical" />

          <div className="flex flex-col flex-1 space-y-2 h-full">
            <h3 className="text-lg font-extrabold px-4 pt-1.5">Nada</h3>
            <div>
              <Separator />
            </div>
            <div className="max-w-7xl mx-auto"></div>
          </div>
          <p className="absolute bottom-0 rounded-xl bg-brand-900 text-center h-64 lg:hidden py-8 px-4">
            We are currently working on polishing our app for a{" "}
            <strong>better experience on mobile</strong>. In the meanwhile, we
            recommend you switch to Desktop to have the best possible
            experience.
          </p>
        </div>
      </section> */}
    </>
  );
}
