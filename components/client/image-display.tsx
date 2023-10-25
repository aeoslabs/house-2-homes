import { cormorant, poppins } from "@/app/fonts";
import { useSupabase } from "@/hooks/use-supabase";
import { useState, useEffect } from "react";
import Loader from "../ui/loader";

type Props = {
  generationId: string | null;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

function ImageDisplay(props: Props) {
  const { generationId, loading, setLoading } = props;
  const [imageUrl, setImageUrl] = useState(
    //"https://pqnqzunprcsaveizdodm.supabase.co/storage/v1/object/sign/test/6d1e2e46-9a40-4d08-aec0-eaae4bbb1f51/generations/f564be28-f2c2-4703-856c-ff4050b65a0f?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZXN0LzZkMWUyZTQ2LTlhNDAtNGQwOC1hZWMwLWVhYWU0YmJiMWY1MS9nZW5lcmF0aW9ucy9mNTY0YmUyOC1mMmMyLTQ3MDMtODU2Yy1mZjQwNTBiNjVhMGYiLCJpYXQiOjE2OTgwNzkwMDIsImV4cCI6MTcyOTYxNTAwMn0.LMUwS3g-wxT2tLfQhfKxPCJ-cVqx-zYGwnhylND1MzQ"
    //"https://pqnqzunprcsaveizdodm.supabase.co/storage/v1/object/sign/test/6d1e2e46-9a40-4d08-aec0-eaae4bbb1f51/generations/294b0f65-30e5-4fa1-aa88-be933d74899e?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZXN0LzZkMWUyZTQ2LTlhNDAtNGQwOC1hZWMwLWVhYWU0YmJiMWY1MS9nZW5lcmF0aW9ucy8yOTRiMGY2NS0zMGU1LTRmYTEtYWE4OC1iZTkzM2Q3NDg5OWUiLCJpYXQiOjE2OTYzNDMwMTksImV4cCI6MTcyNzg3OTAxOX0.qEaZ7OsIj-lLVYD5hJwpGl4nrfWZn72_TyOLhY39pqM"
    null
  );
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
    <div className={`mx-auto p-4 flex flex-col h-full justify-center`}>
      {!imageUrl && !loading && (
        <div>
          <h1
            className={`${cormorant.className} mx-auto max-w-4xl text-4xl tracking-normal text-slate-800 text-center`}
          >
            Redesign your room in seconds
          </h1>
          <p
            className={`${poppins.className} text-gray-400 font-thin mt-6 mb-16 text-center`}
          >
            Get started by uploading a photo, specifying the room type,
            <br /> selecting room themes, then submitting. <br />
            <br /> No output yet! Press Generate to start a prediction.
          </p>
          <div className="bg-[#c4b4a5] w-[400px] h-[400px] rounded-lg flex justify-center items-center mx-auto">
            <p>HouseKraft</p>
          </div>
        </div>
      )}

      {!imageUrl && loading && (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      )}

      {imageUrl && (
        <img
          className="p-3 max-h-[80vh] max-w-[70vw]"
          src={imageUrl}
          alt="Generated Output"
        />
      )}
    </div>
  );
}

export default ImageDisplay;
