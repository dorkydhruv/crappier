"use client";

import { Handle, Position, useReactFlow } from "@xyflow/react";
import { nanoid } from "nanoid";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { ZapContext } from "../../app/zap/create/page";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AvailableNodeType } from "@/hooks/useAvailableTriggersAndActions";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";
import { TriggerSheet } from "../Sheets/TriggerSheet";

export interface TriggerData {
  name: string;
  description?: string;
  id: string;
  metadata?: Object;
  image: string;
}

//@ts-ignore
export const TriggerNode = (props) => {
  const { data, id } = props;
  const reactFlowInstance = useReactFlow();
  const { availableActions }: { availableActions: AvailableNodeType[] } =
    useContext(ZapContext);
  const [open, setOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isLastNode = !reactFlowInstance
    .getEdges()
    .some((edge) => edge.source === id);

  const onAdd = () => {
    setOpen(true);
  };

  const onNodeClick = () => {
    setIsSheetOpen(true);
  };

  const handleMetadataChange = (updatedData: Partial<TriggerData>) => {
    reactFlowInstance.setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...updatedData,
            },
          };
        }
        return node;
      })
    );
    setIsSheetOpen(false);
  };

  const handleActionSelect = (actionData: AvailableNodeType) => {
    const newNodeId = nanoid();
    const currentNode = reactFlowInstance.getNode(id);
    const newPosition = {
      x: currentNode?.position.x || 0,
      y: (currentNode?.position.y || 0) + 150,
    };

    reactFlowInstance.addNodes({
      id: newNodeId,
      type: "action",
      position: newPosition,
      data: {
        name: actionData.name,
        id: actionData.id,
        description: actionData.description,
        image: actionData.image,
      },
    });

    reactFlowInstance.addEdges({
      id: nanoid(),
      source: id,
      target: newNodeId,
    });

    setOpen(false);
  };

  return (
    <div className='px-6 py-3 border-2 shadow-md bg-white rounded-lg border-stone-500 min-w-[200px]'>
      <div className='flex items-center gap-3' onClick={onNodeClick}>
        <img src={data.image} className='w-8 h-8' alt='trigger' />
        <div className='flex-1'>
          <h3 className='text-lg font-semibold'>{data.name}</h3>
          <p className='text-sm text-gray-600'>{data.description}</p>
        </div>
      </div>
      <Handle
        position={Position.Bottom}
        className='w-2 rounded-xl bg-blue-500'
        type='source'
      />
      {isLastNode && (
        <>
          <div className='absolute left-1/2 bottom-[-100px] transform -translate-x-1/2 border-l-2 border-dotted h-[100px] border-slate-400'></div>
          <Button
            onClick={onAdd}
            className='absolute -bottom-[100px] left-1/2 transform -translate-x-1/2 rounded-full w-8 h-8'
            variant='outline'
            size='icon'
          >
            +
          </Button>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className='max-h-[80vh] overflow-y-auto'>
              <AlertDialogHeader>
                <AlertDialogTitle className='text-xl mb-4'>
                  Select an Action
                </AlertDialogTitle>
                <AlertDialogDescription className='text-gray-600 mb-4'></AlertDialogDescription>
              </AlertDialogHeader>
              <div className='grid gap-3'>
                {availableActions.map((action) => (
                  <Button
                    key={action.id}
                    onClick={() => handleActionSelect(action)}
                    variant='outline'
                    className='w-full py-3 h-auto hover:bg-slate-100 transition-colors'
                  >
                    <div className='flex items-center gap-3 w-full'>
                      <img
                        src={action.image}
                        className='w-8 h-8 flex-shrink-0'
                        alt='action'
                      />
                      <div className='text-left flex-1 min-w-0'>
                        <h3 className='font-semibold truncate'>
                          {action.name}
                        </h3>
                        <p className='text-sm text-gray-600 truncate max-w-sm'>
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
      <TriggerSheet
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        handleMetadataChange={handleMetadataChange}
      />
    </div>
  );
};
