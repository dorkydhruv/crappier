import React, { useState } from "react";
import { ActionData } from "../Nodes/ActionNode";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "../ui/sheet";
import { AutoSuggestInput } from "../ui/AutoSuggestInput";
import { useTriggerMetadata } from "@/hooks/useTriggerMetadata";
import { Button } from "../ui/button";

interface ActionSheetProps {
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleMetadataChange: (updatedData: Partial<ActionData>) => void;
  actionData: ActionData;
}

export const SolanaActionSheet: React.FC<ActionSheetProps> = ({
  isSheetOpen,
  setIsSheetOpen,
  handleMetadataChange,
  actionData,
}) => {
  const [formData, setFormData] = useState({
    amount: "",
    publicKey: "",
  });

  const triggerMetadata = useTriggerMetadata();

  const handleInputChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    handleMetadataChange({ metadata: formData });
    setIsSheetOpen(false);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Configure {actionData.name}</SheetTitle>
        </SheetHeader>
        <SheetDescription className='text-md text-slate-600'>
          {actionData.description}
        </SheetDescription>
        <div className='flex flex-col space-y-4 my-2'>
          <div className='flex justify-start items-center'>
            <AutoSuggestInput
              value={formData.amount}
              onChange={handleInputChange("amount")}
              placeholder='Amount of SOL'
              triggerMetadata={triggerMetadata}
            />
            <img src={actionData.image} className='w-8 h-8' alt='action' />
          </div>
          <AutoSuggestInput
            value={formData.publicKey}
            onChange={handleInputChange("publicKey")}
            placeholder='To public-key'
            triggerMetadata={triggerMetadata}
          />
        </div>
        <Button onClick={handleSave}>Save</Button>
      </SheetContent>
    </Sheet>
  );
};

export default SolanaActionSheet;
