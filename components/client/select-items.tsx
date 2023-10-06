"use client";

import React, { useState } from "react";
import { selectionDB, palletes } from "@/utils/data";
import axios from "axios";
import { useFormSelection } from "@/hooks/use-form-selection";
import DropDown from "../ui/dropdown";
import { useToast } from "../ui/use-toast";
import CenteredSpinner from "../ui/centered-spinner";
import { cormorant, poppins } from "@/app/fonts";

type Props = {
  setGenerationId: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const titleStyle = `${poppins.className} uppercase mt-8 mb-3 font-normal`;

const SelectItems = ({ setGenerationId, loading, setLoading }: Props) => {
  const [room, setRooms] = useState("Foyer/Entryway");
  const [theme, setTheme] = useState("Indian Contemporary");
  const [pallete, setPallete] = useState("Natural Earth Tones");

  const { selection } = useFormSelection();
  const { toast } = useToast();

  const replicatefetch = async () => {
    if (!selection.selectedBaseImage) {
      toast({
        title: "Error",
        description: "Please select an image",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const selectedPalleteColor =
      palletes.find((e) => e.name === pallete)?.color_prompt || "";
    const selectedRoomPrompt =
      selectionDB.find((e) => e.room === room)?.prompt || "";
    let prompt = `${room}, ${theme} style, ${selectedPalleteColor} interior, ${selectedRoomPrompt}`;
    if (
      room == "Pooja Room" ||
      theme == "Indian Ancient" ||
      pallete == "Wooden Design"
    ) {
      prompt =
        "((pooja room)) design on walls of  a living room, single ((Ganesha)) idol ,wooden design style,  interior, high quality, 8k, UHD, amazing lighting, amazing quality, photoreal, hyper realistic, soft lighting, 3d render, unreal engine, octane render , no humans, 4000 samples";
    }
    if (
      room == "Pooja Room" ||
      theme == "Indian Ancient" ||
      pallete == "Modern Neutrals"
    ) {
      prompt =
        "((pooja room)) design on walls of  a living room, single ((Ganesha)) idol ,modern neutral style,  interior, high quality, 8k, UHD, amazing lighting, amazing quality, photoreal, hyper realistic, soft lighting, 3d render, unreal engine, octane render , no humans, 4000 samples";
    }
    try {
      const prediction = await axios.post("/api/replicate", {
        model: room == "Pooja Room" ? "1f91fb65" : "4722e6ce",
        modelName: room == "Pooja Room" ? "puja-lora" : "controlnetarchi",
        image: selection.selectedBaseImage,
        prompt,
        n_prompt:
          room == "Pooja Room"
            ? ""
            : "(curves), (uneven lines), (normal quality), (low quality), (worst quality), (ceiling artifacts), (ceiling fans), ceiling decor, humans, windows, glass doors, cropped image, out of frame, deformed hands, signatures, twisted fingers, double image, long neck, malformed hands, multiple heads, extra limb, poorly drawn hands, missing limb, disfigured, cut-off, grainy, distorted face, blurry, bad anatomy, beginner, amateur, distorted face, distorted furniture, distorted items, draft, grainy, text, watermark, ugly, signature, lowres, deformed, disfigured, cropped, jpeg artifacts, error, mutation, logo, wooden, watermark, text, logo, contact, error, blurry, cropped, username, artist name, (worst quality, low quality:1.4),monochrome",
      });

      setGenerationId(prediction.data.generationId);

      if (prediction.data.success) {
      } else {
        console.error("Error:", prediction.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="h-[100%] flex flex-col">
      <p className={titleStyle}>Select Room Type</p>
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
      <p className={titleStyle}>Select Room Themes</p>
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

      <p className={titleStyle}>Select Color Palettes</p>
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
        className="bg-[#212121] text-[#ffffff] p-3 w-full mt-auto mb-0 hover:bg-[#c4c1b8] hover:text-[#212121] transition-all"
        onClick={replicatefetch}
      >
        {loading ? <CenteredSpinner /> : "Render Design"}
      </button>
    </div>
  );
};

export default SelectItems;
