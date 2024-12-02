"use client";
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { TriggerNode } from "@/components/Nodes/TriggerNode";
import { useAvailableTriggersAndActions } from "@/hooks/useAvailableTriggersAndActions";

const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
};

import "@xyflow/react/dist/base.css";
import { useCallback } from "react";
import { ActionNode } from "@/components/Nodes/ActionNode";
import { Button } from "@/components/ui/button";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "trigger",
    position: { x: 0, y: 0 },
    data: {
      name: "Trigger 1",
      description: "This is a trigger",
      image: "https://cdn-icons-png.flaticon.com/512/1828/1828665.png",
    },
  },
  {
    id: "2",
    type: "action",
    position: { x: 0, y: 200 },
    data: {
      name: "Action 1",
      description: "This is an action",
      image: "https://cdn-icons-png.flaticon.com/512/1828/1828665.png",
    },
  },
];

export default function CreateZapPage() {
  const { avaialableTriggers, availableActions } =
    useAvailableTriggersAndActions();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    // @ts-ignore
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  return (
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
        <Background />
        <Controls />
      </ReactFlow>
      <div className='absolute top-0 left-0 right-0 bottom-0 pointer-events-none'>
        <Button className='absolute bottom-5 left-1/2 transform -translate-x-1/2 pointer-events-auto'>
          Execute Zap ⚡
        </Button>
      </div>
    </div>
  );
}
