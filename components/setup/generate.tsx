"use client";

import { ImageUpload, SelectItems } from "../client";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";
import ImageDisplay from "../client/image-display";
import { Database } from "@/types/supabase";
import { poppins } from "@/app/fonts";

type Image = Database["public"]["Tables"]["assets"]["Row"];

type Props = {
  images: Image[];
};
const titleStyle = `${poppins.className} uppercase mb-3 font-normal`;

const GenerateComponent = ({ images }: Props) => {
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <section className="relative h-full max-h-[calc(100vh-56px)]">
      <div className="flex flex-row w-full max-h-[calc(100%-32px)]">
        <div className="p-6  overflow-y-auto max-h-screen border border-transparent border-r-gray-300">
          <div className="flex flex-col flex-1 h-full ">
            <p className={titleStyle}>Select Room</p>
            <ImageUpload images={images} />

            <SelectItems
              setGenerationId={setGenerationId}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </div>
        <Separator orientation="vertical" />

        <div className="flex flex-col flex-1 space-y-2 h-full justify-center">
          <ImageDisplay
            loading={loading}
            setLoading={setLoading}
            generationId={generationId}
          />
        </div>
      </div>
      <div className="w-full h-10 p-4 border-t border-t-gray-300 flex justify-center items-center">
        <p className="text-sm">Developed by aeos</p>
      </div>
    </section>
  );
};
export default GenerateComponent;
