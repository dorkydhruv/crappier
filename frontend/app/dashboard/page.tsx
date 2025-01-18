"use client";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Copy, Plus, Trash2, PlayCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader } from "@/components/Loader";
import { WORKER } from "@/constants/const";
import { DashboardHeader } from "@/components/DashboardHeader";

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
  userId: string;
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
  }, [shouldFetch, toast]);

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
    <div className='flex h-screen flex-col bg-slate-50'>
      <DashboardHeader />
      <main className='flex-1 p-6 overflow-auto'>
        <div className='mb-8 flex items-center justify-between'>
          <div>
            <h2 className='text-3xl font-bold text-slate-800'>
              Your automations..
            </h2>
          </div>
          <div className='flex space-x-4'>
            <Button
              variant='outline'
              className=''
              onClick={() => setShouldFetch(true)}
            >
              <RefreshCw className='mr-2 h-4 w-4' /> Refresh
            </Button>
            <Button
              onClick={() => router.push("/zap/create")}
              className='bg-gradient-to-r from-[#EBFF00] to-yellow-500 text-black font-semibold border-black border tracking-wide'
            >
              <Plus className='mr-2 h-4 w-4' /> Create Automation
            </Button>
          </div>
        </div>

        {zaps.length === 0 && (
          <div className='text-center p-12 bg-white rounded-lg border  border-dashed'>
            <div className='flex flex-col items-center gap-4'>
              <div className='p-4 border-2 bg-yellow-50 rounded-full'>
                <PlayCircle className='h-8 w-8 text-yellow-500' />
              </div>
              <h3 className='text-xl font-semibold text-slate-800'>
                No automations yet
              </h3>
              <p className='text-slate-500'>
                Create your first automation to get started
              </p>
              <Button onClick={() => router.push("/zap/create")}>
                <Plus className='mr-2 h-4 w-4' /> Create Automation
              </Button>
            </div>
          </div>
        )}

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {zaps.map((zap, index) => (
            <div
              key={index}
              className='bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-all duration-200'
            >
              <div className='mb-4 flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <div className='p-2 bg-yellow-50 rounded-lg'>
                    <img
                      src={zap.trigger?.availableTrigger.image}
                      alt={zap.trigger?.availableTrigger.name}
                      className='h-8 w-8'
                    />
                  </div>
                  <div>
                    <h3 className='font-semibold text-slate-800'>{zap.name}</h3>
                    <p className='text-sm text-slate-500'>
                      {zap.trigger?.availableTrigger.name}
                    </p>
                  </div>
                </div>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${WORKER}/hook/${zap.userId}/${zap.id}`
                    );
                    toast({
                      title: "Webhook URL Copied",
                      description:
                        "The webhook URL has been copied to your clipboard",
                    });
                  }}
                >
                  <Copy className='h-4 w-4 text-slate-600' />
                </Button>
              </div>

              <div className='space-y-4'>
                <div className='flex justify-between items-center pt-4 border-t'>
                  <div className='flex items-center space-x-2'>
                    {zap.actions.map((action) => (
                      <div
                        key={action.id}
                        className='p-2 bg-slate-50 rounded-lg'
                      >
                        <img
                          src={action.availableAction.image}
                          alt={action.availableAction.name}
                          className='h-6 w-6'
                        />
                      </div>
                    ))}
                  </div>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => deleteZap(zap.id)}
                    className='text-red-500 hover:text-red-600'
                  >
                    <Trash2 className='mr-2 h-4 w-4' /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
