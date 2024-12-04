import { useReactFlow } from "@xyflow/react";

export const useTriggerMetadata = () => {
  const { getNodes } = useReactFlow();
  const triggerNode = getNodes().find((node) => node.type === "trigger");
  return triggerNode?.data.metadata || {};
};
