"use client";
import { Separator } from "@/components/ui/separator";
import { CheckIcon } from "lucide-react";
import { Badge } from "./badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { postClient } from "@/utils/client-helpers";
import { Button } from "./button";

interface PricingCardProps {
  name: string;
  price: number;
  features: string[];
}
function PricingCard({ name, price, features }: PricingCardProps) {
  const { toast } = useToast();

  return (
    <div className="bg-brand-900 rounded-xl p-10 flex flex-col space-y-5 w-full mx-auto">
      <div className="flex items-center justify-center space-x-2">
        <h3 className="font-light text-slate-300 text-2xl text-center">
          {name}
        </h3>
        {name == "Credits" && <Badge className="bg-brand-300">ADD-ON</Badge>}
      </div>

      <h1 className="font-extrabold text-4xl text-center h-16 tracking-tight">
        Subscribe
      </h1>

      <Separator />
      <ul className="space-y-2 flex-1">
        {features.map((f: string, index: number) => (
          <li className="flex space-x-1.5" key={index}>
            <CheckIcon className="text-slate-600 flex-none mt-1" size={20} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a target="blank">
        <Button className="w-full">Contact Us </Button>{" "}
      </a>
    </div>
  );
}

export default PricingCard;
