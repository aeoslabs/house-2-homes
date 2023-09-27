"use client";

import { toast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-user";
import { postClient } from "@/utils/client-helpers";
import { fileToBase64 } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { type } from "os";
import * as React from "react";

type Image = {
  id: string;
  url: string;
  created_at: string;
  user_id: string;
};
type Props = {
  images: Image[];
};

const ImageUpload = ({ images }: Props) => {
  const [imageList, setImageList] = React.useState<Image[]>(images || []);
  const router = useRouter();
  const { user, additonalUserDetails } = useUser();

  const [loading, setLoading] = React.useState(false);

  const handleSelectImage = async (image: any) => {
    try {
      setLoading(true);
      const res = await postClient("/create-asset", { image });
      const { data } = await res.json();
      if (res.status !== 200) {
        throw new Error(res.statusText);
      } else {
        setImageList((prev) => [...prev, data]);
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

  const fileUploadInput = React.useRef(null);

  return (
    <div className="p-2 gap-1 min-h-60 h-60 max-h-60 grid grid-cols-3 grid-rows-2 w-[20vw]">
      {imageList?.map(({ url }) => (
        <img
          key={url}
          className="flex justify-center object-cover items-center w-full h-full rounded-lg border border-gray-200 hover:border-blue-400 transition-all"
          src={url}
          alt="uploaded-image"
        />
      ))}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
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
        className="flex justify-center items-center rounded-lg border-2 border-dashed border-gray-400 hover:border-blue-400 transition-all cursor-pointer p-2"
      >
        {loading ? (
          <div className="animate-spin h-5 w-5 border-t-2 border-blue-500 rounded-full"></div>
        ) : (
          <p className="text-gray-400 text-center text-2xl">+</p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
