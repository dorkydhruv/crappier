"use client";
import { BASE_URL } from "@/constants/const";
import { Copy } from "lucide-react";
import { Sheet } from "../ui/sheet";
import { nanoid } from "nanoid";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { TriggerData } from "../Nodes/TriggerNode";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const TriggerSheet = ({
  isSheetOpen,
  setIsSheetOpen,
  handleMetadataChange,
}: {
  isSheetOpen: boolean;
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleMetadataChange: (updatedData: Partial<TriggerData>) => void;
}) => {
  const [hookId] = useState(nanoid());

  const { toast } = useToast();
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Configure Trigger</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          Test your response by hitting this endpoint below. <br></br>
        </SheetDescription>
        <div className=' border-2 p-3 max-w-md flex gap-2 my-2 justify-center items-center'>
          <div className='text-sm text-slate-600 max-w-xs overflow-hidden'>
            {BASE_URL}/api/hook/{hookId}
          </div>
          <div
            className='w-4 h-4 cursor-pointer'
            onClick={(e) => {
              navigator.clipboard.writeText(`${BASE_URL}/api/hook/${hookId}`);
              toast({
                title: "Copied to clipboard",
              });
            }}
          >
            <Copy size={15} />
          </div>
        </div>
        <div>
          Response:
        </div>
      </SheetContent>
    </Sheet>
  );
};
