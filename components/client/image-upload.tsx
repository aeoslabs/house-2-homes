"use client";

import { toast } from "@/hooks/use-toast";
import { postClient } from "@/utils/client-helpers";
import { fileToBase64 } from "@/utils/helpers";
import * as React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import clsx from "clsx";
import { useFormSelection } from "@/hooks/use-form-selection";
import Image from "next/image";
import { Database } from "@/types/supabase";
import { CheckCheckIcon } from "lucide-react";

type Image = Database["public"]["Tables"]["assets"]["Row"];

type Props = {
  images: Image[];
};

const ImageUpload = ({ images }: Props) => {
  const [imageList, setImageList] = React.useState<Image[]>(images || []);
  const [loading, setLoading] = React.useState(false);
  const { selection, setSelection } = useFormSelection();
  const { selectedBaseImage } = selection;

  const handleSelectImage = async (image: any) => {
    try {
      setLoading(true);
      const res = await postClient("/create-asset", { image });
      const { data } = await res.json();
      if (res.status !== 200) {
        throw new Error(res.statusText);
      } else {
        setImageList((prev) => [data, ...prev]);
        setSelection({ ...selection, selectedBaseImage: data.url });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const fileUploadInput = React.useRef<HTMLInputElement>(null);

  return (
    <RadioGroup
      value={selection.selectedBaseImage}
      onValueChange={(value) => {
        setSelection({ ...selection, selectedBaseImage: `${value}` });
      }}
      className="gap-2 grid grid-cols-3 w-[25vw] min-h-[9rem] max-h-[18rem] overflow-auto"
    >
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            // Send the compressed image file to server with XMLHttpRequest.
            // Send the compressed image file to server with XMLHttpRequest.
            fileToBase64(e.target.files[0])
              .then((base64Data) => {
                handleSelectImage(base64Data);
              })
              .catch((error) => {
                console.error("Error converting file to Base64:", error);
              });
          }
        }}
        className="hidden"
        ref={fileUploadInput}
      />
      <div
        onClick={() => fileUploadInput?.current?.click()}
        className="flex justify-center h-24 items-center border border-dashed border-gray-400 hover:border-blue-400 transition-all cursor-pointer p-2"
      >
        {loading ? (
          <div className="animate-spin h-5 w-5 border-t-2 border-blue-500 rounded-full"></div>
        ) : (
          <p className="text-gray-400 text-center text-2xl">+</p>
        )}
      </div>
      {imageList?.map(({ url, id }) => (
        <div
          key={id}
          className={clsx(
            "flex items-center relative border-2 border-transparent hover:scale-105 transition-all transform h-24",
            url == selectedBaseImage && "border-gray-950"
          )}
        >
          <RadioGroupItem
            value={url}
            id={id}
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />

          <img
            src={url}
            alt={id}
            className={clsx(
              "flex justify-center object-cover items-center w-full h-full border-gray-200 hover:border-blue-400 transition-all",
              url == selectedBaseImage && "border-red-950 shadow-sm"
            )}
          />

          {url === selectedBaseImage && (
            <div className="absolute top-0 right-0 p-2 ">
              <CheckCheckIcon size={24} />
            </div>
          )}
        </div>
      ))}
    </RadioGroup>
  );
};

export default ImageUpload;
