"use client";
import { Appbar } from "@/components/Appbar";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader } from "@/components/Loader";

export interface Zap {
  name: string;
  id: string;
  description: string;
  trigger: {
    id: string;
    availableTrigger: {
      name: string;
      image: string;
      description: string;
    };
  };
  actions: {
    id: string;
    availableAction: {
      name: string;
      image: string;
      description: string;
    };
  }[];
}

export default function Page() {
  const { toast } = useToast();
  const { data, status, update } = useSession();
  const router = useRouter();
  const [zaps, setZaps] = React.useState<Zap[]>([]);
  const [loading, setLoading] = React.useState(false);
  if (status === "unauthenticated") {
    toast({
      title: "You are not authenticated",
      description: "Please sign in to continue",
    });
    router.replace("/signin");
  }

  React.useMemo(() => {
    setLoading(loading);
    axios.get("/api/zaps").then((response) => {
      setZaps(response.data);
      setLoading(false);
    });
  }, [loading]);

  if (loading || !zaps) {
    return <Loader />;
  }

  return (
    <div className='flex h-screen flex-col'>
      <Appbar />
      <main className='flex-1 p-6 overflow-hidden border-t'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>My Automations</h2>
          <Button
            onClick={() => {
              router.push("/zap/create");
            }}
          >
            <Plus className='mr-2 h-4 w-4' /> Create Automation
          </Button>
        </div>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {zaps.map((zap, index) => (
            <div key={index} className='rounded-lg border p-4 shadow-sm'>
              <div className='mb-2 flex items-center justify-between'>
                <h3 className='font-semibold'>{zap.name}</h3>
                <h2 className='text-sm text-gray-500'>
                  {zap.trigger.availableTrigger.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
