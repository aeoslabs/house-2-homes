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

const PageComponent = ({ images }: Props) => {
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <section className="relative h-[100%]">
      <div className="flex flex-row w-full h-full h-adjusted">
        <div className="p-6  overflow-y-auto max-h-screen">
          <div className="flex flex-col flex-1 h-full">
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

        <div className="flex flex-col flex-1 space-y-2 h-full">
          <ImageDisplay setLoading={setLoading} generationId={generationId} />
        </div>
      </div>
    </section>
  );
};
export default PageComponent;
