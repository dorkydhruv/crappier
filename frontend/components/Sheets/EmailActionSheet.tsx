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

export const EmailActionSheet: React.FC<ActionSheetProps> = ({
  isSheetOpen,
  setIsSheetOpen,
  handleMetadataChange,
  actionData,
}) => {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    body: "",
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
          <div className='flex justify-start items-center gap-2'>
            <AutoSuggestInput
              value={formData.to}
              onChange={handleInputChange("to")}
              placeholder='to'
              triggerMetadata={triggerMetadata}
            />
            <img src={actionData.image} className='w-8 h-8' alt='action' />
          </div>
          <AutoSuggestInput
            value={formData.subject}
            onChange={handleInputChange("subject")}
            placeholder='subject'
            triggerMetadata={triggerMetadata}
          />
          <AutoSuggestInput
            value={formData.body}
            onChange={handleInputChange("body")}
            placeholder='body'
            triggerMetadata={triggerMetadata}
          />
          <Button onClick={handleSave}>Save</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EmailActionSheet;
