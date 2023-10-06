import { cormorant, poppins } from "@/app/fonts";
import { useSupabase } from "@/hooks/use-supabase";
import { useState, useEffect } from "react";

type Props = {
  generationId: string | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

function ImageDisplay(props: Props) {
  const { generationId, setLoading } = props;
  const [imageUrl, setImageUrl] = useState(null);
  const { supabase } = useSupabase();

  useEffect(() => {
    const channel = supabase
      .channel("value-db-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "generations",
        },
        (payload) => {
          if (payload.new.id === generationId) {
            setLoading(false);
            setImageUrl(payload.new.url);
          }
        }
      )
      .subscribe();

    return async () => {
      await supabase.removeChannel(channel);
    };
    return () => {};
  }, [generationId, supabase]);

  return (
    <div
      className={`max-w-7xl mx-auto h-full p-4 flex flex-col ${
        !imageUrl ? "justify-normal" : "justify-center"
      } `}
    >
      {!imageUrl && (
        <h1
          className={`${cormorant.className} mx-auto max-w-4xl text-4xl mt-20 tracking-normal text-slate-800 sm:text-6xl mb-5 hidden lg:block text-center`}
        >
          Redesign your room in seconds
        </h1>
      )}

      {!imageUrl && (
        <p
          className={`${poppins.className} text-gray-400 hidden lg:block mb-16`}
        >
          Get started by uploading a photo, specifying the room type, selecting
          room themes, then submitting.
        </p>
      )}

      {/* <div className="bg-[#c4b4a5] w-[400px] h-[400px] rounded-lg flex justify-center items-center mx-auto">
        <p>HouseKraft</p>
      </div> */}

      {imageUrl && (
        <img className="h-full " src={imageUrl} alt="Generated Output" />
      )}
    </div>
  );
}

export default ImageDisplay;
