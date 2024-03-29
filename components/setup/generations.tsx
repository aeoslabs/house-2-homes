"use client";

import { cormorant } from "@/app/fonts";
import { downloadImage } from "@/lib/utils";
import { Database } from "@/types/supabase";
import CreditCount from "../ui/credit-count";
import Link from "next/link";
import { Button } from "../ui/button";
import { useUser } from "@/hooks/use-user";

type Image = Database["public"]["Tables"]["generations"]["Row"];

type Props = {
  images: Image[];
};

const GenerationsComponent = (props: Props) => {
  const { images } = props;

  const { user } = useUser();
  return (
    <section className="mb-32">
      <div className="max-w-6xl px-4 py-20 space-y-20 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div>
          <div className="flex flex-col space-y-2">
            <h1 className={`${cormorant.className} text-6xl sm:text-4xl`}>
              Past Generations
            </h1>
            <p className="mt-5 text-xl text-gray-700 font-thin">
              Manage your past generations here.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-20">
            {images.map((image) => {
              return (
                <div
                  key={image.id}
                  className="relative group overflow-hidden transform transition-transform duration-300 hover:scale-105"
                >
                  <img
                    alt="home"
                    className="h-[400px] object-cover w-full"
                    src={image.url || undefined}
                  />
                  <button
                    onClick={() => downloadImage(image.url)}
                    className="absolute bottom-2.5 left-1/2 transform -translate-x-1/2 px-5 py-2.5 bg-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Download
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenerationsComponent;
