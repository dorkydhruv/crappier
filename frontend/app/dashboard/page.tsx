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
import { set } from "zod";
export interface Zap {
  name: string;
  id: string;
  description?: string;
  trigger: {
    id: string;
    availableTrigger: {
      name: string;
      image: string;
      description?: string;
    };
  };
  actions: {
    id: string;
    availableAction: {
      name: string;
      image: string;
      description?: string;
    };
  }[];
}

export default function Page() {
  const { toast } = useToast();
  const { status } = useSession();
  const router = useRouter();
  const [zaps, setZaps] = React.useState<Zap[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [shouldFetch, setShouldFetch] = React.useState(true);
  if (status === "unauthenticated") {
    toast({
      title: "You are not authenticated",
      description: "Please sign in to continue",
    });
    router.replace("/signin");
  }

  React.useEffect(() => {
    if (!shouldFetch) return;
    setLoading(true);
    axios
      .get("/api/zaps")
      .then((response) => {
        setZaps(response.data);
        setShouldFetch(false);
        setLoading(false);
      })
      .catch((e) => {
        toast({
          title: "Error",
          description: `Failed to fetch zaps: ${e}`,
        });
        setLoading(false);
        setShouldFetch(false);
      });
  }, [shouldFetch]);

  if (loading || !zaps) {
    return <Loader />;
  }

  async function deleteZap(id: string) {
    try {
      const res = await axios.delete(`/api/zaps/${id}`);
      toast({
        title: "Zap deleted",
        description: res.data.message,
      });
      setShouldFetch(true);
      setLoading(true);
    } catch (e) {
      toast({
        title: "Error",
        description: `Failed to delete zap: ${e}`,
      });
    }
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
          {zaps.length === 0 && (
            <div className='text-center text-gray-500 flex items-center justify-center h-32'>
              You have not created any automations yet. Click on the button
              above.
            </div>
          )}
          {zaps.map((zap, index) => (
            <div key={index} className='rounded-lg border p-4 shadow-sm'>
              <div className='mb-2 flex items-center justify-between'>
                <h3 className='font-semibold'>{zap.name}</h3>
                <h2 className='text-sm text-gray-500'>
                  {zap.trigger.availableTrigger.name}
                </h2>
              </div>
              <div className='flex justify-between'>
                <div className='flex gap-2'>
                  {zap.actions.map((action) => (
                    <div key={action.id}>
                      <img
                        src={action.availableAction.image}
                        alt={action.availableAction.name}
                        className='h-8 w-8'
                      />
                    </div>
                  ))}
                </div>
                {/* <img
                  src={zap.trigger.availableTrigger.image}
                  alt={zap.trigger.availableTrigger.name}
                  className='h-8 w-8'
                /> */}
                <Button
                  variant={"outline"}
                  size='sm'
                  onClick={async () => deleteZap(zap.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
