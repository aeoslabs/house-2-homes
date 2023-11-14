import React from "react";
import CreditIcon from "../icons/credit";

const CreditCount = ({
  count,
}: {
  count: number;
  fontSize?: string;
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClicked = () => {
    setOpen(!open);
  };

  return (
    <div className="flex justify-center">
      <CreditIcon color="text-gray-900" />
      <span className="font-semibold text-2xl text-gray-900">{count}</span>
    </div>
  );
};
export default CreditCount;
