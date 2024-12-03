import axios from "axios";
import { useEffect, useState } from "react";

export interface AvailableNodeType {
  id: string;
  name: string;
  description?: string;
  image: string;
}

export function useAvailableTriggersAndActions() {
  const [availableTriggers, setAvailableTriggers] = useState<
    AvailableNodeType[]
  >([]);
  const [availableActions, setAvailableActions] = useState<AvailableNodeType[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/api/triggers").then((response) => {
      setAvailableTriggers(response.data);
    });
    axios.get("/api/actions").then((response) => {
      setAvailableActions(response.data);
      setLoading(false);
    });
  }, []);

  return { availableTriggers, availableActions, loading };
}
