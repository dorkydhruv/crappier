import axios from "axios";
import { useEffect, useState } from "react";

export interface AvailableNodeType {
  id: string;
  name: string;
  description?: string;
  image: string;
}

export function useAvailableTriggersAndActions() {
  const [avaialableTriggers, setAvailableTriggers] = useState<
    AvailableNodeType[]
  >([]);
  const [availableActions, setAvailableActions] = useState<AvailableNodeType[]>(
    []
  );
  useEffect(() => {
    axios.get("/api/triggers").then((response) => {
      setAvailableTriggers(response.data);
    });
    axios.get("/api/actions").then((response) => {
      setAvailableActions(response.data);
    });
  }, []);

  return { avaialableTriggers, availableActions };
}
