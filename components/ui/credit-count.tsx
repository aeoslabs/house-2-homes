import { ArrowRightIcon, InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import CreditIcon from "../icons/credit";
import Link from "next/link";

const CreditCount = ({
  count,
  fontSize,
}: {
  count: number;
  fontSize?: string;
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClicked = () => {
    setOpen(!open);
  };

  return (
    <TooltipProvider>
      <Tooltip open={open}>
        <TooltipTrigger className={`flex items-center space-x-1 ${fontSize}`}>
          <CreditIcon color="white" />
          <span className="font-bold text-slate-200">{count}</span>
          <InfoIcon
            size={16}
            className="text-slate-200"
            onClick={handleClicked}
            onMouseEnter={() => setOpen(true)}
          />
        </TooltipTrigger>
        <TooltipContent
          className="bg-brand-900 text-slate-300 rounded-lg w-80 flex flex-col p-4 justify-center"
          onMouseLeave={() => setOpen(false)}
        >
          <h1 className="text-xl font-bold text-white tracking-tight">
            What are credits?
          </h1>
          <p className="flex flex-row items-center space-x-2 text-white mt-1">
            Credits are consumed when you wish to generate new backgrounds,
            stylised text and characters on AlphaCTR. Credits are allocated
            monthly based on the plan you are on, but you can also buy extra
            credits whenever you want.
          </p>
          <Link
            href="/pricing"
            className="text-white mt-4 text-md font-semibold bg-brand-800 hover:bg-brand-700 rounded-lg py-2 px-4 flex flex-row items-center space-x-2"
          >
            Click here to buy more credits{" "}
            <ArrowRightIcon size={16} className="inline-block" />
          </Link>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default CreditCount;
