import { useSupabase } from "@/hooks/use-supabase";
import Image from "next/image";
import { useState, useEffect } from "react";

type Props = {
  generationId: string | null;
};

function ImageDisplay(props: Props) {
  const { generationId } = props;
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
          if (true) {
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
    <div className="max-w-7xl mx-auto max-h-[80vh] p-4">
      {imageUrl && (
        <img
          className="h-full rounded-md"
          src={imageUrl}
          alt="Generated Output"
        />
      )}
    </div>
  );
}

export default ImageDisplay;
