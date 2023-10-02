"use client";

import React, { useState } from "react";
import { selectionDB, palletes } from "@/utils/data";
import axios from "axios";
import { useFormSelection } from "@/hooks/use-form-selection";
import DropDown from "../ui/dropdown";
import { useToast } from "../ui/use-toast";

type Image = {
  id: string;
  url: string;
  created_at: string;
  user_id: string;
};
type Props = {
  setGenerationId: React.Dispatch<React.SetStateAction<string | null>>;
};

const SelectItems = ({ setGenerationId }: Props) => {
  const [room, setRooms] = useState("Foyer/Entryway");
  const [theme, setTheme] = useState("Indian Contemporary");
  const [pallete, setPallete] = useState("Natural Earth Tones");
  const [loading, setLoading] = useState(false);

  const { selection } = useFormSelection();
  const { toast } = useToast();

  const replicatefetch = async () => {
    setLoading(true);
    if (!selection.selectedBaseImage) {
      console.log("Please select an image");
      toast({
        title: "Error",
        description: "Please select an image",
        variant: "destructive",
      });
      return;
    }

    const selectedPalleteColor =
      palletes.find((e) => e.name === pallete)?.color_prompt || "";
    const selectedRoomPrompt =
      selectionDB.find((e) => e.room === room)?.prompt || "";

    try {
      const prediction = await axios.post("/api/replicate", {
        model: "4722e6ce",
        image: selection.selectedBaseImage,
        prompt: `${room}, ${theme} style, ${selectedPalleteColor} interior, ${selectedRoomPrompt}`,
        n_prompt:
          "(curves), (uneven lines), (normal quality), (low quality), (worst quality), (ceiling artifacts), (ceiling fans), ceiling decor, humans, windows, glass doors, cropped image, out of frame, deformed hands, signatures, twisted fingers, double image, long neck, malformed hands, multiple heads, extra limb, poorly drawn hands, missing limb, disfigured, cut-off, grainy, distorted face, blurry, bad anatomy, beginner, amateur, distorted face, distorted furniture, distorted items, draft, grainy, text, watermark, ugly, signature, lowres, deformed, disfigured, cropped, jpeg artifacts, error, mutation, logo, wooden, watermark, text, logo, contact, error, blurry, cropped, username, artist name, (worst quality, low quality:1.4),monochrome",
      });

      setGenerationId(prediction.data.generationId);

      if (prediction.data.success) {
        setLoading(false);
      } else {
        console.log("Error in prediction");
        setLoading(false);
      }
    } catch (err) {
      console.log(err, "err");
      setLoading(false);
    }
  };

  return (
    <>
      <p className="text-center mt-8 mb-2">Select Room Type</p>
      <DropDown
        state={room}
        setState={(newroom: string) => setRooms(newroom)}
        onClick={(themeItem: string) => {
          const roomData = selectionDB.find((e) => e.room === themeItem);
          if (roomData) {
            const selectedTheme = roomData?.themes[0]?.name ?? "";
            const selectedPallete = roomData?.themes[0]?.pallete[0] ?? "";
            setTheme(selectedTheme);
            setPallete(selectedPallete);
          }
        }}
        itemList={selectionDB.map((room) => room.room)}
      />
      <p className="text-center mt-8 mb-2">Select Room Themes</p>
      <DropDown
        state={theme}
        setState={(newTheme: string) => setTheme(newTheme)}
        onClick={(themeItem: string) => {
          const selectedRoomData = selectionDB.find((e) => e.room === room);
          if (selectedRoomData) {
            const selectedThemeData = selectedRoomData.themes.find(
              (e) => e.name === themeItem
            );
            if (selectedThemeData) {
              setPallete(selectedThemeData.pallete[0]);
            }
          }
        }}
        itemList={
          selectionDB
            .find((e) => e.room === room)
            ?.themes.map((theme) => theme.name) || []
        }
      />

      <p className="text-center mt-8 mb-2">Select Color Palettes</p>
      <DropDown
        state={pallete}
        setState={(newPalette: string) => setPallete(newPalette)}
        itemList={
          selectionDB
            .find((e) => e.room === room)
            ?.themes.find((e) => e.name === theme)?.pallete || []
        }
      />
      <button
        className="rounded-md bg-slate-800 text-white p-3 mt-8"
        onClick={replicatefetch}
      >
        Render Design
      </button>
    </>
  );
};

export default SelectItems;
