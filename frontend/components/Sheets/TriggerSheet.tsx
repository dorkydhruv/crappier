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
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

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
  const [response, setResponse] = useState<Response | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const pollInterval = setInterval(async () => {
      const res = await axios.get(`${BASE_URL}/api/hook/${hookId}`);
      const data = await res.data;
      if (data) {
        setResponse(data);
        handleMetadataChange({ metadata: data });
      }
    }, 10000);

    return () => clearInterval(pollInterval);
  }, [hookId, handleMetadataChange]);

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Configure Trigger</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          Test your response by hitting this endpoint below.
        </SheetDescription>
        <div className=' border-2 p-3 max-w-md flex gap-2 my-2 justify-center items-center'>
          <div className='text-sm text-slate-600 max-w-xs overflow-hidden'>
            {BASE_URL}/api/hook/{hookId}
          </div>
          <div
            className='w-4 h-4 cursor-pointer'
            onClick={() => {
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
          <pre className='mt-2 p-4 bg-slate-100 rounded-md overflow-auto'>
            {response
              ? JSON.stringify(response, null, 2)
              : "No requests received yet"}
          </pre>
        </div>
      </SheetContent>
    </Sheet>
  );
};
