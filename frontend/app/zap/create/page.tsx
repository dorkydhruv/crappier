"use client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { TriggerNode } from "@/components/Nodes/TriggerNode";
import {
  AvailableNodeType,
  useAvailableTriggersAndActions,
} from "@/hooks/useAvailableTriggersAndActions";
import { nanoid } from "nanoid";
import { createContext, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
};

import "@xyflow/react/dist/base.css";
import { useCallback } from "react";
import { ActionNode } from "@/components/Nodes/ActionNode";
import { Button } from "@/components/ui/button";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { Loader } from "@/components/Loader";
import axios from "axios";
import { useRouter } from "next/navigation";

// Remove the initialNodes constant as we'll set it dynamically

export const ZapContext = createContext({
  availableTriggers: [],
  availableActions: [],
});

export default function CreateZapPage() {
  const { availableTriggers, availableActions, loading } =
    useAvailableTriggersAndActions();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const router = useRouter();
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showTriggerDialog, setShowTriggerDialog] = useState(true);

  const handleTriggerSelect = (trigger: AvailableNodeType) => {
    setNodes([
      // @ts-ignore
      {
        id: nanoid(),
        type: "trigger",
        position: { x: 0, y: 0 },
        data: {
          name: trigger.name,
          description: trigger.description,
          image: trigger.image,
          id: trigger.id,
        },
      },
    ]);
    setShowTriggerDialog(false);
  };

  const onConnect = useCallback(
    //@ts-ignore
    (params) => {
      const edge = {
        id: nanoid(),
        source: params.source,
        target: params.target,
      };
      //@ts-ignore
      setEdges((edges) => addEdge(edge, edges));
    },
    [nodes]
  );

  const executeZap = async () => {
    const sortedNodes: Node[] = [];

    // Collect nodes starting from the trigger
    //@ts-ignore
    const triggerNode = nodes.find((node) => node.type === "trigger");
    if (!triggerNode) {
      console.error("No trigger node found");
      return;
    }
    let currentNode = triggerNode;
    while (currentNode) {
      sortedNodes.push(currentNode);
      //@ts-ignore
      const nextEdge = edges.find((edge) => edge.source === currentNode.id);
      //@ts-ignore
      currentNode = nextEdge
        ? // @ts-ignore
          nodes.find((node) => node.id === nextEdge.target)
        : undefined;
    }

    // Collect node data without replacing placeholders
    // Proceed with execution using nodeData and create the zap
    console.log(sortedNodes);
    console.log("Creating zap...");
    console.log({
      // @ts-ignore
      availableTriggerId: triggerNode.data.id,
      // @ts-ignore
      triggerMetadata: triggerNode.data.metadata,
      name: "From frontend",
      actions: sortedNodes
        .filter((node) => node.type === "action")
        .map((node) => ({
          availableActionId: node.data.id,
          actionMetadata: node.data.metadata,
        })),
    });
    const response = await axios.post("/api/zaps", {
      // @ts-ignore
      availableTriggerId: triggerNode.data.id,
      // @ts-ignore
      triggerMetadata: triggerNode.data.metadata,
      name: "From frontend",
      actions: sortedNodes
        .filter((node) => node.type === "action")
        .map((node) => ({
          availableActionId: node.data.id,
          actionMetadata: node.data.metadata,
        })),
    });
    console.log(response);
    router.replace("/dashboard");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    // @ts-ignore
    <ZapContext.Provider value={{ availableTriggers, availableActions }}>
      <div className='w-full h-screen relative'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitViewOptions={{ padding: 2 }}
          fitView
          className='bg-teal-200'
        >
          <Background
            color='#36404a'
            bgColor='e5e5e5'
            variant={BackgroundVariant.Dots}
          />
          <Controls />
        </ReactFlow>

        <AlertDialog
          open={showTriggerDialog}
          onOpenChange={setShowTriggerDialog}
        >
          <AlertDialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto'>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-2xl mb-4'>
                Choose a Trigger to Start Your Zap
              </AlertDialogTitle>
              <AlertDialogDescription className='text-gray-600 mb-4'></AlertDialogDescription>
            </AlertDialogHeader>
            <div className='grid gap-3'>
              {availableTriggers.map((trigger) => (
                <Button
                  key={trigger.id}
                  onClick={() => handleTriggerSelect(trigger)}
                  variant='outline'
                  className='w-full py-3 h-auto hover:bg-slate-100 transition-colors'
                >
                  <div className='flex items-center gap-3 w-full'>
                    <img
                      src={trigger.image}
                      className='w-8 h-8'
                      alt='trigger'
                    />
                    <div className='text-left'>
                      <h3 className='font-semibold truncate'>{trigger.name}</h3>
                      <p className='text-sm text-gray-600 truncate max-w-lg'>
                        {trigger.description}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </AlertDialogContent>
        </AlertDialog>

        <div className='absolute top-0 left-0 right-0 bottom-0 pointer-events-none'>
          <Button
            className='absolute bottom-5 left-1/2 transform -translate-x-1/2 pointer-events-auto'
            onClick={executeZap}
          >
            Execute Zap ⚡
          </Button>
        </div>
      </div>
    </ZapContext.Provider>
  );
}
