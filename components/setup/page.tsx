"use client";

import { ImageUpload, SelectItems } from "../client";
import { Separator } from "@radix-ui/react-separator";
import { useState } from "react";
import ImageDisplay from "../client/image-display";

type Image = {
  id: string;
  url: string;
  created_at: string;
  user_id: string;
};

type Props = {
  images: Image[];
};
const PageComponent = ({ images }: Props) => {
  const [generationId, setGenerationId] = useState<string | null>(null);
  return (
    <section className="relative h-[100vh]">
      <div className="flex flex-row w-full h-full h-adjusted">
        <div className="p-2  overflow-y-auto max-h-screen">
          <div className="flex flex-col flex-1 max-h-full">
            <ImageUpload images={images} />

            <SelectItems setGenerationId={setGenerationId} />
          </div>
        </div>
        <Separator orientation="vertical" />

        <div className="flex flex-col flex-1 space-y-2 h-full">
          <ImageDisplay generationId={generationId} />
        </div>
      </div>
    </section>
  );
};
export default PageComponent;
