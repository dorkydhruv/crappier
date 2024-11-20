"use client";
import { Appbar } from "@/components/Appbar";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react"
import { Bell, ChevronDown, Plus,  Settings, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Page() {
  const { toast } = useToast();
  const { data, status, update } = useSession();
  const router = useRouter();

  if (status === "unauthenticated") {
    toast({
      title: "You are not authenticated",
      description: "Please sign in to continue",
    });
    router.replace("/signin");
  }

  return (
    <div className='flex h-screen flex-col'>
      <Appbar />
        <main className="flex-1 p-6 overflow-hidden border-t">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">My Automations</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Automation
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "New Email to Slack", status: "Active" },
              { name: "Twitter Mentions to Discord", status: "Inactive" },
              { name: "GitHub Issues to Trello", status: "Active" },
              { name: "Google Calendar to Notion", status: "Active" },
              { name: "Shopify Orders to Google Sheets", status: "Inactive" },
              { name: "RSS Feed to Buffer", status: "Active" },
            ].map((automation, index) => (
              <div key={index} className="rounded-lg border p-4 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">{automation.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">Status: {automation.status}</p>
              </div>
            ))}
          </div>
        </main>
      
    </div>
  );
}
