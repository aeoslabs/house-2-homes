"use client";
import { type } from "os";
// import { Database } from '@/';
import { useState, createContext, useContext } from "react";

const FormSelectionContext = createContext<
  FormSelectionContextType | undefined
>(undefined);

interface Props {
  [propName: string]: any;
}

type Selection = {
  selectedBaseImage: string;
  theme: string;
  room: string;
  pallete: string;
};

type FormSelectionContextType = {
  selection: Selection;
  setSelection: React.Dispatch<React.SetStateAction<Selection>>;
};

const FormSelectionContextProvider = (props: Props) => {
  const [selection, setSelection] = useState<Selection | any>({
    selectedBaseImage: "",
    theme: "",
    room: "",
    pallete: "",
  });

  return (
    <FormSelectionContext.Provider
      value={{ selection, setSelection }}
      {...props}
    />
  );
};

const useFormSelection = () => {
  const context = useContext(FormSelectionContext);
  if (context === undefined) {
    throw new Error(
      "useFormSelection must be used within a MyFormSelectionContextProvider."
    );
  }
  return context;
};

export { FormSelectionContextProvider, useFormSelection };
